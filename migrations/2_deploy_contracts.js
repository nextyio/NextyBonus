var NextyBonus = artifacts.require("./NextyBonus.sol");

module.exports = function(deployer) {
    deployer.deploy(NextyBonus, 50);
};