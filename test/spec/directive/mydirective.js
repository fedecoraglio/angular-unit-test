'use strict';

describe('Directive: mydirective', function () {

  var scope, element;

  // load the controller's module
  beforeEach(module('angularjsUnitTestApp'));

  beforeEach(inject(function ($compile, $rootScope) {
    //use the $rootScope to create a scope for the directive
    scope = $rootScope.$new();
    //create an angular element from a HTML string
    element = $('<div mydirective></div>');
    //compile the element with the scope
    $compile(element)(scope);
    scope.$apply();
  }));

  it("should show hello world when mydirective is apply", function () {
    expect(element.html()).toBe('Hello World');
  })

});
