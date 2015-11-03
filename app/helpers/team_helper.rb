module TeamHelper
  def locations_summary_for(team)
    team.team_locations.map do |team_location|
      "#{team_location.name}: #{team_location.eod_time} #{ActiveSupport::TimeZone.new(team_location.time_zone).tzinfo.current_period.abbreviation}"
    end.join(' | ')
  end

  EOD_HOURS = [12] + (1..11).to_a
  def eod_times
    %w(AM PM).flat_map do |ampm|
      EOD_HOURS.flat_map { |hour| ["#{hour}:00 #{ampm}", "#{hour}:30 #{ampm}"] }
    end
  end
end