# Seattle Reuse Exchange

A modern auction platform keeping usable items out of landfills while funding nonprofit work.

## 🌟 Mission

Keep good stuff out of the dump! Bid on rescued office furniture & gear. Every purchase funds local reuse across Seattle.

## 🏗️ Architecture

- **Frontend**: Next.js 14+ App Router with TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Encore (Go) services with Postgres
- **Payments**: Stripe Checkout integration
- **Storage**: S3/R2 for images
- **Search**: Meilisearch for instant product search
- **Real-time**: WebSocket/SSE for live bidding

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

## 📁 Project Structure

```
.
├── apps/
│   └── web/                 # Next.js frontend
├── services/
│   └── api/                 # Encore Go backend
├── packages/
│   ├── ui/                  # Shared React components
│   └── config/              # Shared configurations
├── infra/
│   ├── migrations/          # Database migrations
│   └── seeds/               # Seed data
├── acceptance_tests/
│   ├── playwright/          # E2E tests
│   ├── api/                 # API tests
│   └── load/                # Load tests
└── docs/                    # Documentation
```

## 🎯 Features

### 🏪 Marketplace
- Live auctions with anti-sniping protection
- Buy-now fixed-price sales
- Advanced filtering and search
- Real-time bidding updates

### 💰 Payments & Donations
- Stripe Checkout integration
- Cash donations with tax receipts
- Goods donation intake system

### 🔧 Admin Dashboard
- Item management and cataloging
- Auction oversight and controls
- User management with RBAC
- Revenue and impact reporting

### 🌐 Modern UX
- Mobile-responsive design
- Internationalization (i18n) support
- Accessibility (A11y) compliant
- Progressive Web App (PWA) features

## 🤖 AI Chat Integration

This project includes helpful AI chat features that provide detailed product information:

- **Product Details**: AI-powered descriptions for furniture and equipment
- **Condition Assessment**: Intelligent condition explanations
- **Usage Recommendations**: Suggestions for item usage and care
- **Sustainability Impact**: Information about environmental benefits

AI chat helpers are integrated throughout the codebase with comments marked `// AI-CHAT:` for easy identification and enhancement.

## 🔧 Development

### Prerequisites

- Node.js 18+
- Go 1.22+
- pnpm
- Encore CLI

### Environment Setup

1. Copy environment files:
```bash
cp .env.example .env
cp apps/web/.env.local.example apps/web/.env.local
cp services/api/.env.encore.example services/api/.env.encore
```

2. Configure your environment variables
3. Start the development servers

### Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Load tests
pnpm test:load
```

## 🚀 Deployment

- **Frontend**: Vercel (automatic deployment from main branch)
- **Backend**: Encore Cloud (automatic deployment)
- **Database**: Postgres (Encore provisioned)

## 📄 License

Apache-2.0 License - see LICENSE file for details.

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines and code of conduct.

---

*Keeping good stuff in use, one auction at a time.* 🌱