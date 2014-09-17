$(function () {

  var runEqualizer = function ($selector, timeout) {
    var height = $selector.height()
      , previousColHeights = []
      , newColHeights = []
      , $spans = $selector.find('span');
    $spans.each(function (i) {
      previousColHeights[i] = ($(this).height());
      newColHeights[i] = (Math.round(height * Math.random()));
    });
    $({timer: 0}).animate({timer: 1}, {
      duration: timeout,
      easing: 'linear',
      step: function (now) {
        $spans.each(function (i) {
          var colHeight = previousColHeights[i] + (newColHeights[i] - previousColHeights[i]) * now;
          $(this).height(colHeight);
        });
      },
      complete: function () {
        runEqualizer($selector, timeout);
      }
    });
  };

  var setEqualizer = function (selector, timeout, colWidth) {
    var $selector = $(selector), colQuantity;

    if (!colWidth) {
      colWidth = 1;
    }

    $selector.css({
      verticalAlign: 'bottom',
      lineHeight: $selector.height() + 'px'
    });

    // Кол-во столбиков
    colQuantity = Math.ceil($selector.width() / colWidth);

    for (var i = 0; i < colQuantity; i++) {
      $('<span/>').appendTo($selector).addClass('equalizer-span').width(colWidth);
    }
    runEqualizer($selector, timeout);
  };

  setEqualizer('#eq_1 .equalizer', 1000, 2);
  setEqualizer('#eq_2 .equalizer', 1000, 2);
  setEqualizer('#eq_3 .equalizer', 1000, 2);

});

