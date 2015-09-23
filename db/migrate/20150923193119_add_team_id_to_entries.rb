class AddTeamIdToEntries < ActiveRecord::Migration
  def change
    change_table :entries do |t|
      t.references :team
    end
  end
end
