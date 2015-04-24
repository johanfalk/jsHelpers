(function($) { 'use strict';

$(document).ready(function() {
  Drupal.MethodHandler.call('documentReady');
  Drupal.MethodHandler.BreakpointHandler.init();

  if (Drupal.MethodHandler.resizeMethodsDefined()) {
    $(window).on('resize', function(theWindow) {
      Drupal.MethodHandler.call({
        name: 'Resize',
        prefix: 'breakpoint'
      });
    });
  }
});

})(jQuery);
