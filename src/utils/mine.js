const crypto = require('crypto');
const { MAX_HASH } = require('../constants');
const DIFF_LEVEL = process.argv[0];

module.exports = (blockRecord, difficultyLevel) => {
  let nonce = 0;
  let blockHash = hashBlockRecord(blockRecord, nonce);
  const targetHash = formatTargetHash(Number.parseInt(difficultyLevel));
  while(!isValidBlockHash(blockHash, targetHash)) {
    ++nonce;
    blockHash = hashBlockRecord(blockRecord, nonce);
  }
  return {
    nonce,
    data: blockRecord.data,
    prevHash: blockRecord.prevHash,
    hash: blockHash,
  }
}

const isValidBlockHash = (hash, targetHash) => {
  return Number.parseInt(hash, 16) < Number.parseInt(targetHash, 16);
}

const hashBlockRecord = (blockRecord, nonce) => {
  // Add nonce to block record
  blockRecord.nonce = nonce;
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(blockRecord));
  return hash.digest('hex');
};

const formatTargetHash = (level) => {
  return MAX_HASH.split('').map( (c, i) => {
    return i < level ? '0' : c;
  }).join('');
}
