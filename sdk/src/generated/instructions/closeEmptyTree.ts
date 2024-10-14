/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'

/**
 * @category Instructions
 * @category CloseEmptyTree
 * @category generated
 */
export const closeEmptyTreeStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'CloseEmptyTreeInstructionArgs'
)
/**
 * Accounts required by the _closeEmptyTree_ instruction
 *
 * @property [_writable_] merkleTree
 * @property [**signer**] authority
 * @property [_writable_] recipient
 * @category Instructions
 * @category CloseEmptyTree
 * @category generated
 */
export type CloseEmptyTreeInstructionAccounts = {
  merkleTree: web3.PublicKey
  authority: web3.PublicKey
  recipient: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const closeEmptyTreeInstructionDiscriminator = [
  50, 14, 219, 107, 78, 103, 16, 103,
]

/**
 * Creates a _CloseEmptyTree_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category CloseEmptyTree
 * @category generated
 */
export function createCloseEmptyTreeInstruction(
  accounts: CloseEmptyTreeInstructionAccounts,
  programId = new web3.PublicKey('mcmt6YrQEMKw8Mw43FmpRLmf7BqRnFMKmAcbxE3xkAW')
) {
  const [data] = closeEmptyTreeStruct.serialize({
    instructionDiscriminator: closeEmptyTreeInstructionDiscriminator,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.merkleTree,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.authority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.recipient,
      isWritable: true,
      isSigner: false,
    },
  ]

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc)
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
