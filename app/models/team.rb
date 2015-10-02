class Team < ActiveRecord::Base
  has_many :team_locations
  has_many :entries

  accepts_nested_attributes_for :team_locations

  validates :name, presence: true, uniqueness: true
  validates :mailing_list, presence: true
end