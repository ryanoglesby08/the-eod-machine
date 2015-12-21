json.array!(team_locations) do |team_location|
  json.extract! team_location, :id, :name, :time_zone, :eod_time
end