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
                        .subtract(moment().days(), 'days')
                        .subtract(months, 'months')
                        .subtract(years, 'year');

      return {
        year: birthDate.year(),
        month: birthDate.months() + 1
      };
    };

    this.getAgeFromBirthDate = function(year, month, day) {
      var birthYear = year || currentYear;
      var birthMonth = month || currentMonth;
      var birthDay = day || moment().date();

      // ignore birth dates set in the future
      if (birthYear > currentYear ||
          birthYear === currentYear &&
          birthMonth > currentMonth) {
        return;
      }

      var birthTimestamp = moment([birthYear, birthMonth, birthDay]).unix();
      var nowTimestamp = currentMoment.unix();
      var duration = moment.duration(nowTimestamp - birthTimestamp, 'seconds');

      // Create a month offset by rounding the day of the month.
      // n.b moments.duration().months() method returns a 0 indexed month value
      // just like native Date()
      var days = duration.days();
      var monthOffset = 2;
      if (days > 0) {
        monthOffset += Math.round(days / 31);
      }

      return {
        years: duration.years(),
        months: duration.months() + monthOffset
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
