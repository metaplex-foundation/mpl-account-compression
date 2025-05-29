# MPL Account Compression

This on-chain program provides an interface for composing smart-contracts to create and use
SPL ConcurrentMerkleTrees. The primary application of using SPL ConcurrentMerkleTrees is
to make edits to off-chain data with on-chain verification. 

This program is targeted towards supporting [Metaplex Compressed NFTs](https://github.com/metaplex-foundation/mpl-bubblegum) and may be subject to change.

Note: Using this program requires an indexer to parse transaction information and write relevant information to an off-chain database.

A _**rough draft**_ of the whitepaper for SPL ConcurrentMerkleTree's can be found [here](https://drive.google.com/file/d/1BOpa5OFmara50fTvL0VIVYjtg-qzHCVc/view).

## NOTICE

This repo is a modified fork of the [original repository](https://github.com/solana-labs/solana-program-library/tree/master/account-compression) published by Solana Labs, Inc. under the Apache 2.0 License.  Modifications to the original repository are made by the Metaplex Foundation to diverge from the behavior of the original implementation. Such modifications are made available for review in the commit history.

## Rust Packages

* `mpl-account-compression`: SDK for interacting with account compression program
* `mpl-noop`: SDK for interacting with no op program, primarily for circumventing log truncation

### Tools
Currently no CI.  Note that this is not functional, it is just a placeholder to create a 2.0.0 compatible SDK.  The mpl-account-compression and mpl-noop crates were published on 5/28/2025 on an Ubuntu 20.04.6 LTS box, using:
* solana-cli 2.0.24 (src:336796a7; feat:607245837, client:Agave)
* rustc 1.82.0 (f6e511eec 2024-10-15)
* anchor-cli 0.31.1

### Building the Rust Packages

From the sdk directory of the repository:

```
pnpm install
pnpm build:program
```

## Typescript SDK

`@metaplex-foundation/mpl-account-compression` is generated using Metaplex Foundation's [Solita](https://github.com/metaplex-foundation/solita/).

### Generate the Typescript SDK

From the sdk directory of the repository:

```
pnpm generate
pnpm lint:fix
```
***Note: It is important to run the lint step after generating with Solita to maintain the existing ordering of struct members.***

***Note: Due to a Solita generation issue, you also have to manually add `export * from './types';` to sdk/src/generated/index.ts, or if there are no other changes, simply checkout the previously-generated version of the file.***

### Build and Test with the Typescript SDK

Testing contracts locally requires the SDK to be built.

From the sdk directory of the repository:

```
pnpm build
pnpm test
```

## Security

The most recent security audit of Account Compression was completed 2022-12-05 by OtterShield.

This audit was completed while the programs were part of the Solana Program Library.  See this [README](https://github.com/solana-labs/solana-program-library#audits) for more information.
