module ApplicationHelper
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
