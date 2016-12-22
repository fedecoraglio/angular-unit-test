'use strict';

angular.module('angularjsUnitTestApp')
  .controller('LoginAdminCtrl', function ($scope, $location, sessionService) {

    var loginAdminCtrl = this;

    var cleanLoginMessageError = function () {
      loginAdminCtrl.showMessageErrorLogin = false;
      loginAdminCtrl.loginMessageError = '';
    };

    var enabledLoginButton = function () {
      loginAdminCtrl.loading = false;
      loginAdminCtrl.loginButtonText = "Login";
    };

    var disabledLoginButton = function () {
      loginAdminCtrl.loading = true;
      loginAdminCtrl.loginButtonText = "Login...";
    };

    var initController = function () {
      enabledLoginButton();

      loginAdminCtrl.user = {
        username: '',
        password: ''
      };

      sessionService.getUserDetails(function (currentUserDetails) {
        loginAdminCtrl.showMessageErrorLogin = false;
        if (currentUserDetails !== null) {
          var userInformation = angular.fromJson(currentUserDetails).data;
          if (userInformation.userTypeId === 1) {
            $location.path("/home");
          } else {
            loginAdminCtrl.showMessageErrorLogin = true;
            loginAdminCtrl.loginMessageError = "You do not have permission";
            sessionService.logoutUser();
          }
        }
      });
    };

    loginAdminCtrl.login = function() {
      disabledLoginButton();
      cleanLoginMessageError();
      sessionService.createSessionUser({
        email: loginAdminCtrl.user.username,
        password: loginAdminCtrl.user.password
      }, function (response) {
        cleanLoginMessageError();
        var tokenInfo = angular.fromJson(response).data;
        if (tokenInfo !== null) {
          if (tokenInfo.userTypeId === 1) {
            $location.path("/admin/console");
          } else {
            loginAdminCtrl.showMessageErrorLogin = true;
            loginAdminCtrl.loginMessageError = "You do not have permission";
            sessionService.logoutUser();
          }
        }
      }, function (response) {
        enabledLoginButton();
        loginAdminCtrl.showMessageErrorLogin = true;
        if(response.status === 400) {
          loginAdminCtrl.loginMessageError = "User name and password are not valid. Please try again";
        } else if (response.data !== null && response.data.errorMessage !== undefined) {
          loginAdminCtrl.loginMessageError = response.data.errorMessage;
        }
        console.error(response);
      });
    };

    initController();
  });
