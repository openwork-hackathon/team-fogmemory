// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FogMemory Verifier
 * @dev Oracle contract for verifying memory authenticity
 * Trusted verifiers can attest to memory validity
 */
contract FogMemoryVerifier is Ownable {
    
    // ============ Structs ============
    
    struct Verification {
        bytes32 memoryHash;
        address verifier;
        uint256 timestamp;
        uint256 confidence; // 0-100
        string notes;
        bool isValid;
    }
    
    struct Verifier {
        address verifierAddress;
        string name;
        uint256 reputation;
        bool isActive;
        uint256 totalVerifications;
    }
    
    // ============ State ============
    
    // memoryHash => Verification[]
    mapping(bytes32 => Verification[]) public verifications;
    
    // verifier address => Verifier
    mapping(address => Verifier) public verifiers;
    
    // Approved verifiers list
    address[] public verifierList;
    
    // Minimum confidence threshold
    uint256 public minConfidenceThreshold = 70;
    
    // ============ Events ============
    
    event MemoryVerified(
        bytes32 indexed memoryHash,
        address indexed verifier,
        bool isValid,
        uint256 confidence
    );
    
    event VerifierAdded(address indexed verifier, string name);
    event VerifierRemoved(address indexed verifier);
    event VerifierReputationUpdated(address indexed verifier, uint256 newReputation);
    
    // ============ Modifiers ============
    
    modifier onlyVerifier() {
        require(verifiers[msg.sender].isActive, "Not an active verifier");
        _;
    }
    
    // ============ Constructor ============
    
    constructor() Ownable(msg.sender) {}
    
    // ============ Verifier Management ============
    
    function addVerifier(address verifierAddress, string calldata name) external onlyOwner {
        require(!verifiers[verifierAddress].isActive, "Already a verifier");
        
        verifiers[verifierAddress] = Verifier({
            verifierAddress: verifierAddress,
            name: name,
            reputation: 50, // Start with neutral reputation
            isActive: true,
            totalVerifications: 0
        });
        
        verifierList.push(verifierAddress);
        
        emit VerifierAdded(verifierAddress, name);
    }
    
    function removeVerifier(address verifierAddress) external onlyOwner {
        require(verifiers[verifierAddress].isActive, "Not a verifier");
        verifiers[verifierAddress].isActive = false;
        
        emit VerifierRemoved(verifierAddress);
    }
    
    // ============ Verification ============
    
    function verifyMemory(
        bytes32 memoryHash,
        bool isValid,
        uint256 confidence,
        string calldata notes
    ) external onlyVerifier returns (bool) {
        require(confidence <= 100, "Confidence must be 0-100");
        require(bytes(notes).length <= 1000, "Notes too long");
        
        Verification memory verification = Verification({
            memoryHash: memoryHash,
            verifier: msg.sender,
            timestamp: block.timestamp,
            confidence: confidence,
            notes: notes,
            isValid: isValid
        });
        
        verifications[memoryHash].push(verification);
        
        Verifier storage verifier = verifiers[msg.sender];
        verifier.totalVerifications++;
        
        // Increase reputation for active verification
        if (isValid && confidence >= minConfidenceThreshold) {
            verifier.reputation = verifier.reputation + 1 > 100 ? 100 : verifier.reputation + 1;
        }
        
        emit MemoryVerified(memoryHash, msg.sender, isValid, confidence);
        return true;
    }
    
    // ============ View Functions ============
    
    function getVerificationCount(bytes32 memoryHash) external view returns (uint256) {
        return verifications[memoryHash].length;
    }
    
    function getVerifications(bytes32 memoryHash) external view returns (Verification[] memory) {
        return verifications[memoryHash];
    }
    
    function getVerifierCount() external view returns (uint256) {
        return verifierList.length;
    }
    
    /**
     * @dev Check if memory meets verification threshold
     */
    function isMemoryVerified(bytes32 memoryHash) external view returns (bool) {
        Verification[] memory memVerifications = verifications[memoryHash];
        
        uint256 validCount = 0;
        uint256 totalConfidence = 0;
        
        for (uint i = 0; i < memVerifications.length; i++) {
            if (memVerifications[i].isValid) {
                validCount++;
                totalConfidence += memVerifications[i].confidence;
            }
        }
        
        if (validCount == 0) return false;
        
        uint256 avgConfidence = totalConfidence / validCount;
        return avgConfidence >= minConfidenceThreshold && validCount >= 2;
    }
    
    // ============ Admin ============
    
    function setConfidenceThreshold(uint256 newThreshold) external onlyOwner {
        require(newThreshold <= 100, "Max 100");
        minConfidenceThreshold = newThreshold;
    }
}
