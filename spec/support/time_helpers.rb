module TimeHelpers
  def utc_time_for(time)
    Time.parse(time).utc
  end
end