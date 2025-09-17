# Seattle Reuse Exchange - Architecture Documentation

## 🏗️ System Architecture

The Seattle Reuse Exchange is built as a modern monorepo with clear separation between frontend, backend, and shared packages.

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Users/Admin   │    │   Web Browser   │    │  Mobile Apps    │
│    Dashboard    │    │   (Next.js)     │    │   (Future)      │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  API Gateway    │
                    │  (Encore Go)    │
                    └─────────┬───────┘
                              │
    ┌─────────────────────────┼─────────────────────────┐
    │                         │                         │
┌───▼───┐              ┌─────▼─────┐              ┌────▼────┐
│Postgres│              │  Services │              │External │
│Database│              │   Layer   │              │   APIs  │
└───────┘              └───────────┘              └─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
  ┌─────▼─────┐        ┌─────▼─────┐        ┌─────▼─────┐
  │   Users   │        │  Auctions │        │   Bids    │
  │  Service  │        │  Service  │        │  Service  │
  └───────────┘        └───────────┘        └───────────┘
```

## 🎯 AI Chat Integration

### AI-Enhanced Features

The platform integrates AI assistance throughout the user experience:

#### 1. Product Information Assistant
- **Location**: Item detail pages, search results
- **Function**: Provides detailed product insights, condition assessments, and value analysis
- **Example**: For Herman Miller Aeron chairs, explains ergonomic benefits, sizing, and original retail pricing

#### 2. Bidding Strategy Helper  
- **Location**: Auction pages, bid placement forms
- **Function**: Offers strategic bidding advice based on auction timing, bid history, and market patterns
- **Example**: Warns about anti-sniping, suggests optimal bid timing, analyzes competition

#### 3. Environmental Impact Calculator
- **Location**: Item pages, checkout flow
- **Function**: Calculates and displays environmental benefits of purchasing reused items
- **Example**: "By buying this chair, you're saving 87.5 lbs from landfills and 0.07 trees worth of CO2"

#### 4. Admin Decision Support
- **Location**: Admin dashboard, item management
- **Function**: Helps with pricing suggestions, categorization, and auction timing
- **Example**: "Similar Herman Miller chairs sold for $350-450 in the last 30 days"

### AI Chat Implementation

```typescript
// AI-CHAT: Core helper functions throughout codebase
import { AIProductAssistant } from '@/lib/ai-chat-helpers';

// Product insights
const insights = AIProductAssistant.generateProductInsights({
  itemId: item.id,
  title: item.title,
  condition: item.condition,
  category: item.category,
  // ... other item data
});

// Bidding strategy
const strategies = AIProductAssistant.generateBiddingStrategy({
  auctionId: auction.id,
  currentBid: auction.currentBid,
  timeRemaining: auction.timeRemaining,
  // ... other auction data
});
```

## 🔧 Service Architecture

### Backend Services (Encore Go)

#### Core Services
1. **Users Service** (`/services/api/users/`)
   - Authentication (magic link)
   - User management and roles
   - Profile and preferences

2. **Catalog Service** (`/services/api/catalog/`)
   - Item management and categorization
   - Search and filtering
   - Media and image handling

3. **Auctions Service** (`/services/api/auctions/`)
   - Auction creation and management
   - Status transitions (draft → open → closed)
   - Anti-sniping logic

4. **Bids Service** (`/services/api/bids/`)
   - Bid placement and validation
   - Real-time bid streaming
   - Minimum increment enforcement

5. **Orders Service** (`/services/api/orders/`)
   - Checkout and payment processing
   - Order fulfillment
   - Receipt generation

6. **Donations Service** (`/services/api/donations/`)
   - Cash donations (Stripe)
   - Goods donation intake
   - Tax receipt generation

#### Support Services
7. **Notifications Service** (`/services/api/notifications/`)
   - Email notifications (Resend)
   - SMS alerts (Twilio)
   - Push notifications (future)

8. **Webhooks Service** (`/services/api/webhooks/`)
   - Stripe payment confirmations
   - The Giving Block crypto donations
   - Third-party integrations

9. **Reports Service** (`/services/api/reports/`)
   - Revenue analytics
   - Environmental impact metrics
   - Admin dashboard data

### Frontend Architecture (Next.js)

#### App Router Structure
```
apps/web/src/app/
├── (marketing)/
│   ├── page.tsx              # Homepage
│   ├── about/page.tsx        # About page
│   ├── impact/page.tsx       # Environmental impact
│   └── donate/page.tsx       # Donation portal
├── browse/
│   ├── page.tsx              # Item browsing
│   └── [category]/page.tsx   # Category pages
├── item/
│   └── [slug]/page.tsx       # Item detail + auction
├── account/
│   └── page.tsx              # User dashboard
└── admin/
    ├── page.tsx              # Admin dashboard
    ├── items/page.tsx        # Item management
    ├── auctions/page.tsx     # Auction management
    └── users/page.tsx        # User management
```

#### Key Components

**UI Components** (`/apps/web/src/components/ui/`)
- Button, Card, Dialog, Form controls
- Data tables for admin interfaces
- Toast notifications and alerts

**Layout Components** (`/apps/web/src/components/layout/`)
- Header with navigation and auth
- Footer with links and branding
- Sidebar for admin sections

**Feature Components** (`/apps/web/src/components/sections/`)
- Hero with call-to-action
- ItemCard with AI insights
- BidPanel with strategy tips
- Countdown with accessibility

**AI Integration Components**
- ProductInsights displays AI-generated item information
- BiddingStrategy shows AI recommendations
- EnvironmentalImpact calculates sustainability benefits

## 🗄️ Data Architecture

### Database Schema (Postgres)

#### Core Tables
- `users` - User accounts and authentication
- `categories` - Item categorization system
- `items` - Product catalog with metadata
- `auctions` - Auction lifecycle management
- `bids` - Bid history and validation
- `orders` - Purchase transactions

#### Supporting Tables
- `donations_cash` - Monetary donations
- `donations_goods` - In-kind contributions
- `audit_log` - System activity tracking

### Search Integration (Meilisearch)

```json
{
  "items_index": {
    "searchableAttributes": ["title", "description", "category"],
    "filterableAttributes": ["condition", "category", "price_range"],
    "sortableAttributes": ["created_at", "price", "ending_soon"],
    "facetDistribution": ["category", "condition", "location"]
  }
}
```

## 🔄 Real-time Features

### Bidding Real-time Updates
- WebSocket/SSE connection from frontend
- Encore event streaming for bid notifications
- Anti-sniping auction extensions

### Notification System
- Email via Resend API
- SMS via Twilio (optional)
- Real-time toast notifications in UI

## 🔒 Security & Privacy

### Authentication
- Passwordless magic link authentication
- JWT session management
- Role-based access control (RBAC)

### Data Protection
- PII minimization and encryption
- Audit logging for all actions
- Rate limiting on all endpoints

### Payment Security
- Stripe Checkout (PCI SAQ-A compliant)
- No card data stored locally
- Webhook signature verification

## 🌱 Sustainability Focus

### Environmental Impact Tracking
- Items diverted from landfills (weight)
- CO2 emissions saved (lifecycle analysis)
- Tree equivalent calculations
- Waste reduction metrics

### AI-Powered Insights
- Sustainability benefits highlighted for each purchase
- Environmental impact displayed prominently
- Educational content about reuse benefits

## 📊 Analytics & Monitoring

### Performance Monitoring
- Vercel Analytics for frontend
- Encore built-in monitoring for backend
- Web Vitals tracking

### Business Analytics
- Revenue tracking and reporting
- User engagement metrics
- Auction success rates
- Environmental impact measurement

## 🚀 Deployment & Infrastructure

### Frontend (Vercel)
- Automatic deployments from Git
- Edge optimization and CDN
- Preview deployments for PRs

### Backend (Encore Cloud)
- Automatic scaling and provisioning
- Built-in observability
- Database management

### CI/CD Pipeline
- GitHub Actions workflows
- Automated testing (unit, E2E, load)
- Security scanning and compliance checks