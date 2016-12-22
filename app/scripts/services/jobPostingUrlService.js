'use strict';
/**
 * @ngdoc service
 * @name stafflyAdminApp.jobPostingUrlService
 * @description
 * # city
 * Service in the stafflyAdminApp.
 */
angular.module('angularjsUnitTestApp')
  .service('jobPostingUrlService', function ($http) {
    var baseUrl = "http://domain.com/v1/jobpostingurls";

    function getAllJobPostingUrl(successCallbackResponse, errorCallbackResponse) {
      $http.get(baseUrl).then(function successCallback(response) {
        successCallbackResponse(response);
      }, function errorCallback(response) {
        errorCallbackResponse(response);
      });
    }

    function getJobPostingUrlByName(name, successCallbackResponse, errorCallbackResponse) {
      $http({
        method: 'GET',
        url: baseUrl,
        params: {
          name: name
        }
      }).then(function successCallback(response) {
        successCallbackResponse(response);
      }, function errorCallback(response) {
        errorCallbackResponse(response);
      });
    }

    function createJobPostingUrl(data, successCallbackResponse, errorCallbackResponse) {
      $http({
        method: 'POST',
        url: baseUrl,
        data: data
      }).then(function successCallback(response) {
        successCallbackResponse(response);
      }, function errorCallback(response) {
        errorCallbackResponse(response);
      });
    }

    function deleteJobPostingUrl(jobPostingUrlId, successCallbackResponse, errorCallbackResponse) {
      $http({
        method: 'DELETE',
        url: baseUrl + "/" + jobPostingUrlId,
        param: {
          time: new Date().getTime()
        }
      }).then(function successCallback(response) {
        successCallbackResponse(response);
      }, function errorCallback(response) {
        errorCallbackResponse(response);
      });
    }

    return ({
      getAllJobPostingUrl: getAllJobPostingUrl,
      createJobPostingUrl: createJobPostingUrl,
      getJobPostingUrlByName: getJobPostingUrlByName,
      deleteJobPostingUrl: deleteJobPostingUrl
    });
  });
