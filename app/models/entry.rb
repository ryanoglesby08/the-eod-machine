class Entry < ActiveRecord::Base
  validates :author, presence: true

  scope :undelivered, -> { where(delivered: false) }

  def has_content?
    content.present?
  end

  def self.save_all(entries)
    Entry.transaction do
      entries.each { |entry| entry.save }
    end
  end
end