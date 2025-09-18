# Seattle Reuse Exchange - Complete Setup Guide

This guide will walk you through setting up the complete Seattle Reuse Exchange platform.

## Prerequisites

- Node.js 18+
- Go 1.22+
- Git
- An Encore account (free at encore.dev)

## Step 1: Install Encore CLI

### Windows
1. Visit: https://encore.dev/docs/install
2. Download the Windows binary
3. Add to your PATH, or use one of these methods:

```powershell
# Option A: Using Go (if installed)
go install encore.dev/cmd/encore@latest

# Option B: Using Chocolatey
choco install encore

# Option C: Using Scoop
scoop install encore
```

### Verify installation
```bash
encore version
```

## Step 2: Authenticate with Encore Cloud

```bash
# Login to your Encore account
encore auth login

# This will open a browser to authenticate
```

## Step 3: Create Encore App

```bash
# Navigate to the services directory
cd services/api

# Initialize as an Encore app
encore app create seattle-reuse-exchange

# This connects your local code to Encore Cloud
```

## Step 4: Set Up Environment Variables

### 4.1 Get Required API Keys

1. **Stripe** (Payments)
   - Go to: https://dashboard.stripe.com/
   - Get your test keys from the dashboard
   - Update STRIPE_SECRET_KEY and STRIPE_PUBLIC_KEY in .env files

2. **Resend** (Email)
   - Go to: https://resend.com/
   - Create account and get API key
   - Update RESEND_API_KEY in .env files

3. **Google OAuth** (Authentication)
   - Go to: https://console.cloud.google.com/
   - Create OAuth credentials
   - Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

4. **Meilisearch** (Search)
   - Install locally: https://docs.meilisearch.com/learn/getting_started/installation.html
   - Or use cloud: https://www.meilisearch.com/cloud
   - Update MEILISEARCH_API_KEY

### 4.2 Update Environment Files

Edit these files with your actual values:
- `.env` (root)
- `services/api/.env.encore` (backend)
- `apps/web/.env.local` (frontend)

## Step 5: Set Up Database

```bash
# Encore will create a database automatically
cd services/api

# Run database migrations
encore db migrate

# This creates all the tables defined in infra/migrations/
```

## Step 6: Start Development Servers

### Terminal 1: Start Encore Backend
```bash
cd services/api
encore run
```

### Terminal 2: Start Next.js Frontend  
```bash
cd apps/web
pnpm dev
```

### Terminal 3: Start Meilisearch (if running locally)
```bash
# Download from https://docs.meilisearch.com/learn/getting_started/installation.html
./meilisearch --master-key=your-master-key
```

## Step 7: Verify Everything Works

1. **Backend API**: http://localhost:4000
   - Check API documentation in Encore dashboard

2. **Frontend**: http://localhost:3000
   - Should show the Seattle Reuse Exchange homepage

3. **Database**: Check in Encore dashboard
   - View tables and data

## Step 8: Deploy to Production

```bash
# Deploy backend to Encore Cloud
cd services/api
encore deploy

# Deploy frontend to Vercel
cd apps/web
vercel deploy
```

## Troubleshooting

### Common Issues:

1. **Encore CLI not found**
   - Make sure it's in your PATH
   - Try restarting your terminal

2. **Database connection errors**
   - Check that migrations ran successfully
   - Verify DATABASE_URL in .env.encore

3. **API keys not working**
   - Make sure you're using test keys for development
   - Check that .env files are not in .gitignore

4. **Frontend can't connect to backend**
   - Verify NEXT_PUBLIC_API_URL points to Encore dev server
   - Check CORS settings in backend

## Next Steps

Once everything is running:

1. **Add seed data** - Run the seed scripts in `/seeds`
2. **Configure payments** - Set up Stripe webhooks
3. **Set up monitoring** - Use Encore's built-in monitoring
4. **Configure search** - Index your products in Meilisearch
5. **Set up CI/CD** - Use the GitHub Actions workflows

## Support

- Encore Docs: https://encore.dev/docs
- Next.js Docs: https://nextjs.org/docs
- Project Issues: https://github.com/executiveusa/seattle-reuse-exchange/issues

Happy coding! 🚀