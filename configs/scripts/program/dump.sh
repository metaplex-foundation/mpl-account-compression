#!/bin/bash

# Dumps the external programs the tests need into the output directory ($1).
#
# The shared build-programs workflow runs this after building; the template
# version fetches third-party programs from mainnet. mpl-account-compression
# has no external program dependencies (mpl-noop is built from this
# repository), so there is nothing to dump. Add EXTERNAL_ID/EXTERNAL_SO pairs
# here, following mpl-bubblegum's dump.sh, if that ever changes.

set -euo pipefail

OUTPUT=$1

if [ -z "$OUTPUT" ]; then
    echo "missing output directory"
    exit 1
fi

# creates the output directory if it doesn't exist
if [ ! -d "${OUTPUT}" ]; then
    mkdir -p "${OUTPUT}"
fi

echo "No external programs to dump for mpl-account-compression."
