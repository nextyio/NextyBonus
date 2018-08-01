var NextyBonus = artifacts.require("./NextyBonus.sol");

/*module.exports = function(deployer) {
    deployer.deploy(NextyBonus, 50);
};
*/

const Web3 = require('web3');
//Factory.json file contains my compiled Factory.sol file
const compiledFactory = require('./../build/contracts/NextyBonus.json');
const PrivateKeyProvider = require("truffle-privatekey-provider");

const privateKey = "b72f001329a170cb0f64851ee3b03779b17865003f95cc0bdf4bab981f5fb257";

const provider =  new PrivateKeyProvider(privateKey, 'http://125.212.250.61:11111');

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account: ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0]});

    //This will display the address to which your contract was deployed
    console.log('Contract deployed to: ', result.options.address);
};
deploy();