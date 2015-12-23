//= require moment
//= require moment-timezone-with-data.min
//= require time_functions

describe('Time Functions', function () {
  var time;

  beforeEach(function () {
    var friendlyToRealTimeZoneMap = {
      'Pacific Time': 'America/Los_Angeles',
      'Central Time': 'America/Chicago',
      'Eastern Time': 'America/New_York'
    };

    time = timeFunctions(friendlyToRealTimeZoneMap);
  });

  describe('#hoursShiftBetween', function () {
    it('calculates the difference in hours from the start time zone to the end time zone', function () {
      var hoursShift = time.hoursShiftBetween('Pacific Time', 'Eastern Time');
      expect(hoursShift).to.equal(3);

      hoursShift = time.hoursShiftBetween('Eastern Time', 'Pacific Time');
      expect(hoursShift).to.equal(-3);
    });
  });

  describe('#momentTime', function () {
    it('builds a moment time object from the formatted time string', function () {
      var momentTimeObject = time.momentTime('3:30 PM');

      expect(momentTimeObject.hour()).to.equal(15);
      expect(momentTimeObject.minute()).to.equal(30);
    });
  });

  describe('#to24HourTime', function () {
    it('converts a 12 hour formatted time into 24 hour time', function () {
      [['12:00 AM', 0], ['8:30 AM', 8.5], ['12:00 PM', 12], ['10:45 PM', 22.75]].forEach(function (times) {
        var time12HourFormatted = times[0];
        var time24Hour = times[1];

        expect(time.to24HourTime(time12HourFormatted)).to.equal(time24Hour);
      });
    });
  });

  describe('#to12HourTime', function () {
    it('converts a 24 hour time into 12 hour formatted time', function () {
      [['12:00 AM', 0], ['8:30 AM', 8.5], ['12:00 PM', 12], ['10:45 PM', 22.75]].forEach(function (times) {
        var time12HourFormatted = times[0];
        var time24Hour = times[1];

        expect(time.to12HourTime(time24Hour)).to.equal(time12HourFormatted);
      });
    });
  });
});