#!/bin/bash

# 🚀 Start Atelier Server
# Usage: ./start.sh

set -e

echo "🔧 Starting Atelier Server..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version)"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check .env file
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "📋 Creating from template..."
    cp .env.example .env
    echo "💡 Edit .env with your settings, then run this script again"
    exit 1
fi

echo "🌐 Starting server..."
echo "📡 Server will run on: http://localhost:5000"
echo "🛑 Press Ctrl+C to stop"
echo ""

# Start with proper environment
NODE_ENV=development npm start
