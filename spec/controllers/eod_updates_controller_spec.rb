require 'rails_helper'

describe EodUpdatesController do
  def select_team(team_id)
    controller.current_team_id = team_id
  end

  describe '#create' do
    before do
      select_team('10')
    end

    it 'creates an eod update with multiple entries' do
      expect {
        post :create, eod_update: {author: 'Ryan',
                                   team_id: '10',
                                   entries: {
                                     '1' => {content: 'I have an update'},
                                     '3' => {content: 'Something else'}
                                   }}
      }.to change{ Entry.count }.by(2)

      entry = Entry.first
      expect(entry.author).to eq('Ryan')
      expect(entry.content).to eq('I have an update')
      expect(entry.category_id).to eq(1)
      expect(entry.team_id).to eq(10)

      entry = Entry.second
      expect(entry.author).to eq('Ryan')
      expect(entry.content).to eq('Something else')
      expect(entry.category_id).to eq(3)
      expect(entry.team_id).to eq(10)
    end
  end
end