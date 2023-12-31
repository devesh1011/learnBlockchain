const Block = require('./block.js');
const { cryptoHash } = require('./cryptoHash');

class BlockChain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            data
        })
        this.chain.push(newBlock);
    }

    static isChainValid(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const { timeStamp, prevHash, hash, data, nonce, difficulty } = chain[i];
            const lastDifficulty = chain[i - 1].difficulty;
            const realPrevHash = chain[i - 1].hash;

            if (prevHash !== realPrevHash) {
                return false;
            }

            const validatedHash = cryptoHash(timeStamp, prevHash, data, nonce, difficulty);

            if (hash !== validatedHash) {
                return false;
            }

            if (Math.abs(lastDifficulty - difficulty) > 1) {
                return false;
            }
        }
        return true;
    }

    replaceChain(chain) {
        if (chain <= this.chain.length) {
            console.error("The incoming chain is not longer!");
            return;
        }

        if (!BlockChain.isChainValid(chain)) {
            console.error("The incoming chain is not valid!")
        }

        this.chain = chain;
    }
}

module.exports = {BlockChain};