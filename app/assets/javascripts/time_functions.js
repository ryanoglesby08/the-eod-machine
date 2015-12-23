function timeFunctions(friendlyToRealTimeZoneMap) {
  const TIME_FORMAT = 'h:mm A'; // ex: 6:15 PM

  var realTimeZoneFor = function(friendlyTimeZone) {
    return friendlyToRealTimeZoneMap[friendlyTimeZone];
  };

  var timeZoneOffsetFor = function (friendlyTimeZone) {
    var realTimeZone = realTimeZoneFor(friendlyTimeZone);
    return moment.tz.zone(realTimeZone).offset(new Date());
  };


  function momentTime(time12HourFormatted) {
    return moment(time12HourFormatted, TIME_FORMAT);
  }

  function hoursShiftBetween(startFriendlyTimeZone, endFriendlyTimeZone) {
    var startOffset = timeZoneOffsetFor(startFriendlyTimeZone);
    var endOffset = timeZoneOffsetFor(endFriendlyTimeZone);

    return (startOffset - endOffset) / 60;
  }

  function to24HourTime(time12HourFormatted) {
    var parsedTime = momentTime(time12HourFormatted);
    return parsedTime.hour() + (parsedTime.minute() / 60);
  }

  function to12HourTime(time24Hour) {
    return momentTime('12:00 AM').add(time24Hour % 24, 'hours').format(TIME_FORMAT);
  }

  return {
    hoursShiftBetween: hoursShiftBetween,
    momentTime: momentTime,
    to24HourTime: to24HourTime,
    to12HourTime: to12HourTime
  }
}