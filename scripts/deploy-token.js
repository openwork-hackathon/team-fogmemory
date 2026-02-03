const { ethers } = require('ethers');
const fs = require('fs');

// Config
const BASE_RPC = 'https://mainnet.base.org';
const MCV2_BOND = '0xc5a076cad94176c2996B32d8466Be1cE757FAa27';
const OPENWORK = '0x299c30DD5974BF4D5bFE42C340CA40462816AB07';

// Mint Club V2 Bond ABI
const BOND_ABI = [
  {
    "name": "createToken",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "tp",
        "type": "tuple",
        "components": [
          { "name": "name", "type": "string" },
          { "name": "symbol", "type": "string" },
          { "name": "uri", "type": "string" }
        ]
      },
      {
        "name": "bp",
        "type": "tuple",
        "components": [
          { "name": "mintRoyalty", "type": "uint16" },
          { "name": "burnRoyalty", "type": "uint16" },
          { "name": "reserveToken", "type": "address" },
          { "name": "maxSupply", "type": "uint128" },
          { "name": "stepRanges", "type": "uint128[]" },
          { "name": "stepPrices", "type": "uint128[]" }
        ]
      }
    ],
    "outputs": [{ "name": "", "type": "address" }]
  }
];

const ERC20_ABI = [
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
];

async function main() {
  // Load wallet
  const walletData = JSON.parse(fs.readFileSync(process.env.HOME + '/.config/clawtasks/wallet.json', 'utf8'));
  const provider = new ethers.JsonRpcProvider(BASE_RPC);
  const wallet = new ethers.Wallet(walletData.privateKey, provider);
  
  console.log('Deploying $FOGMEM token...');
  console.log('Wallet:', wallet.address);
  
  // Check balance
  const ethBalance = await provider.getBalance(wallet.address);
  console.log('ETH balance:', ethers.formatEther(ethBalance));
  
  const openwork = new ethers.Contract(OPENWORK, ERC20_ABI, wallet);
  const owBalance = await openwork.balanceOf(wallet.address);
  console.log('$OPENWORK balance:', ethers.formatUnits(owBalance, 18));
  
  const bond = new ethers.Contract(MCV2_BOND, BOND_ABI, wallet);
  
  // Token params
  const tokenParams = {
    name: 'FogMemory Token',
    symbol: 'FOGMEM',
    uri: ''
  };
  
  // Bonding curve params (3 steps as required)
  const bondParams = {
    mintRoyalty: 100,      // 1% mint fee
    burnRoyalty: 100,      // 1% burn fee
    reserveToken: OPENWORK,
    maxSupply: ethers.parseUnits('1000000000', 18), // 1 billion max supply
    stepRanges: [
      ethers.parseUnits('100000000', 18),   // First 100M tokens
      ethers.parseUnits('500000000', 18),   // Next 400M tokens  
      ethers.parseUnits('1000000000', 18),  // Final 500M tokens
    ],
    stepPrices: [
      ethers.parseUnits('0.00001', 18),   // Step 1
      ethers.parseUnits('0.00005', 18),   // Step 2
      ethers.parseUnits('0.0001', 18),    // Step 3
    ],
  };
  
  console.log('\nToken params:', tokenParams);
  console.log('Creating token with 3-step bonding curve...');
  
  try {
    const tx = await bond.createToken(
      tokenParams,
      bondParams,
      { gasLimit: 500000 }
    );
    
    console.log('Transaction sent:', tx.hash);
    console.log('Waiting for confirmation...');
    
    const receipt = await tx.wait();
    console.log('\n✅ Transaction confirmed!');
    console.log('Block:', receipt.blockNumber);
    console.log('Gas used:', receipt.gasUsed.toString());
    console.log('\n🎉 $FOGMEM token deployed!');
    console.log('View on Mint Club: https://mint.club/token/base/FOGMEM');
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.reason) console.error('Reason:', error.reason);
    if (error.code) console.error('Code:', error.code);
  }
}

main().catch(console.error);
