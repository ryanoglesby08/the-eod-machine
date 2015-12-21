function TeamLocation(data, index, ticks) {
  var self = this;

  self.id = data.id;
  self.timeZone = ko.observable(data.time_zone);
  self.eodTime = ko.observable(data.eod_time);
  self.eodTime24Hour = ko.observable(to24Hour(data.eod_time));

  self.eodTime24Hour.subscribe(function(new24HourTime) {
    self.eodTime(to12HourTime(new24HourTime));
  });

  self.eodTimeSlider = buildSlider(ticks);

  self.layoutSlider = function(firstOffset, timeZones, ticks) {
    var momentTimeZone = timeZones[self.timeZone()];
    var offset = moment.tz.zone(momentTimeZone).offset(new Date());

    var hoursFromFirstLocation = (firstOffset - offset) / 60;

    var newTicks = ticks.map(function(tick) { return tick + hoursFromFirstLocation; });

    //self.eodTimeSlider
    //  .setAttribute("ticks", newTicks)
    //  .setAttribute("ticksLabels", buildLabelsFrom(newTicks))
    //  .setValue(parseFloat(self.eodTime24Hour()))
    //  .refresh();

    // Destroying and rebuilding the slider kills all the knockout bindings :(. So using cleanNode as a workaround
    // Setting attributes and refreshing does not seem to work...
    // https://github.com/seiyria/bootstrap-slider/issues/451
    var sliderElement = document.getElementById("eod_time_slider-" + index);

    self.eodTimeSlider.destroy();
    ko.cleanNode(sliderElement);

    self.eodTimeSlider = buildSlider(newTicks);
    ko.applyBindings(self, sliderElement);
  };

  function to24Hour(time) {
    var parsedTime = momentTime(time);

    return parsedTime.hour() + (parsedTime.minute() / 60);
  }

  function to12HourTime(tick) {
    return momentTime('12:00 AM').add(tick % 24, 'hours').format('h:mm A');
  }

  function buildSlider(ticks) {
    return new Slider("input#eod_time_slider-" + index, {
      value: parseFloat(self.eodTime24Hour()),
      step: 0.5,
      ticks: ticks,
      ticks_labels: buildLabelsFrom(ticks),
      tooltip: "hide"
    });
  }

  // time is in format like '6:00 PM'
  function momentTime(time) {
    return moment(time, 'h:mm A')
  }

  function buildLabelsFrom(ticks) {
    var replace30MinutesWithBlanks = function(time) {
      return momentTime(time).minute() === 0 ? time : "";
    };

    return ticks
      .map(to12HourTime)
      .map(replace30MinutesWithBlanks);
  }
}