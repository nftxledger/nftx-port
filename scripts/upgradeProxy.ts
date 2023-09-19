import { ethers, run, upgrades } from "hardhat";

async function main() {
  const proxyAddress = "0xCB19467E7B8c326CD7A49193BD2418B2301B8D27";

  const NFTx = await ethers.getContractFactory("NFTxLedger");

  const nftxDeploy = await upgrades.upgradeProxy(proxyAddress, NFTx, {
    kind: "uups",
  });
  await nftxDeploy.waitForDeployment();

  const address = await nftxDeploy.getAddress();

  // Display Proxy address
  console.log(`Contract deployed to ${address}`);

  // verify contract on etherscan
  verifyContracts(address);
}

async function verifyContracts(address: String) {
  const network = await ethers.provider.getNetwork();
  if (network.name !== "hardhat") {
    // Wait for 30 seconds for etherscan to index the contract
    await new Promise((resolve) => setTimeout(resolve, 30000));

    // verify contracts on etherscan
    console.log(`Verifying contracts`);

    // verify implementation contract on etherscan
    await run("verify:verify", {
      address,
      constructorArguments: [],
    });
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
