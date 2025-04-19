const assert = require('assert');
const data=[1, 2, 3];

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(data.indexOf(3), 2);
    });
  });
});