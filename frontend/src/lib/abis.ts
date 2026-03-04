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
