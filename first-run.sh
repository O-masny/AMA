#!/bin/bash
# -----------------------------
# First Run Script for AMA Docker App
# -----------------------------
# Author: tady_vlož_svůj_nick
# Description: Creates Docker network, builds and runs AMA app and logs output
# -----------------------------

# Log file
LOG_FILE="/var/www/AMA/first-run.log"

echo "===== $(date '+%Y-%m-%d %H:%M:%S') =====" | tee -a "$LOG_FILE"
echo "Starting first run setup for AMA Docker app..." | tee -a "$LOG_FILE"

# Step 1: Create external Docker network if it doesn't exist
NETWORK_NAME="ama"
if ! docker network ls | grep -q "$NETWORK_NAME"; then
    echo "Creating Docker network: $NETWORK_NAME" | tee -a "$LOG_FILE"
    docker network create "$NETWORK_NAME" >> "$LOG_FILE" 2>&1
else
    echo "Docker network $NETWORK_NAME already exists" | tee -a "$LOG_FILE"
fi

# Step 2: Ensure volumes exist
echo "Checking/creating Docker volumes..." | tee -a "$LOG_FILE"
docker volume create storage_data >> "$LOG_FILE" 2>&1
docker volume create database_data >> "$LOG_FILE" 2>&1

# Step 3: Build and run Docker containers
echo "Building and starting Docker containers..." | tee -a "$LOG_FILE"
docker-compose -f /var/www/AMA/docker-compose.yml up -d --build >> "$LOG_FILE" 2>&1

# Step 4: Show container status
echo "Docker containers status:" | tee -a "$LOG_FILE"
docker ps | tee -a "$LOG_FILE"

echo "First run setup completed!" | tee -a "$LOG_FILE"
echo "Logs saved in $LOG_FILE"
