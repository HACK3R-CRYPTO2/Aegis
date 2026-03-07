// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GuardianRegistry {
    struct GuardianStats {
        string name;
        uint256 totalStabilizedVolume;
        uint256 interventionCount;
        uint256 lastActive;
    }

    mapping(address => GuardianStats) public guardians;
    address public aegisHook;
    address public owner;

    event GuardianRegistered(address indexed agent, string name);
    event InterventionRecorded(address indexed agent, uint256 volume);

    modifier onlyHook() {
        require(msg.sender == aegisHook, "Only AegisHook");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setAegisHook(address _hook) external {
        require(msg.sender == owner, "Only Owner");
        aegisHook = _hook;
    }

    function registerGuardian(string calldata _name) external {
        guardians[msg.sender].name = _name;
        emit GuardianRegistered(msg.sender, _name);
    }

    function recordIntervention(
        address _agent,
        uint256 _volume
    ) external onlyHook {
        GuardianStats storage stats = guardians[_agent];
        stats.totalStabilizedVolume += _volume;
        stats.interventionCount++;
        stats.lastActive = block.timestamp;

        emit InterventionRecorded(_agent, _volume);
    }

    function getGuardianStats(
        address _agent
    ) external view returns (GuardianStats memory) {
        return guardians[_agent];
    }
}
