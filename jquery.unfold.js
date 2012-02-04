(function($){
  $.fn.unfold = function(opts) {
    var $that = $(this);
    opts = $.extend({
      slices: Math.round($that.height() / 100),
      duration: 600,
      operation: 'open',
      easing: null
    }, opts);

    var slices = [];
    var sliceHeight = $that.height() / opts.slices;
    var $div = $('<div>').css({position: 'relative'});
    $that.wrap($div);
    var $main = $that.parent().empty();
    var ext = navigator.userAgent.match(/Safari/) ? 'webkit' : 'moz';

    for (var i = 0; i < opts.slices; i++) (function(i) {
      var even = (i % 2) == 0;

      var $slice = $('<div>').css({
        position: 'relative',
        height: 0,
        WebkitPerspective: 1000,
        MozPerspective: 1000,
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

      $inner.append($copy);
      $outer.append($inner);
      $slice.append($outer);
      $main.append($slice);

      $outer.animate({ foo: 1 }, {
        duration: opts.duration,
        easing: opts.easing,
        step: function(v) {
          var degs = 90 * v;
          var rads = Math.abs(degs) * Math.PI / 180;
          var h = Math.sin(rads) * sliceHeight;
          var g = 200 + Math.round(56 * v);
          var rgb = [g, g, g];
          var transform = 'rotateX(' + (even ? '+' : '-') + (90 - degs) + 'deg)';
          var colors = ['rgb(' + rgb.join(',') + ')', '#fff'];
          if (!even) colors = colors.reverse();
          $outer.css({
            WebkitTransform: transform,
            MozTransform: transform,
            backgroundImage: '-' + ext + '-linear-gradient(top, ' + colors.join(',') + ')',
          });
          $outer.parent().css('height', h);
        },
        complete: function() {
          $main.replaceWith($that.show());
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