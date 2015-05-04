;(function() {
  'use strict';
  /**
   * @ngdoc directive
   * @name ehaDateOfBirthOrAge
   * @module eha.date-of-birth-or-age
   */
  var ngModule = angular
  .module('eha.date-of-birth-or-age.directive', []);

  ngModule.directive('ehaDateOfBirthOrAge',
                     function(ehaDateOfBirthOrAgeService) {
    return {
      restrict: 'E',
      templateUrl: 'templates/date-of-birth-or-age.directive.tpl.html',
      scope: {
        model: '=model'
      },
      link: function(scope) {
        scope.days = ehaDateOfBirthOrAgeService.getDays();
        scope.months = ehaDateOfBirthOrAgeService.getMonths();
        scope.years = ehaDateOfBirthOrAgeService.getYears();

        scope.getAgeFromDob = function() {
          // Don't default to current month, year, Sprint.ly #1045
          // (interpreted as 'only set age when year and month is defined)
          if (typeof scope.model.birthMonth === 'number' &&
              typeof scope.model.birthYear === 'number') {
            scope.model.age = ehaDateOfBirthOrAgeService
          .getAgeFromBirthDate(scope.model.birthYear,
                               scope.model.birthMonth,
                               scope.model.birthDay);
          }
        };

        scope.getDobFromAge = function() {
          if (typeof scope.model.age.years === 'number' ||
              typeof scope.model.age.months === 'number') {

            var dateOfBirth = ehaDateOfBirthOrAgeService
            .getBirthDateFromAge(
              scope.model.age.years,
              scope.model.age.months
            );

            scope.model.birthYear = dateOfBirth.year;
            scope.model.birthMonth = dateOfBirth.month;
          }
        };
      }
    };
  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
