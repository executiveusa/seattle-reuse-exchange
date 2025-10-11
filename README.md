# The Last Collection

> **Formerly:** Seattle Reuse Exchange

A production-ready bilingual auction and donation platform for furniture, electronics, sports cards, comics, and art. Every purchase funds New World Kids' non-profit work.

## 🌟 Mission

Auctions and donations that make a difference! Support New World Kids by bidding on quality items or donating goods. Available in English and Spanish.

## ✨ New Features

- 🎨 **Liquid Glass Design System** - Modern, accessible design with light/dark themes
- 🌐 **Bilingual Platform** - Full English and Spanish support
- 📦 **Expanded Categories** - Furniture, electronics, sports cards, comics, and art
- 🏆 **Sponsor Recognition** - Showcase supporters and contributors
- 💰 **Tax Receipts** - 501(c)(3) donation documentation
- ⚡ **Real-time Ready** - WebSocket infrastructure for live bidding
- 🔒 **Enhanced Security** - Comprehensive HTTP security headers

## 🏗️ Architecture

- **Frontend**: Next.js 14+ App Router with TypeScript, Tailwind CSS, shadcn/ui
- **Design System**: Liquid Glass with glass morphism effects
- **i18n**: next-intl for English/Spanish localization
- **Backend**: Encore (Go) microservices with PostgreSQL
- **Payments**: Stripe Checkout integration (planned)
- **Storage**: S3/R2 for images and documents
- **Search**: Meilisearch for instant product search
- **Real-time**: WebSocket client with auto-reconnection

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

## 📚 Documentation

- **[UPGRADE_PLAN.md](./UPGRADE_PLAN.md)** - Comprehensive upgrade documentation
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical summary of changes
- **[reports/upgrade.json](./reports/upgrade.json)** - Spec-Kit format upgrade report
- **[design-map.yml](./design-map.yml)** - Theme and layout configuration
- **[ENCORE_MIGRATION.md](./ENCORE_MIGRATION.md)** - Encore Cloud migration guide

## 🎨 Design System

The Last Collection uses the **Liquid Glass** design system:

- **Primary**: #00B39F (Keppel)
- **Secondary**: #EBC017 (Saffron)
- **Neutral**: #3C494E (Charcoal)
- **Accent**: #7AD8CC
- **Glass Effects**: Backdrop blur with transparency
- **Themes**: Light and dark mode support

## 📄 License

Apache-2.0 License - see LICENSE file for details.

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines and code of conduct.

---

**Built with ❤️ by the New World Kids community**

*Keeping good stuff in use, one auction at a time.* 🌱