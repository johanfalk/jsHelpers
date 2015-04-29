(function($) { 'use strict';

Drupal.BreakpointHandler = {
  breakpointLabels: [],
  breakpointEnter: '',
  breakpointExit: '',

  init: function() {
    this.setBreakpointLabels();
    this.jRespond = jRespond(Settings.breakpoints);
    this.jRespond.addFunc({
      breakpoint: '*',
      enter: function() {
        Drupal.BreakpointHandler.enter();
      },
      exit: function() {
        Drupal.BreakpointHandler.exit();
      },
    });
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
    for (var i = 0; i < Settings.breakpoints.length; i++) {
      this.breakpointLabels.push(Settings.breakpoints[i].label);
    }
  },

  setBreakpointMethods: function() {
    var breakpoint = this.getBreakpoint();
    this.breakpointEnter = breakpoint + 'Enter';
    this.breakpointExit = breakpoint + 'Exit';
  },

  getBreakpoint: function() {
    return this.jRespond.getBreakpoint();
  }
}

Drupal.MethodHandler = {
  resizeMethodsDefined: function() {
    var breakpoints = Drupal.BreakpointHandler.breakpointLabels;
    for (var i in breakpoints) {
      if (this.findMethod(breakpoints[i] + 'Resize')) {
        return true;
      }
    }
  },

  findMethod: function(method) {
    for (var property in Drupal.behaviors) {
      if (property.substring(0, Settings.theme.length) !== Settings.theme) {
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
    var prefix = method.prefix === 'breakpoint' ? Drupal.BreakpointHandler.getBreakpoint() : method.prefix;
    return prefix + method.name;
  },

  findAndCallMethod: function(method, param) {
    if (!this.isString(method)) {
      return false;
    }
    for (var property in Drupal.behaviors) {
      if (property.substring(0, Settings.theme.length) !== Settings.theme) {
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

$(document).ready(function() {
  if (!Settings.theme) {
    console.error('BreakpointHandler: Settings.theme is undefined');
  }
  if (!Settings.breakpoints) {
    console.error('BreakpointHandler: Settings.breakpoints is undefined');
  }

  Drupal.BreakpointHandler.init();
  if (Drupal.MethodHandler.resizeMethodsDefined()) {
    var theWindow = $(window);
    theWindow.on('resize', function(theWindow) {
      Drupal.MethodHandler.call({
        name: 'Resize',
        prefix: 'breakpoint'
      });
    });
  }
});

})(jQuery);
