/*
'use strict';

describe('Controller: jobPostingUrlService', function () {

  // load the controller's module
  beforeEach(module('angularjsUnitTestApp'));

  var jobPostingUrlServiceToTest,httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (jobPostingUrlService, $httpBackend) {
    var test = "testing";
    //scope = $rootScope.$new();
    jobPostingUrlServiceToTest = jobPostingUrlService;
    httpBackend = $httpBackend;
  }));

  it('should return two element when a getAllJobPostingUrl method is called', function() {
    var mockResponse = [
      {
        id: 1234,
        name: "Test1234",
        parameters: {
          jobBoardCategory: "jobBoardCategoryTest",
          stafflyCohort: "stafflyCohortTest",
          stafflyCity: "stafflyCityTest",
          stafflyState: "stafflyStateTest",
          utmSource: "utmSourceTest",
          utmMedium: "utmMediumTest",
          utmCampaign: "utmCampaignTest"
        }
      },
      {
        id: 45678,
        name: "Test45678",
        parameters: {
          jobBoardCategory: "jobBoardCategoryTest",
          stafflyCohort: "stafflyCohortTest",
          stafflyCity: "stafflyCityTest",
          stafflyState: "stafflyStateTest",
          utmSource: "utmSourceTest",
          utmMedium: "utmMediumTest",
          utmCampaign: "utmCampaignTest"
        }
      }
    ];

    httpBackend.expectGET('http://domain.com/v1/jobpostingurls', function(headers){
        return {"Accept":"application/json, text/plain, *!/!*"};
      })
      .respond(mockResponse);

    jobPostingUrlServiceToTest.getAllJobPostingUrl(
      function (responseSuccessfully){
        var jobPostings = angular.fromJson(responseSuccessfully).data;
        expect(2, jobPostings.length);
        expect(1234, jobPostings[0].id);
        expect(45678, jobPostings[1].id);
      }, function (responseError){
        console.log(responseError);
      });

    httpBackend.flush();
  });

  it('should return 400 status when a getAllJobPostingUrl method is called', function() {

    var mockResponseError = {
        errorCode: 123,
        errorMessage: "Job Posting not found"
    };

    httpBackend.expectGET('http://domain.com/v1/jobpostingurls', function(headers){
        return {"Accept":"application/json, text/plain, *!/!*"};
      })
      .respond(400, mockResponseError);

    jobPostingUrlServiceToTest.getAllJobPostingUrl(
      function (responseSuccessfully){
      }, function (responseError){
        var errorData = angular.fromJson(responseError).data;
        expect(123, errorData.errorCode);
        expect("Job Posting not found", errorData.errorMessage);
      });

    httpBackend.flush();
  });

});
*/
