class AddTeamIdToEntries < ActiveRecord::Migration[5.2]
  def change
    change_table :entries do |t|
      t.references :team
    end
  end
end
