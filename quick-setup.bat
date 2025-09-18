@echo off
echo ====================================
echo Seattle Reuse Exchange - Quick Setup
echo ====================================
echo.

echo Step 1: Installing Encore CLI...
echo Please visit https://encore.dev/docs/install to download Encore CLI
echo Or run: go install encore.dev/cmd/encore@latest
echo.
pause

echo Step 2: Authenticating with Encore...
echo Please run: encore auth login
echo.
pause

echo Step 3: Creating Encore App...
cd services\api
echo Please run: encore app create seattle-reuse-exchange
echo.
pause

echo Step 4: Setting up database...
echo Please run: encore db migrate
echo.
pause

echo Step 5: Environment Variables Setup
echo Please edit the following files with your API keys:
echo - .env (root directory)
echo - services\api\.env.encore
echo - apps\web\.env.local
echo.
echo Required services:
echo - Stripe (payments): https://dashboard.stripe.com/
echo - Resend (email): https://resend.com/
echo - Google OAuth: https://console.cloud.google.com/
echo - Meilisearch: https://www.meilisearch.com/
echo.
pause

echo Step 6: Starting servers...
echo Open 2 terminals and run:
echo Terminal 1: cd services\api && encore run
echo Terminal 2: cd apps\web && pnpm dev
echo.
echo Your app will be available at:
echo Frontend: http://localhost:3000
echo Backend: http://localhost:4000
echo.
echo Setup complete! Check SETUP.md for detailed instructions.
pause