// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {
    ERC721URIStorage
} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title AegisGuardianRegistry (ERC-8004 Standard)
 * @notice Full implementation of Identity (ERC-721) and Reputation.
 */
contract AegisGuardianRegistry is Ownable, ERC721URIStorage {
    // --- Identity Registry Storage ---
    uint256 private _nextAgentId = 1;
    mapping(address => uint256) public addressToAgentId;
    mapping(uint256 => address) public agentIdToAddress;

    // --- Reputation Registry Storage ---
    struct Feedback {
        address client;
        int128 value;
        uint8 valueDecimals;
        string tag1;
        string tag2;
        uint64 timestamp;
    }

    // agentId => Feedback[]
    mapping(uint256 => Feedback[]) public agentFeedback;

    // --- Events (ERC-8004 Standard) ---
    event Registered(
        uint256 indexed agentId,
        string agentURI,
        address indexed owner
    );
    event NewFeedback(
        uint256 indexed agentId,
        address indexed agentAddress, // Added for Reactive Sentinel
        address indexed clientAddress,
        uint64 feedbackIndex,
        int128 value,
        uint8 valueDecimals,
        string tag1,
        string tag2,
        string endpoint,
        string feedbackURI,
        bytes32 feedbackHash
    );

    constructor() Ownable(msg.sender) ERC721("Aegis Guardian", "AEGIS") {}

    // --- Identity Functions ---

    /// @notice Registers a new agent by minting an NFT
    function register(string calldata _agentURI) external returns (uint256) {
        require(addressToAgentId[msg.sender] == 0, "Already registered");

        uint256 agentId = _nextAgentId++;
        _mint(msg.sender, agentId);
        _setTokenURI(agentId, _agentURI);

        addressToAgentId[msg.sender] = agentId;
        agentIdToAddress[agentId] = msg.sender;

        emit Registered(agentId, _agentURI, msg.sender);
        return agentId;
    }

    // Required override for ERC721URIStorage
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // Required override for ERC721URIStorage
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getAgentId(address _addr) external view returns (uint256) {
        return addressToAgentId[_addr];
    }

    // --- Reputation Functions ---

    /// @notice Records feedback (ERC-8004 compliant signature)
    function giveFeedback(
        uint256 agentId,
        int128 value,
        uint8 valueDecimals,
        string calldata tag1,
        string calldata tag2,
        string calldata endpoint,
        string calldata feedbackURI,
        bytes32 feedbackHash
    ) external {
        // Enforce that agent exists (ownerOf throws if nonexistent)
        require(_ownerOf(agentId) != address(0), "Agent not found");

        Feedback memory fb = Feedback({
            client: msg.sender,
            value: value,
            valueDecimals: valueDecimals,
            tag1: tag1,
            tag2: tag2,
            timestamp: uint64(block.timestamp)
        });

        agentFeedback[agentId].push(fb);
        uint64 index = uint64(agentFeedback[agentId].length - 1);

        emit NewFeedback(
            agentId,
            agentIdToAddress[agentId], // agentAddress
            msg.sender, // clientAddress
            index, // feedbackIndex
            value,
            valueDecimals,
            tag1,
            tag2,
            endpoint,
            feedbackURI,
            feedbackHash
        );
    }

    // --- View Functions ---

    function getFeedbackCount(uint256 agentId) external view returns (uint256) {
        return agentFeedback[agentId].length;
    }

    // Simple aggregation for the dashboard
    function getTotalStabilizedVolume(
        uint256 agentId
    ) external view returns (int128 total) {
        Feedback[] memory feeds = agentFeedback[agentId];
        for (uint i = 0; i < feeds.length; i++) {
            if (
                keccak256(bytes(feeds[i].tag1)) ==
                keccak256(bytes("stabilized_volume"))
            ) {
                total += feeds[i].value;
            }
        }
    }
}
