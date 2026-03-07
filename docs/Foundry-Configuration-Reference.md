# Foundry Configuration Reference

## Overview

This document provides a reference for the Foundry configuration files in the Aegis repository. It covers settings in `foundry.toml`, including compiler options, RPC endpoints, and import remappings.

---

## Main Project Configuration

The primary configuration file at `contracts/foundry.toml` contains all settings for building, testing, and deploying Aegis contracts.

### Profile Settings (`[profile.default]`)

| Setting | Value | Purpose |
| :--- | :--- | :--- |
| `bytecode_hash` | `"none"` | Disables metadata hash injection for deterministic CREATE2 deployment. |
| `evm_version` | `"cancun"` | Targets Cancun EVM opcodes (required for Unichain Sepolia). |
| `solc_version` | `"0.8.26"` | Solidity compiler version. |
| `via_ir` | `true` | Enables IR-based code generation for advanced optimizations. |
| `ffi` | `true` | Allows Foreign Function Interface calls (used by deployment scripts). |
| `libs` | `["lib"]` | Directory containing Git submodule dependencies. |
| `src` | `"src"` | Directory containing contract source files. |
| `out` | `"out"` | Directory for compiled bytecode and ABIs. |
| `fs_permissions` | `[{access = "read-write", path = ".forge-snapshots/"}]` | Grants read-write access to gas snapshot directory. |

### RPC Endpoints (`[rpc_endpoints]`)

Defines network connections for deployment and testing:

| Endpoint Name | URL | Network | Chain ID |
| :--- | :--- | :--- | :--- |
| `sepolia` | `https://eth-sepolia.g.alchemy.com/v2/...` | Ethereum Sepolia | 11155111 |
| `reactive` | `https://lasna-rpc.rnk.dev/` | Reactive Network Lasna | 5318007 |
| `unichain_sepolia` | `https://unichain-sepolia-rpc.publicnode.com` | Unichain Sepolia | 1301 |

### Import Remappings (`remappings`)

Defines import path aliases for external dependencies:

| Remapping | Target Path | Purpose |
| :--- | :--- | :--- |
| `reactive-lib/` | `lib/system-smart-contracts/lib/reactive-lib/src/` | Reactive Network SDK |
| `system-smart-contracts/` | `lib/system-smart-contracts/src/` | Reactive Network system contracts |
| `v4-core/` | `lib/uniswap-hooks/lib/v4-core/` | Uniswap V4 core contracts |
| `v4-periphery/` | `lib/uniswap-hooks/lib/v4-periphery/` | Uniswap V4 periphery contracts |

### Linting Configuration (`[lint]`)

| Setting | Value | Rationale |
| :--- | :--- | :--- |
| `exclude_lints` | `["screaming-snake-case-immutable", "screaming-snake-case-const"]` | Allows camelCase for immutables/constants. |
| `lint_on_build` | `false` | Disables automatic linting during build. |

---

## Forge-std Configuration

The `contracts/lib/forge-std/foundry.toml` file configures the forge-std testing library.

### Formatting (`[fmt]`)

| Setting | Value |
| :--- | :--- |
| `line_length` | `120` |
| `tab_width` | `4` |
| `bracket_spacing` | `false` |
| `int_types` | `'long'` |
| `quote_style` | `'double'` |
| `number_underscore` | `'preserve'` |

---

## Precedence Rules

1.  **Command-line flags** (highest priority): `--rpc-url`, `--optimizer-runs`
2.  **Environment variables**: `FOUNDRY_RPC_URL`, `ETH_RPC_URL`
3.  **Project config**: `contracts/foundry.toml`
4.  **Foundry defaults** (lowest priority)