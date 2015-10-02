class Category < ActiveRecord::Base
  has_many :entries

  def undelivered_entries_for_team(team_id)
    self.entries.undelivered.where(team_id: team_id)
  end

  scope :with_undelivered_entries_for_team, -> (team_id) do
    includes(:entries)
      .where('entries.delivered = ?', false).where('entries.team_id = ?', team_id)
      .references(:entries)
  end
end