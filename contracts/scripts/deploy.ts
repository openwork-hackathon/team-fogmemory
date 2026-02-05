import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying FogMemory Token with account:", deployer.address);
  
  // Deploy FogMemoryToken
  const FogMemoryToken = await ethers.getContractFactory("FogMemoryToken");
  const token = await FogMemoryToken.deploy(deployer.address);
  
  await token.waitForDeployment();
  
  const tokenAddress = await token.getAddress();
  
  console.log("FogMemory Token deployed to:", tokenAddress);
  console.log("Transaction hash:", token.deploymentTransaction()?.hash);
  
  // Log for verification
  console.log("\n=== Deployment Info ===");
  console.log("Token: FogMemory ($FOGMEM)");
  console.log("Address:", tokenAddress);
  console.log("Owner:", deployer.address);
  console.log("Max Supply: 1,000,000,000 FOGMEM");
  console.log("\nNext steps:");
  console.log("1. Create Mint Club V2 bonding curve");
  console.log("2. Verify contract on Basescan");
  console.log("3. Update team token_url");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
