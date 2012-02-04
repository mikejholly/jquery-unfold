(function($){
  $.fn.unfold = function(opts) {
    opts = $.extend({
      slices: 5
    }, opts);

    var $that = $(this);
    var slices = [];
    var sliceHeight = $that.height() / opts.slices;
    var $div = $('<div>').css({position: 'relative'});
    $that.wrap($div);
    var $main = $that.parent().empty();

    for (var i = 0; i < opts.slices; i++) (function(i) {
      var even = (i % 2) == 0;

      var $slice = $('<div>').css({
        position: 'relative',
        height: 0,
        webkitPerspective: 1000,
      });

      var $outer = $('<div>').css({
        overflow: 'hidden',
        position: 'absolute',
        width: $main.width(),
        height: sliceHeight,
        border: '1px solid blue',
        WebkitTransformOrigin: even ? '0px 0px' : '0px ' + sliceHeight + 'px'
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
      });

      var $copy = $that.clone();

      $inner.append($copy);
      $outer.append($inner);
      $slice.append($outer);
      $main.append($slice);

      $outer.animate({ foo: 1 }, {
        duration: 400,
        step: function(v) {
          var degs = 90 * v;
          var rads = Math.abs(degs) * Math.PI / 180;
          var h = Math.sin(rads) * sliceHeight;
          var g = 200 + Math.round(56 * v);
          var rgb = [g, g, g];

          $outer.css({
            WebkitTransform: 'rotateX(' + (even ? '+' : '-') + (90 - degs) + 'deg)',
            background: '-webkit-gradient(linear, 0 0, 0 60%, from(rgb(' + rgb.join(',') + ')), to(#fff))'
          });

          $outer.parent().css('height', h);
        },
      });
    })(i);

    return this;
  };
})(jQuery);