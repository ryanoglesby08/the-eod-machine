class EodUpdate
  include ActiveModel::Model

  validates :author, presence: true

  attr_accessor :author, :entries

  def entries_by_category
    entries.group_by(&:category_id)
  end

  def save
    Entry.save_all(entries.select { |entry| entry.has_content? })
  end

  def self.build(author, content_by_category, team_id)
    entries = content_by_category.flat_map do |category_id, attributes_array|
      attributes_array.map { |attrs| Entry.new(author: author, content: attrs['content'], category_id: category_id, team_id: team_id) }
    end

    EodUpdate.new(author: author, entries: entries)
  end
end
