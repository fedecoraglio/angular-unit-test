'use strict';

angular.module('angularjsUnitTestApp')
  .controller('JobPostingUrlCtrl', function ($log, jobPostingUrlService) {

    var jobPostingUrlCtrl = this;

    var searchAllPostingUrl = function () {
      jobPostingUrlCtrl.shouldWaitToLoadJobPostingUrl = true;
      jobPostingUrlCtrl.jobUrls = [];
      jobPostingUrlService.getAllJobPostingUrl(function (response) {
        var jobPostingUrls = angular.fromJson(response).data;
        angular.forEach(jobPostingUrls, function(jobPostingUrl) {
          jobPostingUrlCtrl.jobUrls.push({
            id: jobPostingUrl.id,
            name: jobPostingUrl.name,
            url: "https://domain.com?t="+jobPostingUrl.name,
            parameters: jobPostingUrl.parameters
          });
        });
        jobPostingUrlCtrl.shouldWaitToLoadJobPostingUrl = false;
      }, function (responseError) {
        jobPostingUrlCtrl.shouldWaitToLoadJobPostingUrl = false;
        $log.error(responseError);
      });
    };

    var cleanJobPostingData = function () {
      jobPostingUrlCtrl.jobPostingData = {
        name: null,
        jobBoardCategory: null,
        stafflyCohort: null,
        stafflyCity: null,
        stafflyState: null,
        utmSource: null,
        utmMedium: null,
        utmCampaign: null
      };
    };

    var cleanErrorMessage = function () {
      jobPostingUrlCtrl.showMessageError = false;
      jobPostingUrlCtrl.messageError = '';
    };

    var initController = function () {
      jobPostingUrlCtrl.jobUrls = [];
      jobPostingUrlCtrl.shouldWaitToLoadJobPostingUrl = false;
      jobPostingUrlCtrl.shouldWaitToSaveJobPostingUrl = false;
      jobPostingUrlCtrl.sortJobPostingUrlTable = {
        column: 'id',
        descending: true
      };
      cleanErrorMessage();
      cleanJobPostingData();
      searchAllPostingUrl();
    };

    var createErrorMessage = function () {
      jobPostingUrlCtrl.showMessageError = true;
      jobPostingUrlCtrl.messageError = 'Job posting url is duplicated';
    };

    jobPostingUrlCtrl.validateJobPostingUrl = function () {
      cleanErrorMessage();
      if(jobPostingUrlCtrl.jobPostingData.name !== null && jobPostingUrlCtrl.jobPostingData.name !== '') {
        jobPostingUrlService.getJobPostingUrlByName(jobPostingUrlCtrl.jobPostingData.name, function (res) {
          var responseJobPostingName = angular.fromJson(res).data;
          if (responseJobPostingName !== null && responseJobPostingName.name !== null) {
            createErrorMessage();
          } else {
            cleanErrorMessage();
          }
        }, function (resError) {
          createErrorMessage();
          $log.error(resError);
        });
      }
    };

    jobPostingUrlCtrl.saveJobPostingUrl = function() {
      cleanErrorMessage();
      jobPostingUrlCtrl.shouldWaitToSaveJobPostingUrl = true;
      jobPostingUrlService.createJobPostingUrl(jobPostingUrlCtrl.jobPostingData, function (response) {
        cleanJobPostingData();
        searchAllPostingUrl();
      }, function (responseError) {
        $log.error(responseError);
      });
    };

    jobPostingUrlCtrl.deleteJobPostingUrl = function (jobPostingUrl) {
      cleanErrorMessage();
      jobPostingUrlCtrl.shouldWaitToLoadJobPostingUrl = true;
      jobPostingUrlService.deleteJobPostingUrl(jobPostingUrl, function (response) {
        searchAllPostingUrl();
        $log.info(response);
        jobPostingUrlCtrl.shouldWaitToLoadJobPostingUrl = false;
      }, function(responseError) {
        jobPostingUrlCtrl.shouldWaitToLoadJobPostingUrl = false;
        jobPostingUrlCtrl.showMessageError = true;
        var errorResponse = angular.fromJson(responseError).data;
        var messageError = "Error deleting job posting url (Id: "+jobPostingUrl+") ";
        if(errorResponse.errorCode !== null) {
          messageError = messageError + " Code Error: " + errorResponse.errorCode;
        }
        if(errorResponse.errorMessage !== undefined && errorResponse.errorMessage !== null) {
          messageError = messageError + " Message Error: " + errorResponse.errorCode;
        }
        jobPostingUrlCtrl.showMessageError = messageError;
        $log.error(responseError);
      });
    };

    jobPostingUrlCtrl.changeJobPostingUrlSorting = function(column) {
      if (jobPostingUrlCtrl.sortJobPostingUrlTable.column === column) {
        jobPostingUrlCtrl.sortJobPostingUrlTable.descending = !jobPostingUrlCtrl.sortJobPostingUrlTable.descending;
      } else {
        jobPostingUrlCtrl.sortJobPostingUrlTable.column = column;
        jobPostingUrlCtrl.sortJobPostingUrlTable.descending = false;
      }
    };

    jobPostingUrlCtrl.getArrowSortingClass = function (column) {
      if(jobPostingUrlCtrl.sortJobPostingUrlTable.column === column) {
        if (!jobPostingUrlCtrl.sortJobPostingUrlTable.descending) {
          return 'fa-caret-up';
        } else {
          return 'fa-caret-down';
        }
      } else {
        return 'fa-caret-down';
      }
    };

    initController();

  });
