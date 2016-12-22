'use strict';

/**
 * @ngdoc overview
 * @name angularjsUnitTestApp
 * @description
 * # angularjsUnitTestApp
 *
 * Main module of the application.
 */
angular
  .module('angularjsUnitTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMessages'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/jobposting', {
        templateUrl: 'views/jobPosting.html',
        controller: 'JobPostingUrlCtrl',
        controllerAs: 'jobPostingUrlCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
