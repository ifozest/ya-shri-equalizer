(function($) {

  $.fn.extend({

    setEqualizer: function(options, columnWidth) {

      var settings = {
        timeout: 1000,
        column: {
          verticalAlign: 'bottom',
          display: 'inline-block',
          fontSize: 0,
          lineHeight: 0,
          background: 'pink',
          borderTop: '2px solid red',
          width: 1
        }
      };

      if (arguments.length > 0){
        if (!$.isPlainObject(options)){
          options = {
            timeout: options,
            column: {
              width: columnWidth
            }
          }
        }

        $.extend(true, settings, options);

        if (!$.isNumeric(settings.column.width) || settings.column.width <=0){
          settings.column.width = 1;
        }
      }

      var runEqualizer = function($columns, timeout, height) {
        var previousColHeights = [], newColHeights = [];
        $columns.each(function(i) {
          previousColHeights[i] = ($(this).height());
          newColHeights[i] = Math.round(height * Math.random());
        });
        $({timer: 0}).animate({timer: 1}, {
          duration: timeout,
          easing: 'linear',
          step: function(now) {
            $columns.each(function(i) {
              var pColHeight = previousColHeights[i]
                , colHeight = pColHeight + (newColHeights[i] - pColHeight) * now;
              $(this).height(colHeight);
            });
          },
          complete: function() {
            runEqualizer($columns, timeout, height);
          }
        });
      };

      return this.each(function() {
        var $this = $(this)
          , height = $this.height()
          , colQuantity
          , $columns = $();

        $this.css({
          verticalAlign: 'bottom',
          lineHeight: height + 'px'
        });

        // Кол-во столбиков
        colQuantity = Math.ceil($this.width() / settings.column.width);

        for (var i = 0; i < colQuantity; i++) {
          $columns = $columns.add('<span/>', {css: settings.column});
        }
        $this.append($columns);
        runEqualizer($columns, settings.timeout, height);
      });
    }
  });
}(jQuery));