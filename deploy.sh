#!/bin/bash

USER="u112427540"
HOST="access964359443.webspace-data.io"
REMOTE_DIR="/kunden/homepages/1/d964359443/htdocs/loading"
LOCAL_DIR="$(pwd)"

echo "---Configuration---"
echo "REMOTE_USER: ${REMOTE_USER}"
echo "REMOTE_HOST: ${REMOTE_HOST}"
echo "REMOTE_DIR: ${REMOTE_DIR}"
echo "LOCAL_DIR: ${LOCAL_DIR}"
echo "-------------------"
echo "Downloading log.jsonl from remote host"

# How to Setup passwordless remote authentication
# 1. Create localkey
#    ssh-keygen -t rsa -b 4096 -C "email@domain"
# 2. Copy Key to remote
#    ssh-copy-id u112427540@access964359443.webspace-data.io

# Pull log.jsonl from remote to local
rsync -avz -e ssh "${USER}@${HOST}:${REMOTE_DIR}/log.jsonl" "${LOCAL_DIR}/"

echo "Upload current dir (${LOCAL_DIR}) to remote."
# Push current directory to remote
rsync -avz --delete -e ssh "${LOCAL_DIR}/" "${USER}@${HOST}:${REMOTE_DIR}/"
