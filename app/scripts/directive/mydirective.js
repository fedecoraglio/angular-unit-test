'use strict';

angular.module('angularjsUnitTestApp')
  .directive('mydirective', function() {
    var directive = {};

    directive.restrict = 'A'; // Indicates an element directive.
    directive.template = 'Hello World';

    return directive;
  });
