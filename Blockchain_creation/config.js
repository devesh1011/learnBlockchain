const INITIAL_DIFFICULTY = 2;
const MINING_RATE = 1000;
const GENESIS_DATA = {
    timeStamp: 1,
    prevHash: '0x0000',
    hash: '0x0001',
    data: [],
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0
};

module.exports = {GENESIS_DATA, INITIAL_DIFFICULTY, MINING_RATE};