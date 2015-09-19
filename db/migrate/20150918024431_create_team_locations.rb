class CreateTeamLocations < ActiveRecord::Migration
  def change
    create_table :team_locations do |t|
      t.string :name
      t.string :time_zone
      t.string :eod_time
      t.references :team
    end
  end
end
