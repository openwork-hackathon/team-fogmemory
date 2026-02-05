import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying FogMemory contracts with account:", deployer.address);
  console.log("Network:", (await ethers.provider.getNetwork()).name);
  
  // Deploy Token (if not already deployed)
  console.log("\n1. Deploying FogMemoryToken...");
  const FogMemoryToken = await ethers.getContractFactory("FogMemoryToken");
  const token = await FogMemoryToken.deploy(deployer.address);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("✓ FogMemoryToken deployed:", tokenAddress);
  
  // Deploy Registry
  console.log("\n2. Deploying FogMemoryRegistry...");
  const FogMemoryRegistry = await ethers.getContractFactory("FogMemoryRegistry");
  const registry = await FogMemoryRegistry.deploy(tokenAddress);
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();
  console.log("✓ FogMemoryRegistry deployed:", registryAddress);
  
  // Deploy Verifier
  console.log("\n3. Deploying FogMemoryVerifier...");
  const FogMemoryVerifier = await ethers.getContractFactory("FogMemoryVerifier");
  const verifier = await FogMemoryVerifier.deploy();
  await verifier.waitForDeployment();
  const verifierAddress = await verifier.getAddress();
  console.log("✓ FogMemoryVerifier deployed:", verifierAddress);
  
  // Configure connections
  console.log("\n4. Configuring contracts...");
  
  // Add registry as minter on token
  await token.transferOwnership(registryAddress);
  console.log("✓ Token ownership transferred to Registry");
  
  // Add deployer as verifier
  await verifier.addVerifier(deployer.address, "Deployer Verifier");
  console.log("✓ Deployer added as verifier");
  
  // Print summary
  console.log("\n========================================");
  console.log("🌫️ FOGMEMORY CONTRACTS DEPLOYED");
  console.log("========================================");
  console.log("Token:     ", tokenAddress);
  console.log("Registry:  ", registryAddress);
  console.log("Verifier:  ", verifierAddress);
  console.log("========================================");
  console.log("\nNext steps:");
  console.log("1. Verify contracts on Basescan");
  console.log("2. Fund registry with FOGMEM for gasless operations (optional)");
  console.log("3. Add more verifiers");
  console.log("4. Update team with contract addresses");
  console.log("\nVerification command:");
  console.log(`npx hardhat verify --network base ${tokenAddress} ${deployer.address}`);
  console.log(`npx hardhat verify --network base ${registryAddress} ${tokenAddress}`);
  console.log(`npx hardhat verify --network base ${verifierAddress}`);
  
  // Save deployment info
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      FogMemoryToken: tokenAddress,
      FogMemoryRegistry: registryAddress,
      FogMemoryVerifier: verifierAddress
    }
  };
  
  const fs = require('fs');
  fs.writeFileSync(
    'deployment.json',
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\n✓ Deployment info saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
