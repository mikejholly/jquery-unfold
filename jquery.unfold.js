(function($){
  $.fn.unfold = function(opts) {
    var $that = $(this);
    opts = $.extend({
      slices: Math.round($that.height() / 100),
      duration: 600,
      operation: 'open',
      easing: null,
      collapse: false
    }, opts);

    var slices = [];
    var sliceHeight = $that.height() / opts.slices;
    var $div = $('<div>').css({
      position: 'relative',
      WebkitPerspective: 600,
      MozPerspective: 600,
      WebkitPerspectiveOrigin: 'center 50%',
      MozPerspectiveOrigin: 'center 50%',
    });
    $that.wrap($div);
    var $main = $that.parent().empty();
    var ext = navigator.userAgent.match(/Safari/) ? 'webkit' : 'moz';

    for (var i = 0; i < opts.slices; i++) (function(i) {
      var even = (i % 2) == 0;

      var $slice = $('<div>').css({
        position: 'relative',
        height: 0
      });

      var origin = even ? '0px 0px' : '0px ' + sliceHeight + 'px';
      var $outer = $('<div>').css({
        overflow: 'hidden',
        position: 'absolute',
        width: $main.width(),
        height: sliceHeight,
        WebkitTransformOrigin: origin,
        MozTransformOrigin: origin
      });

      if (even) {
        $outer.css('top', 0);
      }
      else {
        $outer.css('bottom', 0)
      }

      var $inner = $('<div>').css({
        position: 'absolute',
        height: sliceHeight,
        top: -(sliceHeight * i)
      });

      var $copy = $that.clone().css({display: 'block'});
      opts.collapse && $('> *:first', $copy).css('margin-top', 0);

      $inner.append($copy);
      $outer.append($inner);
      $slice.append($outer);
      $main.append($slice);

      $outer.animate({ foo: 1 }, {
        duration: opts.duration,
        easing: opts.easing,
        step: function(v) {
          var degs = 90 - 90 * v;
          if (even) degs *= -1;

          var rads = Math.abs(90 - degs) * Math.PI / 180;
          var h = Math.sin(rads) * (sliceHeight);
          $outer.parent().css('height', h);

          var g = 200 + Math.round(56 * v);
          var rgb = [g, g, g];

          var transform = 'rotateX(' + degs + 'deg)';
          var colors = ['rgb(' + rgb.join(',') + ')', '#fff'];
          $outer.css({
            WebkitTransform: transform,
            MozTransform: transform,
            backgroundImage: '-' + ext + '-linear-gradient(top, ' + colors.join(',') + ')',
          });
        },
        complete: function() {
          $main.replaceWith($that.css('display', 'block'));
        }
      });
    })(i);

    return this;
  };
  $.fn.fold = function(opts) {
    opts.operation = 'close';
    $(this).unfold(opts);
  };
})(jQuery);