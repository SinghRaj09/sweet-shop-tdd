#!/bin/bash

echo "=================================================="
echo "🍬 Sweet Shop Backend - Quick Setup Script"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed."
    echo "   Install PostgreSQL:"
    echo "   - Ubuntu/Debian: sudo apt-get install postgresql"
    echo "   - macOS: brew install postgresql"
    echo "   - Windows: Download from postgresql.org"
    echo ""
    read -p "Do you want to continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ PostgreSQL is installed"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit the .env file with your database credentials!"
    echo "   nano .env"
    echo ""
    read -p "Press Enter to continue after editing .env..."
fi

echo ""
echo "🚀 Starting the server..."
echo ""

npm run dev
