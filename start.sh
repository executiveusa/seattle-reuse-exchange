#!/bin/bash

# Seattle Reuse Exchange - Complete Startup Guide
echo "🚀 Starting Seattle Reuse Exchange Platform..."
echo "=============================================="

echo ""
echo "📋 Prerequisites Checklist:"
echo "✅ Encore CLI installed: $(encore version 2>/dev/null || echo '❌ Install from https://encore.dev/docs/install')"
echo "✅ Node.js: $(node --version 2>/dev/null || echo '❌ Install Node.js 18+')"
echo "✅ pnpm: $(pnpm --version 2>/dev/null || echo '❌ Install pnpm')"

echo ""
echo "🔧 Step 1: Authenticate with Encore (if not done)"
echo "encore auth login"

echo ""
echo "🔧 Step 2: Create Encore App (if not done)"
echo "cd services/api"
echo "encore app create seattle-reuse-exchange"

echo ""
echo "🔧 Step 3: Set up Database"
echo "cd services/api"
echo "encore db migrate"

echo ""
echo "🚀 Step 4: Start Backend Server"
echo "cd services/api"
echo "encore run"
echo ""
echo "Backend will be available at: http://localhost:4000"

echo ""
echo "🎨 Step 5: Start Frontend Server (in new terminal)"
echo "cd apps/web"
echo "pnpm dev"
echo ""
echo "Frontend will be available at: http://localhost:3000"

echo ""
echo "📊 Step 6: Verify Setup"
echo "node check-setup.js"

echo ""
echo "🎉 Your Seattle Reuse Exchange platform will be running at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:4000"
echo "   Encore Dashboard: https://app.encore.dev/"

echo ""
echo "📖 For detailed setup instructions, see: SETUP.md"
echo "🐛 For troubleshooting, see: https://github.com/executiveusa/seattle-reuse-exchange"#!/bin/bash

# Seattle Reuse Exchange - Complete Startup Guide
echo "🚀 Starting Seattle Reuse Exchange Platform..."
echo "=============================================="

echo ""
echo "📋 Prerequisites Checklist:"
echo "✅ Encore CLI installed: $(encore version 2>/dev/null || echo '❌ Install from https://encore.dev/docs/install')"
echo "✅ Node.js: $(node --version 2>/dev/null || echo '❌ Install Node.js 18+')"
echo "✅ pnpm: $(pnpm --version 2>/dev/null || echo '❌ Install pnpm')"

echo ""
echo "🔧 Step 1: Authenticate with Encore (if not done)"
echo "encore auth login"

echo ""
echo "🔧 Step 2: Create Encore App (if not done)"
echo "cd services/api"
echo "encore app create seattle-reuse-exchange"

echo ""
echo "🔧 Step 3: Set up Database"
echo "cd services/api"
echo "encore db migrate"

echo ""
echo "🚀 Step 4: Start Backend Server"
echo "cd services/api"
echo "encore run"
echo ""
echo "Backend will be available at: http://localhost:4000"

echo ""
echo "🎨 Step 5: Start Frontend Server (in new terminal)"
echo "cd apps/web"
echo "pnpm dev"
echo ""
echo "Frontend will be available at: http://localhost:3000"

echo ""
echo "📊 Step 6: Verify Setup"
echo "node check-setup.js"

echo ""
echo "🎉 Your Seattle Reuse Exchange platform will be running at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:4000"
echo "   Encore Dashboard: https://app.encore.dev/"

echo ""
echo "📖 For detailed setup instructions, see: SETUP.md"
echo "🐛 For troubleshooting, see: https://github.com/executiveusa/seattle-reuse-exchange"