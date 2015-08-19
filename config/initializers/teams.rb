Team = Struct.new(:to, :location, :time_zone)

TEAMS = {
  cs_wilmington: Team.new(
    '"Cobalt-CustSvc-CoreTech" <cobaltcustsvccoretech@barclaycardus.com>',
    'Wilmington',
    ActiveSupport::TimeZone.new('Eastern Time (US & Canada)')
  ),
  cs_pune: Team.new(
    '"Cobalt-CustSvc-CoreTech" <cobaltcustsvccoretech@barclaycardus.com>',
    'Pune',
    ActiveSupport::TimeZone.new('Mumbai')
  ),

  ryan: Team.new(
    '"Ryan Oglesby" <roglesby@thoughtworks.com>',
    'Pune',
    ActiveSupport::TimeZone.new('Eastern Time (US & Canada)')
  )
}