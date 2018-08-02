var Migrations = artifacts.require("./Migrations.sol");
//const privateKey = "940150f33b77a0fa837b4c54c7ba1d4c2e2fa2ebbe473a835b1d0585b57bada1";
//web3.eth.defaultAccount = '0x497120f9f6a050de0bdd8cf7b70d86f1751062d3';

module.exports = async function(deployer) {
      deployer.deploy(Migrations);
};



