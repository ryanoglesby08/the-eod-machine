class Entry < ActiveRecord::Base
  belongs_to :team

  validates :author, presence: true
  validates :content, presence: true

  scope :undelivered, -> { where(delivered: false) }

  def has_content?
    content.present?
  end

  def self.save_all(entries)
    Entry.transaction do
      entries.each { |entry| entry.save! }
    end
  end

  def self.mark_as_delivered(entries)
    Entry.where(id: entries.map(&:id)).update_all(delivered:true)
  end
end