'use strict';

angular.module('app', [
  'eha.date-of-birth-or-age'
])
  .controller('MyCtrl', function($scope) {
    $scope.person = {
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      age: {
        years: '',
        months: ''
      }
    };
  });
