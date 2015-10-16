class Team < ActiveRecord::Base
  has_many :team_locations
  has_many :entries
  has_many :categories

  accepts_nested_attributes_for :team_locations, :categories

  validates :name, presence: true, uniqueness: true
  validates :mailing_list, presence: true

  def self.build_with_defaults(number_of_locations, category_names)
    Team.new.tap do |team|
      number_of_locations.times { team.team_locations.build }
      team.categories = category_names.map { |name| Category.new(name: name) }
    end
  end
end