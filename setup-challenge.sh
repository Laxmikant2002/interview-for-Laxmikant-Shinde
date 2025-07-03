#!/bin/bash

# SpaceX Dashboard Challenge - Quick Setup Script
# Run this script to complete the missing requirements

echo "🚀 SpaceX Dashboard Challenge - Setup Script"
echo "============================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📁 Current directory: $(pwd)"

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: SpaceX Launch Dashboard with React TypeScript"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote origin exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo ""
    echo "⚠️  MANUAL STEP REQUIRED:"
    echo "1. Create a GitHub repository named: interview-for-<your-full-name>"
    echo "2. Make it PUBLIC"
    echo "3. Copy the repository URL"
    echo "4. Run: git remote add origin <YOUR_REPO_URL>"
    echo "5. Run: git push -u origin main"
    echo ""
else
    echo "✅ Remote origin already configured"
fi

# Create feature branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "feat/spacex" ]; then
    echo "🌿 Creating feature branch 'feat/spacex'..."
    git checkout -b feat/spacex 2>/dev/null || git checkout feat/spacex
    echo "✅ Switched to feat/spacex branch"
else
    echo "✅ Already on feat/spacex branch"
fi

# Build the project
echo "🔨 Building project for deployment..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎯 NEXT STEPS:"
echo "1. Deploy to Vercel: 'npm install -g vercel && vercel --prod'"
echo "2. Or deploy to Netlify: drag 'build' folder to netlify.com"
echo "3. Create Pull Request: feat/spacex → main"
echo "4. Add reviewers: abbasali1994, rhymes17"
echo "5. Add deployment URL as comment"
echo "6. Mark PR as 'Ready for review'"
echo ""
echo "📋 See CHALLENGE_CHECKLIST.md for detailed steps"
