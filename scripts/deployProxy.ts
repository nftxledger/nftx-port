import { ethers, upgrades } from "hardhat";

async function main() {
  const NFTx = await ethers.getContractFactory("NFTxPort");
  const NFTxDeploy = await upgrades.deployProxy(NFTx, { kind: "uups" });
  await NFTxDeploy.waitForDeployment();

  console.log(`Contract deployed to ${await NFTxDeploy.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
