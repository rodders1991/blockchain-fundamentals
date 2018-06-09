const assert = require('assert');
const mineBlock = require('../src/block');

describe('Block functions', () => {

  describe('Mine Block', () => {
    it('should mine a hash lower than the target value', function() {
      // Mine block with difficultyLevel 3
      console.log(mineBlock)
      const block = mineBlock('Salah la la la la', 3);

      const level3HighestHash = '000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
      assert.equal(true, Number.parseInt(level3HighestHash, 16) >  Number.parseInt(block.hash, 16));
    });
  });

});
