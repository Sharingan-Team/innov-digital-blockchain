const hre = require("hardhat");

async function main() {
  const ReportStorage = await hre.ethers.getContractFactory("ReportStorage");
  const reportStorage = await ReportStorage.deploy();

  console.log("ReportStorage deployed to:");
  console.log(reportStorage)

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});