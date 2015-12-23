function TeamLocation(data, time) {
  var self = this;

  self.eodTimeSliderElementId = generateUniqueSliderId();

  self.timeZone = ko.observable(data.time_zone);
  self.eodTime = ko.observable(data.eod_time);
  self.eodTime24Hour = ko.observable(time.to24HourTime(data.eod_time));

  self.eodTime24Hour.subscribe(function(new24HourTime) {
    self.eodTime(time.to12HourTime(new24HourTime));
  });

  self.layoutSlider = function (sliderBuilder, referenceFriendlyTimeZone) {
    var hoursShift = time.hoursShiftBetween(referenceFriendlyTimeZone, self.timeZone());

    //self.eodTimeSlider
    //  .setAttribute("ticks", newTicks)
    //  .setAttribute("ticksLabels", buildLabelsFrom(newTicks))
    //  .setValue(parseFloat(self.eodTime24Hour()))
    //  .refresh();

    // Destroying and rebuilding the slider kills all the knockout bindings :(. So using cleanNode as a workaround
    // Setting attributes and refreshing does not seem to work...
    // https://github.com/seiyria/bootstrap-slider/issues/451
    var sliderElement = document.getElementById(self.eodTimeSliderElementId);
    cleanupOldSlider(sliderElement);

    self.eodTimeSlider = sliderBuilder.build(hoursShift, '#'+self.eodTimeSliderElementId, self.eodTime24Hour());
    ko.applyBindings(self, sliderElement);
  };

  function cleanupOldSlider(sliderElement) {
    if (self.eodTimeSlider) {
      self.eodTimeSlider.destroy();
    }
    ko.cleanNode(sliderElement);
  }

  function generateUniqueSliderId() {
    return 'eod_time_slider-' + Math.floor(Math.random() * 1000);
  }
}