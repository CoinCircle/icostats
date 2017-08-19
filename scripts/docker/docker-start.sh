#!/usr/bin/env bash
set -e

# Change directory to be the app root, and save to var
ROOT_DIR=$(cd "$(dirname "$0")/../../"; pwd)

# Export env vars
export NODE_ENV="production"
. .env

echo "[+] Location '${ROOT_DIR}'"

# Build production bundle
npm run build

# Start up!
pm2 start dist/server.js -i 0 --name "server"

# auto-reload
pm2 save

exec "$@"
