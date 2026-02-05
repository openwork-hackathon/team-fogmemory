import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();
  
  // Contract addresses from deployment
  const tokenAddress = "0x3e4F322f23eCC6EdbF8b88E9429B1544E42e894A";
  const registryAddress = "0xa26364D2467447460f6F9CB5693C56b53fEc732E";
  const verifierAddress = "0xEa2619169a9F6f55CDeC1ffCa98ba5bCcf384022";
  
  console.log("Configuring contracts...");
  console.log("Deployer:", deployer.address);
  
  // Get contract instances
  const token = await ethers.getContractAt("FogMemoryToken", tokenAddress);
  const verifier = await ethers.getContractAt("FogMemoryVerifier", verifierAddress);
  
  // Add deployer as verifier
  console.log("\n1. Adding deployer as verifier...");
  const tx1 = await verifier.addVerifier(deployer.address, "Deployer Verifier", {
    gasPrice: ethers.parseUnits("0.1", "gwei")
  });
  await tx1.wait();
  console.log("✓ Deployer added as verifier");
  
  // Transfer token ownership to registry
  console.log("\n2. Transferring token ownership to registry...");
  const tx2 = await token.transferOwnership(registryAddress, {
    gasPrice: ethers.parseUnits("0.1", "gwei")
  });
  await tx2.wait();
  console.log("✓ Token ownership transferred to Registry");
  
  console.log("\n========================================");
  console.log("🌫️ FOGMEMORY FULLY CONFIGURED!");
  console.log("========================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
