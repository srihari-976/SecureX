const CrimeRecords = artifacts.require("CrimeRecords");

module.exports = function (deployer) {
  deployer.deploy(CrimeRecords);
};
