# Foundry Configuration
Relevant source files
- [contracts/foundry.lock](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock)
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml)

This page documents the Foundry configuration defined in `foundry.toml`, which controls the build, test, and deployment behavior of the Aegis smart contracts. This includes compiler settings, dependency remappings, network endpoints, and linting rules.

For information about initializing the Git submodules referenced in this configuration, see [Git Submodules](/HACK3R-CRYPTO/Aegis/4.3-git-submodules). For details about the deployment scripts that utilize these network configurations, see [Deployment Scripts](/HACK3R-CRYPTO/Aegis/3.1-deployment-scripts).

## Configuration File Structure

The Foundry configuration is defined in [contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27) and is organized into four main sections:

**Foundry Configuration Sections**

```
foundry.toml

[profile.default]
Compiler & Build Settings

[rpc_endpoints]
Network Configurations

[lint]
Code Quality Rules

Compiler Settings:
solc_version, evm_version

Build Settings:
via_ir, bytecode_hash

Path Configuration:
src, out, libs

Remappings:
Dependency Aliases

Permissions:
ffi, fs_permissions

sepolia
Ethereum L1 Testnet

reactive
Reactive Network Kopli

unichain_sepolia
Unichain L2 Testnet

exclude_lints

lint_on_build
```

Sources: [contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)

## Profile Configuration

The `[profile.default]` section [contracts/foundry.toml1-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L16) defines the primary build configuration used by all Foundry commands (`forge build`, `forge test`, `forge script`).

### Compiler Settings
SettingValuePurpose`solc_version``"0.8.26"`Solidity compiler version for all contracts`evm_version``"cancun"`Target EVM version (latest Ethereum upgrade)`via_ir``true`Enable IR-based code generation for better optimization`bytecode_hash``"none"`Exclude metadata hash from bytecode for deterministic builds
The `via_ir = true` setting [contracts/foundry.toml16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L16-L16) is particularly important for Uniswap v4 hook development, as it enables advanced optimization passes required for complex hook logic within gas constraints.

Sources: [contracts/foundry.toml2-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L2-L16)

### Directory Structure
SettingValuePurpose`src``"src"`Source code directory containing Solidity contracts`out``"out"`Build output directory for compiled artifacts`libs``["lib"]`Dependency directory for Git submodules
Sources: [contracts/foundry.toml6-15](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L6-L15)

### Permission Settings

The configuration grants specific permissions for advanced Foundry features:

- **`ffi = true`**[contracts/foundry.toml4](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L4-L4): Enables Foreign Function Interface, allowing scripts to execute shell commands. This is used by the HookMiner script for calculating CREATE2 salts.
- **`fs_permissions`**[contracts/foundry.toml5](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L5-L5): Grants read-write access to the `.forge-snapshots/` directory for gas snapshot storage.

Sources: [contracts/foundry.toml4-5](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L4-L5)

## Dependency Remappings

The `remappings` array [contracts/foundry.toml9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L9-L14) defines import path aliases that map external libraries to their Git submodule locations. This allows contracts to use clean import statements without complex relative paths.

**Remapping Architecture**

```
Git Submodules

foundry.toml Remappings

Contract Imports

AegisHook.sol
import 'v4-core/...'

AegisSentinel.sol
import 'reactive-lib/...'

v4-core/
→ lib/uniswap-hooks/lib/v4-core/

v4-periphery/
→ lib/uniswap-hooks/lib/v4-periphery/

reactive-lib/
→ lib/system-smart-contracts/lib/reactive-lib/src/

system-smart-contracts/
→ lib/system-smart-contracts/src/

lib/uniswap-hooks/

lib/system-smart-contracts/

lib/forge-std/
```

Sources: [contracts/foundry.toml9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L9-L14)

### Remapping Details

Each remapping follows the pattern `alias/=actual/path/`:
AliasTarget PathPurpose`reactive-lib/``lib/system-smart-contracts/lib/reactive-lib/src/`Reactive Network event subscription utilities`system-smart-contracts/``lib/system-smart-contracts/src/`Core reactive contracts (AbstractReactive, etc.)`v4-core/``lib/uniswap-hooks/lib/v4-core/`Uniswap v4 core interfaces (IHooks, IPoolManager)`v4-periphery/``lib/uniswap-hooks/lib/v4-periphery/`Uniswap v4 peripheral contracts and utilities
Note that `v4-core` and `v4-periphery` are nested submodules within the `uniswap-hooks` submodule, demonstrating support for transitive dependencies.

Sources: [contracts/foundry.toml9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L9-L14)

## RPC Endpoints

The `[rpc_endpoints]` section [contracts/foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L19-L22) defines network connection URLs used by deployment scripts and fork testing. These endpoints are referenced in deployment commands via the `--rpc-url` flag.

**Network Configuration Mapping**

```
Live Networks

foundry.toml [rpc_endpoints]

Deployment Scripts

04_DeployOracle.s.sol
--rpc-url sepolia

05_DeploySentinel.s.sol
--rpc-url reactive

06_DeployHook.s.sol
--rpc-url unichain_sepolia

sepolia
→ eth-sepolia.g.alchemy.com

reactive
→ lasna-rpc.rnk.dev

unichain_sepolia
→ unichain-sepolia-rpc.publicnode.com

Ethereum Sepolia
Chain ID: 11155111

Reactive Kopli
Chain ID: 5318007

Unichain Sepolia
Chain ID: 1301
```

Sources: [contracts/foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L19-L22)

### Endpoint Configuration
Endpoint NameRPC URLNetwork`sepolia``https://eth-sepolia.g.alchemy.com/v2/uHo7ICSBqpDRguF-DhjWWF72l-sPapYX`Ethereum Sepolia (L1)`reactive``https://lasna-rpc.rnk.dev/`Reactive Network Kopli`unichain_sepolia``https://unichain-sepolia-rpc.publicnode.com`Unichain Sepolia (L2)
The Sepolia endpoint uses an Alchemy API key embedded in the configuration. In production environments, this should be moved to an environment variable using the `$VARIABLE_NAME` syntax that Foundry supports.

Sources: [contracts/foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L19-L22)

## Linting Configuration

The `[lint]` section [contracts/foundry.toml24-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L24-L26) configures the Forge linter behavior:
SettingValuePurpose`exclude_lints``["screaming-snake-case-immutable", "screaming-snake-case-const"]`Disables warnings for immutable/const naming conventions`lint_on_build``false`Disables automatic linting during `forge build`
The excluded lint rules allow developers to use flexible naming conventions for immutable variables and constants, rather than enforcing strict `SCREAMING_SNAKE_CASE`. Linting can still be manually triggered with `forge fmt --check`.

Sources: [contracts/foundry.toml24-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L24-L26)

## Dependency Version Locking

The [contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11) file locks Git submodule dependencies to specific commit hashes, ensuring reproducible builds across different environments.

**Dependency Lock Structure**

```
foundry.lock

lib/forge-std
Rev: 8bbcf6e3

lib/hookmate
Rev: 33408fbc

lib/uniswap-hooks
Rev: e59fe72c

Test.sol
Script.sol
console.sol

Hook utilities

v4-core/
v4-periphery/
```

Sources: [contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11)

### Locked Dependencies
LibraryCommit HashPurpose`forge-std``8bbcf6e3f8f62f419e5429a0bd89331c85c37824`Foundry standard library for testing and scripting`hookmate``33408fbc15e083eb0bc4205fa37cb6ba0a926f44`Hook development utilities`uniswap-hooks``e59fe72c110c3862eec9b332530dce49ca506bbb`Uniswap v4 hook base contracts
Note that `system-smart-contracts` is not listed in `foundry.lock` because it is managed independently. To update locked dependencies, run `forge update` and commit the modified `foundry.lock` file.

Sources: [contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11)

## Usage Examples

### Building with Configuration

```
# Use default profile configuration
forge build

# Build with size reporting (uses via_ir optimization)
forge build --sizes

# Build with specific Solidity version override
forge build --use 0.8.26
```

### Using RPC Endpoints in Scripts

```
# Deploy to Sepolia using configured endpoint
forge script script/04_DeployOracle.s.sol --rpc-url sepolia --broadcast

# Deploy to Reactive Network
forge script script/05_DeploySentinel.s.sol --rpc-url reactive --legacy --broadcast

# Deploy to Unichain
forge script script/06_DeployHook.s.sol --rpc-url unichain_sepolia --broadcast
```

### Testing with Fork Configuration

```
# Run tests against Sepolia fork
forge test --fork-url sepolia

# Run tests with verbosity
forge test -vvv

# Run specific test using configuration
forge test --match-test testPanicTrigger --fork-url reactive
```

Sources: [contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)

## Configuration Best Practices

1. **Environment Variables**: For production deployments, replace the hardcoded Alchemy API key with `$ALCHEMY_KEY` environment variable references.
2. **Profile Isolation**: Create additional profiles (e.g., `[profile.ci]`, `[profile.production]`) for different environments while keeping `[profile.default]` for local development.
3. **Dependency Updates**: Regularly review and update `foundry.lock` commit hashes to receive security patches, but test thoroughly before updating production deployments.
4. **Remapping Clarity**: When adding new dependencies, ensure remappings are unambiguous and do not conflict with existing paths.
5. **Compiler Consistency**: All contracts in Aegis use Solidity 0.8.26. Avoid mixing compiler versions unless absolutely necessary for compatibility.

Sources: [contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)[contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11)