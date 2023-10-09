const { GENESIS_DATA, MINING_RATE } = require('./config.js');
const hexToBinary = require('hex-to-binary')
const { cryptoHash } = require('./cryptoHash.js');

class Block {
    constructor({ timeStamp, prevHash, hash, data, nonce, difficulty }) {
        this.timeStamp = timeStamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ prevBlock, data }) {
        let hash, timeStamp;
        const prevHash = prevBlock.hash;

        let { difficulty } = prevBlock

        let nonce = 0;
        do {
            nonce++;
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: prevBlock, timeStamp })
            hash = cryptoHash(timeStamp, hash, prevHash, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({
            timeStamp, prevHash, data, nonce, difficulty, hash
        });
    }

    static adjustDifficulty({ originalBlock, timeStamp }) {
        const { difficulty } = originalBlock;

        if (difficulty < 1) {
            return 1;
        }

        const difference = timeStamp - originalBlock.timeStamp;

        if (difference > MINING_RATE) {
            return difficulty - 1;
        }
        return difficulty + 1;
    }
}

module.exports = Block;