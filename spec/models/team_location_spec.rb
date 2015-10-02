require 'rails_helper'

describe TeamLocation do
  describe '.with_eod_time_near' do
    let(:team) do
      Team.create(name: 'The Team', mailing_list: 'eod_list@theteam.test').tap do |team|
        team.team_locations.create(name: 'Hawaii', time_zone: 'Pacific/Honolulu', eod_time: '6:00 PM')
      end
    end
    let(:nyc_team) do
      team.team_locations.create(name: 'New York', time_zone: 'Eastern Time (US & Canada)', eod_time: '8:00 PM')
    end

    it 'finds teams with a team location eod time at the specified time' do
      team_locations = TeamLocation.with_eod_time_near(Time.parse('8:00 PM EDT').utc)

      expect(team_locations).to contain_exactly(nyc_team)
    end

    it 'finds teams with an eod time near (to the nearest half hour) the specified time' do
      team_locations = TeamLocation.with_eod_time_near(Time.parse('8:03 PM EDT').utc)

      expect(team_locations).to contain_exactly(nyc_team)
    end
  end

  describe '#eod_time' do
    it 'must be a valid time' do
      [nil, '', 'alskfjd', '8', '6:65 PM'].each do |invalid_time|
        team_location = TeamLocation.new(name: 'Hawaii', time_zone: 'Pacific/Honolulu', eod_time: invalid_time)

        expect(team_location).not_to be_valid
        expect(team_location.errors.messages[:eod_time]).to be_present
      end

      ['5:00', '5:00 PM', '5:00AM'].each do |invalid_time|
        team_location = TeamLocation.new(name: 'Hawaii', time_zone: 'Pacific/Honolulu', eod_time: invalid_time)

        expect(team_location).to be_valid
      end

    end

    it 'expands eod_time into multiple columns and converts to UTC upon saving' do
      team_location = TeamLocation.create(name: 'New York', time_zone: 'Eastern Time (US & Canada)', eod_time: '8:30 PM')

      expect(team_location.eod_time).to eq('8:30 PM')
      expect(team_location.eod_time_hour_utc).to eq(0)
      expect(team_location.eod_time_minute_utc).to eq(30)

      team_location.time_zone = 'Mumbai'
      team_location.eod_time = '5:30 PM'
      team_location.save

      expect(team_location.eod_time).to eq('5:30 PM')
      expect(team_location.eod_time_hour_utc).to eq(12)
      expect(team_location.eod_time_minute_utc).to eq(0)
    end

  end

end