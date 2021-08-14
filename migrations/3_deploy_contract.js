const IterableMapping = artifacts.require("IterableMapping");
const BNBack = artifacts.require("BNBack");

module.exports = async function(deployer) {
//  await deployer.deploy(IterableMapping)
  await deployer.link(IterableMapping, BNBack);
//  await deployer.deploy(BNBack);
}
