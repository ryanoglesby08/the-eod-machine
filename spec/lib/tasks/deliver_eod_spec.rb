require 'rails_helper'
require 'tasks/eod_delivery'

describe EodDelivery do
  before do
    ActionMailer::Base.deliveries.clear
  end

  describe '#go' do
    let(:team) { FactoryGirl.create(:team, mailing_list: 'eod_list@theteam.test', category_names: 'Normal Business') }
    let(:other_team) { FactoryGirl.create(:team, category_names: 'Story Updates') }

    before do
      ######## Create other team and entries ##############

      FactoryGirl.create(:team_location, team: other_team, eod_time: '9:00 PM')

      story_updates = other_team.categories.where(name: 'Story Updates').first
      story_updates.entries.create(FactoryGirl.attributes_for(:entry,           team: other_team))
      story_updates.entries.create(FactoryGirl.attributes_for(:delivered_entry, team: other_team))

      ######## Create team and entries for eod update ##############

      FactoryGirl.create(:new_york, team: team, eod_time: '8:00 PM')

      normal_business = team.categories.where(name: 'Normal Business').first
      normal_business.entries.create(FactoryGirl.attributes_for(:entry,           team: team))
      normal_business.entries.create(FactoryGirl.attributes_for(:entry,           team: team))
      normal_business.entries.create(FactoryGirl.attributes_for(:delivered_entry, team: team))
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

      context 'when there are no undelivered entries' do
        before do
          Entry.mark_as_delivered(team.entries)
        end

        it 'does not deliver an eod email' do
          EodDelivery.go(now_utc)

          expect(ActionMailer::Base.deliveries).to be_empty
        end

      end

    end

  end

end