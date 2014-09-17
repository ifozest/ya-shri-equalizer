$(function () {

  var runEqualizer = function ($columns, timeout, height) {
    var previousColHeights = []
      , newColHeights = [];
    $columns.each(function (i) {
      previousColHeights[i] = ($(this).height());
      newColHeights[i] = (Math.round(height * Math.random()));
    });
    $({timer: 0}).animate({timer: 1}, {
      duration: timeout,
      easing: 'linear',
      step: function (now) {
        $columns.each(function (i) {
          var colHeight = previousColHeights[i] + (newColHeights[i] - previousColHeights[i]) * now;
          $(this).height(colHeight);
        });
      },
      complete: function () {
        runEqualizer($columns, timeout, height);
      }
    });
  };

  var setEqualizer = function (selector, timeout, colWidth) {
    var $selector = $(selector)
      , height = $selector.height()
      , colQuantity
      , $columns;

    if (!colWidth) {
      colWidth = 1;
    }

    $selector.css({
      verticalAlign: 'bottom',
      lineHeight: height + 'px'
    });

    // Кол-во столбиков
    colQuantity = Math.ceil($selector.width() / colWidth);

    for (var i = 0; i < colQuantity; i++) {
      $('<span/>').appendTo($selector).addClass('equalizer-span').width(colWidth);
    }
    $columns = $selector.find('span');
    runEqualizer($columns, timeout, height);
  };

  setEqualizer('#eq_1 .equalizer', 1000, 2);
  setEqualizer('#eq_2 .equalizer', 1000, 2);
  setEqualizer('#eq_3 .equalizer', 1000, 2);

});

