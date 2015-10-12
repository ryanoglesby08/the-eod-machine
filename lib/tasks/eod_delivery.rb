module EodDelivery
  def self.go(now_utc)
    locations_at_eod = TeamLocation.with_eod_time_near(now_utc)

    entries = []

    locations_at_eod.each do |team_location|
      categories = Category.with_undelivered_entries_for_team(team_location.team_id)

      unless categories.empty?
        EodMailer.eod_updates(team_location, categories).deliver_now

        entries += categories.flat_map(&:entries)
      end

    end

    Entry.mark_as_delivered(entries)
  end
end