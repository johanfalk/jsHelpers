(function($) { 'use strict';

Drupal.Helpers = {
  initialize: function() {
    this.BreakpointHandler.initialize();
  },

  callMethod: function(method, param) {
    for (var property in Drupal.behaviors) {
      if (!Drupal.behaviors[property].invokeMethods) {
        continue;
      }
      if (this.functionExist(Drupal.behaviors[property][method])) {
        if (param) {
          Drupal.behaviors[property][method](param);
        } else {
          Drupal.behaviors[property][method]();
        }
      }
    }
  },

  callMethodWithBreakpointPrefix: function(method, param) {
    if (this.BreakpointHandler.initialized && method) {
      this.callMethod(this.getBreakpoint() + method, param);
    }
  },

  getBreakpoint: function() {
    if (this.BreakpointHandler.initialized) {
      return this.BreakpointHandler.jRespond.getBreakpoint();
    }
    return false;
  },

  functionExist: function(method) {
    return (typeof method === 'function');
  },
}

})(jQuery);
