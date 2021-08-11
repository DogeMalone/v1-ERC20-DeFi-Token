const IterableMapping = artifacts.require("IterableMapping");
const Tiki = artifacts.require("TIKI");

module.exports = async function(deployer) {
  await deployer.deploy(IterableMapping);
  await deployer.link(IterableMapping, Tiki);
  await deployer.deploy(Tiki);
}
