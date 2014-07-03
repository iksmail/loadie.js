(function( $ ) {
  var Loadie = {};

  /*
   * Generate a unique id for more than one loadie
   */
  Loadie.uid = function() {
    var newDate = new Date;
    return newDate.getTime();
  };

  /*
   * Finishes and fades the loadie out.
   */
  Loadie.finish = function(dom) {
    var loadie = $('#loadie-' + dom.data('loadie-id'), dom);
    loadie.fadeOut(200);
  }

  /*
   * Updates loadie with a float
   *
   * Loadie.update(0.2)
   * Loadie.update(1) // Finishes loadie, too
   */
  Loadie.update = function(dom, percent, animate) {
      animate = (typeof animate === "undefined") ? 0 : animate;
    var loadie = $('#loadie-' + dom.data('loadie-id'), dom);
    var parentWidth = dom.width();
    loadie.stop().animate({'width': Math.floor(percent * parentWidth)}, animate);
  }

  /*
   * Loadie.js initializer
   */
  Loadie.init = function(dom, percent) {
    var uid = this.uid();
    var loadie = dom.append($('<div id="loadie-' + uid + '" class="loadie"></div>'));
    dom.data('loadie-id', uid);
    dom.css('position', 'relative');
    this.update(dom, percent);
  }

  $.fn.loadie = function(percent, animate) {
    var percent = percent || 0;
    var parent = $(this);
      animate = (typeof animate === "undefined") ? 0 : animate;

    if(parent.data('loadie-loaded') !== 1) {
      Loadie.init(parent, percent);
    } else {
      Loadie.update(parent, percent, animate);
    }
    if(percent >= 1) {
      setTimeout(function() {
        Loadie.finish(parent);
      }, 200);
    }
    parent.data('loadie-loaded', 1);
    return this;
  };
}( jQuery ))
