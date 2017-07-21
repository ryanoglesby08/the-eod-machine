require 'rails_helper'

describe EodUpdatesController do
  def select_team(team_id)
    controller.current_team_id = team_id
  end

  describe '#create' do
    before do
      FactoryGirl.create(:team, id: 10)
      select_team('10')
    end

    it 'creates an eod update with multiple entries' do
      expect {
        post :create, params: {
                        eod_update: {
                          author: 'Ryan',
                          team_id: '10',
                          entries: {
                            '1' => [{content: 'I have an update'}, {content: 'And another one'}],
                            '3' => [{content: 'Something else'}],
                            '6' => [{content: ''}]
                          }
                        }
                      }
      }.to change{ Entry.count }.by(3)

      entries = Entry.all

      entry = entries.first
      expect(entry.author).to eq('Ryan')
      expect(entry.content).to eq('I have an update')
      expect(entry.category_id).to eq(1)
      expect(entry.team_id).to eq(10)

      entry = entries.second
      expect(entry.author).to eq('Ryan')
      expect(entry.content).to eq('And another one')
      expect(entry.category_id).to eq(1)
      expect(entry.team_id).to eq(10)

      entry = entries.third
      expect(entry.author).to eq('Ryan')
      expect(entry.content).to eq('Something else')
      expect(entry.category_id).to eq(3)
      expect(entry.team_id).to eq(10)
    end
  end
end
