'use strict';

describe('Controller: JobPostingUrl', function () {

  var jobPostingUrlCtrl,
    scope, log;

  var mockJobPostingUrlService = {
    getAllJobPostingUrl: function (successCallbackResponse, errorCallbackResponse) {
      successCallbackResponse({data: [{
        id: 123,
        name: "Test",
        parameters: {
          jobBoardCategory: "jobBoardCategoryTest",
          stafflyCohort: "stafflyCohortTest",
          stafflyCity: "stafflyCityTest",
          stafflyState: "stafflyStateTest",
          utmSource: "utmSourceTest",
          utmMedium: "utmMediumTest",
          utmCampaign: "utmCampaignTest"
        }
      }]});
    },
    createJobPostingUrl: function(data, successCallbackResponse, errorCallbackResponse) {
      expect("name123").toBe(data.name);
      successCallbackResponse({});
    }
  };

  // load the controller's module
  beforeEach(module('angularjsUnitTestApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    jobPostingUrlCtrl = $controller('JobPostingUrlCtrl', {
      $log: log,
      jobPostingUrlService: mockJobPostingUrlService
      // place here mocked dependencies
    });
  }));

  it('should initialized all value when controller is called', function () {
    expect(1).toBe(jobPostingUrlCtrl.jobUrls.length);
    var data = jobPostingUrlCtrl.jobUrls[0];
    expect("Test").toBe(data.name);
    expect("jobBoardCategoryTest").toBe(data.parameters.jobBoardCategory);
    expect(false).toBe(jobPostingUrlCtrl.shouldWaitToLoadJobPostingUrl);
    expect('id').toBe(jobPostingUrlCtrl.sortJobPostingUrlTable.column);
    expect(false).toBe(jobPostingUrlCtrl.showMessageError);
    expect('').toBe(jobPostingUrlCtrl.messageError);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.name);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.jobBoardCategory);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.stafflyCohort);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.stafflyCity);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.stafflyState);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.utmSource);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.utmMedium);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.utmCampaign);
  });
  it('should return "fa-caret-up" class name when sortJobPostingUrlTable.descending is false', function () {
    jobPostingUrlCtrl.sortJobPostingUrlTable = {
      column: 'id',
      descending: false
    };
    var nameClass = jobPostingUrlCtrl.getArrowSortingClass('id');
    expect('fa-caret-up').toBe(nameClass);
  });

  it('should return "fa-caret-down" class name when sortJobPostingUrlTable.descending is true', function () {
    jobPostingUrlCtrl.sortJobPostingUrlTable = {
      column: 'id',
      descending: true
    };
    var nameClass = jobPostingUrlCtrl.getArrowSortingClass('id');
    expect('fa-caret-down').toBe(nameClass);
  });

  it('should set to true the sortJobPostingUrlTable.descending when sortJobPostingUrlTable.descending is false', function () {
    jobPostingUrlCtrl.sortJobPostingUrlTable = {
      column: 'id',
      descending: false
    };
    jobPostingUrlCtrl.changeJobPostingUrlSorting('id');
    expect(true).toBe(jobPostingUrlCtrl.sortJobPostingUrlTable.descending);
  });

  it('should change column name and descending order when the column is different to the previous one', function () {
    jobPostingUrlCtrl.sortJobPostingUrlTable = {
      column: 'id',
      descending: false
    };
    jobPostingUrlCtrl.changeJobPostingUrlSorting('name');
    expect(false).toBe(jobPostingUrlCtrl.sortJobPostingUrlTable.descending);
    expect('name').toBe(jobPostingUrlCtrl.sortJobPostingUrlTable.column);
  });

  it('should call search job posting url when a new job posting is saved', function() {
    jobPostingUrlCtrl.jobPostingData = {
      name: "name123",
      jobBoardCategory: "jobBoardCategory123",
      stafflyCohort: "stafflyCohort123",
      stafflyCity: "stafflyCity123",
      stafflyState: "stafflyState123",
      utmSource: "utmSource123",
      utmMedium: "utmMedium123",
      utmCampaign: "utmCampaign123"
    };
    jobPostingUrlCtrl.saveJobPostingUrl(jobPostingUrlCtrl.jobPostingData, function(){}, function(){});
    expect(1).toBe(jobPostingUrlCtrl.jobUrls.length);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.name);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.jobBoardCategory);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.stafflyCohort);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.stafflyCity);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.stafflyState);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.utmSource);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.utmMedium);
    expect(null).toBe(jobPostingUrlCtrl.jobPostingData.utmCampaign);
  });

});
