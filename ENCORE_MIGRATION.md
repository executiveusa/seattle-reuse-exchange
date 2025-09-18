# 🚀 Seattle Reuse Exchange - Encore Cloud Migration Guide

## Overview

This guide walks you through migrating your Seattle Reuse Exchange backend from local development to Encore Cloud. Since we built the backend using Encore patterns from the start, this migration is straightforward.

## ✅ Pre-Migration Checklist

Your codebase is already **Encore-ready**:
- ✅ **Encore API declarations** - All endpoints use `//encore:api` syntax
- ✅ **Service structure** - 10 microservices properly organized
- ✅ **Database migrations** - PostgreSQL migrations in place
- ✅ **Environment configuration** - `.env.encore` files ready
- ✅ **Go module** - Proper Encore dependencies

## 🚀 Migration Steps

### Step 1: Prerequisites

1. **Install Encore CLI** (if not already installed):
   ```bash
   # Visit https://encore.dev/docs/install for installation
   # Or use Go:
   go install encore.dev/cmd/encore@latest
   ```

2. **Verify installation**:
   ```bash
   encore version
   ```

### Step 2: Authentication

```bash
# Login to Encore Cloud
encore auth login
```

This opens your browser to authenticate with Encore Cloud.

### Step 3: Create Encore App

```bash
# Navigate to backend directory
cd services/api

# Create and link Encore app
encore app create seattle-reuse-exchange
```

This creates your app in Encore Cloud and links your local codebase.

### Step 4: Test Local Development

```bash
# Start local development server
encore run
```

Your backend will be available at:
- **API**: http://localhost:4000
- **Local Encore Dashboard**: http://localhost:9400

### Step 5: Environment Variables & Secrets

Set up your secrets in Encore Cloud:

```bash
# Set secrets for development environment
encore secret set --type dev STRIPE_SECRET_KEY
encore secret set --type dev RESEND_API_KEY  
encore secret set --type dev TWILIO_AUTH_TOKEN
encore secret set --type dev MEILISEARCH_API_KEY

# Set secrets for production environment  
encore secret set --type prod STRIPE_SECRET_KEY
encore secret set --type prod RESEND_API_KEY
encore secret set --type prod TWILIO_AUTH_TOKEN
encore secret set --type prod MEILISEARCH_API_KEY
```

### Step 6: Database Migration

Encore automatically provisions PostgreSQL and runs migrations:

```bash
# Database will be created automatically on first deploy
# Migrations from infra/migrations/ will be applied

# Check database status
encore db shell seattle_reuse --env=dev
```

### Step 7: Deploy to Encore Cloud

```bash
# Deploy to development environment
encore deploy --env=dev

# Deploy to production environment
encore deploy --env=prod
```

### Step 8: Update Frontend Configuration

Update your frontend to use the Encore Cloud API URL:

**In `apps/web/.env.local`:**
```bash
# Replace localhost with your Encore Cloud URL
NEXT_PUBLIC_API_URL=https://your-app-id.encr.app

# Or for development
NEXT_PUBLIC_API_URL=https://your-app-id-dev.encr.app
```

## 📊 What You Get After Migration

### Automatic Infrastructure
- ✅ **PostgreSQL Database** - Fully managed with backups
- ✅ **Load Balancers** - Auto-scaling HTTP endpoints  
- ✅ **Secrets Management** - Secure secret storage
- ✅ **Monitoring & Logging** - Built-in observability
- ✅ **Preview Environments** - Automatic PR deployments

### Enhanced Features
- ✅ **Service Map** - Visual architecture diagrams
- ✅ **Distributed Tracing** - Full request tracing
- ✅ **API Documentation** - Auto-generated docs
- ✅ **Performance Monitoring** - Built-in metrics
- ✅ **Error Tracking** - Automatic error capture

### Development Experience
- ✅ **Hot Reload** - Instant local development
- ✅ **Type Safety** - End-to-end type checking
- ✅ **Auto-completion** - IDE integration
- ✅ **Testing** - Built-in testing framework

## 🔧 Service Configuration

### Database Service (10 services configured)

1. **Users Service** - Authentication and user management
2. **Catalog Service** - Product and inventory management  
3. **Auctions Service** - Real-time auction management
4. **Bids Service** - Bidding logic with anti-sniping
5. **Orders Service** - Order processing and fulfillment
6. **Donations Service** - Donation processing and tracking
7. **Notifications Service** - Real-time notifications
8. **Webhooks Service** - Stripe webhook processing
9. **Reports Service** - Analytics and reporting
10. **Email Service** - Resend integration for all emails

### API Endpoints Available

```
# Health Check
GET  /health

# User Management  
POST /users/register
POST /users/login
GET  /users/profile

# Catalog & Search
GET  /catalog/items
GET  /catalog/search
POST /catalog/items

# Auctions & Bidding
GET  /auctions/active
POST /auctions/create
POST /bids/place
GET  /bids/history

# Orders & Payments
POST /orders/create
GET  /orders/history
POST /webhooks/stripe

# Email Services
POST /email/send
POST /email/auction-win
POST /email/magic-link

# And many more...
```

## 🎯 Post-Migration Tasks

### 1. Update Frontend API URLs
- Update `NEXT_PUBLIC_API_URL` in all environment files
- Test all frontend integrations

### 2. Configure Domain (Optional)
```bash
# Add custom domain to your Encore app
encore domain add yourdomain.com --env=prod
```

### 3. Set Up CI/CD
- Push to `main` branch triggers automatic production deployment
- Pull requests get preview environments automatically

### 4. Monitor Performance
- Visit https://app.encore.dev/ to view metrics
- Set up alerts and monitoring

## 🧪 Testing Your Migration

### 1. Test API Endpoints
```bash
# Test health endpoint
curl https://your-app-id.encr.app/health

# Test email service
curl -X POST https://your-app-id.encr.app/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "from": "test@seattlereuse.exchange",
    "to": ["your-email@example.com"],
    "subject": "Migration Test",
    "html": "<h1>Migration successful!</h1>"
  }'
```

### 2. Test Frontend Integration
1. Start frontend: `cd apps/web && pnpm dev`
2. Visit http://localhost:3000
3. Verify all API calls work with new backend URL

### 3. Test Database
```bash
# Connect to database
encore db shell seattle_reuse --env=dev

# Check tables were created
\dt

# Check migration status
SELECT * FROM schema_migrations;
```

## 🐛 Troubleshooting

### Common Issues

**1. Authentication Errors**
```bash
# Re-authenticate
encore auth logout
encore auth login
```

**2. Database Connection Issues**
```bash
# Check database status
encore db conn-uri seattle_reuse --env=dev
```

**3. Secret Configuration**
```bash
# List all secrets
encore secret list

# Update secret
encore secret set STRIPE_SECRET_KEY --type dev
```

**4. Build Errors**
```bash
# Clean and rebuild
encore run --debug
```

## 📈 Performance & Scaling

### Auto-Scaling Configuration
Encore automatically scales your services based on load:
- **CPU-based scaling** - Scales up when CPU > 70%
- **Memory-based scaling** - Scales up when memory > 80%  
- **Request-based scaling** - Scales up with traffic spikes

### Database Performance
- **Connection pooling** - Automatic connection management
- **Read replicas** - Available for production workloads
- **Backup & recovery** - Daily backups with point-in-time recovery

## 🎉 Migration Success!

Once migration is complete, you'll have:

✅ **Production-ready backend** running on Encore Cloud  
✅ **Automatic infrastructure** provisioning and management  
✅ **Built-in monitoring** and observability  
✅ **Scalable architecture** that grows with your platform  
✅ **Preview environments** for every pull request  
✅ **Type-safe APIs** with automatic documentation  

Your Seattle Reuse Exchange is now ready to scale from startup to enterprise! 🚀

## 🔗 Useful Links

- [Encore Dashboard](https://app.encore.dev/)
- [Encore Documentation](https://encore.dev/docs)
- [Migration Guide](https://encore.dev/docs/platform/migration/migrate-to-encore)  
- [Discord Community](https://discord.gg/encore)

For questions or support: [email protected]