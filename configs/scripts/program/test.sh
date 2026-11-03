#!/bin/bash

# Runs the Rust tests for one program. The shared test-programs workflow calls
# this from configs/scripts/program with PROGRAM set to the program's directory
# name under programs/; cargo fmt and clippy have already run by then.
#
# The programs carry no tests of their own: the logic that matters lives in
# the workspace libraries that mpl-account-compression embeds
# (libraries/concurrent-merkle-tree and libraries/merkle-tree-reference), and
# the end-to-end tests are the Jest suite under sdk/, which needs a local
# validator and is run by hand (see README.md). So each program maps to the
# set of workspace packages that `cargo test` should cover on the host; the
# programs were already built for SBF by build-programs.yml.
#
#   PROGRAM=account-compression configs/scripts/program/test.sh [cargo test args...]
#   configs/scripts/program/test.sh noop [cargo test args...]
# The program names accepted on the command line are the cases in packages_for.

set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
OUTPUT="./programs/.bin"

# go to parent folder
cd "$(dirname "$(dirname "$(dirname "${SCRIPT_DIR}")")")"

if [ -n "${PROGRAM:-}" ]; then
    PROGRAMS="[\"${PROGRAM}\"]"
fi

if [ -z "${PROGRAMS:-}" ]; then
    PROGRAMS="$(grep "^PROGRAMS=" .github/.env | cut -d '=' -f 2)"
fi

# default to input from the command-line
ARGS=("$@")

# A first argument that names a program overrides PROGRAM/PROGRAMS; anything
# else (for example `-- --nocapture`) is passed through to cargo test.
if [ $# -gt 0 ]; then
    case "$1" in
        account-compression|noop)
            PROGRAMS="[\"${1}\"]"
            shift
            ;;
    esac
    ARGS=("$@")
fi

PROGRAMS=$(printf '%s\n' "${PROGRAMS}" | jq -c '.[]' | sed 's/"//g')

WORKING_DIR=$(pwd)
export SBF_OUT_DIR="${WORKING_DIR}/${OUTPUT}"

# Workspace packages tested for each program.
packages_for() {
    case "$1" in
        account-compression)
            echo "mpl-account-compression spl-concurrent-merkle-tree spl-merkle-tree-reference"
            ;;
        noop)
            echo "mpl-noop"
            ;;
        *)
            echo "unknown program '$1'" >&2
            exit 1
            ;;
    esac
}

while IFS= read -r p; do
    # Assigned on its own so an unknown program stops the script (set -e)
    # instead of running `cargo test` for the whole workspace.
    packages="$(packages_for "${p}")"
    PACKAGE_ARGS=()
    for pkg in $packages; do
        PACKAGE_ARGS+=(--package "${pkg}")
    done
    echo "Testing ${p}: ${PACKAGE_ARGS[*]}"
    cargo test "${PACKAGE_ARGS[@]}" ${ARGS[@]+"${ARGS[@]}"}
done <<< "${PROGRAMS}"
