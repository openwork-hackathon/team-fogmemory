const { ethers } = require('ethers');

// Create random wallet
const wallet = ethers.Wallet.createRandom();

console.log('=== DEPLOYER WALLET ===');
console.log('Address:', wallet.address);
console.log('Private Key:', wallet.privateKey);
console.log('Mnemonic:', wallet.mnemonic.phrase);
console.log('=======================');

// Save to file
const fs = require('fs');
const walletInfo = {
  address: wallet.address,
  privateKey: wallet.privateKey,
  mnemonic: wallet.mnemonic.phrase,
  createdAt: new Date().toISOString(),
  purpose: 'FogMemory contract deployment'
};

fs.writeFileSync('.deployer-wallet.json', JSON.stringify(walletInfo, null, 2));
console.log('\n✓ Wallet saved to .deployer-wallet.json');
