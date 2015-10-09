class SeedCategoriesForTeams < ActiveRecord::Migration
  def up
    ['Business as Usual', 'Story Movements', 'Open Questions', 'Blockers', 'Action Items', 'Other'].each do |name|
      execute <<-SQL
          INSERT INTO categories (name, created_at, updated_at, team_id)
            SELECT "#{name}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, id from teams
      SQL

      1.upto(10) do |team_id|
        execute <<-SQL
          UPDATE entries SET category_id = (
            SELECT id from categories WHERE team_id = #{team_id} AND name = "#{name}"
          )
          WHERE team_id = #{team_id}
            AND category_id = (SELECT id from categories WHERE name = "#{name}" AND team_id IS NULL)
        SQL
      end
    end

  end

  def down

  end
end
