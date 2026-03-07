// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title MockOracle
/// @notice A simple contract to simulate price drops on Ethereum Sepolia.
/// @dev Reactive Network will listen to the `PriceUpdate` event from this contract.
contract MockOracle {
    // --- State ---
    uint256 public price;
    address public owner;

    // --- Events ---
    // Reactive listens for THIS event.
    event PriceUpdate(
        uint256 indexed newPrice,
        uint256 timestamp,
        address indexed updater
    );
    event ReputationUpdate(address indexed agent, uint256 score);

    constructor() {
        owner = msg.sender;
        price = 2000 ether; // Start at $2000 (represented in wei for simplicity)
    }

    /// @notice Updates the price.
    /// @dev Call this with a low value (e.g. 1000) to trigger the "Crash".
    function setPrice(uint256 _price) external {
        price = _price;
        emit PriceUpdate(_price, block.timestamp, msg.sender);
    }

    /// @notice Updates agent reputation.
    function setReputation(address _agent, uint256 _score) external {
        emit ReputationUpdate(_agent, _score);
    }
}
