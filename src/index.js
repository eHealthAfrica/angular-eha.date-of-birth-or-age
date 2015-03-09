;(function() {

  var ngModule = angular.module('eha.date-of-birth-or-age', [
    'eha.date-of-birth-or-age.directive',
    'eha.date-of-birth-or-age.service',
    'eha.date-of-birth-or-age.template'
  ]);

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
