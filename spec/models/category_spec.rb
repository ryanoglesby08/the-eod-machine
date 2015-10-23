require 'rails_helper'

describe Category do
  describe '.with_undelivered_entries_for_team' do
    let(:team_id_one) { 1 }
    let(:team_id_two) { 2 }

    let(:category) { Category.create(name: 'Business Stuff', team_id: team_id_one) }
    let(:another_category) { Category.create(name: 'More Things', team_id: team_id_one) }

    before do
      Category.create(name: 'Empty Category', team_id: team_id_two)

      category.entries.create(FactoryGirl.attributes_for(:entry, team_id: team_id_one))
      category.entries.create(FactoryGirl.attributes_for(:entry, team_id: team_id_one))
      another_category.entries.create(FactoryGirl.attributes_for(:entry, team_id: team_id_one))

      category.entries.create(FactoryGirl.attributes_for(:entry, team_id: team_id_two))
      category.entries.create(FactoryGirl.attributes_for(:delivered_entry, team_id: team_id_two))
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
    let(:team) { FactoryGirl.create(:team, category_names: 'The Category') }
    let(:category) { team.categories.where(name: 'The Category').first }

    let(:undelivered_entry) { category.entries.create(FactoryGirl.attributes_for(:entry, team_id: team.id)) }

    before do
      category.entries.create( FactoryGirl.attributes_for(:delivered_entry, team_id: team.id))
      FactoryGirl.create(:entry, team_id: 99)
    end

    it 'fetches undelivered entries for a team' do
      entries = category.undelivered_entries_for_team(team.id)

      expect(entries).to contain_exactly(undelivered_entry)
    end
  end

  describe 'team' do
    let(:team) { FactoryGirl.build(:team) }

    it 'is not valid when it does not have any categories' do
      team.categories = []

      is_valid = team.valid?

      expect(is_valid).to be_falsey
      expect(team.errors.messages[:categories]).to include("can't be blank")
    end

    it 'is not valid when multiple categories for the same team have the same name' do
      2.times { team.categories.build(name: 'Some Name') }

      is_valid = team.valid?

      expect(is_valid).to be_falsey
      expect(team.errors.messages[:'categories.name']).to include('has already been taken')
      team.categories.each do |category|
        expect(category.errors.messages[:name]).to include('has already been taken')
      end

    end
  end
end