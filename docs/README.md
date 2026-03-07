# Aegis Documentation

This directory contains comprehensive documentation for the Aegis cross-chain circuit breaker system.

## System Overview
- [Aegis Overview](Aegis-Overview.md): High-level introduction to the Aegis system, its purpose, and core components.
- [System Architecture](System-Architecture.md): Detailed architectural explanation including the Guardian Network, Oracle System, and Circuit Breaker Logic.
- [Deployment](Deployment.md): Overview of deployed contracts and network addresses.

## Core Smart Contracts
- [Core Smart Contracts](Core-Smart-Contracts.md): Summary of the main contracts.
- [AegisHook](AegisHook.md): Documentation for the Uniswap v4 Hook responsible for pausing trading.
- [AegisSentinel](AegisSentinel.md): Documentation for the Reactive Network sentinel that monitors and coordinates events.
- [MockOracle](MockOracle.md): Documentation for the simulation oracle used in testing.
- [Guardian Registry](Guardian-Registry.md): Documentation for the reputation and access control system for Guardians.

## Infrastructure & Configuration
- [Network Configuration](Network-Configuration.md): Details on RPC endpoints, chain IDs, and network setups.
- [Foundry Setup](Foundry-Setup.md): Guide to installing and configuring the Foundry toolchain.
- [Foundry Configuration Reference](Foundry-Configuration-Reference.md): Reference for `foundry.toml` settings.
- [Dependencies and Submodules](Dependencies-and-Submodules.md): Guide to managing external libraries (forge-std, v4-core, etc.).
- [Build System](Build-System.md): Explanation of the compilation and build process.
- [Project Structure](Project-Structure.md): Guide to the repository layout and file organization.

## Development & Testing
- [Development Guide](Development-Guide.md): Best practices, workflow, and coding standards.
- [Contributing Guidelines](Contributing-Guidelines.md): Instructions for contributing to the project.
- [Forge Standard Library](Forge-Standard-Library.md): Overview of the `forge-std` testing utilities used.
- [Deployment Scripts](Deployment-Scripts.md): Guide to using the provided scripts for multi-chain deployment.

## Frontend
- [Frontend Dashboard](Frontend-Dashboard.md): Documentation for the Next.js monitoring dashboard.
