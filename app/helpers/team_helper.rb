module TeamHelper
  def locations_summary_for(team)
    team.team_locations.map do |team_location|
      "#{team_location.name}: #{team_location.eod_time} #{ActiveSupport::TimeZone.new(team_location.time_zone).tzinfo.current_period.abbreviation}"
    end.join(' | ')
  end
end