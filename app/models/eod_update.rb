class EodUpdate
  include ActiveModel::Model

  validates :author, presence: true

  attr_accessor :author, :entries_by_category

  def initialize(attributes = {})
    super
    @entries_by_category ||= {}
  end

  def entry_for(category_id)
    entries_by_category.fetch(category_id.to_s, Entry.new)
  end

  def save
    Entry.save_all(entries_by_category.values)
  end

  def self.build(author, content_by_category, team_id)
    entries_by_category = Hash[
      content_by_category
        .map {|category_id, attrs| [category_id, Entry.new(author: author, content: attrs[:content],
                                                           category_id: category_id, team_id: team_id)] }
        .select { |_category_id, entry| entry.has_content? }
    ]

    EodUpdate.new(author: author, entries_by_category: entries_by_category)
  end
end
