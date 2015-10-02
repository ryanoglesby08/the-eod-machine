require 'rails_helper'

describe Category do
  describe '.with_undelivered_entries_for_team' do
    let(:team_id_one) { 1 }
    let(:team_id_two) { 2 }

    let(:category) { Category.create(name: 'Business Stuff') }
    let(:another_category) { Category.create(name: 'More Things') }

    before do
      Category.create(name: 'Empty Category')

      category.entries.create(author: 'Brad', content: 'Stuff happened', team_id: team_id_one)
      another_category.entries.create(author: 'Angela', content: 'Something else is going on', team_id: team_id_one)

      category.entries.create(author: 'Amanda', content: 'I did this today', team_id: team_id_two)
      category.entries.create(author: 'Kevin', content: 'Yesterdays update', team_id: team_id_two, delivered: true)
    end

    it 'scopes categories with entries by team' do
      team_one_categories = Category.with_undelivered_entries_for_team(team_id_one)
      expect(team_one_categories).to contain_exactly(category, another_category)

      team_two_categories = Category.with_undelivered_entries_for_team(team_id_two)
      expect(team_two_categories).to contain_exactly(category)
    end

    it 'does not include delivered entries' do
      categories = Category.with_undelivered_entries_for_team(team_id_two)

      expect(categories.first.entries).to have(1).entry
    end
  end

  describe '#undelivered_entries_for_team' do
    let(:category) { Category.create(name: 'The Category') }
    let(:team) { Team.create(name: 'The Team', mailing_list: 'eod@theteam.text') }

    let(:undelivered_entry) { category.entries.create(author: 'Sarah', content: '#22 is ready for testing', team_id: team.id) }

    before do
      category.entries.create(author: 'Jim',   content: '#11 still needs more analysis', team_id: team.id, delivered: true)
      Entry.create(author: 'Greg',   content: 'Some other story', team_id: 99)
    end

    it 'fetches undelivered entries for a team' do
      entries = category.undelivered_entries_for_team(team.id)

      expect(entries).to contain_exactly(undelivered_entry)
    end
  end
end