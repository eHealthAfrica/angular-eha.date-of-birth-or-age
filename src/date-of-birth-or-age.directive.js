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
      templateUrl: 'templates/date-of-birth-or-age.directive.tpl.html',
      scope: {
        model: '=model'
      },
      link: function(scope) {
        scope.days = ehaDateOfBirthOrAgeService.getDays();
        scope.months = ehaDateOfBirthOrAgeService.getMonths();
        scope.years = ehaDateOfBirthOrAgeService.getYears();

        scope.$watchCollection(
          '[model.birthDay, model.birthMonth, model.birthYear]',
          function(newValues, oldValues) {
            if (angular.equals(newValues, oldValues)) {
              return;
            }

            // Don't default to current month, year, Sprint.ly #1045
            // (interpreted as 'only set age when year and month is defined)
            if (typeof newValues[1] === 'number' &&
                typeof newValues[2] === 'number') {
              scope.model.age = ehaDateOfBirthOrAgeService
                                  .getAgeFromBirthDate(newValues[2],
                                                       newValues[1]);
            }
          }
        );

        scope.$watchCollection(
          '[model.age.years, model.age.months]',
          function(newValues, oldValues) {
            if (angular.equals(newValues, oldValues)) {
              return;
            }

            if (typeof newValues[0] === 'number' ||
                typeof newValues[1] === 'number') {

              var dateOfBirth = ehaDateOfBirthOrAgeService
                                    .getBirthDateFromAge(
                                      newValues[0],
                                      newValues[1]
                                    );

              scope.model.birthYear = dateOfBirth.year;
              scope.model.birthMonth = dateOfBirth.month;
            }
          }
        );
      }
    };
  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
