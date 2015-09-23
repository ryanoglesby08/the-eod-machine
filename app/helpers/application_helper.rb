module ApplicationHelper
  def brand_for(current_team)
    current_team.present? ? "EOD Machine | #{@current_team.name}" : 'EOD Machine'
  end

  def entry_with_author(entry)
    "#{entry.content} (#{entry.author})"
  end

  def today_short(time_zone)
    time_zone.now.strftime('%b %d')
  end

  def today_long(time_zone)
    time_zone.now.strftime('%b %d, %Y')
  end
end
