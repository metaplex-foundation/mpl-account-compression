import { AnchorProvider } from '@coral-xyz/anchor';
import { ComputeBudgetProgram, Connection,Keypair, SendTransactionError, Signer, Transaction, TransactionInstruction } from '@solana/web3.js';
import * as crypto from 'crypto';

import { createAllocTreeIx, createAppendIx, createInitEmptyMerkleTreeIx, ValidDepthSizePair } from '../src';
import { MerkleTree } from '../src/merkle-tree';

/// Wait for a transaction of a certain id to confirm and optionally log its messages
export async function confirmAndLogTx(provider: AnchorProvider, txId: string, verbose = false) {
    const connection = new Connection(provider.connection.rpcEndpoint, 'confirmed');
    const tx = await connection.confirmTransaction({ signature: txId, ...(await connection.getLatestBlockhash()) }, 'confirmed');
    if (tx.value.err || verbose) {
        console.log((await provider.connection.getTransaction(txId, { commitment: 'confirmed' }))!.meta!.logMessages);
    }
    if (tx.value.err) {
        console.log('Transaction failed');
        throw new Error(JSON.stringify(tx.value.err));
    }
}

/// Execute a series of instructions in a txn
export async function execute(
    provider: AnchorProvider,
    instructions: TransactionInstruction[],
    signers: Signer[],
    skipPreflight = false,
    verbose = false
): Promise<string> {
    let tx = new Transaction();

    tx = tx.add(ComputeBudgetProgram.setComputeUnitLimit({ units: 1_400_000 }));
    tx = tx.add(ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 10_000 }));

    tx.recentBlockhash = (await provider.connection.getLatestBlockhash()).blockhash;
    tx.feePayer = signers[0].publicKey;

    const connection = new Connection(provider.connection.rpcEndpoint, 'confirmed');

    instructions.map(ix => {
        tx = tx.add(ix);
    });

    tx.sign(...signers);

    let txid: string | null = null;
    try {
        txid = await connection.sendRawTransaction(tx.serialize(), {
            skipPreflight,
        });
        await connection.confirmTransaction({
            signature: txid,
            ...(await connection.getLatestBlockhash()),
        }, 'confirmed');
    } catch (e) {
        if (e instanceof SendTransactionError) {
            console.log('Tx error!', e.logs);
        }
        throw e;
    }

    if (verbose && txid) {
        console.log((await provider.connection.getTransaction(txid, { commitment: 'confirmed' }))!.meta!.logMessages);
    }

    return txid;
}

export async function createTreeOnChain(
    provider: AnchorProvider,
    payer: Keypair,
    numLeaves: number,
    depthSizePair: ValidDepthSizePair,
    canopyDepth = 0
): Promise<[Keypair, MerkleTree]> {
    const cmtKeypair = Keypair.generate();

    const leaves = Array(2 ** depthSizePair.maxDepth).fill(Buffer.alloc(32));
    for (let i = 0; i < numLeaves; i++) {
        leaves[i] = crypto.randomBytes(32);
    }
    const tree = new MerkleTree(leaves);

    const allocAccountIx = await createAllocTreeIx(
        provider.connection,
        cmtKeypair.publicKey,
        payer.publicKey,
        depthSizePair,
        canopyDepth
    );

    const ixs = [allocAccountIx, createInitEmptyMerkleTreeIx(cmtKeypair.publicKey, payer.publicKey, depthSizePair)];

    const txId = await execute(provider, ixs, [payer, cmtKeypair]);
    if (canopyDepth) {
        await confirmAndLogTx(provider, txId);
    }

    if (numLeaves) {
        const nonZeroLeaves = leaves.slice(0, numLeaves);
        let appendIxs: TransactionInstruction[] = nonZeroLeaves.map(leaf => {
            return createAppendIx(cmtKeypair.publicKey, payer.publicKey, leaf);
        });
        while (appendIxs.length) {
            const batch = appendIxs.slice(0, 5);
            await execute(provider, batch, [payer]);
            appendIxs = appendIxs.slice(5);
        }
    }
    return [cmtKeypair, tree];
}

export async function createEmptyTreeOnChain(
    provider: AnchorProvider,
    payer: Keypair,
    depthSizePair: ValidDepthSizePair,
    canopyDepth = 0
): Promise<Keypair> {
    const cmtKeypair = Keypair.generate();
    const allocAccountIx = await createAllocTreeIx(
        provider.connection,
        cmtKeypair.publicKey,
        payer.publicKey,
        depthSizePair,
        canopyDepth
    );

    const ixs = [allocAccountIx, createInitEmptyMerkleTreeIx(cmtKeypair.publicKey, payer.publicKey, depthSizePair)];

    const txId = await execute(provider, ixs, [payer, cmtKeypair]);
    await confirmAndLogTx(provider, txId as string);

    return cmtKeypair;
}
