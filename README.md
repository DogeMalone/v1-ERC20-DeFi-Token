#Doge Malone DeFi ERC20 Token:
##Orginal Setup by @MaxflowO2
###Requirements:
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

###Alpha Test
```
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

###Objectives:
After paging through the orginal sources found below, with the two security audits, we at Doge Malone are upgrading this contract to v0.8.6 in order to fix a plethora of issues found.

Original Sources:
*[bscscan.com uploaded source](https://bscscan.com/address/0x9b76d1b12ff738c113200eb043350022ebf12ff0#code)
*[HashEx audit](https://github.com/HashEx/public_audits/tree/master/TIKI)
*[Certik audit](https://certik-public-assets.s3.amazonaws.com/REP-Tiki-Finance-2021-08-07.pdf)

###v0.0.0: 1:1 Tiki Clone
This is a clone of Tiki Finance Token, doing a simple deployment with 2_deploy_0.0.0.js

Under directory ./contracts/v0.0.0/

IterableMapping is at address (insert)
Tiki.sol is at address (insert)

###v0.0.1: Upgrade of SafeMath, Ownable, IUniswapPair, IUinswapFactory, IUniswapV2Router to 0.8.6
Not messing with DividendPayingToken or IterableMapping as of yet, next step is upgrading those.

###v0.0.2: Upgrade of DividendPayingToken.sol (backbone of this rewards contract)

###v0.0.3: Upgrade of IterableMapping.sol

###v0.1.0: Firesail of TIKI branding, removal of their excess functions, cleaning code to Certik/HashEx standards

###v0.1.1: Update of variables from immutable to functions and vice versa
