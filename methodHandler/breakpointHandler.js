(function($) { 'use strict';

Drupal.MethodHandler.BreakpointHandler = {
  initialized: false,
  breakpointLabels: [],
  breakpointEnter: '',
  breakpointExit: '',

  init: function() {
    this.setBreakpointLabels();
    this.jRespond = jRespond(breakpoints);
    this.jRespond.addFunc({
      breakpoint: '*',
      enter: function() {
        Drupal.MethodHandler.BreakpointHandler.enter();
      },
      exit: function() {
        Drupal.MethodHandler.BreakpointHandler.exit();
      },
    });
    this.initialized = true;
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
    Drupal.MethodHandler.findAndCallMethod(method, param);
  },

  setBreakpointLabels: function() {
    for (var i = 0; i < breakpoints.length; i++) {
      this.breakpointLabels.push(breakpoints[i].label);
    }
  },

  setBreakpointMethods: function() {
    var breakpoint = this.jRespond.getBreakpoint();
    this.breakpointEnter = breakpoint + 'Enter';
    this.breakpointExit = breakpoint + 'Exit';
  }
}

})(jQuery);


