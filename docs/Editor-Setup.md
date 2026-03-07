# Editor Setup
Relevant source files
- [contracts/.vscode/settings.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.vscode/settings.json)
- [contracts/foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml)

This page documents the editor configuration for developing Solidity smart contracts in the Aegis codebase. It covers VSCode settings, Solidity formatter configuration, and linting rules. For general development environment setup including Foundry installation, see [Prerequisites](/HACK3R-CRYPTO/Aegis/4.1-prerequisites). For Foundry configuration details, see [Foundry Configuration](/HACK3R-CRYPTO/Aegis/4.4-foundry-configuration).

## Purpose and Scope

The Aegis project uses **Forge** as the primary Solidity formatter to ensure consistent code style across all smart contracts. This page documents:

- VSCode workspace settings for Solidity development
- Forge formatter integration
- Linting configuration and exclusions
- Recommended editor extensions

## Configuration Overview

The editor setup relies on two primary configuration files:

```
uses

Developer Workspace

.vscode/settings.json
VSCode Configuration

foundry.toml
Forge Configuration

solidity.formatter = 'forge'

[lint] section
exclude_lints
lint_on_build
```

**Diagram: Editor Configuration Architecture**

Sources: [contracts/.vscode/settings.json1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.vscode/settings.json#L1-L3)[contracts/foundry.toml24-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L24-L26)

## VSCode Settings

The project includes a workspace-specific VSCode configuration located at [contracts/.vscode/settings.json1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.vscode/settings.json#L1-L3)

### Solidity Formatter Configuration

The workspace is configured to use `forge` as the Solidity formatter:

```
{
  "solidity.formatter": "forge"
}
```

This setting ensures that when developers use VSCode's "Format Document" command (typically `Shift+Alt+F` or `Cmd+Shift+P` → "Format Document"), the code is automatically formatted according to Forge's style rules.

**Key Configuration:**
Setting KeyValuePurpose`solidity.formatter``"forge"`Specifies Forge as the Solidity code formatter
Sources: [contracts/.vscode/settings.json2](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.vscode/settings.json#L2-L2)

### Required VSCode Extension

To enable this functionality, developers must install:

- **Solidity** extension (e.g., `NomicFoundation.hardhat-solidity` or `JuanBlanco.solidity`)

The extension provides Solidity language support and integrates with the formatter specified in settings.

## Forge Formatter Integration

```
Format Document

CLI

invokes

reads

formats

Solidity Source Files
src/*.sol

VSCode Editor
solidity.formatter

forge fmt
CLI Command

foundry.toml
Configuration
```

**Diagram: Forge Formatter Workflow**

### Manual Formatting

Developers can also format files directly via CLI:

```
# Format all Solidity files
forge fmt

# Check formatting without modifying files
forge fmt --check
```

The `--check` flag is used in CI/CD pipelines to enforce formatting compliance without making changes. See [CI/CD Pipeline](/HACK3R-CRYPTO/Aegis/5.2-cicd-pipeline) for details on automated formatting checks.

Sources: [contracts/foundry.toml1-16](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L16)

## Linting Configuration

The project's linting behavior is configured in [contracts/foundry.toml24-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L24-L26)

### Lint Settings

```
[lint]
exclude_lints = ["screaming-snake-case-immutable", "screaming-snake-case-const"]
lint_on_build = false
```

**Linting Configuration Table:**
SettingValueRationale`exclude_lints``["screaming-snake-case-immutable", "screaming-snake-case-const"]`Excludes enforcement of SCREAMING_SNAKE_CASE for immutable and const variables`lint_on_build``false`Disables automatic linting during `forge build` to speed up compilation
### Excluded Lint Rules

The project explicitly excludes two linting rules:

1. **`screaming-snake-case-immutable`**: Allows immutable variables to use any case convention instead of requiring SCREAMING_SNAKE_CASE
2. **`screaming-snake-case-const`**: Allows constant variables to use any case convention instead of requiring SCREAMING_SNAKE_CASE

This configuration provides flexibility in variable naming while maintaining code readability.

### Manual Linting

While linting is disabled during builds, developers can run linting manually:

```
# Run linter on all contracts
forge lint
```

Sources: [contracts/foundry.toml24-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L24-L26)

## Editor Configuration Flow

```
"foundry.toml"
"forge fmt"
"Solidity Extension"
"VSCode"
"Developer"
"foundry.toml"
"forge fmt"
"Solidity Extension"
"VSCode"
"Developer"
Open .sol file
Load Solidity support
Read .vscode/settings.json
Format Document (Shift+Alt+F)
Request format
Check solidity.formatter
Execute forge fmt
Read foundry.toml
Return formatted code
Display formatted file
```

**Diagram: Format Document Workflow**

Sources: [contracts/.vscode/settings.json1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.vscode/settings.json#L1-L3)[contracts/foundry.toml1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L26)

## Recommended Editor Setup

### Additional VSCode Extensions

While not enforced by workspace configuration, the following extensions enhance the development experience:
ExtensionPurpose**Solidity**Syntax highlighting, IntelliSense, formatter integration**Solidity Visual Developer**Enhanced visualization and analysis tools**Error Lens**Inline error and warning display**GitLens**Enhanced Git integration for tracking contract changes
### Editor Keybindings

Common formatting commands in VSCode:
CommandWindows/LinuxmacOSFormat Document`Shift+Alt+F``Cmd+Shift+F`Format Selection`Ctrl+K Ctrl+F``Cmd+K Cmd+F`
### Workspace Organization

The [contracts/.vscode/](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.vscode/) directory is part of the repository to ensure consistent editor behavior across all developers. When cloning the repository, these settings are automatically available.

Sources: [contracts/.vscode/settings.json1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.vscode/settings.json#L1-L3)

## Configuration Precedence

```
overridden by

delegates to

Global VSCode Settings
User Settings

Workspace Settings
.vscode/settings.json

Foundry Configuration
foundry.toml

Effective Configuration
```

**Diagram: Configuration Precedence Hierarchy**

VSCode settings follow this precedence order:

1. **Workspace Settings** ([.vscode/settings.json](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/.vscode/settings.json)) override global user settings
2. **Formatter Behavior** is ultimately controlled by [foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml)

This ensures that all developers have consistent formatting regardless of their personal VSCode configuration.

Sources: [contracts/.vscode/settings.json1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.vscode/settings.json#L1-L3)[contracts/foundry.toml1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L1-L26)

## Formatting Standards

### Forge Formatter Behavior

The `forge fmt` formatter automatically applies:

- Consistent indentation (4 spaces)
- Line length limits
- Import statement organization
- Function parameter alignment
- Bracket placement standardization

These rules are built into Forge and cannot be customized via [foundry.toml](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml) The formatter follows Solidity style guide conventions.

### Integration with CI/CD

The CI/CD pipeline enforces formatting compliance. See [CI/CD Pipeline](/HACK3R-CRYPTO/Aegis/5.2-cicd-pipeline) for details on how formatting checks are automated via GitHub Actions.

```
# CI command for format checking
forge fmt --check
```

If formatting violations are detected, the CI build fails, prompting developers to run `forge fmt` locally before pushing.

Sources: [contracts/foundry.toml24-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L24-L26)

## Troubleshooting

### Common Issues
IssueSolution"Format Document" does nothingInstall Solidity extension and verify `solidity.formatter` settingFormatting differs from teamRun `git submodule update --init --recursive` to ensure correct Foundry versionLinter warnings on buildVerify `lint_on_build = false` in [foundry.toml26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml#L26-L26)Wrong case convention errorsCheck `exclude_lints` configuration in [foundry.toml25](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/foundry.toml#L25-L25)
### Verifying Configuration

To confirm the editor setup is correct:

```
# Check forge is installed
forge --version

# Verify formatting configuration
cat contracts/.vscode/settings.json
cat contracts/foundry.toml | grep -A 3 "\[lint\]"
```

Sources: [contracts/.vscode/settings.json1-3](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/.vscode/settings.json#L1-L3)[contracts/foundry.toml24-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/foundry.toml#L24-L26)