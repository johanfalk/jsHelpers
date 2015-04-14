(function($) { 'use strict';

Drupal.Helpers.BreakpointHandler = {
  initialized: false,
  breakpointEnter: '',
  breakpointExit: '',

  initialize: function() {
    if (Settings.activateBreakpointHandling) {
      this.initialized = true;
      this.jRespond = jRespond(Settings.breakpoints);
      this.jRespond.addFunc({
        breakpoint: '*',
        enter: function() {
          Drupal.Helpers.BreakpointHandler.enter();
        },
        exit: function() {
          Drupal.Helpers.BreakpointHandler.exit();
        },
      });
    }
  },

  enter: function() {
    this.setBreakpointMethods();
    this.callMethod(this.breakpointEnter, null);
  },

  exit: function() {
    this.callMethod(this.breakpointExit, null);
    this.setBreakpointMethods();
  },

  callMethod: function(method, param) {
    Drupal.Helpers.callMethod(method, param);
  },

  setBreakpointMethods: function() {
    var breakpoint = this.jRespond.getBreakpoint();
    this.breakpointEnter = breakpoint + 'Enter';
    this.breakpointExit = breakpoint + 'Exit';
  }
}

})(jQuery);


