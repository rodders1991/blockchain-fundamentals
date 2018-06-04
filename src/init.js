const fs = require('fs');
const mine = require('./utils/mine');

const argv = require('yargs')
  .usage('Usage: $0 -d [blockchain-refs]')
  .demand(['d'])
  .describe('d', 'Difficulty level of finding a valid hash (ranges from 1 to 64) 1 being the hardest')
  .argv;

const createGenesis = () => {
    // Check chain file exists, delete file and start again
    if(fs.exists('../blockchain/chain.json')) {
      fs.unlink('../blockchain/chain.json');
    }

    // Set some generic data for the genesis block
    const data = 'Hello Genesis';

    // Mine hash and find nonce
    const hashNonce = mine(data, argv.d);

    // Write genesis block to file

    // prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
    console.log(JSON.stringify(hashNonce))
};

createGenesis();
