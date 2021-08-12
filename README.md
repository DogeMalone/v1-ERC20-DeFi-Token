# Doge Malone DeFi ERC20 Token:
### Requirements:
1. Node.js - Latest 
2. NPM - Latest
3. Truffle - Latest
4. hdwallet-provider - Latest
5. truffle-plugin-verify - Latest
6. Infura API-Key
7. Etherscan API-Key
8. Bncscan API-Key
9. mnemonic for generation of Private Key
10. .env setup:
  * MNEMONIC=""
  * INFURA_API_KEY=
  * ETHERSCAN_API_KEY=
  * BSCSCAN_API_KEY=
11. dontenv - Latest
12. git - Latest (if you plan on developing with us)
13. create .gitignore
  * add .env

### Alpha Test
```
truffle deploy --network BNBTest

Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'BNBTest'
> Network id:      97
> Block gas limit: 30000000 (0x1c9c380)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x776991a23bfc05beb93749ddca265e4d4cc43a7999ca5e145b2a105cff33a8ac
   > Blocks: 4            Seconds: 12
   > contract address:    0x8Fe17E73FD6704162D64FAf70fDc3DDe77154da3
   > block number:        11396497
   > block timestamp:     1628716188
   > account:             0xdB898C319a67A7e647Dc570d5d20FA4d64A093F3
   > balance:             9.29157509
   > gas used:            186963 (0x2da53)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00186963 ETH

   Pausing for 5 confirmations...
   ------------------------------
   > confirmation number: 2 (block: 11396500)
   > confirmation number: 3 (block: 11396501)
   > confirmation number: 4 (block: 11396502)
   > confirmation number: 6 (block: 11396504)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00186963 ETH


Summary
=======
> Total deployments:   1
> Final cost:          0.00186963 ETH
```
Script is functional on BNB Test-Net (deployment)
```
truffle run verify Migrations --network BNBTest
Verifying Migrations
Pass - Verified: https://testnet.bscscan.com/address/0x8Fe17E73FD6704162D64FAf70fDc3DDe77154da3#contracts
```
Script is completely functional

### Objectives:
After paging through the orginal sources found below, with the two security audits, we at Doge Malone are upgrading this contract to v0.8.6 in order to fix a plethora of issues found.

Original Sources:
* [bscscan.com uploaded source](https://bscscan.com/address/0x9b76d1b12ff738c113200eb043350022ebf12ff0#code)
* [HashEx audit](https://github.com/HashEx/public_audits/tree/master/TIKI)
* [Certik audit](https://certik-public-assets.s3.amazonaws.com/REP-Tiki-Finance-2021-08-07.pdf)

### v0.0.0: 1:1 Tiki Clone
This is a clone of Tiki Finance Token, doing a simple deployment with 2_deploy_0.0.0.js

Under directory ./contracts/

IterableMapping is at address (insert)
Tiki.sol is at address (insert)

```
truffle deploy --network BNBTest

Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'BNBTest'
> Network id:      97
> Block gas limit: 30000000 (0x1c9c380)


2_deploy_contract.js
====================

   Deploying 'IterableMapping'
   ---------------------------
   > transaction hash:    0x47f34529d92ce5015de7d3d8f1160783ffadd33a0936a99579104ed9bb2cd1f5
   > Blocks: 3            Seconds: 9
   > contract address:    0x5Df08bA94D7E827164Ab0662d5b7a35DB4D9F4EA
   > block number:        11397987
   > block timestamp:     1628720658
   > account:             0xdB898C319a67A7e647Dc570d5d20FA4d64A093F3
   > balance:             9.28572387
   > gas used:            542787 (0x84843)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00542787 ETH

   Pausing for 5 confirmations...
   ------------------------------
   > confirmation number: 2 (block: 11397990)
   > confirmation number: 4 (block: 11397992)
   > confirmation number: 5 (block: 11397993)

   Linking
   -------
   * Contract: TIKI <--> Library: IterableMapping (at address: 0x5Df08bA94D7E827164Ab0662d5b7a35DB4D9F4EA)

   Deploying 'TIKI'
   ----------------
   > transaction hash:    0x46a43b2f41d146790fb0765d7954d850a22a0dd1f705b5c5f6ac59f363fdea69

Error:  *** Deployment Failed ***

"TIKI" hit a require or revert statement somewhere in its constructor. Try:
   * Verifying that your constructor params satisfy all require conditions.
   * Adding reason strings to your require statements.

    at /usr/local/lib/node_modules/truffle/build/webpack:/packages/deployer/src/deployment.js:365:1
    at process._tickCallback (internal/process/next_tick.js:68:7)
Truffle v5.4.5 (core: 5.4.5)
Node v10.19.0
```
Ahh yes the standard TIKI fork issues...
```
creation of TIKI errored: VM error: revert.

revert
	The transaction has been reverted to the initial state.
Note: The called function should be payable if you send value and the value you send should be less than your current balance.
Debug the transaction to get more information.
```
Note the remix... Let's fix this damn thing shall we?
### v0.0.1: Upgrade of SafeMath, Ownable, IUniswapPair, IUinswapFactory, IUniswapV2Router to 0.8.7
Not messing with DividendPayingToken or IterableMapping as of yet, next step is upgrading those.
**Updated to ^0.8.7**
Added Libraries:
```
@theanthill/pancake-swap-periphery (IPancakeRouter02.sol - no offical npm)
@pancakeswap-libs/pancake-swap-core (IPancakeFactory.sol & IPancakePair.sol - offical npm)
```

Firesail of imports:
```
find /dogemalonedefi/contracts/ -type f -exec sed -i'' -e 's/IUniswapV2Router02/IPancakeRouter02/g' {} +
find /dogemalonedefi/contracts/ -type f -exec sed -i'' -e 's/IUniswapV2Factory/IPancakeFactory/g' {} +
```

Must hot fix for v0.0.2 and v0.0.3 at same time
### v0.0.2: Upgrade of DividendPayingToken.sol (backbone of this rewards contract)
Inserted into v0.0.1<br>
Hot fix into ^0.8.7 will make it "Math symbols" later >0.8.0
```
,Warning: Visibility for constructor is ignored. If you want the contract to be non-deployable, making it "abstract" is sufficient.
  --> project:/contracts/DividendPayingToken.sol:44:3:
   |
44 |   constructor(string memory _name, string memory _symbol) public ERC20(_name, _symbol) {
   |   ^ (Relevant source part starts here and spans across multiple lines).


TypeError: Invalid type for argument in function call. Invalid implicit conversion from address to address payable requested.
  --> project:/contracts/DividendPayingToken.sol:82:29:
   |
82 |     _withdrawDividendOfUser(msg.sender);
   |                             ^^^^^^^^^^

,TypeError: Member "toInt256Safe" not found or not visible after argument-dependent lookup in uint256.
   --> project:/contracts/DividendPayingToken.sol:134:12:
    |
134 |     return magnifiedDividendPerShare.mul(balanceOf(_owner)).toInt256Safe()
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```
This is the new error, reinserting MathSafeUint.sol to rectify this. Reading more into libraries tomorrow.

Afterwards:
```
,Warning: Visibility for constructor is ignored. If you want the contract to be non-deployable, making it "abstract" is sufficient.
  --> project:/contracts/DividendPayingToken.sol:46:3:
   |
46 |   constructor(string memory _name, string memory _symbol) public ERC20(_name, _symbol) {
   |   ^ (Relevant source part starts here and spans across multiple lines).

,Warning: Visibility for constructor is ignored. If you want the contract to be non-deployable, making it "abstract" is sufficient.
   --> project:/contracts/Tiki.sol:113:5:
    |
113 |     constructor() public ERC20("TIKI", "TIKI") {
    |     ^ (Relevant source part starts here and spans across multiple lines).

,Warning: Visibility for constructor is ignored. If you want the contract to be non-deployable, making it "abstract" is sufficient.
   --> project:/contracts/Tiki.sol:521:5:
    |
521 |     constructor() public DividendPayingToken("TIKI_Dividend_Tracker", "TIKI_Dividend_Tracker") {
    |     ^ (Relevant source part starts here and spans across multiple lines).


TypeError: Invalid type for argument in function call. Invalid implicit conversion from address to address payable requested.
  --> project:/contracts/DividendPayingToken.sol:84:29:
   |
84 |     _withdrawDividendOfUser(msg.sender);
   |                             ^^^^^^^^^^

,TypeError: Invalid type for argument in function call. Invalid implicit conversion from address to address payable requested.
   --> project:/contracts/Tiki.sol:300:34:
    |
300 |           dividendTracker.processAccount(msg.sender, false);
    |                                          ^^^^^^^^^^
```
Boom, we got v0.0.3 ready to roll. <br>
Will probably roll out a v0.0.4 package soon with type errors from above.
### v0.0.3: Upgrade of IterableMapping.sol
Inserted into v0.0.1<br>
This has been updated to ^0.8.7
### v0.0.4: Upgrade code to 0.8.7 standards
ChangeLog:
* `constructor(string memory _name, string memory _symbol) public ERC20(_name, _symbol)` now `constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol)`: --> project:/contracts/DividendPayingToken.sol:46:3<br>
* `constructor() public ERC20("TIKI", "TIKI")` now `constructor() ERC20("TIKI", "TIKI")`: --> project:/contracts/Tiki.sol:113:5<br>
* `constructor() public DividendPayingToken("TIKI_Dividend_Tracker", "TIKI_Dividend_Tracker")` now `constructor() DividendPayingToken("TIKI_Dividend_Tracker", "TIKI_Dividend_Tracker")`: --> project:/contracts/Tiki.sol:521:5<br>
* `_withdrawDividendOfUser(msg.sender);` now `_withdrawDividendOfUser(payable(msg.sender));`: --> project:/contracts/DividendPayingToken.sol:84:29
* `dividendTracker.processAccount(msg.sender, false);` now `dividendTracker.processAccount(payable(msg.sender), false);`: --> project:/contracts/Tiki.sol:300:34
Current Readout
```
truffle deploy --network BNBTest

Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1
> Compiling ./contracts/Context.sol
> Compiling ./contracts/DividendPayingToken.sol
> Compiling ./contracts/DividendPayingTokenInterface.sol
> Compiling ./contracts/DividendPayingTokenOptionalInterface.sol
> Compiling ./contracts/IterableMapping.sol
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SafeMathInt.sol
> Compiling ./contracts/SafeMathUint.sol
> Compiling ./contracts/Tiki.sol
> Compiling @openzeppelin/contracts/access/Ownable.sol
> Compiling @openzeppelin/contracts/token/ERC20/ERC20.sol
> Compiling @openzeppelin/contracts/token/ERC20/IERC20.sol
> Compiling @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol
> Compiling @openzeppelin/contracts/utils/Context.sol
> Compiling @openzeppelin/contracts/utils/math/SafeMath.sol
> Compiling @pancakeswap-libs/pancake-swap-core/contracts/interfaces/IPancakeFactory.sol
> Compiling @pancakeswap-libs/pancake-swap-core/contracts/interfaces/IPancakePair.sol
> Compiling @theanthill/pancake-swap-periphery/contracts/interfaces/IPancakeRouter01.sol
> Compiling @theanthill/pancake-swap-periphery/contracts/interfaces/IPancakeRouter02.sol
✔ Fetching solc version list from solc-bin. Attempt #1
> Compilation warnings encountered:

    Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
--> @pancakeswap-libs/pancake-swap-core/contracts/interfaces/IPancakeFactory.sol

,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
--> @pancakeswap-libs/pancake-swap-core/contracts/interfaces/IPancakePair.sol

,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
--> @theanthill/pancake-swap-periphery/contracts/interfaces/IPancakeRouter01.sol

,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
--> @theanthill/pancake-swap-periphery/contracts/interfaces/IPancakeRouter02.sol

,Warning: Function state mutability can be restricted to pure
   --> project:/contracts/Tiki.sol:526:5:
    |
526 |     function _transfer(address, address, uint256) internal override {
    |     ^ (Relevant source part starts here and spans across multiple lines).

,Warning: Function state mutability can be restricted to pure
   --> project:/contracts/Tiki.sol:530:5:
    |
530 |     function withdrawDividend() public override {
    |     ^ (Relevant source part starts here and spans across multiple lines).

,Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.
  --> project:/contracts/Tiki.sol:13:1:
   |
13 | contract TIKI is ERC20, Ownable {
   | ^ (Relevant source part starts here and spans across multiple lines).


> Artifacts written to /dogemalonedefi/build/contracts
> Compiled successfully using:
   - solc: 0.8.7+commit.e28d00a7.Emscripten.clang


> Duplicate contract names found for Context.
> This can cause errors and unknown behavior. Please rename one of your contracts.


Starting migrations...
======================
> Network name:    'BNBTest'
> Network id:      97
> Block gas limit: 30000000 (0x1c9c380)


2_deploy_contract.js
====================

   Deploying 'IterableMapping'
   ---------------------------
   > transaction hash:    0x9d1624365384919c16727bb51b53dae9312e3d8ee0eb68dff579eaa2015a2df9
   > Blocks: 3            Seconds: 8
   > contract address:    0x69B7376072b1B442FF680170E98008056Ca579b6
   > block number:        11406350
   > block timestamp:     1628745747
   > account:             0xdB898C319a67A7e647Dc570d5d20FA4d64A093F3
   > balance:             9.24136406
   > gas used:            660809 (0xa1549)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00660809 ETH

   Pausing for 5 confirmations...
   ------------------------------
   > confirmation number: 2 (block: 11406353)
   > confirmation number: 3 (block: 11406354)
   > confirmation number: 4 (block: 11406355)
   > confirmation number: 6 (block: 11406357)


   Linking
   -------
   * Contract: TIKI <--> Library: IterableMapping (at address: 0x69B7376072b1B442FF680170E98008056Ca579b6)

   Deploying 'TIKI'
   ----------------
   > transaction hash:    0x247a4fbaf3e408317e9f5bad0c0c40a7449e5e78570b247690b24bf131e96b3d

Error:  *** Deployment Failed ***

"TIKI" hit a require or revert statement somewhere in its constructor. Try:
   * Verifying that your constructor params satisfy all require conditions.
   * Adding reason strings to your require statements.

    at /usr/local/lib/node_modules/truffle/build/webpack:/packages/deployer/src/deployment.js:365:1
    at process._tickCallback (internal/process/next_tick.js:68:7)
Truffle v5.4.5 (core: 5.4.5)
Node v10.19.0
```
### v0.1.0: Firesail of TIKI branding, removal of their excess functions, cleaning code to Certik/HashEx standards

### v0.1.1: Update of variables from immutable to functions and vice versa
