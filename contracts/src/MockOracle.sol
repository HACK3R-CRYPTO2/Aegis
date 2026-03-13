// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title MockOracle
/// @notice A simple contract to simulate price drops on Ethereum Sepolia.
/// @dev Reactive Network will listen to the `PriceUpdate` event from this contract.
contract MockOracle {
    // --- Errors ---
    error Unauthorized();

    // --- State ---
    address public immutable owner;
    uint256 public price;

    // --- Events ---
    /// @notice Emitted when the oracle price is updated
    event PriceUpdate(
        uint256 indexed newPrice,
        uint256 timestamp,
        address indexed updater
    );
    
    /// @notice Emitted when agent reputation is updated (legacy/mock)
    event ReputationUpdate(address indexed agent, uint256 score);

    constructor() {
        owner = msg.sender;
        price = 2000 ether; // Represented in 18-decimal fixed point
    }

    /// @notice Updates the mock price feed
    /// @dev This simulates market data on Sepolia that Aegis Sentinel monitors
    /// @param _price The new asset price (e.g. 1000 ether for a crash)
    function setPrice(uint256 _price) external {
        // Simulation Note: Public for demo accessibility, restricted in production feeds
        price = _price;
        emit PriceUpdate(_price, block.timestamp, msg.sender);
    }

    /// @notice Updates agent reputation (Mock)
    /// @param _agent The agent address to update
    /// @param _score The reputation score to assign
    function setReputation(address _agent, uint256 _score) external {
        if (msg.sender != owner) revert Unauthorized();
        emit ReputationUpdate(_agent, _score);
    }
}
