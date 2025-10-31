#!/bin/bash
# ======================================================
# DevOps Simulator - Unified Deployment Script
# Version: 2.0.0
# Supports: production | development
# ======================================================

set -e

# Default environment (can be overridden)
DEPLOY_ENV=${DEPLOY_ENV:-development}

echo "====================================="
echo "DevOps Simulator - $DEPLOY_ENV Deploy"
echo "====================================="

# Common configuration
APP_NAME="DevOpsSimulator"
CONFIG_FILE="config/app-config.yaml"

# Environment-specific settings
if [ "$DEPLOY_ENV" == "production" ]; then
    DEPLOY_REGION="us-east-1"
    APP_PORT=8080
    DEPLOY_MODE="kubernetes"
    ENABLE_DEBUG=false
    APP_URL="https://app.example.com"

    echo "Environment: $DEPLOY_ENV"
    echo "Region: $DEPLOY_REGION"
    echo "Port: $APP_PORT"
    echo "Mode: $DEPLOY_MODE"
    echo "Debug: $ENABLE_DEBUG"

    echo "Running pre-deployment checks..."
    if [ ! -f "$CONFIG_FILE" ]; then
        echo "Error: Configuration file not found!"
        exit 1
    fi

    echo "Starting deployment..."
    echo "Pulling latest Docker images..."
    # docker pull devops-simulator:latest

    echo "Rolling update strategy initiated..."
    # kubectl rolling-update devops-simulator

    echo "Deployment completed successfully!"
    echo "Application available at: $APP_URL"

else
    DEPLOY_MODE="docker-compose"
    APP_PORT=3000
    ENABLE_DEBUG=true
    APP_URL="http://localhost:$APP_PORT"

    echo "Environment: $DEPLOY_ENV"
    echo "Mode: $DEPLOY_MODE"
    echo "Port: $APP_PORT"
    echo "Debug: $ENABLE_DEBUG"

    echo "Running pre-deployment checks..."
    if [ ! -f "$CONFIG_FILE" ]; then
        echo "Error: Configuration file not found!"
        exit 1
    fi

    echo "Installing dependencies..."
    npm install

    echo "Running tests..."
    npm test

    echo "Starting deployment using Docker Compose..."
    docker-compose up -d

    echo "Waiting for application to start..."
    sleep 5

    echo "Performing health check..."
    curl -f http://localhost:$APP_PORT/health || {
        echo "Health check failed!"
        exit 1
    }

    echo "Deployment completed successfully!"
    echo "Application available at: $APP_URL"
    echo "Hot reload enabled - code changes will auto-refresh"
fi
