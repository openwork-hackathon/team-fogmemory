// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./FogMemoryToken.sol";

/**
 * @title FogMemory Registry
 * @dev Core contract for persistent agent memory storage
 * Agents store memory hashes on-chain with metadata URIs (IPFS)
 * Full memory content lives off-chain, proofs live on-chain
 */
contract FogMemoryRegistry is Ownable, ReentrancyGuard {
    
    FogMemoryToken public token;
    
    // ============ Structs ============
    
    struct MemoryEntry {
        bytes32 memoryHash;      // Hash of memory content
        address agent;           // Agent who stored it
        uint256 timestamp;       // When stored
        uint256 blockNumber;     // Block for verification
        string metadataURI;      // IPFS/Arweave URI for full data
        bytes32[] tags;          // Semantic tags (hashed)
        bool isActive;           // Soft delete flag
        uint256 importance;      // 1-100 importance score
    }
    
    struct AgentProfile {
        address agentAddress;
        string name;
        string metadataURI;
        uint256 totalMemories;
        uint256 reputationScore;
        bool isRegistered;
        uint256 registrationTime;
    }
    
    // ============ State ============
    
    // memoryHash => MemoryEntry
    mapping(bytes32 => MemoryEntry) public memories;
    
    // agent => memoryHashes[]
    mapping(address => bytes32[]) public agentMemoryHashes;
    
    // agent => AgentProfile
    mapping(address => AgentProfile) public agentProfiles;
    
    // tag => memoryHashes[] (for search)
    mapping(bytes32 => bytes32[]) public tagToMemories;
    
    // All registered agents
    address[] public registeredAgents;
    
    // ============ Config ============
    
    uint256 public storageFee = 10 * 10**18; // 10 FOGMEM per memory
    uint256 public minImportance = 1;
    uint256 public maxImportance = 100;
    
    // ============ Events ============
    
    event MemoryStored(
        bytes32 indexed memoryHash,
        address indexed agent,
        uint256 timestamp,
        string metadataURI
    );
    
    event MemoryRetrieved(
        bytes32 indexed memoryHash,
        address indexed agent,
        address indexed retriever
    );
    
    event AgentRegistered(
        address indexed agent,
        string name,
        uint256 timestamp
    );
    
    event MemoryUpdated(
        bytes32 indexed memoryHash,
        uint256 newImportance,
        bool isActive
    );
    
    // ============ Constructor ============
    
    constructor(address _tokenAddress) Ownable(msg.sender) {
        token = FogMemoryToken(_tokenAddress);
    }
    
    // ============ Agent Management ============
    
    /**
     * @dev Register as an agent on FogMemory
     */
    function registerAgent(
        string calldata name,
        string calldata metadataURI
    ) external returns (bool) {
        require(!agentProfiles[msg.sender].isRegistered, "Already registered");
        
        agentProfiles[msg.sender] = AgentProfile({
            agentAddress: msg.sender,
            name: name,
            metadataURI: metadataURI,
            totalMemories: 0,
            reputationScore: 0,
            isRegistered: true,
            registrationTime: block.timestamp
        });
        
        registeredAgents.push(msg.sender);
        
        emit AgentRegistered(msg.sender, name, block.timestamp);
        return true;
    }
    
    /**
     * @dev Store a memory on-chain
     */
    function storeMemory(
        bytes32 memoryHash,
        string calldata metadataURI,
        bytes32[] calldata tags,
        uint256 importance
    ) external nonReentrant returns (bool) {
        require(agentProfiles[msg.sender].isRegistered, "Agent not registered");
        require(memories[memoryHash].timestamp == 0, "Memory exists");
        require(importance >= minImportance && importance <= maxImportance, "Invalid importance");
        require(bytes(metadataURI).length > 0, "Empty metadata");
        
        // Take payment
        require(
            token.transferFrom(msg.sender, address(this), storageFee),
            "Payment failed"
        );
        
        // Burn half, keep half for treasury
        uint256 burnAmount = storageFee / 2;
        token.burn(burnAmount);
        
        // Store memory
        memories[memoryHash] = MemoryEntry({
            memoryHash: memoryHash,
            agent: msg.sender,
            timestamp: block.timestamp,
            blockNumber: block.number,
            metadataURI: metadataURI,
            tags: tags,
            isActive: true,
            importance: importance
        });
        
        agentMemoryHashes[msg.sender].push(memoryHash);
        agentProfiles[msg.sender].totalMemories++;
        
        // Index tags
        for (uint i = 0; i < tags.length; i++) {
            tagToMemories[tags[i]].push(memoryHash);
        }
        
        emit MemoryStored(memoryHash, msg.sender, block.timestamp, metadataURI);
        return true;
    }
    
    /**
     * @dev Retrieve memory
     */
    function getMemory(bytes32 memoryHash) external view returns (MemoryEntry memory) {
        MemoryEntry memory entry = memories[memoryHash];
        require(entry.timestamp > 0, "Memory not found");
        require(entry.isActive, "Memory inactive");
        
        return entry;
    }
    
    /**
     * @dev Get all memories for an agent
     */
    function getAgentMemories(address agent) external view returns (bytes32[] memory) {
        require(agentProfiles[agent].isRegistered, "Agent not registered");
        return agentMemoryHashes[agent];
    }
    
    /**
     * @dev Search memories by tag
     */
    function getMemoriesByTag(bytes32 tag) external view returns (bytes32[] memory) {
        return tagToMemories[tag];
    }
    
    /**
     * @dev Update memory importance or soft delete
     */
    function updateMemory(
        bytes32 memoryHash,
        uint256 newImportance,
        bool isActive
    ) external returns (bool) {
        MemoryEntry storage entry = memories[memoryHash];
        require(entry.agent == msg.sender, "Not your memory");
        require(newImportance >= minImportance && newImportance <= maxImportance, "Invalid importance");
        
        entry.importance = newImportance;
        entry.isActive = isActive;
        
        emit MemoryUpdated(memoryHash, newImportance, isActive);
        return true;
    }
    
    /**
     * @dev Get agent profile
     */
    function getAgentProfile(address agent) external view returns (AgentProfile memory) {
        return agentProfiles[agent];
    }
    
    /**
     * @dev Get all registered agents count
     */
    function getAgentCount() external view returns (uint256) {
        return registeredAgents.length;
    }
    
    // ============ Admin ============
    
    function setStorageFee(uint256 newFee) external onlyOwner {
        storageFee = newFee;
    }
    
    function withdrawTreasury(address to, uint256 amount) external onlyOwner {
        require(token.transfer(to, amount), "Withdraw failed");
    }
}
