/*jshint expr: true*/
describe('eha.date-of-birth-or-age.service', function() {
  'use strict';

  var service;
  beforeEach(module('eha.date-of-birth-or-age.service', function($provide) {
    // Fake the current date so that our tests don't fail in the future
    sinon.useFakeTimers(new Date(2015, 4, 3).getTime()); //  Mai 3 2015
  }));

  beforeEach(inject(function(_ehaDateOfBirthOrAgeService_) {
    service = _ehaDateOfBirthOrAgeService_;
  }));

  describe('Public API', function() {
    describe('.getBirthDateFromAge()', function() {
      it('should return birth date when given an age', function() {
        var years = 32;
        var months = 7;
        var birthDate = service.getBirthDateFromAge(years, months);

        expect(birthDate.year).to.equal(1982);
        expect(birthDate.month).to.equal(10);
      });
    });

    describe('.getAgeFromBirthDate()', function() {
      it('should return birth date when given an age', function() {
        var year = 1982;
        var month = 10;
        var age = service.getAgeFromBirthDate(year, month);

        expect(age.years).to.equal(32);
        expect(age.months).to.equal(7);
      });
    });
  });
});
