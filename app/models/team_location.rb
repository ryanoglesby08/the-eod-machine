class TeamLocation < ActiveRecord::Base
  belongs_to :team

  validates :name, presence: true
  validates :time_zone, presence: true
  validate :eod_time_must_be_valid_time

  before_save :expand_eod_time

  scope :with_eod_time_near, -> (utc_time) do
    # Can probably do better rounding here with a time rounding gem
    minute_rounded_to_nearest_half_hour = ((utc_time.min.to_f / 30.to_f).round * 30) % 60

    where(eod_time_hour_utc: utc_time.hour, eod_time_minute_utc: minute_rounded_to_nearest_half_hour).includes(:team)
  end

  private

    def eod_time_must_be_valid_time
      Time.parse(eod_time.to_s)
    rescue ArgumentError
      errors.add(:eod_time, 'must be a valid time')
    end

    def expand_eod_time
      utc_time = ActiveSupport::TimeZone.new(time_zone).parse(eod_time).utc

      self.eod_time_hour_utc = utc_time.hour
      self.eod_time_minute_utc = utc_time.min
    end
end