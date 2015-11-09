class RemoveEodTimePartsFromTeamLocations < ActiveRecord::Migration
  def change
    change_table :team_locations do |t|
      t.remove :eod_time_hour_utc
      t.remove :eod_time_minute_utc
    end
  end
end
