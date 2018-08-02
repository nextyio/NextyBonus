/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

//module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
//};

require('dotenv').config();
require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('truffle-hdwallet-provider');
const HDmnemonic= "accident people carpet dice ring diary produce base want shrimp melt side"

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
  new HDWalletProvider(mnemonic, rpcEndpoint);

const infuraProvider = network => providerWithMnemonic(
  process.env.MNEMONIC || '',
  `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
);

const PrivateKeyProvider = require('truffle-privatekey-provider');
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  const ethPrivateKey = '940150f33b77a0fa837b4c54c7ba1d4c2e2fa2ebbe473a835b1d0585b57bada1';

const ropstenProvider = process.env.SOLIDITY_COVERAGE
  ? undefined
  : infuraProvider('ropsten');

module.exports = {
  networks: {
    live: {
      provider: function() {
         return new HDWalletProvider(HDmnemonic, "http://172.16.1.8" )
      },
      port: 8545,
      network_id: 77777,
      gasPrice: 2000000000,
      gas: 6000000
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: "development" // eslint-disable-line camelcase
    },
    rinkeby: {
      host: "https://rinkeby.infura.io/fNuraoH3vBZU8d4MTqdt",
      port: 8545,
      network_id: "4", // Rinkeby ID 4
      from: "0x99a4572656eb49FFEEFbe9588f8e7ab0F8D6Eb5e", // account from which to deploy
      gas: 6712390
     },
    metamask: {
      host: 'localhost',
      port: 9545,
      network_id: 'metamask', // eslint-disable-line camelcase
    },
    testnetNexty: {
      provider: () =>
      new PrivateKeyProvider(
        ethPrivateKey,
        `172.16.1.8:8545`,
      ),
      gas: 21000,
      gasPrice: 300000,
      from: "0x497120f9f6A050De0bDd8cf7B70d86F1751062d3",
      network_id: 77777, // eslint-disable-line camelcase
    },
    // NextyPkey
    NextyPkey: {
      provider: () =>
        new PrivateKeyProvider(
          ethPrivateKey,
          `125.212.250.61`,
        ),
        port: 11111,
      network_id: 77777,
      gas: 21000,
      gasPrice: 300000,
    },
    ropsten: {
      provider: ropstenProvider,
      network_id: 3, // eslint-disable-line camelcase
    },
    coverage: {
      host: 'localhost',
      network_id: '*', // eslint-disable-line camelcase
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },
    ganache: {
      host: 'localhost',
      port: 8545,
      network_id: 'ganache', // eslint-disable-line camelcase
    },
  },
}
