'use strict';

describe("Controller: LoginCtrl", function () {

  beforeEach(module("angularjsUnitTestApp"));

  var loginAdminCtrl;
  var mockScope;
  var mockLocation;
  var mockSessionService;

  beforeEach(function() {
    mockSessionService = {
      currentUserToReturn: null,
      getUserDetails: function (successfullyFunction) {
        successfullyFunction(mockSessionService.currentUserToReturn)
      },
      logoutUser: function () {
        return "logout successfully";
      }
    };
    mockLocation = {
      path: function (){}
    };
    mockScope = {};
  });

  it("should redirect to home when the user type is 1", function () {
    spyOn(mockLocation, "path");
    mockSessionService.currentUserToReturn = {
      data: {
        userTypeId: 1
      }
    };

    inject(function ($controller) {
      loginAdminCtrl = $controller("LoginAdminCtrl", {
        $scope: mockScope,
        $location: mockLocation,
        sessionService: mockSessionService
      })
    });

    expect(loginAdminCtrl.loading).toBeFalsy();
    expect("Login").toBe(loginAdminCtrl.loginButtonText);
    expect('').toBe(loginAdminCtrl.user.username);
    expect('').toBe(loginAdminCtrl.user.password);
    expect(mockLocation.path).toHaveBeenCalledWith('/home');
    expect(mockLocation.path).toHaveBeenCalledTimes(1);
  });

  it("should show an error when the user type is NOT 1", function () {
    spyOn(mockSessionService, "logoutUser");
    mockSessionService.currentUserToReturn = {
      data: {
        userTypeId: 2
      }
    };

    inject(function ($controller) {
      loginAdminCtrl = $controller("LoginAdminCtrl", {
        $scope: mockScope,
        $location: mockLocation,
        sessionService: mockSessionService
      })
    });

    expect(loginAdminCtrl.showMessageErrorLogin).toBeTruthy();
    expect("You do not have permission").toBe(loginAdminCtrl.loginMessageError);
    expect(mockSessionService.logoutUser).toHaveBeenCalledTimes(1);
  });

});
