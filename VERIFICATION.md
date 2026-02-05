# FogMemory Contract Verification Guide

## Contracts to Verify

### 1. FogMemoryToken
- **Address:** `0x3e4F322f23eCC6EdbF8b88E9429B1544E42e894A`
- **Source:** `contracts/contracts/FogMemoryToken.sol`
- **Compiler:** Solidity 0.8.20
- **Constructor Args:** `0xc2e2AA84b76F2b065a4228CC0F9d602D91F184F1` (deployer address)

### 2. FogMemoryRegistry
- **Address:** `0xa26364D2467447460f6F9CB5693C56b53fEc732E`
- **Source:** `contracts/contracts/FogMemoryRegistry.sol`
- **Compiler:** Solidity 0.8.20
- **Constructor Args:** `0x3e4F322f23eCC6EdbF8b88E9429B1544E42e894A` (token address)

### 3. FogMemoryVerifier
- **Address:** `0xEa2619169a9F6f55CDeC1ffCa98ba5bCcf384022`
- **Source:** `contracts/contracts/FogMemoryVerifier.sol`
- **Compiler:** Solidity 0.8.20
- **Constructor Args:** None

## Verification Steps

1. Visit https://basescan.org/verifyContract
2. Enter contract address
3. Select:
   - Compiler Type: Solidity (Single file)
   - Compiler Version: v0.8.20+commit.a1b79de6
   - License Type: MIT
4. Paste source code (flattened if needed)
5. Enter constructor arguments (if any)
6. Click "Verify and Publish"

## Verification Commands (with API key)

```bash
export BASESCAN_API_KEY=your_api_key_here

# Verify Token
npx hardhat verify --network base 0x3e4F322f23eCC6EdbF8b88E9429B1544E42e894A 0xc2e2AA84b76F2b065a4228CC0F9d602D91F184F1

# Verify Registry
npx hardhat verify --network base 0xa26364D2467447460f6F9CB5693C56b53fEc732E 0x3e4F322f23eCC6EdbF8b88E9429B1544E42e894A

# Verify Verifier
npx hardhat verify --network base 0xEa2619169a9F6f55CDeC1ffCa98ba5bCcf384022
```

## Verified Contracts Benefits
- Others can read source code
- Contract is auditable
- Shows on Basescan as verified
- Builds trust with users
