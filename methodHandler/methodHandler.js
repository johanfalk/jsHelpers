(function($) { 'use strict';

Drupal.MethodHandler = {
  resizeMethodsDefined: function() {
    var breakpoints = this.BreakpointHandler.breakpointLabels;
    for (var i in breakpoints) {
      if (this.findMethod(breakpoints[i] + 'Resize')) {
        return true;
      }
    }
  },

  findMethod: function(method) {
    for (var property in Drupal.behaviors) {
      if (property.substring(0, Drupal.settings.theme.length) !== Drupal.settings.theme) {
        continue;
      }
      if (this.isFunction(Drupal.behaviors[property][method])) {
        return true;
      }
    }
  },

  call: function(method, param) {
    param = method.param ? method.param : param;
    method = this.isObject(method) ? this.getMethodNameFromObject(method) : method;
    this.findAndCallMethod(method, param);
  },

  getMethodNameFromObject: function(method) {
    if (!this.isString(method.name)) {
      return false;
    }
    if (!method.prefix) {
      return method.name;
    }
    var prefix = method.prefix === 'breakpoint' ? this.getBreakpoint() : method.prefix;
    return prefix + method.name;
  },

  findAndCallMethod: function(method, param) {
    if (!this.isString(method)) {
      return false;
    }
    for (var property in Drupal.behaviors) {
      if (property.substring(0, Drupal.settings.theme.length) !== Drupal.settings.theme) {
        continue;
      }
      if (this.isFunction(Drupal.behaviors[property][method])) {
        if (param) {
          Drupal.behaviors[property][method](param);
        } else {
          Drupal.behaviors[property][method]();
        }
      }
    }
  },

  getBreakpoint: function() {
    if (this.BreakpointHandler.initialized) {
      return this.BreakpointHandler.jRespond.getBreakpoint();
    }
    return '';
  },

  isFunction: function(method) {
    return (typeof method === 'function');
  },

  isObject: function(object) {
    return (typeof object === 'object');
  },

  isString: function(string) {
    return (typeof string === 'string');
  },
}

})(jQuery);
