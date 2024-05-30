require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY], // we use a .env file to hide our wallets private key
    },
    mumbai: {
      url: 'https://rpc.ankr.com/polygon_mumbai',
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};
