class Entry < ActiveRecord::Base
  validates :author, presence: true

  scope :undelivered, -> { where(delivered: false) }

  def self.save_eod_update(eod_update)
    Entry.transaction do
      eod_update.content_by_category.each do |category_id, content|
        entry = Entry.new(author: eod_update.author, content: content, category_id: category_id)
        return false unless entry.save
      end

    end

    return true
  end
end