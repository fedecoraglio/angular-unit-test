

describe("Router provider", function () {

  var location, route, rootScope, httpBackend;

  // load the controller's module
  beforeEach(module('angularjsUnitTestApp'));

  it('should test routes',
    inject(function ($route) {

      expect($route.routes['/about'].controller).toBe('AboutCtrl');
      expect($route.routes['/'].controller).toBe('MainCtrl');
      expect($route.routes['/jobposting'].controller).toBe('JobPostingUrlCtrl');
      expect($route.routes[null].redirectTo).toEqual('/');
    }));

});
