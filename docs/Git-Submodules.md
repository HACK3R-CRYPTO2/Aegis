# Git Submodules
Relevant source files
- [contracts/.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules)
- [contracts/foundry.lock](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock)

## Purpose and Scope

This page documents the Git submodules used in the Aegis contracts directory, their purposes, initialization procedures, and version management. Git submodules are external dependencies tracked at specific commit references to ensure reproducible builds.

For higher-level dependency information, see [Dependencies](/HACK3R-CRYPTO/Aegis/6-dependencies). For Foundry-specific configuration of how these submodules are imported, see [Foundry Configuration](/HACK3R-CRYPTO/Aegis/4.4-foundry-configuration).

---

## Overview

The Aegis project uses Git submodules to manage external Solidity libraries and frameworks. All submodules are located in the `contracts/lib/` directory and are defined in [contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13) This approach ensures:

- **Reproducible builds**: Each submodule is pinned to a specific commit
- **Offline development**: Dependencies are vendored in the repository
- **Foundry compatibility**: The Foundry toolchain natively supports this dependency management pattern

The submodules provide critical functionality ranging from testing frameworks to Uniswap v4 hook interfaces to cross-chain reactive contract primitives.

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

---

## Submodule Directory

The following table lists all Git submodules configured in the Aegis repository:
Submodule PathRepositoryPurposeKey Exports`lib/forge-std`[foundry-rs/forge-std](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry-rs/forge-std)Foundry Standard Library for testing and deployment`Test.sol`, `Script.sol`, `console.sol`, `Vm.sol``lib/uniswap-hooks`[openzeppelin/uniswap-hooks](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/openzeppelin/uniswap-hooks)OpenZeppelin audited base implementations for Uniswap v4 hooksBase hook contracts with safety patterns`lib/hookmate`[akshatmittal/hookmate](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/akshatmittal/hookmate)Hook development utilities and patternsHook utility functions, common patterns`lib/system-smart-contracts`[Reactive-Network/system-smart-contracts](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/Reactive-Network/system-smart-contracts)Reactive Network core contracts for cross-chain event monitoring`AbstractReactive`, `IReactive`, subscription interfaces
**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

---

## Submodule Architecture

The following diagram shows how the Git submodules are organized in the repository structure:

```
HACK3R-CRYPTO/Aegis Repository

contracts/script/

contracts/test/

contracts/src/

contracts/lib/

defines

defines

defines

defines

pins commit

pins commit

pins commit

imported by

imported by

inherited by

used by

inherited by

testing

testing

testing

testing

*.s.sol Deploy Scripts

.gitmodules
Submodule Configuration

forge-std/
foundry-rs/forge-std

uniswap-hooks/
openzeppelin/uniswap-hooks

hookmate/
akshatmittal/hookmate

system-smart-contracts/
Reactive-Network/system-smart-contracts

foundry.lock
Version Pins

*.t.sol Test Files

AegisHook.sol

AegisSentinel.sol

MockOracle.sol

AegisGuardianRegistry.sol
```

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)[contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11)

---

## Initialization and Updates

### Initial Clone

When cloning the Aegis repository for the first time, initialize all submodules using:

```
git clone https://github.com/HACK3R-CRYPTO/Aegis.git
cd Aegis/contracts
git submodule update --init --recursive
```

The `--recursive` flag ensures nested submodules within dependencies are also initialized.

### Using Foundry

Foundry provides a convenience command that automatically manages submodules:

```
forge install
```

This command:

1. Reads the `.gitmodules` file
2. Initializes all submodules
3. Checks out the commits specified in `foundry.lock`
4. Updates `.gitmodules` if needed

### Updating a Specific Submodule

To update a submodule to a newer commit:

```
cd lib/forge-std
git fetch origin
git checkout <commit-hash-or-branch>
cd ../..
forge update lib/forge-std
```

The `forge update` command records the new commit in `foundry.lock`.

### Updating All Submodules

To update all submodules to their latest commits:

```
forge update
```

**Warning:** This updates all dependencies and may introduce breaking changes. Always test thoroughly after updating.

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

---

## Version Pinning with foundry.lock

The [contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11) file pins each submodule to a specific Git commit hash, ensuring build reproducibility:

```
forge-std:  8bbcf6e3f8f62f419e5429a0bd89331c85c37824
hookmate:   33408fbc15e083eb0bc4205fa37cb6ba0a926f44
uniswap-hooks: e59fe72c110c3862eec9b332530dce49ca506bbb

```

### Version Pinning Mechanism

```
Build Process

Developer Actions

Version Control Flow

repository URLs

commit references

checks out

reads

reads

populates

updates

updates

compiles

imports

.gitmodules
(Repository URLs)

foundry.lock
(Commit Hashes)

lib/
(Actual Submodule Contents)

git clone

git submodule update --init

forge install

forge update

forge build

forge test
```

### Why Not All Submodules Are in foundry.lock

Notice that `system-smart-contracts` is defined in `.gitmodules` but absent from `foundry.lock`. This occurs when:

- The submodule is tracked by Git's native submodule system but not managed by Foundry's dependency manager
- The submodule was added manually using `git submodule add` rather than `forge install`

Both approaches are valid; Foundry respects all submodules defined in `.gitmodules` regardless of whether they appear in `foundry.lock`.

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)[contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11)

---

## Dependency Integration Map

This diagram shows how Aegis contracts import and use the submodule dependencies:

```
Deployment Scripts

Test Files

Aegis Contracts

system-smart-contracts (Reactive)

hookmate (Utilities)

uniswap-hooks (Base Implementations)

forge-std (Testing & Deployment)

inherited by

pattern used in

validates flags

calculates salt

inherited by

implements

event subscription

inherited by

inherited by

inherited by

inherited by

inherited by

inherited by

logging in

logging in

logging in

Test.sol

Script.sol

console.sol

BaseHook.sol

SafeCallback.sol

HookFlags.sol

HookMiner.sol

AbstractReactive.sol

IReactive.sol

reactive-lib

AegisHook.sol
(Unichain)

AegisSentinel.sol
(Reactive Network)

MockOracle.sol
(Sepolia)

AegisGuardianRegistry.sol
(Sepolia)

MockOracle.t.sol

AegisSentinel.t.sol

AegisHook.t.sol

04_DeployOracle.s.sol

05_DeploySentinel.s.sol

06_DeployHook.s.sol
```

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

---

## Submodule Details

### forge-std

**Path:**`lib/forge-std`**Repository:**[contracts/.gitmodules2-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L2-L3)**Commit:**`8bbcf6e3f8f62f419e5429a0bd89331c85c37824`[contracts/foundry.lock2-4](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L2-L4)

Provides the foundational testing and scripting infrastructure for Foundry projects. Key exports:
ExportPurposeUsed By`Test.sol`Base contract for unit tests with assertions and cheatcodesAll `*.t.sol` test files`Script.sol`Base contract for deployment scripts with chain configurationAll `*.s.sol` deployment scripts`console.sol`Console logging for debuggingDeployment scripts`Vm.sol`Interface to Foundry's cheatcodesTest files
### uniswap-hooks

**Path:**`lib/uniswap-hooks`**Repository:**[contracts/.gitmodules4-6](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L4-L6)**Commit:**`e59fe72c110c3862eec9b332530dce49ca506bbb`[contracts/foundry.lock8-10](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L8-L10)

OpenZeppelin's audited base implementations for Uniswap v4 hooks. Provides security-hardened patterns for:

- Hook callback validation
- Access control
- Reentrancy protection

Used by `AegisHook` to ensure the circuit breaker implementation follows best practices.

### hookmate

**Path:**`lib/hookmate`**Repository:**[contracts/.gitmodules7-9](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L7-L9)**Commit:**`33408fbc15e083eb0bc4205fa37cb6ba0a926f44`[contracts/foundry.lock5-7](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L5-L7)

Development utilities for Uniswap v4 hooks. Key functionality:

- **HookMiner:** Calculates CREATE2 salt to achieve desired hook address flags (e.g., `0x80...` for `BEFORE_SWAP`)
- **Hook flag validation:** Ensures hook addresses have correct permission bits
- **Common patterns:** Reusable hook implementation patterns

Referenced in the hook deployment process (see [Hook Mining](/HACK3R-CRYPTO/Aegis/3.4-hook-mining)).

### system-smart-contracts

**Path:**`lib/system-smart-contracts`**Repository:**[contracts/.gitmodules10-12](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L10-L12)**Commit:** Not pinned in `foundry.lock` (Git-native tracking)

Reactive Network's core smart contracts enabling cross-chain event monitoring. Key exports:
ExportPurposeUsed By`AbstractReactive`Base contract for reactive systems`AegisSentinel``IReactive`Interface for reactive behavior`AegisSentinel`Event subscription systemCross-chain event listening`AegisSentinel`
Enables the `AegisSentinel` to monitor `PriceUpdate` events from the Sepolia oracle and trigger cross-chain responses.

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)[contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11)

---

## Troubleshooting

### Submodule Not Initialized

**Symptom:** Compiler errors about missing imports from `lib/` directory

**Solution:**

```
git submodule update --init --recursive
# or
forge install
```

### Submodule Detached HEAD State

**Symptom:** Git reports "detached HEAD" when inside a submodule directory

**Explanation:** This is normal. Submodules are checked out at specific commits, not branches. The parent repository tracks the commit hash, not a branch name.

**Solution:** No action needed unless you're updating the submodule. To update, checkout a branch first:

```
cd lib/forge-std
git checkout main
git pull
cd ../..
forge update lib/forge-std
```

### Merge Conflicts in .gitmodules or foundry.lock

**Symptom:** Git merge conflicts in submodule configuration files

**Solution:**

1. Resolve the conflict in `.gitmodules` and/or `foundry.lock`
2. Run `git submodule sync` to update submodule URLs
3. Run `git submodule update --init --recursive` to sync submodule states
4. Verify with `forge build`

### Missing System Contracts

**Symptom:**`system-smart-contracts` submodule is empty despite being in `.gitmodules`

**Solution:**

```
git submodule update --init --recursive lib/system-smart-contracts
```

The `--recursive` flag is critical as this submodule may contain nested dependencies.

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)

---

## Best Practices

### Do Not Modify Submodule Contents

Submodules are external dependencies and should not be modified directly. Changes should be:

1. Contributed to the upstream repository
2. Merged into the upstream's main branch
3. Updated in Aegis via `forge update`

### Pin Versions for Production

Always commit the `foundry.lock` file to ensure all developers and CI/CD systems use identical dependency versions. This prevents "works on my machine" issues caused by floating dependencies.

### Test After Updating

When updating submodules, always run the full test suite:

```
forge update
forge build
forge test
```

Check for deprecation warnings, interface changes, or breaking API updates.

### Document Dependency Rationale

When adding a new submodule, document:

- Why it's needed
- What alternatives were considered
- Which contracts use it
- Any security audit status

**Sources:**[contracts/.gitmodules1-13](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.gitmodules#L1-L13)[contracts/foundry.lock1-11](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.lock#L1-L11)