const crypto = require('crypto');   // Node.js built-in module

const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');
    hash.update(inputs.sort().join(' '));
    return hash.digest('hex');
}

module.exports = {cryptoHash};