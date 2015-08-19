class Category < ActiveRecord::Base
  has_many :entries

  def undelivered_entries
    self.entries.undelivered
  end

  def self.with_undelivered_entries
    Category.includes(:entries).where('entries.delivered = ?', false).references(:entries)
  end
end