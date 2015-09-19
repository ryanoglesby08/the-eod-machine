OldTeam = Struct.new(:to, :location, :time_zone)

TEAMS = {
  cs_wilmington: OldTeam.new(
    '"Cobalt-CustSvc-CoreTech" <cobaltcustsvccoretech@barclaycardus.com>',
    'Wilmington',
    ActiveSupport::TimeZone.new('Eastern Time (US & Canada)')
  ),
  cs_pune: OldTeam.new(
    '"Cobalt-CustSvc-CoreTech" <cobaltcustsvccoretech@barclaycardus.com>',
    'Pune',
    ActiveSupport::TimeZone.new('Mumbai')
  ),

  ryan: OldTeam.new(
    '"Ryan Oglesby" <roglesby@thoughtworks.com>',
    'Pune',
    ActiveSupport::TimeZone.new('Eastern Time (US & Canada)')
  )
}