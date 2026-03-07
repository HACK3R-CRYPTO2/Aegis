# Contributing Guidelines

## Purpose and Scope

This document provides guidelines for contributing to the Aegis project codebase. It covers contribution workflows for smart contracts, testing requirements, code review processes, and continuous integration standards.

---

## Overview

The Aegis project accepts contributions across multiple areas:

| Component | Location | Primary Language |
| :--- | :--- | :--- |
| **Core Contracts** | `contracts/src/` | Solidity |
| **Deployment Scripts** | `contracts/script/` | Solidity |
| **Test Suite** | `contracts/test/` | Solidity |
| **Frontend Dashboard** | `frontend/` | TypeScript details |

---

## Contribution Workflow

### Overall Process

1.  **Open Issue**: Discuss bugs or feature requests first.
2.  **Fork Repository**: Create your own fork of the repo.
3.  **Create Branch**: Create a feature branch (e.g., `feat/add-new-hook`).
4.  **Make Changes**: Write code, tests, and scripts.
5.  **Test Locally**: Run `forge test` and ensure all pass.
6.  **Format Code**: Run `forge fmt` to adhere to style guide.
7.  **Push and PR**: Push to your fork and open a Pull Request.
8.  **Review**: Address feedback from maintainers.
9.  **Merge**: Once approved and CI passes, your code will be merged.

### Setting Up Development Environment

1.  **Install Foundry**: Ensure you have the latest Foundry version.
2.  **Clone with Submodules**: `git clone --recursive https://github.com/HACK3R-CRYPTO/Aegis.git`
3.  **Install Dependencies**: `forge install`

### Making Changes to Contracts

When modifying contracts in `contracts/src/`, adhere to the following:

#### AegisHook.sol
*   Changes to `beforeSwap` must preserve the circuit breaker logic.
*   Modifications to `panicMode` state transitions must maintain security guarantees.
*   Ensure gas efficiency for the "happy path" (when panic mode is off).

#### AegisSentinel.sol
*   Event listener subscriptions must match L1 oracle event signatures exactly.
*   Cross-chain message encoding must be compatible with the Reactive Network relayer.

#### MockOracle.sol
*   Ensure `PriceUpdate` events emit the correct data structure expected by the Sentinel.

### Testing Requirements

*   **Unit Tests**: Add tests in `contracts/test/` for any new logic.
*   **Integration Tests**: Verify cross-contract interactions (e.g., Oracle -> Sentinel -> Hook).
*   **Run All Tests**: Ensure no regressions by running `forge test`.

---

## Code Review Process

### What Reviewers Look For

1.  **Correctness**: Does the code do what it claims?
2.  **Security**: Are there reentrancy risks, overflow issues, or access control gaps?
3.  **Gas Efficiency**: Are operations optimized for L2 execution?
4.  **Readability**: Is the code clear and well-commented?
5.  **Tests**: Is the new functionality adequately tested?

### Commit Messages

Use clear, descriptive commit messages:
*   `feat: Add reputation boost logic`
*   `fix: Resolve reentrancy vulnerability in withdrawal`
*   `test: Add integration test for fallback relay`
*   `docs: Update network configuration guide`

Avoid vague messages like "fix", "wip", or "update".

---

## Continuous Integration

The project uses GitHub Actions for CI. Every PR must pass:

1.  **Compilation**: `forge build`
2.  **Tests**: `forge test -vvv`
3.  **Formatting**: `forge fmt --check`

If CI fails, click the "Details" link in the PR to view the error logs and fix the issue.

---

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all, regardless of level of experience, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, nationality, or other similar characteristic.

Please be respectful and constructive in all interactions.

---

## Getting Help

*   **GitHub Issues**: For bug reports and feature requests.
*   **Foundry Book**: For Foundry-specific questions.
*   **Documentation**: Read the `docs/` directory for system architecture details.