const IterableMapping = artifacts.require("IterableMapping");
const BNBack = artifacts.require("BNBack");
const BNBack2 = artifacts.require("BNBackDividendTracker");

module.exports = async function(deployer) {
//  await deployer.deploy(IterableMapping)
//  await deployer.link(IterableMapping, BNBack2);
//  await deployer.deploy(BNBack2);
  await deployer.link(IterableMapping, BNBack);
  await deployer.deploy(BNBack);
}
