'use strict';

angular.module('angularjsUnitTestApp')
.provider('sample', function() {
  'use strict';

  var value = 'Default Value';

  this.setValue = function(val) {
    value = val;
  };

  this.$get = function() {

    var getValue = function() {
      return value;
    };

    var throwValue = function() {
      throw new Error(value);
    };

    return {
      getValue: getValue,
      throwValue: throwValue
    };

  };

});
