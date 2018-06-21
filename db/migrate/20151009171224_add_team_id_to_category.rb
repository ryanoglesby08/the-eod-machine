class AddTeamIdToCategory < ActiveRecord::Migration[5.2]
  def change
    change_table :categories do |t|
      t.references :team
    end
  end
end
