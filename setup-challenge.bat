@echo off
REM SpaceX Dashboard Challenge - Quick Setup Script for Windows
REM Run this script to complete the missing requirements

echo 🚀 SpaceX Dashboard Challenge - Setup Script
echo ============================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    exit /b 1
)

echo 📁 Current directory: %CD%

REM Initialize git if not already done
if not exist ".git" (
    echo 🔧 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit: SpaceX Launch Dashboard with React TypeScript"
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

REM Check current branch and create feature branch if needed
git rev-parse --verify feat/spacex >nul 2>&1
if errorlevel 1 (
    echo 🌿 Creating feature branch 'feat/spacex'...
    git checkout -b feat/spacex
    echo ✅ Created and switched to feat/spacex branch
) else (
    git checkout feat/spacex
    echo ✅ Switched to feat/spacex branch
)

REM Build the project
echo 🔨 Building project for deployment...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed
    exit /b 1
) else (
    echo ✅ Build successful
)

echo.
echo 🎯 NEXT STEPS:
echo 1. Create GitHub repository: interview-for-^<your-full-name^>
echo 2. Add remote: git remote add origin ^<YOUR_REPO_URL^>
echo 3. Push: git push -u origin main ^&^& git push -u origin feat/spacex
echo 4. Deploy to Vercel: npm install -g vercel ^&^& vercel --prod
echo 5. Create Pull Request: feat/spacex → main
echo 6. Add reviewers: abbasali1994, rhymes17
echo 7. Add deployment URL as comment
echo 8. Mark PR as 'Ready for review'
echo.
echo 📋 See CHALLENGE_CHECKLIST.md for detailed steps

pause
