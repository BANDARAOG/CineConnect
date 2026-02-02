#!/bin/bash

# CineConnect Development Server Launcher
# This script will start the dev server and display output properly

echo "=========================================="
echo "   CineConnect - Development Server"
echo "=========================================="
echo ""
echo "Starting development server..."
echo "Project: cineconnect-lk"
echo "Port: 3000"
echo "URL: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=========================================="
echo ""

# Change to project directory
cd /Users/hirushapathum/Documents/GitHub/cineconnect-lk

# Verify npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Verify node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the dev server
echo "🚀 Starting Next.js development server..."
echo ""
npm run dev
