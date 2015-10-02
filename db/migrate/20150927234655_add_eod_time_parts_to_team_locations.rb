class AddEodTimePartsToTeamLocations < ActiveRecord::Migration
  def change
    change_table :team_locations do |t|
      t.integer :eod_time_hour_utc
      t.integer :eod_time_minute_utc
    end
  end
end
