#!/bin/bash
# CineConnect Startup Script
# Run this file to start the development server

echo "🎬 CineConnect Sri Lanka - Startup Script"
echo "═══════════════════════════════════════════════════════════════════════════════"
echo ""
echo "Step 1: Navigate to project directory"
cd /Users/hirushapathum/Documents/GitHub/cineconnect-lk

echo "Step 2: Install dependencies (if not already installed)"
npm install

echo ""
echo "Step 3: Starting development server..."
echo "═══════════════════════════════════════════════════════════════════════════════"
echo ""
echo "🚀 Server starting on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo ""

npm run dev
