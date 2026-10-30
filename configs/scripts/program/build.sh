#!/bin/bash

# Builds the programs with cargo build-sbf into programs/.bin, the layout the
# shared CI in metaplex-foundation/actions expects. Mirrors the `sbf` branch
# of build-programs.yml so a local build produces the same artifacts.
#
#   configs/scripts/program/build.sh                 # every program in .github/.env
#   configs/scripts/program/build.sh noop [args...]  # one program, extra args to cargo build-sbf

set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
OUTPUT="./programs/.bin"

# go to parent folder
cd "$(dirname "$(dirname "$(dirname "${SCRIPT_DIR}")")")"

# saves external programs binaries to the output directory
"${SCRIPT_DIR}/dump.sh" "${OUTPUT}"

if [ -z "${PROGRAMS+x}" ]; then
    PROGRAMS="$(grep "^PROGRAMS=" .github/.env | cut -d '=' -f 2)"
fi

# default to input from the command-line
ARGS=("$@")

# command-line arguments override env variable
if [ $# -gt 0 ]; then
    PROGRAMS="[\"${1}\"]"
    shift
    ARGS=("$@")
fi

PROGRAMS=$(printf '%s\n' "${PROGRAMS}" | jq -c '.[]' | sed 's/"//g')

# creates the output directory if it doesn't exist
if [ ! -d "${OUTPUT}" ]; then
    mkdir "${OUTPUT}"
fi

WORKING_DIR=$(pwd)
export SBF_OUT_DIR="${WORKING_DIR}/${OUTPUT}"

while IFS= read -r p; do
    cargo build-sbf --manifest-path "${WORKING_DIR}/programs/${p}/Cargo.toml" \
        --sbf-out-dir "${WORKING_DIR}/${OUTPUT}" ${ARGS[@]+"${ARGS[@]}"}
done <<< "${PROGRAMS}"
