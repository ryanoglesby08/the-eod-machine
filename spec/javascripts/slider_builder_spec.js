//= require jquery
//= require bootstrap-slider.min
//= require moment
//= require time_functions
//= require slider_builder

describe('Slider Builder', function () {
  var time = timeFunctions({});

  beforeEach(function() {
    $('body').append("<div id='slider_container'></div>");
  });

  it('builds a slider', function () {
    var sliderBuilder = new SliderBuilder(time, [17, 17.5, 18, 18.5, 19]);

    var slider = sliderBuilder.build(-2, '#slider_container', '17');

    expect(slider.getValue()).to.equal(17);
    expect(slider.getAttribute('ticks')).to.eql([15, 15.5, 16, 16.5, 17]);
    expect(slider.getAttribute('ticks_labels')).to.eql(['3:00 PM', '', '4:00 PM', '', '5:00 PM']);
  });

  it('wraps ticks labels', function() {
    var sliderBuilder = new SliderBuilder(time, [22.5, 23, 23.5]);

    var slider = sliderBuilder.build(5, '#slider_container', '3');

    expect(slider.getValue()).to.equal(27.5);
    expect(slider.getAttribute('ticks')).to.eql([27.5, 28, 28.5]);
    expect(slider.getAttribute('ticks_labels')).to.eql(['', '4:00 AM', '']);
  });
});