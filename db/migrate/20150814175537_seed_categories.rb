class SeedCategories < ActiveRecord::Migration
  def up
    execute <<-SQL
      INSERT INTO categories (name, created_at, updated_at) VALUES
                             ('Business as Usual', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                             ('Story Movements', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                             ('Open Questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                             ('Blockers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                             ('Action Items', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                             ('Other', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    SQL
  end

  def down

  end
end
