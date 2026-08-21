#!/usr/bin/env bash
# Builds the site and uploads it to the VPS.
# Run this from your own machine (not inside the server), from the project root:
#   ./deploy/deploy.sh
#
# First-time setup: fill in SERVER_USER and SERVER_IP below, and make sure
# you can already run `ssh SERVER_USER@SERVER_IP` without a password prompt
# (see the SSH key step in the deployment guide).

set -euo pipefail

SERVER_USER="deploy"                      # the non-root user you created on the server
SERVER_IP="YOUR_SERVER_IP"                # e.g. 203.0.113.5
REMOTE_PATH="/var/www/website-turmeric"   # must match nginx.conf's root's parent dir

echo "Installing dependencies..."
npm ci

echo "Building production bundle..."
npm run build

echo "Uploading dist/ to $SERVER_USER@$SERVER_IP:$REMOTE_PATH/dist ..."
rsync -avz --delete dist/ "$SERVER_USER@$SERVER_IP:$REMOTE_PATH/dist/"

echo "Done. Visit your domain to see the update."
