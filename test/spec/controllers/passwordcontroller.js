'use strict';

describe('Controller: PasswordcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsUnitTestApp'));

  var PasswordCtrl;
  var mockScope = {
      $watchGroup : function (arrayTEst, myfunction) {
          myfunction();
      }
    };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    PasswordCtrl = $controller('PasswordCtrl', {
      $scope: mockScope
      // place here mocked dependencies
    });
  }));

  it('sets the strength to "strong" if the password length is > 8 chars', function() {
  console.log();
    PasswordCtrl.password = 'longerthaneightchars';
    PasswordCtrl.grade();

    expect(PasswordCtrl.strength).toEqual('strong');
  });

  it('wathc group', function() {
      expect(PasswordCtrl.summary).toBe(5);
    });

});
