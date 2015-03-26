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
                     ['ehaDateOfBirthOrAgeService', function(ehaDateOfBirthOrAgeService) {
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
  }]);

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();

;(function() {
  'use strict';
  /**
   * @ngdoc service
   * @function
   * @name ehaDateOfBirthOrAgeService
   * * @module eha.date-of-birth-or-age
   */
  var ngModule = angular
                  .module('eha.date-of-birth-or-age.service', []);

  /* global window */
  ngModule.value('moment', window && window.moment || {});
  ngModule.service('ehaDateOfBirthOrAgeService', ['$locale', 'moment', function($locale, moment) {

    var currentMonth = moment().format('M');
    var currentYear = moment().format('YYYY');
    var currentMoment = moment().subtract(1, 'month');

    // Get the months from the $locale service;
    var months = $locale.DATETIME_FORMATS.MONTH;

    var days = [];
    for (var day = 1; day <= 31; day++) {
      days.push(day);
    }

    var years = [];
    for (var year = currentYear; year >= 1920; year--) {
      years.push(year);
    }

    this.getMonths = function() {
      return months;
    };

    this.getDays = function() {
      return days;
    };

    this.getYears = function() {
      return years;
    };

    this.getBirthDateFromAge = function(years, months) {
      months = months || 0;
      years = years || 0;
      var birthDate = moment()
                        .subtract(months, 'months')
                        .subtract(years, 'year');

      return {
        year: birthDate.year(),
        month: birthDate.months()
      };
    };

    this.getAgeFromBirthDate = function(year, month) {
      var birthYear = year || currentYear;
      var birthMonth = month || currentMonth;

      // ignore birth dates set in the future
      if (birthYear > currentYear || birthYear === currentYear &&
          birthMonth > currentMonth) {
        return;
      }

      var birthTimestamp = moment([birthYear, birthMonth - 1]).unix();
      var nowTimestamp = currentMoment.unix();
      var duration = moment.duration(nowTimestamp - birthTimestamp, 'seconds');

      return {
        years: duration.years(),
        months: duration.months()
      };
    };
  }]);

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();

;(function() {

  var ngModule = angular.module('eha.date-of-birth-or-age', [
    'eha.date-of-birth-or-age.directive',
    'eha.date-of-birth-or-age.service'
  ]);

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
