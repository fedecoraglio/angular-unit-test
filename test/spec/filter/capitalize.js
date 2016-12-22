'use strict';

describe("Filter: Capitalize", function() {

  beforeEach(module("angularjsUnitTestApp"));
  var filter;

  beforeEach(inject(function($filter) {
    filter = $filter;
  }));

  it("should capitalize word when a filter is called", function () {

    /*var capitalize = ;*/

    expect(filter('capitalize')("test")).toBe('Test');

  });

});
