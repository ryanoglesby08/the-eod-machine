require 'rails_helper'
require 'support/time_helpers'

describe TeamLocation do
  include TimeHelpers

  describe '.with_eod_time_near' do
    let(:nyc_team) { FactoryGirl.build(:new_york, eod_time: '8:00 PM') }
    let(:hawaii_team) { FactoryGirl.build(:hawaii, eod_time: '6:00 PM') }

    before do
      allow(nyc_team).to receive(:eod_time_utc).and_return(utc_time_for('8:00 PM EDT'))
      allow(hawaii_team).to receive(:eod_time_utc).and_return(utc_time_for('6:00 PM PDT'))
    end

    it 'finds teams with a team location eod time at the specified time' do
      team_locations = TeamLocation.with_eod_time_near([nyc_team, hawaii_team], utc_time_for('8:00 PM EDT'))

      expect(team_locations).to contain_exactly(nyc_team)
    end

    it 'finds teams with an eod time near (to the nearest half hour) the specified time' do
      team_locations = TeamLocation.with_eod_time_near([nyc_team, hawaii_team], utc_time_for('8:03 PM EDT'))

      expect(team_locations).to contain_exactly(nyc_team)
    end
  end

  describe '#eod_time' do
    it 'must be a valid time' do
      [nil, '', 'alskfjd', '8', '6:65 PM'].each do |invalid_time|
        team_location = FactoryGirl.build(:team_location, eod_time: invalid_time)

        expect(team_location).not_to be_valid
        expect(team_location.errors.messages[:eod_time]).to be_present
      end

      ['5:00', '5:00 PM', '5:00AM'].each do |valid_time|
        team_location = FactoryGirl.build(:team_location, eod_time: valid_time)

        expect(team_location).to be_valid
      end

    end

    it 'must be at the 30 minute or hour' do
      team_location = FactoryGirl.build(:team_location, eod_time: '7:23 PM')

      expect(team_location).not_to be_valid
      expect(team_location.errors.messages[:eod_time]).to be_present

      ['7:30 AM', '12:00 PM'].each do |eod_time|
        team_location = FactoryGirl.build(:team_location, eod_time: eod_time)

        expect(team_location).to be_valid
      end

    end

    it 'converts to utc time' do
      team_location = FactoryGirl.build(:team_location, eod_time: '5:00 PM')

      expect(team_location.eod_time_utc).to be_one_of(utc_time_for('5:00 PM EST'), utc_time_for('5:00 PM EDT'))
    end

    # TODO: Remove this behavior
    xit 'expands eod_time into multiple columns and converts to UTC upon saving' do
      team_location = FactoryGirl.create(:new_york, eod_time: '8:30 PM')

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