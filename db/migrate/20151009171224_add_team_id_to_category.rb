class AddTeamIdToCategory < ActiveRecord::Migration
  def change
    change_table :categories do |t|
      t.references :team
    end
  end
end
