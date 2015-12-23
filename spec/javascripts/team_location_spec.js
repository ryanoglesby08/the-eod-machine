//= require jquery
//= require knockout
//= require moment
//= require time_functions
//= require team_location

describe('Team Locations', function () {
  var time = timeFunctions({});

  function team_location_data(overrides) {
    overrides = (overrides === undefined) ? {} : overrides;

    return $.extend({
      time_zone: 'Central Time (US & Canada)',
      eod_time: '6:00 PM'
    }, overrides);
  }

  it('converts eod time between 24 hour time and formatted time', function () {
    [['2:00 PM', 14], ['12:00 AM', 0], ['8:30 AM', 8.5]].forEach(function (times) {
      var eod_time_formatted = times[0];
      var eod_time_24_hour = times[1];

      var data = team_location_data({eod_time: eod_time_formatted});

      var team_location = new TeamLocation(data, time);

      expect(team_location.eodTime()).to.equal(eod_time_formatted);
      expect(team_location.eodTime24Hour()).to.equal(eod_time_24_hour);
    });
  });

  it('keeps the eod time up to date with the 24 hour time', function () {
    var data = team_location_data({eod_time: '4:30 PM'});

    var team_location = new TeamLocation(data, time);

    expect(team_location.eodTime()).to.equal('4:30 PM');
    expect(team_location.eodTime24Hour()).to.equal(16.5);

    team_location.eodTime24Hour(23.5);

    expect(team_location.eodTime()).to.equal('11:30 PM');
  });
});