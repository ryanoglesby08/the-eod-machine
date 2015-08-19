class Entry < ActiveRecord::Base
  validates :author, presence: true

  scope :undelivered, -> { where(delivered: false) }
end