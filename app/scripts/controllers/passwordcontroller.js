'use strict';

/**
 * @ngdoc function
 * @name angularjsUnitTestApp.controller:PasswordcontrollerCtrl
 * @description
 * # PasswordcontrollerCtrl
 * Controller of the angularjsUnitTestApp
 */
angular.module('angularjsUnitTestApp')
  .controller('PasswordCtrl', function ($scope) {

    var passwordCtrl = this;

    passwordCtrl.password = '';
    passwordCtrl.grade = function() {
      var size = passwordCtrl.password.length;
      if (size > 8) {
        passwordCtrl.strength = 'strong';
      } else if (size > 3) {
        passwordCtrl.strength = 'medium';
      } else {
        passwordCtrl.strength = 'weak';
      }
    };

    var sumar = function (val1, val2) {
       return val1 + val2;
    };

    var myFunction = function() {
        var startDate = 3;
        var endDate = 2;
        passwordCtrl.summary = sumar(startDate, endDate);
     };

    var initController = function() {
      passwordCtrl.summary = null;
      $scope.$watchGroup(['startTimeCandidate','endTimeCandidate'], myFunction);

    };

    initController();

  });
