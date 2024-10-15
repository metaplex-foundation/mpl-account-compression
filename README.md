# Account Compression (Beta)

This on-chain program provides an interface for composing smart-contracts to create and use
SPL ConcurrentMerkleTrees. The primary application of using SPL ConcurrentMerkleTrees is
to make edits to off-chain data with on-chain verification. 

This program is targeted towards supporting [Metaplex Compressed NFTs](https://github.com/metaplex-foundation/mpl-bubblegum) and may be subject to change.

Note: Using this program requires an indexer to parse transaction information and write relevant information to an off-chain database.

A _**rough draft**_ of the whitepaper for SPL ConcurrentMerkleTree's can be found [here](https://drive.google.com/file/d/1BOpa5OFmara50fTvL0VIVYjtg-qzHCVc/view).

## NOTICE

This repo is a modified fork of the [original repository](https://github.com/solana-labs/solana-program-library/tree/master/account-compression) published by Solana Labs, Inc. under the Apache 2.0 License.  Modifications to the original repository are made by the Metaplex Foundation to diverge from the behavior of the original implementation. Such modifications are made available for review in the commit history.

## Rust Packages

* `spl-account-compression`: SDK for interacting with account compression program
* `spl-noop`: SDK for interacting with no op program, primarily for circumventing log truncation
* `spl-concurrent-merkle-tree`: SDK for creating SPL ConcurrentMerkleTrees

## Typescript SDK

`@solana/spl-account-compression` is generated using Metaplex Foundation's [Solita](https://github.com/metaplex-foundation/solita/). 

## Testing and Development

Testing contracts locally requires the SDK to be built. 

With a built local SDK, the test suite can be ran with:

1. `pnpm link @solana/spl-account-compression`
2. `pnpm i`
3. `pnpm test`

## Security

The most recent security audit of Account Compression was completed 2022-12-05 by OtterShield.

This audit was completed while the programs were part of the Solana Program Library.  See this [README](https://github.com/solana-labs/solana-program-library#audits) for more information.
