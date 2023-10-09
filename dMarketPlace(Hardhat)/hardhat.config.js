/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "m0U9_QwO1Ket9KzvTUby2gkdwJOuDeqK";
const SEPOLIA_PRIVATE_KEY = "f894ceb9987eef077455994a076d56d3ba533bc330eaa0005b4b014c1c004eb1"; 

module.exports = {
  solidity: "0.8.19",

  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],
    },
  },
};
