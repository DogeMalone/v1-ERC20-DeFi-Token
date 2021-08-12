# Doge Malone DeFi ERC20 Token:
## Orginal Setup by @MaxflowO2
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
Inserted into v0.0.1
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
Boom, we got v0.0.3 ready to roll. Will probably roll out a v0.0.4 package soon with type errors from above.
### v0.0.3: Upgrade of IterableMapping.sol
Inserted into v0.0.1
This has been updated to ^0.8.7
### v0.1.0: Firesail of TIKI branding, removal of their excess functions, cleaning code to Certik/HashEx standards

### v0.1.1: Update of variables from immutable to functions and vice versa
