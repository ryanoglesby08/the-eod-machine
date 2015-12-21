function TeamLocationsViewModel(rawTeamLocations, timeZones, ticks) {
  var self = this;

  self.teamLocations = initializeTeamLocationsFrom(rawTeamLocations);

  self.timeZoneChanged = function () {
    var firstFriendlyTimeZone = self.teamLocations[0].timeZone();
    var firstMomentTimeZone = timeZones[firstFriendlyTimeZone];

    var firstOffset = moment.tz.zone(firstMomentTimeZone).offset(new Date());

    self.teamLocations.forEach(function(teamLocation) {
      teamLocation.layoutSlider(firstOffset, timeZones, ticks);
    });
  };

  function initializeTeamLocationsFrom(rawTeamLocations) {
    return rawTeamLocations.map(function (teamLocation, index) { return new TeamLocation(teamLocation, index, ticks); });
  }
}