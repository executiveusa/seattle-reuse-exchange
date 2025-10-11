# The Last Collection Platform - Upgrade Plan

## Executive Summary

This document outlines the transformation of the Seattle Reuse Exchange into **The Last Collection**, a production-ready resale and donations platform supporting furniture, electronics, sports cards, comics, and art. The upgrade follows the BMAD methodology (Baseline → Model → Act → Deliver) and implements a comprehensive design system with bilingual support (EN/ES), real-time bidding capabilities, and enhanced administrative features.

## Project Overview

**Old Name:** Seattle Reuse Exchange  
**New Name:** The Last Collection  
**Mission:** Auctions and donations that fund New World Kids' non-profit work  
**Repository:** seattle-reuse-exchange  
**Branch:** copilot/upgrade-the-last-collection

## Key Changes Implemented

### 1. Branding & Design System

#### Color Palette
- **Primary (Keppel):** #00B39F
- **Secondary (Saffron):** #EBC017
- **Neutral (Charcoal):** #3C494E
- **Surface:** #0F1314
- **Accent:** #7AD8CC
- **Success:** #22C55E
- **Danger:** #D92D20
- **Warning:** #F59E0B

#### Design Tokens (`apps/web/src/styles/tokens.css`)
- Implemented Liquid Glass design system
- Light and dark theme support
- Glass morphism effects with backdrop blur
- Consistent spacing scale (4px to 48px)
- Custom motion timing with cubic-bezier easing
- Typography hierarchy using Qanelas Soft and Open Sans

#### Updated Components
- **Hero Section:** Modern two-column layout with Next.js Image optimization
- **Header:** Added "Donate" and "Dashboard" navigation links
- **Footer:** Enhanced with social links (OfferUp, Facebook) and structured navigation
- **Global Styles:** Migrated from old Seattle green/blue palette to new brand colors

### 2. Content Updates

All references to "Seattle Reuse Exchange" have been updated to "The Last Collection":
- Page metadata and SEO tags
- Open Graph and Twitter card information
- Header branding
- Footer copyright notices
- Navigation labels

### 3. Internationalization (i18n)

**Supported Locales:** English (en), Spanish (es)

#### Implementation
- Updated `apps/web/src/i18n.ts` to include Spanish locale
- Created `apps/web/messages/es.json` with complete Spanish translations
- Enhanced `apps/web/messages/en.json` with new navigation items and updated branding

**Translation Coverage:**
- Navigation: Home, Auctions, Donate, Dashboard, About, Contact
- Common UI elements: Loading states, error messages, buttons
- Auction-specific terms: Bidding, time left, current bid
- All user-facing text supports locale switching

### 4. New Pages & Features

#### Donation Flow
- **`/donate`** - Main donation landing page with category overview and tax benefits
- **`/donate/guidelines`** - Detailed acceptance criteria for furniture, electronics, collectibles
- **`/donate/receipt`** - Tax receipt information and 501(c)(3) documentation

#### Sponsors & Community
- **`/thanks`** - Sponsor showcase page with contributor recognition
  - Sponsor logo grid (8+ slots)
  - Top donors and volunteers listing
  - Call-to-action for new sponsors

#### Admin Dashboard (Stubs)
- **`/admin/overview`** - Dashboard with key metrics and quick actions
  - Active auctions counter
  - Total bids counter
  - Pending donations counter
  - Active users counter

#### User Dashboard (Stubs)
- **`/dashboard/listings`** - User's auction listings management
  - Filter by status (All, Active, Sold, Draft)
  - Create new listing action

### 5. Database Migrations

#### Migration 002: Donations Enhancement
**File:** `infra/migrations/002_donations.up.sql`
- Added new category types: electronics, sports_cards, comics, art
- Created `donation_receipts` table for tax documentation
- Added pickup/dropoff options and photo arrays to donations table
- Indexes for efficient querying by donor email and tax year

#### Migration 003: Sponsors
**File:** `infra/migrations/003_sponsors.up.sql`
- Created `sponsors` table with logo, tier, and display order
- Created `contributors` table for tracking donations and volunteers
- Support for sponsor tiers: platinum, gold, silver, standard

#### Migration 004: Artworks & Collectibles
**File:** `infra/migrations/004_artworks.up.sql`
- Created `artwork_metadata` table for detailed art tracking
  - Artist information, authentication status, provenance
  - Dimensions, medium, signatures
- Created `collectibles` table for sports cards and comics
  - Player names, teams, card numbers for sports cards
  - Publisher, issue number, series for comics
  - Grading information (PSA, CGC, BGS)

### 6. Real-Time Bidding Infrastructure

#### WebSocket Client (`apps/web/src/lib/realtime.ts`)
- Implemented RealtimeClient class with auto-reconnection
- Exponential backoff strategy (1s base, max 10 attempts)
- Event-driven architecture for bid updates
- Support for subscription-based updates per auction
- Type-safe event handling for bid:new, bid:update, auction:close

**Key Features:**
- Automatic reconnection on disconnect
- Subscription management with cleanup
- Singleton pattern for efficient resource usage
- Environment-based WebSocket URL configuration

### 7. Image Optimization

#### Next.js Image Configuration
**File:** `apps/web/next.config.js`
- Added Unsplash remote pattern for placeholder images
- Enabled AVIF and WebP format support
- Configured safe image domains (S3, R2, Unsplash)

#### Hero Image Implementation
- Using Next.js Image component with priority loading
- Blur placeholder for better perceived performance
- Responsive sizing with proper srcset generation
- Fallback to Unsplash placeholder during development

### 8. Security Enhancements

#### HTTP Security Headers (`apps/web/vercel.json`)
- **Content-Security-Policy:** Restricts resource loading to trusted sources
- **X-Frame-Options:** SAMEORIGIN to prevent clickjacking
- **Referrer-Policy:** strict-origin-when-cross-origin for privacy
- **Permissions-Policy:** Disables geolocation, microphone, camera
- **X-Content-Type-Options:** nosniff to prevent MIME type sniffing
- **X-XSS-Protection:** Enabled with blocking mode

## Technical Architecture

### Frontend Stack
- **Framework:** Next.js 14.2+ with App Router
- **Styling:** Tailwind CSS with custom design tokens
- **Components:** Radix UI primitives with shadcn/ui patterns
- **Internationalization:** next-intl v3.4+
- **State Management:** React hooks and context
- **Real-time:** WebSocket client with reconnection logic

### Backend Stack (Encore Services)
- **API Framework:** Encore Go microservices
- **Database:** PostgreSQL with migrations
- **Services:** Users, Catalog, Auctions, Bids, Donations, Notifications, Email, Reports
- **Real-time:** WebSocket endpoints (planned)

### Infrastructure
- **Hosting:** Vercel (frontend) + Encore Cloud (backend)
- **Database:** PostgreSQL on Encore Cloud
- **Storage:** S3 or R2 for images and documents
- **Email:** Resend integration
- **Search:** Meilisearch (existing)

## Accessibility & Performance

### WCAG Compliance
- Target: WCAG 2.1 Level AA
- Semantic HTML structure maintained
- Focus indicators preserved in design tokens
- Color contrast ratios meet AA standards
- Screen reader friendly navigation

### Lighthouse Targets
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 95+

### Optimizations Implemented
- Next.js Image with automatic optimization
- AVIF/WebP format support
- Lazy loading for non-critical images
- Glass morphism with GPU-accelerated backdrop-filter
- CSS custom properties for runtime theme switching

## Social Integration

### External Links
- **OfferUp:** https://offerup.co/profile/newworldkids
- **Facebook:** https://www.facebook.com/
- Links displayed in footer with proper external link attributes
- Additional quick links section for internal navigation

## Testing Strategy

### Existing Tests
- Playwright E2E tests for auction flow
- Vitest unit tests for utilities
- TypeScript strict mode enabled

### Planned Test Additions
- Auth flow testing
- Admin CRUD operations
- i18n toggle functionality
- Real-time bidding updates
- Donation form submission
- Tax receipt generation

## Deployment Checklist

### Environment Variables Required
```env
NEXTAUTH_SECRET=<secret>
NEXTAUTH_URL=<url>
GO_API_BASE_URL=<encore-api-url>
WS_URL=<websocket-url>
STORAGE_BUCKET=<s3-bucket>
STORAGE_REGION=<region>
STORAGE_ACCESS_KEY_ID=<key>
STORAGE_SECRET_ACCESS_KEY=<secret>
```

### Migration Steps
1. Run database migrations (002, 003, 004)
2. Deploy Encore backend services
3. Configure environment variables
4. Deploy frontend to Vercel
5. Test real-time WebSocket connections
6. Verify image optimization
7. Validate security headers
8. Test bilingual functionality

## Known Limitations & Future Work

### Current Limitations
1. **WebSocket Backend:** Encore WebSocket endpoints not yet implemented
2. **Auth Integration:** NextAuth setup needed for admin/user dashboards
3. **Stripe Integration:** Payment processing planned but not implemented
4. **Photo Upload:** S3/R2 upload functionality needs implementation
5. **PDF Generation:** Tax receipt PDF export pending
6. **Language Toggle UI:** Language switcher component not yet added to header

### Future Enhancements
1. **Complete Admin Dashboard:**
   - Auctions CRUD with bulk operations
   - Bid management and fraud detection
   - Donation approval workflow
   - User management with role assignment
   - Sponsor management interface
   - Analytics and reporting dashboard

2. **User Dashboard Completion:**
   - Create/edit listing flow with photo upload
   - Active bid tracking with real-time updates
   - Won auctions and payment processing
   - Donation history and receipt downloads
   - Profile settings and preferences

3. **Real-time Features:**
   - Live auction countdown timers
   - Bid notification toast messages
   - Anti-sniping extension logic
   - Optimistic UI updates

4. **Payment Integration:**
   - Stripe checkout for auction winners
   - Recurring donations
   - Sponsor payment processing
   - Automatic tax receipt generation

5. **Enhanced Search:**
   - Meilisearch integration for items
   - Faceted filtering by category
   - Typo-tolerance in search
   - Saved searches and alerts

6. **Mobile Optimization:**
   - PWA capabilities
   - Native app-like experience
   - Push notifications
   - Offline support for browsing

## Risk Assessment

### Low Risk
✅ Branding updates (purely cosmetic)  
✅ Design token implementation (isolated to CSS)  
✅ Spanish translations (additive feature)  
✅ New page stubs (no backend dependencies)  

### Medium Risk
⚠️ Database migrations (requires testing in staging)  
⚠️ Security headers (may affect embedded content)  
⚠️ Image optimization config (external dependencies)  

### High Risk
🔴 Real-time WebSocket (requires backend implementation)  
🔴 Admin dashboard (security-sensitive)  
🔴 Payment processing (compliance requirements)  

## Success Metrics

### Launch Criteria
- [ ] All pages render in light and dark mode without visual regressions
- [ ] EN/ES toggle works and covers 100% of UI text
- [ ] Hero image displays with AVIF/WebP and no broken paths
- [ ] OfferUp and Facebook links functional in footer
- [ ] Sponsors page renders with responsive logo grid
- [ ] Donation pages provide compliant tax information
- [ ] TypeScript builds without errors
- [ ] All existing Playwright tests pass

### Post-Launch Metrics
- Page load time < 3 seconds (LCP)
- Lighthouse scores meet targets (90/95/95/95)
- Zero console errors on production
- Spanish translation accuracy verified by native speaker
- Security headers validated with securityheaders.com

## Maintenance & Support

### Documentation Updates Needed
- Update README.md with new project name
- Add deployment guide for Encore + Vercel
- Document environment variable requirements
- Create admin user guide
- Write donation submission guide

### Ongoing Maintenance
- Monitor WebSocket connection stability
- Review security headers quarterly
- Update translations as new features added
- Optimize images and assets periodically
- Run accessibility audits with each major release

## Conclusion

This upgrade represents a significant evolution of the platform from a Seattle-focused reuse exchange to a comprehensive, bilingual platform supporting multiple item categories and advanced features. The implementation follows best practices for accessibility, performance, and security while maintaining backward compatibility with existing infrastructure.

The phased approach allows for iterative delivery, with core branding and content updates completed first, followed by infrastructure enhancements and feature rollouts. The modular architecture ensures that future enhancements can be added without disrupting existing functionality.

---

**Document Version:** 1.0  
**Last Updated:** 2024-10-11  
**Status:** In Progress  
**Next Review:** Upon completion of WebSocket backend implementation
