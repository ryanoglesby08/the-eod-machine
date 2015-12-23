function SliderBuilder(time, ticks) {
  var buildLabelsFrom = function (ticks) {
    var replace30MinutesWithBlanks = function (time12HourFormatted) {
      return time.momentTime(time12HourFormatted).minute() === 0 ? time12HourFormatted : "";
    };

    return ticks
      .map(time.to12HourTime)
      .map(replace30MinutesWithBlanks);
  };

  var shiftTicks = function (hoursShift) {
    return ticks.map(function (tick) { return tick + hoursShift; });
  };


  function build(hoursShift, elementSelector, value) {
    var shiftedTicks = shiftTicks(hoursShift);

    return new Slider(elementSelector, {
      value: parseFloat(value),
      step: 0.5,
      ticks: shiftedTicks,
      ticks_labels: buildLabelsFrom(shiftedTicks),
      tooltip: 'hide'
    });
  }

  return {
    build: build
  }
}