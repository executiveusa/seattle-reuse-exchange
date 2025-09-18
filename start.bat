@echo off
echo 🚀 Starting Seattle Reuse Exchange Platform...
echo ==============================================
echo.

echo 📋 Prerequisites Check:
echo.
echo Checking Encore CLI...
encore version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Encore CLI: Found
) else (
    echo ❌ Encore CLI: Install from https://encore.dev/docs/install
)

echo.
echo 🔧 Complete Setup Steps:
echo.
echo Step 1: Authenticate with Encore
echo    encore auth login
echo.
echo Step 2: Create Encore App
echo    cd services\api
echo    encore app create seattle-reuse-exchange
echo.
echo Step 3: Set up Database
echo    cd services\api
echo    encore db migrate
echo.
echo Step 4: Start Backend Server
echo    cd services\api
echo    encore run
echo.
echo Step 5: Start Frontend Server (in new terminal)
echo    cd apps\web
echo    pnpm dev
echo.
echo 🎉 Your platform will be available at:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:4000
echo    Encore Dashboard: https://app.encore.dev/
echo.
echo 📖 See SETUP.md for detailed instructions
echo 🔧 Run 'node check-setup.js' to verify your setup
echo.
pause@echo off
echo 🚀 Starting Seattle Reuse Exchange Platform...
echo ==============================================
echo.

echo 📋 Prerequisites Check:
echo.
echo Checking Encore CLI...
encore version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Encore CLI: Found
) else (
    echo ❌ Encore CLI: Install from https://encore.dev/docs/install
)

echo.
echo 🔧 Complete Setup Steps:
echo.
echo Step 1: Authenticate with Encore
echo    encore auth login
echo.
echo Step 2: Create Encore App
echo    cd services\api
echo    encore app create seattle-reuse-exchange
echo.
echo Step 3: Set up Database
echo    cd services\api
echo    encore db migrate
echo.
echo Step 4: Start Backend Server
echo    cd services\api
echo    encore run
echo.
echo Step 5: Start Frontend Server (in new terminal)
echo    cd apps\web
echo    pnpm dev
echo.
echo 🎉 Your platform will be available at:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:4000
echo    Encore Dashboard: https://app.encore.dev/
echo.
echo 📖 See SETUP.md for detailed instructions
echo 🔧 Run 'node check-setup.js' to verify your setup
echo.
pause