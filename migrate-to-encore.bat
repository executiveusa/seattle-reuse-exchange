@echo off
echo ================================
echo Seattle Reuse Exchange
echo Encore Cloud Migration Script
echo ================================
echo.

echo Step 1: Authenticate with Encore Cloud
echo Running: encore auth login
call encore auth login
if %errorlevel% neq 0 (
    echo ERROR: Failed to authenticate with Encore
    pause
    exit /b 1
)
echo ✅ Authentication successful
echo.

echo Step 2: Navigate to backend directory
cd services\api
if %errorlevel% neq 0 (
    echo ERROR: Could not find services\api directory
    pause
    exit /b 1
)
echo ✅ In backend directory
echo.

echo Step 3: Create Encore app
echo Running: encore app create seattle-reuse-exchange
call encore app create seattle-reuse-exchange
if %errorlevel% neq 0 (
    echo ERROR: Failed to create Encore app
    pause
    exit /b 1
)
echo ✅ Encore app created
echo.

echo Step 4: Test local development
echo Running: encore run
echo.
echo This will start your backend locally at http://localhost:4000
echo Press Ctrl+C to stop the server when ready to continue
echo.
pause
call encore run

echo.
echo Step 5: Deploy to Encore Cloud
echo Running: encore deploy
call encore deploy
if %errorlevel% neq 0 (
    echo ERROR: Deployment failed
    pause
    exit /b 1
)
echo ✅ Deployed to Encore Cloud
echo.

echo ================================
echo 🎉 Migration Complete!
echo ================================
echo.
echo Your Seattle Reuse Exchange backend is now running on Encore Cloud!
echo.
echo Next steps:
echo 1. Update your frontend API URL to point to your Encore Cloud deployment
echo 2. Configure production environment variables in Encore dashboard  
echo 3. Set up your database and run migrations
echo 4. Configure secrets (Stripe, Resend, etc.) in Encore dashboard
echo.
echo Visit https://app.encore.dev/ to view your deployment
echo.
pause