class SeedCategories < ActiveRecord::Migration
  def up
    execute <<-SQL
      INSERT INTO categories (name, created_at, updated_at) VALUES ('Business as Usual', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      INSERT INTO categories (name, created_at, updated_at) VALUES ('Story Movements', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      INSERT INTO categories (name, created_at, updated_at) VALUES ('Open Questions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      INSERT INTO categories (name, created_at, updated_at) VALUES ('Blockers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      INSERT INTO categories (name, created_at, updated_at) VALUES ('Action Items', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      INSERT INTO categories (name, created_at, updated_at) VALUES ('Other', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    SQL
  end

  def down

  end
end
