require 'rails_helper'
require 'tasks/eod_delivery'

describe EodDelivery do
  before do
    ActionMailer::Base.deliveries.clear
  end

  describe '#go' do
    let(:team) { Team.create(name: 'The Team', mailing_list: 'eod_list@theteam.test') }
    let(:other_team) { Team.create(name: 'The Other Team', mailing_list: 'eod_list@theotherteam.test') }

    before do
      story_updates = Category.create(name: 'Story Updates')

      ######## Create other team and entries ##############

      other_team.team_locations.create(name: 'Other East Coast', time_zone: 'Eastern Time (US & Canada)', eod_time: '9:00 PM')

      story_updates.entries.create(author: 'Sarah', content: '#22 is ready for testing',      team_id: other_team.id)
      story_updates.entries.create(author: 'Jim',   content: '#11 still needs more analysis', team_id: other_team.id, delivered: true)

      ######## Create team and entries for eod update ##############

      team.team_locations.create(name: 'East Coast', time_zone: 'Eastern Time (US & Canada)', eod_time: '8:00 PM')

      story_updates.entries.create(author: 'Jack',  content: 'Story 123 is ready for testing',  team_id: team.id)
      story_updates.entries.create(author: 'Jill',  content: 'Story 456 is blocked',            team_id: team.id)
      story_updates.entries.create(author: 'Amy',   content: 'Story 123 is ready for dev',      team_id: team.id, delivered: true)
    end

    context 'for the 8:00 PM team location' do
      let(:now_utc) { Time.parse('8:00 PM EDT').utc }

      it 'delivers an eod email to the team' do
        EodDelivery.go(now_utc)

        expect(ActionMailer::Base.deliveries).to have(1).email
        expect(ActionMailer::Base.deliveries.last.to).to eq(['eod_list@theteam.test'])
      end

      it 'marks all the teams entries as delivered' do
        EodDelivery.go(now_utc)

        expect(team.entries.undelivered).to be_empty
        expect(other_team.entries.undelivered).to have(1).entry
      end

    end

  end

end