/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

type ErrorWithCode = Error & { code: number };
type MaybeErrorWithCode = ErrorWithCode | null | undefined;

const createErrorFromCodeLookup: Map<number, () => ErrorWithCode> = new Map();
const createErrorFromNameLookup: Map<string, () => ErrorWithCode> = new Map();

/**
 * IncorrectLeafLength: 'Incorrect leaf length. Expected vec of 32 bytes'
 *
 * @category Errors
 * @category generated
 */
export class IncorrectLeafLengthError extends Error {
    readonly code: number = 0x1770;
    readonly name: string = 'IncorrectLeafLength';
    constructor() {
        super('Incorrect leaf length. Expected vec of 32 bytes');
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, IncorrectLeafLengthError);
        }
    }
}

createErrorFromCodeLookup.set(0x1770, () => new IncorrectLeafLengthError());
createErrorFromNameLookup.set('IncorrectLeafLength', () => new IncorrectLeafLengthError());

/**
 * ConcurrentMerkleTreeError: 'Concurrent merkle tree error'
 *
 * @category Errors
 * @category generated
 */
export class ConcurrentMerkleTreeErrorError extends Error {
    readonly code: number = 0x1771;
    readonly name: string = 'ConcurrentMerkleTreeError';
    constructor() {
        super('Concurrent merkle tree error');
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConcurrentMerkleTreeErrorError);
        }
    }
}

createErrorFromCodeLookup.set(0x1771, () => new ConcurrentMerkleTreeErrorError());
createErrorFromNameLookup.set(
    'ConcurrentMerkleTreeError',
    () => new ConcurrentMerkleTreeErrorError(),
);

/**
 * ZeroCopyError: 'Issue zero copying concurrent merkle tree data'
 *
 * @category Errors
 * @category generated
 */
export class ZeroCopyErrorError extends Error {
    readonly code: number = 0x1772;
    readonly name: string = 'ZeroCopyError';
    constructor() {
        super('Issue zero copying concurrent merkle tree data');
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ZeroCopyErrorError);
        }
    }
}

createErrorFromCodeLookup.set(0x1772, () => new ZeroCopyErrorError());
createErrorFromNameLookup.set('ZeroCopyError', () => new ZeroCopyErrorError());

/**
 * ConcurrentMerkleTreeConstantsError: 'An unsupported max depth or max buffer size constant was provided'
 *
 * @category Errors
 * @category generated
 */
export class ConcurrentMerkleTreeConstantsErrorError extends Error {
    readonly code: number = 0x1773;
    readonly name: string = 'ConcurrentMerkleTreeConstantsError';
    constructor() {
        super('An unsupported max depth or max buffer size constant was provided');
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConcurrentMerkleTreeConstantsErrorError);
        }
    }
}

createErrorFromCodeLookup.set(0x1773, () => new ConcurrentMerkleTreeConstantsErrorError());
createErrorFromNameLookup.set(
    'ConcurrentMerkleTreeConstantsError',
    () => new ConcurrentMerkleTreeConstantsErrorError(),
);

/**
 * CanopyLengthMismatch: 'Expected a different byte length for the merkle tree canopy'
 *
 * @category Errors
 * @category generated
 */
export class CanopyLengthMismatchError extends Error {
    readonly code: number = 0x1774;
    readonly name: string = 'CanopyLengthMismatch';
    constructor() {
        super('Expected a different byte length for the merkle tree canopy');
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, CanopyLengthMismatchError);
        }
    }
}

createErrorFromCodeLookup.set(0x1774, () => new CanopyLengthMismatchError());
createErrorFromNameLookup.set('CanopyLengthMismatch', () => new CanopyLengthMismatchError());

/**
 * IncorrectAuthority: 'Provided authority does not match expected tree authority'
 *
 * @category Errors
 * @category generated
 */
export class IncorrectAuthorityError extends Error {
    readonly code: number = 0x1775;
    readonly name: string = 'IncorrectAuthority';
    constructor() {
        super('Provided authority does not match expected tree authority');
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, IncorrectAuthorityError);
        }
    }
}

createErrorFromCodeLookup.set(0x1775, () => new IncorrectAuthorityError());
createErrorFromNameLookup.set('IncorrectAuthority', () => new IncorrectAuthorityError());

/**
 * IncorrectAccountOwner: 'Account is owned by a different program, expected it to be owned by this program'
 *
 * @category Errors
 * @category generated
 */
export class IncorrectAccountOwnerError extends Error {
    readonly code: number = 0x1776;
    readonly name: string = 'IncorrectAccountOwner';
    constructor() {
        super('Account is owned by a different program, expected it to be owned by this program');
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, IncorrectAccountOwnerError);
        }
    }
}

createErrorFromCodeLookup.set(0x1776, () => new IncorrectAccountOwnerError());
createErrorFromNameLookup.set('IncorrectAccountOwner', () => new IncorrectAccountOwnerError());

/**
 * IncorrectAccountType: 'Account provided has incorrect account type'
 *
 * @category Errors
 * @category generated
 */
export class IncorrectAccountTypeError extends Error {
    readonly code: number = 0x1777;
    readonly name: string = 'IncorrectAccountType';
    constructor() {
        super('Account provided has incorrect account type');
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, IncorrectAccountTypeError);
        }
    }
}

createErrorFromCodeLookup.set(0x1777, () => new IncorrectAccountTypeError());
createErrorFromNameLookup.set('IncorrectAccountType', () => new IncorrectAccountTypeError());

/**
 * LeafIndexOutOfBounds: 'Leaf index of concurrent merkle tree is out of bounds'
 *
 * @category Errors
 * @category generated
 */
export class LeafIndexOutOfBoundsError extends Error {
    readonly code: number = 0x1778;
    readonly name: string = 'LeafIndexOutOfBounds';
    constructor() {
        super('Leaf index of concurrent merkle tree is out of bounds');
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, LeafIndexOutOfBoundsError);
        }
    }
}

createErrorFromCodeLookup.set(0x1778, () => new LeafIndexOutOfBoundsError());
createErrorFromNameLookup.set('LeafIndexOutOfBounds', () => new LeafIndexOutOfBoundsError());

/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 * @category generated
 */
export function errorFromCode(code: number): MaybeErrorWithCode {
    const createError = createErrorFromCodeLookup.get(code);
    return createError != null ? createError() : null;
}

/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 * @category generated
 */
export function errorFromName(name: string): MaybeErrorWithCode {
    const createError = createErrorFromNameLookup.get(name);
    return createError != null ? createError() : null;
}
