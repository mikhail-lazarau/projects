#!/bin/sh
if [ -z "$HUSKY_ROOT" ]; then
  export HUSKY_ROOT=$(dirname "$0")/..
fi

if [ -z "$HUSKY_SH" ]; then
  export HUSKY_SH=$HUSKY_ROOT/node_modules/husky/husky.sh
fi

sh "$HUSKY_SH" "$@"
