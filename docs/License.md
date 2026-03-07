# License
Relevant source files
- [contracts/LICENSE](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE)
- [contracts/lib/forge-std/LICENSE-APACHE](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE)
- [contracts/lib/forge-std/LICENSE-MIT](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-MIT)

This page documents the licensing terms for the Aegis repository and its dependencies. The Aegis project uses the MIT License for its core smart contracts and application code, while certain dependencies maintain their own licensing terms. Understanding these licenses is essential for anyone using, modifying, or distributing this software.

For information about contributing code to the project, see [Contributing](/HACK3R-CRYPTO/Aegis/10-contributing).

## License Structure

The Aegis repository employs a hierarchical licensing structure where the main project code and third-party dependencies are governed by different licenses.

```
Third-Party Dependencies

Root Repository (HACK3R-CRYPTO/Aegis)

Aegis Smart Contracts & Application

contracts/src/MockOracle.sol

contracts/src/AegisSentinel.sol

contracts/src/AegisHook.sol

contracts/src/AegisGuardianRegistry.sol

frontend/

contracts/script/

MIT License
Copyright 2023 saucepoint

contracts/lib/forge-std/
Dual: MIT + Apache 2.0

contracts/lib/uniswap-hooks/
(Uniswap License)

contracts/lib/hookmate/
(Respective License)

contracts/lib/system-smart-contracts/
(Respective License)
```

**Sources:**[contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22)[contracts/lib/forge-std/LICENSE-MIT1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-MIT#L1-L26)[contracts/lib/forge-std/LICENSE-APACHE1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)

## Main Project License: MIT

The Aegis project is licensed under the MIT License, one of the most permissive open-source licenses. The license file is located at [contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22)

### Copyright Holder

**Copyright (c) 2023 saucepoint**

The copyright is held by saucepoint, indicating this project was originally created as a fork or derivative work from another codebase. All original Aegis contributions are covered under this copyright statement.

### Permissions

The MIT License grants the following rights without restriction:
PermissionDescription**Use**Run the software for any purpose, including commercial applications**Copy**Make copies of the software**Modify**Alter the source code to create derivative works**Merge**Combine with other software**Publish**Distribute the software publicly**Distribute**Share copies with others**Sublicense**Grant these same rights to others**Sell**Commercialize the software
### Requirements

The only condition for using this software under the MIT License is:

1. **Include the copyright notice:** The copyright notice and permission notice from [contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22) must be included in all copies or substantial portions of the software.
2. **Include the license text:** The full MIT License text must be distributed with the software.

### Disclaimer of Warranty

As stated in [contracts/LICENSE15-21](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L15-L21) the software is provided "AS IS", without warranty of any kind. Key points:

- No warranty of MERCHANTABILITY
- No warranty of FITNESS FOR A PARTICULAR PURPOSE
- No warranty of NON-INFRINGEMENT
- Authors are not liable for damages arising from use of the software

**Sources:**[contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22)

## Dependency Licenses

### Forge Standard Library (forge-std)

The Foundry Standard Library, located in `contracts/lib/forge-std/`, uses a **dual-license** approach, allowing users to choose between two licenses:

#### Option 1: MIT License

Located at [contracts/lib/forge-std/LICENSE-MIT1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-MIT#L1-L26) The forge-std MIT License provides the same permissive terms as described above, with copyright belonging to "Contributors to Forge Standard Library" ([contracts/lib/forge-std/LICENSE-MIT1](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-MIT#L1-L1)).

#### Option 2: Apache License 2.0

Located at [contracts/lib/forge-std/LICENSE-APACHE1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L1-L204) The Apache License 2.0 provides additional protections and requirements:
FeatureDescription**Patent Grant**Explicit grant of patent rights from contributors ([contracts/lib/forge-std/LICENSE-APACHE75-89](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L75-L89))**Trademark Protection**Does not grant rights to use trademarks ([contracts/lib/forge-std/LICENSE-APACHE140-143](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L140-L143))**Contribution Terms**Contributions are under the same license unless explicitly stated otherwise ([contracts/lib/forge-std/LICENSE-APACHE132-138](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L132-L138))**Patent Retaliation**Patent licenses terminate if you sue claiming patent infringement ([contracts/lib/forge-std/LICENSE-APACHE84-89](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L84-L89))
**Sources:**[contracts/lib/forge-std/LICENSE-MIT1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-MIT#L1-L26)[contracts/lib/forge-std/LICENSE-APACHE1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)

### Other Dependencies

The following dependencies maintain their own licenses:

```
Dependency License Overview

forge-std
contracts/lib/forge-std/
MIT OR Apache-2.0

uniswap-hooks
contracts/lib/uniswap-hooks/
Check submodule

hookmate
contracts/lib/hookmate/
Check submodule

system-smart-contracts
contracts/lib/system-smart-contracts/
Check submodule

Aegis User/Developer
```

Users should consult the license files within each Git submodule directory to understand the specific terms:

- **uniswap-hooks:**`contracts/lib/uniswap-hooks/LICENSE` (not provided in files)
- **hookmate:**`contracts/lib/hookmate/LICENSE` (not provided in files)
- **system-smart-contracts:**`contracts/lib/system-smart-contracts/LICENSE` (not provided in files)

**Sources:** Project structure from high-level diagrams

## License Compliance Guide

### When Using Aegis

If you are using Aegis in your own project:

1. **Include the MIT License:** Copy [contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22) into your project or repository.
2. **Preserve copyright notices:** Keep the copyright notice "Copyright (c) 2023 saucepoint" intact.
3. **Understand dependency licenses:** Review the licenses of all dependencies, particularly if you are distributing compiled binaries.
4. **No trademark rights:** The MIT License does not grant rights to use the "Aegis" name or any associated trademarks.

### When Modifying Aegis

If you are creating derivative works:

1. **Retain original license:** Keep the original MIT License from [contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22)
2. **Add your copyright:** You may add your own copyright statement for your modifications.
3. **Document changes:** While not strictly required by MIT, documenting significant changes is good practice.
4. **Choose dependency licenses:** For forge-std, choose either MIT or Apache 2.0 based on your needs.

### When Distributing Aegis

If you are distributing Aegis (source or compiled):

1. **Include all license files:**

- [contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22) (Aegis MIT License)
- [contracts/lib/forge-std/LICENSE-MIT1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-MIT#L1-L26) or [contracts/lib/forge-std/LICENSE-APACHE1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L1-L204) (forge-std)
- License files from other dependencies
2. **Maintain attribution:** Ensure copyright notices are visible to end users.
3. **Provide source access:** While not required by MIT, providing source code access aligns with open-source principles.

### For Commercial Use

The MIT License explicitly permits commercial use:

- **Deploy to mainnet:** You may deploy Aegis contracts to production networks for profit.
- **Integrate into products:** You may incorporate Aegis into commercial DeFi products.
- **Charge fees:** You may charge fees for services built on Aegis.
- **Sell derivatives:** You may sell modified versions of Aegis.

The only requirement remains attribution via the copyright notice.

**Sources:**[contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22)[contracts/lib/forge-std/LICENSE-MIT1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-MIT#L1-L26)[contracts/lib/forge-std/LICENSE-APACHE1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)

## File-Level License Mapping

The following diagram maps license terms to specific parts of the codebase:

```
Imports & Dependencies

frontend/

Next.js Application

relay.ts

contracts/test/

*.t.sol files

contracts/script/

04_DeployOracle.s.sol

05_DeploySentinel.s.sol

06_DeployHook.s.sol

HookMiner.s.sol

contracts/src/

MockOracle.sol

AegisSentinel.sol

AegisHook.sol

AegisGuardianRegistry.sol

MIT License
contracts/LICENSE

Test.sol, Script.sol
forge-std/

IHooks, PoolManager
uniswap-hooks/

Hook utilities
hookmate/

Reactive contracts
system-smart-contracts/
```

All original Aegis code (everything in `contracts/src/`, `contracts/script/`, `contracts/test/`, and `frontend/`) is covered by the MIT License at [contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22) Imported dependencies maintain their respective licenses.

**Sources:**[contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22) project structure from high-level diagrams

## Apache 2.0 License Overview

For completeness, key aspects of the Apache License 2.0 available for forge-std:

### Grant of Copyright License

[contracts/lib/forge-std/LICENSE-APACHE68-73](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L68-L73) grants a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to:

- Reproduce the Work
- Prepare Derivative Works
- Publicly display and perform
- Sublicense and distribute

### Grant of Patent License

[contracts/lib/forge-std/LICENSE-APACHE75-89](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L75-L89) grants patent licenses for:

- Making, using, and selling the Work
- Only for patent claims necessarily infringed by the contribution
- **Patent retaliation clause:** License terminates if you sue for patent infringement

### Redistribution Requirements

When redistributing under Apache 2.0 ([contracts/lib/forge-std/LICENSE-APACHE91-130](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L91-L130)):

1. Provide recipients a copy of the License
2. Mark modified files prominently
3. Retain all copyright, patent, trademark, and attribution notices
4. Include a readable copy of NOTICE file if present

### Disclaimer and Limitation of Liability

Similar to MIT, Apache 2.0 provides the Work "AS IS" ([contracts/lib/forge-std/LICENSE-APACHE145-153](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L145-L153)):

- No warranties of any kind
- No liability for damages ([contracts/lib/forge-std/LICENSE-APACHE155-166](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L155-L166))

**Sources:**[contracts/lib/forge-std/LICENSE-APACHE1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)

## Choosing Between MIT and Apache 2.0 (for forge-std)

When using forge-std, you may choose which license to apply. Consider the following:
Use CaseRecommended LicenseRationaleSimple projectsMITSimpler, more permissive, less legal overheadPatent-sensitive projectsApache 2.0Explicit patent grants provide legal clarityProjects with many contributorsApache 2.0Clear contribution terms and patent protectionMaximum compatibilityMITMore universally compatible with other licensesNeed trademark protectionApache 2.0Explicit exclusion of trademark rights
Both licenses are **permissive** and allow commercial use. The choice primarily affects patent handling and redistribution formalities.

**Sources:**[contracts/lib/forge-std/LICENSE-MIT1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-MIT#L1-L26)[contracts/lib/forge-std/LICENSE-APACHE1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)

## Summary

### Key Takeaways

1. **Aegis core code** is licensed under MIT License with copyright to saucepoint ([contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22))
2. **forge-std dependency** offers dual licensing: MIT or Apache 2.0 ([contracts/lib/forge-std/LICENSE-MIT1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-MIT#L1-L26)[contracts/lib/forge-std/LICENSE-APACHE1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L1-L204))
3. **Other dependencies** (uniswap-hooks, hookmate, system-smart-contracts) have their own licenses that must be reviewed
4. **Commercial use is permitted** under MIT License with only attribution required
5. **No warranties** are provided - software is provided "AS IS"
6. **Modifications are allowed** - you may create derivative works freely

### License File Locations

```
contracts/
├── LICENSE                                    # MIT License (Aegis)
└── lib/
    ├── forge-std/
    │   ├── LICENSE-MIT                       # MIT License (forge-std)
    │   └── LICENSE-APACHE                    # Apache 2.0 (forge-std)
    ├── uniswap-hooks/LICENSE                 # (Check submodule)
    ├── hookmate/LICENSE                      # (Check submodule)
    └── system-smart-contracts/LICENSE        # (Check submodule)

```

For the most current license information, always refer to the LICENSE files in the repository and its submodules.

**Sources:**[contracts/LICENSE1-22](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/LICENSE#L1-L22)[contracts/lib/forge-std/LICENSE-MIT1-26](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-MIT#L1-L26)[contracts/lib/forge-std/LICENSE-APACHE1-204](https://github.com/HACK3R-CRYPTO/Aegis/blob/5ea5ecc2/contracts/lib/forge-std/LICENSE-APACHE#L1-L204)