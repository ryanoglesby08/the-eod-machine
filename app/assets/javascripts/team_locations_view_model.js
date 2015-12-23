function TeamLocationsViewModel(rawTeamLocations, time, sliderBuilder) {
  var self = this;

  self.teamLocations = initializeTeamLocationsFrom(rawTeamLocations);

  self.timeZoneChanged = function () {
    var firstTeamLocationFriendlyTimeZone = self.teamLocations[0].timeZone();

    self.teamLocations.forEach(function(teamLocation) {
      teamLocation.layoutSlider(sliderBuilder, firstTeamLocationFriendlyTimeZone);
    });
  };

  function initializeTeamLocationsFrom(rawTeamLocations) {
    return rawTeamLocations.map(function (teamLocation) { return new TeamLocation(teamLocation, time); });
  }
}