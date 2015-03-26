/*jshint expr: true*/
describe('eha.date-of-birth-or-age.directive', function() {
  'use strict';
  beforeEach(function() {
    // Fake the current date so that our tests don't fail in the future
    sinon.useFakeTimers(new Date(2015, 2, 1).getTime());
  });

  beforeEach(module('eha.date-of-birth-or-age.template'));
  beforeEach(module('eha.date-of-birth-or-age.service'));
  beforeEach(module('eha.date-of-birth-or-age.directive'));

  var element;
  var $element;
  var scope;
  var compile;
  var isolateScope;
  var $timeout;

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    compile = _$compile_;
    element = '<eha-date-of-birth-or-age model="person">' +
              '</eha-date-of-birth-or-age>';
    scope = _$rootScope_.$new(true);
    scope.person = {
      age: {},
      birthMonth: null,
      birthYear: null
    };
    $element = compile(element)(scope);
    scope.$digest();
    isolateScope = $element.isolateScope();
  }));

  it('should calculate date of birth from age', function() {
    var yearsInput = $element[0].querySelector('input[name=ageYears]');
    yearsInput.value = 32;
    yearsInput.dispatchEvent(new Event('input'));

    var monthsInput = $element[0].querySelector('input[name=ageMonths]');
    monthsInput.value = 4;
    monthsInput.dispatchEvent(new Event('input'));

    scope.$digest();

    var birthMonthSelect = $element[0].querySelector('select[name=birthMonth]');
    var birthYearSelect = $element[0].querySelector('select[name=birthYear]');
    var birthDaySelect = $element[0].querySelector('select[name=birthDay]');

    expect(birthYearSelect.value).to.eq('1982');
    expect(birthMonthSelect.value).to.be.eq('10');
  });

  it('should calculate age from date of birth', function() {

    // var birthDaySelect = $element[0].querySelector('select[name=birthDay]');
    // birthDaySelect.value = '05';
    // birthDaySelect.dispatchEvent(new Event('input'));
    //
    // var birthMonthSelect = $element[0].querySelector('select[name=birthMonth]');
    // birthMonthSelect.value = '10';
    // birthMonthSelect.dispatchEvent(new Event('input'));
    //
    // var birthYearSelect = $element[0].querySelector('select[name=birthYear]');
    // birthYearSelect.value = '1982';
    // birthYearSelect.dispatchEvent(new Event('input'));

    scope.person.birthMonth = 10;
    scope.person.birthYear = 1982;

    scope.$digest();

    var yearsInput = $element[0].querySelector('input[name=ageYears]');
    var monthsInput = $element[0].querySelector('input[name=ageMonths]');
  });
});
