// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FogMemory Token
 * @dev $FOGMEM - Platform token for FogMemory persistent memory infrastructure
 * Backed by $OPENWORK on Base via Mint Club V2
 */
contract FogMemoryToken is ERC20, Ownable {
    // Events
    event MemoryStored(bytes32 indexed memoryHash, address indexed agent, uint256 timestamp);
    event MemoryVerified(bytes32 indexed memoryHash, address indexed verifier);
    
    // Structs
    struct MemoryProof {
        bytes32 memoryHash;
        address agent;
        uint256 timestamp;
        bool verified;
        string metadataURI;
    }
    
    // State
    mapping(bytes32 => MemoryProof) public memories;
    mapping(address => uint256) public agentMemoryCount;
    bytes32[] public allMemoryHashes;
    
    // Token economics
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1B tokens
    uint256 public memoryStorageFee = 1 * 10**18; // 1 FOGMEM per storage
    
    constructor(
        address initialOwner
    ) ERC20("FogMemory", "FOGMEM") Ownable(initialOwner) {
        // Initial supply minted during Mint Club V2 bonding curve setup
    }
    
    /**
     * @dev Store a memory proof on-chain
     * @param memoryHash Hash of the memory content
     * @param metadataURI IPFS or other URI for full memory data
     */
    function storeMemory(
        bytes32 memoryHash,
        string calldata metadataURI
    ) external returns (bool) {
        require(memories[memoryHash].timestamp == 0, "Memory already exists");
        require(totalSupply() + memoryStorageFee <= MAX_SUPPLY, "Max supply reached");
        
        // Burn fee from caller
        _burn(msg.sender, memoryStorageFee);
        
        // Store memory proof
        memories[memoryHash] = MemoryProof({
            memoryHash: memoryHash,
            agent: msg.sender,
            timestamp: block.timestamp,
            verified: false,
            metadataURI: metadataURI
        });
        
        agentMemoryCount[msg.sender]++;
        allMemoryHashes.push(memoryHash);
        
        emit MemoryStored(memoryHash, msg.sender, block.timestamp);
        return true;
    }
    
    /**
     * @dev Verify a memory (called by oracle/verifier)
     * @param memoryHash Hash of the memory to verify
     */
    function verifyMemory(bytes32 memoryHash) external onlyOwner returns (bool) {
        require(memories[memoryHash].timestamp > 0, "Memory does not exist");
        require(!memories[memoryHash].verified, "Already verified");
        
        memories[memoryHash].verified = true;
        
        emit MemoryVerified(memoryHash, msg.sender);
        return true;
    }
    
    /**
     * @dev Get all memories for an agent
     */
    function getAgentMemories(address agent) external view returns (bytes32[] memory) {
        uint256 count = agentMemoryCount[agent];
        bytes32[] memory agentMemories = new bytes32[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < allMemoryHashes.length; i++) {
            if (memories[allMemoryHashes[i]].agent == agent) {
                agentMemories[index] = allMemoryHashes[i];
                index++;
            }
        }
        
        return agentMemories;
    }
    
    /**
     * @dev Update storage fee
     */
    function setStorageFee(uint256 newFee) external onlyOwner {
        memoryStorageFee = newFee;
    }
    
    /**
     * @dev Mint tokens (only for initial setup/Mint Club integration)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }
}
