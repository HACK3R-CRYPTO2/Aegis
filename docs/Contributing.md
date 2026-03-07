# Contributing
Relevant source files
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml)
- [contracts/lib/forge-std/CONTRIBUTING.md](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/CONTRIBUTING.md)

This document provides guidelines for contributing to the Aegis project. It covers code standards, testing requirements, the pull request process, and common development tasks. For information about setting up your development environment, see [Development Setup](/HACK3R-CRYPTO/Aegis/4-development-setup). For details on the testing infrastructure, see [Testing](/HACK3R-CRYPTO/Aegis/5-testing).

---

## Purpose and Scope

Aegis is an open-source cross-chain DeFi protection system. Contributions are welcome in the form of bug reports, feature requests, documentation improvements, and code contributions. This guide outlines the technical requirements and processes for contributing to the project, ensuring code quality and consistency across the codebase.

---

## Code of Conduct

Contributors are expected to maintain a professional and respectful environment. All interactions should be constructive and focused on improving the project. Instances of unacceptable behavior should be reported through the project's issue tracker.

---

## Ways to Contribute

### 1. Reporting Issues

When reporting a bug or requesting a feature, please use the GitHub issue tracker and provide:

- **For bugs:**

- Foundry version (`forge --version`)
- Operating system and architecture
- Steps to reproduce the issue
- Expected vs. actual behavior
- Relevant code snippets or transaction hashes
- **For features:**

- Clear description of the proposed feature
- Use cases and rationale
- Examples from other projects (if applicable)

### 2. Improving Documentation

Documentation contributions include:

- Clarifying technical explanations
- Adding code examples
- Fixing technical inaccuracies
- Updating deployment guides

### 3. Contributing Code

Code contributions must follow the standards outlined in this document. Before starting work on a significant change, open an issue to discuss the approach and ensure it aligns with the project's direction.

---

## Development Workflow

The following diagram illustrates the contribution workflow from initial setup to pull request merge:

**Contribution Workflow Process**

```
Automated CI Checks

Local Development

Changes requested

Approved

Fork Repository
github.com/HACK3R-CRYPTO/Aegis

Clone Fork
git clone + submodule init

Create Feature Branch
git checkout -b feature-name

Write Code
Edit files in src/

Format Code
forge fmt

Build Contracts
forge build

Run Tests
forge test -vvv

Commit Changes
git commit -m 'description'

Push to Fork
git push origin feature-name

Open Pull Request
GitHub UI

forge build --sizes

forge test -vvv

forge fmt --check

Multi-version solc test

Code Review
Maintainer feedback

Address Feedback
Push updates

Merge to main
```

Sources: [contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)[.github/workflows/test.yml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.github/workflows/test.yml) (inferred from CI requirements)

---

## Code Standards

### Formatting Requirements

All Solidity code must be formatted using `forge fmt` before committing. The project configuration enforces specific formatting rules:

```
# Format all Solidity files
forge fmt

# Check formatting without modifying files (used in CI)
forge fmt --check
```

**Formatting Configuration:**
SettingValueLocationLint on build`false`[foundry.toml26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml#L26-L26)Excluded lints`screaming-snake-case-immutable`, `screaming-snake-case-const`[foundry.toml25](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml#L25-L25)Bytecode hash`none`[foundry.toml2](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml#L2-L2)EVM version`cancun`[foundry.toml3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml#L3-L3)
Sources: [contracts/foundry.toml24-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L24-L27)

### Solidity Compiler Version

The project uses Solidity version `0.8.26` with the `via_ir` optimizer enabled:

```
solc_version = "0.8.26"
via_ir = true
```

**Multi-Version Compatibility Testing:**

While the primary compiler version is 0.8.26, contributions should not break compatibility with the following Solidity versions if they modify core interfaces:

- 0.6.2 (minimum supported)
- 0.6.12
- 0.7.0
- 0.7.6
- 0.8.0

Test compatibility by running:

```
forge build --skip test --use solc:0.6.2
forge build --skip test --use solc:0.7.0
forge build --skip test --use solc:0.8.0
```

Sources: [contracts/foundry.toml8-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L8-L16)[contracts/lib/forge-std/CONTRIBUTING.md90-98](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/CONTRIBUTING.md#L90-L98)

### Import Remappings

When adding imports, use the configured remappings to ensure consistent dependency resolution:
RemappingTarget Library`reactive-lib/`[lib/system-smart-contracts/lib/reactive-lib/src/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/lib/system-smart-contracts/lib/reactive-lib/src/)`system-smart-contracts/`[lib/system-smart-contracts/src/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/lib/system-smart-contracts/src/)`v4-core/`[lib/uniswap-hooks/lib/v4-core/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/lib/uniswap-hooks/lib/v4-core/)`v4-periphery/`[lib/uniswap-hooks/lib/v4-periphery/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/lib/uniswap-hooks/lib/v4-periphery/)
Example import statement:

```
import "v4-core/interfaces/IHooks.sol";
import "reactive-lib/AbstractReactive.sol";
```

Sources: [contracts/foundry.toml9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L9-L14)

---

## Testing Requirements

### Running Tests

All contributions must include appropriate tests and pass the existing test suite:

```
# Run all tests with verbose output
forge test -vvv

# Run specific test contract
forge test --match-contract OracleTest -vvv

# Run specific test function
forge test --match-test testSetPrice -vvv

# Run tests with gas reporting
forge test --gas-report
```

**Test Suite Structure:**

```
Critical Test Cases

Core Test Contracts

Test.sol
forge-std base class

OracleTest
MockOracle functionality

SentinelTest
AegisSentinel logic

HookTest
AegisHook integration

RegistryTest
Guardian reputation

testOracleUpdate
Price feed updates

testAccessControl
Permission validation

testPanicTrigger
Cross-chain activation

testCircuitBreaker
Swap blocking
```

Sources: [contracts/test/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/test/) (inferred test structure)

### Writing Tests

Tests should follow the Foundry testing conventions:

1. **Test contract naming:** Use `ContractNameTest` pattern
2. **Test function naming:** Use `testFunctionality` or `testRevert_Condition` patterns
3. **Setup function:** Use `setUp()` for test initialization
4. **Assertions:** Use forge-std assertions (`assertEq`, `assertTrue`, `assertRevert`, etc.)

Example test structure:

```
// test/MyFeature.t.sol
contract MyFeatureTest is Test {
    MyContract public myContract;
    
    function setUp() public {
        myContract = new MyContract();
    }
    
    function testBasicFunctionality() public {
        // Test implementation
        assertEq(myContract.getValue(), expectedValue);
    }
    
    function testRevert_UnauthorizedAccess() public {
        vm.expectRevert();
        myContract.restrictedFunction();
    }
}
```

Sources: [contracts/test/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/test/) (inferred), [contracts/foundry.toml4-5](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L4-L5) (FFI and filesystem permissions)

### Code Coverage

While not enforced, aim for high test coverage on new code. Use Foundry's coverage tools:

```
# Generate coverage report
forge coverage

# Generate detailed coverage report
forge coverage --report lcov
```

---

## Pull Request Process

### Before Opening a Pull Request

Ensure the following checks pass locally:

```
# 1. Format all code
forge fmt

# 2. Build the project
forge build --sizes

# 3. Run all tests
forge test -vvv

# 4. Check formatting (matches CI)
forge fmt --check
```

**Pre-PR Checklist:**
CheckCommandPurposeCode formatting`forge fmt`Ensure consistent styleCompilation`forge build --sizes`Verify contracts compileTest suite`forge test -vvv`Ensure all tests passFormat validation`forge fmt --check`Match CI requirements
Sources: [contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)[contracts/lib/forge-std/CONTRIBUTING.md84-88](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/CONTRIBUTING.md#L84-L88)

### Pull Request Guidelines

1. **Title:** Use a clear, descriptive title

- Good: "Add panic mode cooldown to AegisHook"
- Bad: "Fix bug"
2. **Description:** Include:

- Summary of changes
- Motivation and context
- Related issue numbers (e.g., "Fixes #123")
- Testing performed
- Breaking changes (if any)
3. **Commits:**

- Keep commits logically grouped
- Use descriptive commit messages
- Squash "checkpoint" commits before merging
4. **Size:**

- Keep PRs focused on a single feature or fix
- Large changes should be discussed in an issue first

### Continuous Integration

The CI pipeline automatically runs on all pull requests:

**CI Pipeline Stages:**

```
GitHub Actions Workflow

PR Opened/Updated

Checkout Code
+ Submodules

Install Foundry
foundryup

forge build --sizes

forge test -vvv

forge fmt --check

CI Status
Pass/Fail
```

All CI checks must pass before a PR can be merged.

Sources: [.github/workflows/test.yml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.github/workflows/test.yml) (inferred), [contracts/foundry.toml1-27](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L27)

### Review Process

1. **Initial Review:** A maintainer will review your PR within a few days
2. **Feedback:** Address any requested changes by pushing new commits
3. **Re-review:** The maintainer will review updates
4. **Approval:** Once approved, a maintainer will merge the PR

**What Reviewers Look For:**

- Code correctness and security
- Test coverage
- Gas efficiency (for contract changes)
- Clear documentation and comments
- Consistency with existing code patterns

---

## Common Development Tasks

### Adding a New Smart Contract

When adding a new contract to the system:

1. Create the contract in `contracts/src/`
2. Add corresponding tests in `contracts/test/`
3. Create a deployment script in `contracts/script/` (if needed)
4. Update documentation

Example file structure:

```
contracts/
├── src/
│   └── MyNewContract.sol
├── test/
│   └── MyNewContract.t.sol
└── script/
    └── DeployMyContract.s.sol

```

Sources: [contracts/src/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/src/)[contracts/test/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/test/)[contracts/script/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/script/)

### Modifying Existing Contracts

For changes to deployed contracts:

1. **Update the contract:** Edit files in [contracts/src/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/src/)
2. **Update tests:** Modify or add tests in [contracts/test/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/test/)
3. **Run tests:** Verify with `forge test -vvv`
4. **Document changes:** Update relevant wiki pages
5. **Consider migrations:** If deployed, document upgrade path

### Adding Dependencies

Dependencies are managed via Git submodules:

```
# Add a new submodule
cd contracts
git submodule add <repository-url> lib/<library-name>

# Update foundry.toml remappings
# Add entry in [profile.default] remappings section
```

Update [foundry.toml9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml#L9-L14) with the new remapping:

```
remappings = [
    # ... existing remappings
    "new-lib/=lib/new-lib/src/"
]
```

Sources: [contracts/foundry.toml9-14](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L9-L14)[.gitmodules](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.gitmodules) (inferred)

### Updating Frontend

For frontend contributions:

1. Navigate to `frontend/` directory
2. Install dependencies: `npm install` or `yarn install`
3. Start dev server: `npm run dev`
4. Make changes and test locally
5. Build: `npm run build`
6. Verify build output in `frontend/out/`

Sources: [frontend/package.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/frontend/package.json) (inferred), [frontend/next.config.js](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/frontend/next.config.js) (inferred)

### Working with Network Configuration

Network endpoints are configured in [foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml#L19-L22):

```
[rpc_endpoints]
unichain_sepolia = "https://unichain-sepolia-rpc.publicnode.com"
reactive = "https://lasna-rpc.rnk.dev/"
sepolia = "https://eth-sepolia.g.alchemy.com/v2/..."
```

When testing against different networks:

```
# Deploy to specific network
forge script script/DeployContract.s.sol --rpc-url sepolia --broadcast

# Run fork tests
forge test --fork-url sepolia
```

Sources: [contracts/foundry.toml19-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L19-L22)

---

## Specialized Contributions

### Hook Development

When modifying [AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/AegisHook.sol) ensure:

1. **Address requirements:** The hook must maintain its `0x80...` address prefix (BEFORE_SWAP flag)
2. **Interface compliance:** Implement all required `IHooks` functions
3. **Gas optimization:** Hooks are called on every swap; optimize gas usage
4. **Permission checks:** Validate `msg.sender` is PoolManager

If the hook address changes, regenerate the salt:

```
# Run HookMiner to find valid salt
forge script script/HookMiner.s.sol
```

Sources: [contracts/src/AegisHook.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/src/AegisHook.sol) (inferred), [contracts/script/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/script/) (HookMiner referenced in high-level docs)

### Reactive Contract Development

When modifying [AegisSentinel.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/AegisSentinel.sol) considerations:

1. **Event subscriptions:** Configure correct origin chain and contract addresses
2. **Callback functions:** Implement `react()` function correctly
3. **Cross-chain calls:** Use `IReactive` interface for L2 communication
4. **Gas limits:** Ensure sufficient gas for cross-chain transactions

Sources: [contracts/src/AegisSentinel.sol](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/src/AegisSentinel.sol) (inferred)

---

## Code Review Guidelines

### For Contributors

When your PR is under review:

- Respond to feedback promptly
- Ask questions if feedback is unclear
- Push updates as new commits (don't force-push during review)
- Be open to suggestions and alternative approaches

### For Reviewers

When reviewing PRs:

- Focus on correctness, security, and maintainability first
- Be constructive and specific in feedback
- Acknowledge good practices and improvements
- Distinguish between blocking issues and optional suggestions (use "Nit:" prefix for minor suggestions)

---

## Getting Help

If you need assistance:

1. **Check existing documentation:** Review the wiki pages, especially [Development Setup](/HACK3R-CRYPTO/Aegis/4-development-setup) and [Testing](/HACK3R-CRYPTO/Aegis/5-testing)
2. **Search issues:** Your question may have been answered before
3. **Open a discussion:** Use GitHub Discussions for questions
4. **Join community channels:** Check the README for community links

---

## License

By contributing to Aegis, you agree that your contributions will be licensed under the project's MIT and Apache 2.0 dual license. See [License](/HACK3R-CRYPTO/Aegis/9-license) for details.

Sources: [LICENSE](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/LICENSE) (inferred), README (inferred)