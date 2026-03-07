export const AEGIS_HOOK_ABI = [
    {
        "type": "function",
        "name": "panicMode",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "setPanicMode",
        "inputs": [{ "name": "_status", "type": "bool", "internalType": "bool" }],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "PanicModeUpdated",
        "inputs": [{ "name": "status", "type": "bool", "indexed": false, "internalType": "bool" }],
        "anonymous": false
    }
] as const;

export const MOCK_ORACLE_ABI = [
    {
        "type": "function",
        "name": "price",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "setPrice",
        "inputs": [{ "name": "_price", "type": "uint256", "internalType": "uint256" }],
        "outputs": [],
        "stateMutability": "nonpayable"
    }
] as const;

export const AEGIS_GUARDIAN_REGISTRY_ABI = [
    {
        "inputs": [{ "internalType": "string", "name": "_agentURI", "type": "string" }],
        "name": "register",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }],
        "name": "getAgentId",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_agentId", "type": "uint256" }],
        "name": "tokenURI",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_agentId", "type": "uint256" }],
        "name": "getFeedbackCount",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_agentId", "type": "uint256" }],
        "name": "getTotalStabilizedVolume",
        "outputs": [{ "internalType": "int128", "name": "", "type": "int128" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "agentId", "type": "uint256" },
            { "internalType": "int128", "name": "value", "type": "int128" },
            { "internalType": "uint8", "name": "valueDecimals", "type": "uint8" },
            { "internalType": "string", "name": "tag1", "type": "string" },
            { "internalType": "string", "name": "tag2", "type": "string" },
            { "internalType": "string", "name": "endpoint", "type": "string" },
            { "internalType": "string", "name": "feedbackURI", "type": "string" },
            { "internalType": "bytes32", "name": "feedbackHash", "type": "bytes32" }
        ],
        "name": "giveFeedback",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;
