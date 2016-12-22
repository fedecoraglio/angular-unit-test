'use strict';

describe('sampleProvider', function() {
  'use strict';

  // Provider instance
  var sample;

  // Instanciates the module
  beforeEach(function() {
    module('angularjsUnitTestApp');
  });

  // Here we don't do any configuration to our provider
  describe('Default Configuration', function() {

    beforeEach(function() {
      inject(function(_sample_) {
        sample = _sample_;
      });
    });
/*
    it('Should get the default value', function() {
      expect(sample.getValue()).toBe('Default Value');
    });

    it('Should throw the default value', function() {
      expect(function() {
        sample.throwValue();
      }).toThrow('Default Value');
    });*/

  });

});
