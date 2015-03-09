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
  ngModule.service('ehaDateOfBirthOrAgeService', function($locale, moment) {

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
  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
