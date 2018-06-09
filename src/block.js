import crypto from 'crypto';

const MAX_HASH = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const isValidBlockHash = (hash, targetHash) =>
  Number.parseInt(hash, 16) < Number.parseInt(targetHash, 16);

const hashString = function hashStringValue(value) {
  const hash = crypto.createHash('sha256');
  hash.update(value);
  return hash.digest('hex');
};

const formatTargetHash = function formatHashBasedOnDifficultyLevel(difficultyLevel) {
  return MAX_HASH.split('').map((c, i) => (i < difficultyLevel ? '0' : c)).join('');
};

export default function mineBlockBasedOnDifficultyLevel(blockData, difficultyLevel) {
  let nonce = 0;
  let blockHash = hashString(JSON.stringify({ data: blockData, nonce }));
  const targetHash = formatTargetHash(difficultyLevel);
  while (!isValidBlockHash(blockHash, targetHash)) {
    nonce += 1;
    blockHash = hashString(JSON.stringify({ data: blockData, nonce }));
  }
  return {
    nonce,
    data: blockData,
    hash: blockHash,
  };
}
