class TeamLocation < ActiveRecord::Base
  belongs_to :team

  validates :name, presence: true
  validates :time_zone, presence: true
  validates :eod_time, presence: true
end