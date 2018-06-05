import crypto from 'crypto';
import { MAX_HASH } from '../constants';

export default (blockData, difficultyLevel) => {
  let nonce = 0;
  let blockHash = hashBlockRecord(blockData, nonce);
  const targetHash = formatTargetHash(Number.parseInt(difficultyLevel));
  while(!isValidBlockHash(blockHash, targetHash)) {
    ++nonce;
    blockHash = hashBlockRecord(blockData, nonce);
  }
  return {
    nonce,
    data: blockData,
    hash: blockHash,
  }
}

const isValidBlockHash = (hash, targetHash) => {
  return Number.parseInt(hash, 16) < Number.parseInt(targetHash, 16);
}

const hashBlockRecord = (blockData, nonce) => {
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify({data: blockData, nonce}));
  return hash.digest('hex');
};

const formatTargetHash = (level) => {
  return MAX_HASH.split('').map( (c, i) => {
    return i < level ? '0' : c;
  }).join('');
}
