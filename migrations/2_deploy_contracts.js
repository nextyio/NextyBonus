var NextyBonus = artifacts.require("./NextyBonus.sol");

module.exports = function(deployer) {
    console.log("test")
    deployer.deploy(NextyBonus, 50);
};
