$(function() {

  var setEqualizer = function(selector, timeout, colWidth) {
    var $selector = $(selector);
    if (!colWidth) {
      colWidth = 1;
    }

    $selector.css({
      verticalAlign: 'bottom',
      lineHeight: $selector.height() + 'px'
    });

    // Кол-во столбиков
    var colQuantity = Math.ceil($selector.width() / colWidth);
    //var cols = new Array(colQuantity);
    for (var i = 0; i < colQuantity; i++) {
      $('<span/>').appendTo($selector).addClass('equalizer-span').width(colWidth);
    }
    runEqualizer($selector, timeout);
  };

  var processColumn = function($element, timeout, height) {
    var colHeight = Math.round(height * Math.random());
    $element.height(colHeight).animate(
      {height: height / 2},
      timeout,
      'linear',
      function() {
        processColumn($element, timeout, height);
      });
  };

  var runEqualizer = function($selector, timeout) {
    var height = $selector.height();
    $selector.find('span').each(function(i, element) {
      processColumn($(element), timeout, height);
    });
  };


  setEqualizer('#eq_1 .equalizer', 2000, 2);
  setEqualizer('#eq_2 .equalizer', 2000, 2);
  setEqualizer('#eq_3 .equalizer', 2000, 2);

});
