class Category < ApplicationRecord
  has_many :entries
  belongs_to :team

  validates :name, presence: true

  DEFAULTS = ['Business as Usual', 'Story Movements', 'Open Questions', 'Blockers', 'Action Items', 'Other']

  def undelivered_entries_for_team(team_id)
    self.entries.undelivered.where(team_id: team_id)
  end

  scope :with_undelivered_entries_for_team, -> (team_id) do
    includes(:entries)
      .where('entries.delivered = ?', false).where('entries.team_id = ?', team_id)
      .references(:entries)
  end
end
