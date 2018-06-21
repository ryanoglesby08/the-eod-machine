class SeedCategories < ActiveRecord::Migration[5.2]
  def up
    ['Business as Usual', 'Story Movements', 'Open Questions', 'Blockers', 'Action Items', 'Other'].each do |name|
      execute <<-SQL
        INSERT INTO categories (name, created_at, updated_at) VALUES ("#{name}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      SQL
    end
  end

  def down

  end
end
