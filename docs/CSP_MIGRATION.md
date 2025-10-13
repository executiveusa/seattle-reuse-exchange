# Content Security Policy (CSP) Migration Guide

## Current Status

**Implementation Stage:** Phase 1 - Relaxed CSP  
**Target:** Strict CSP with nonces  
**Migration Timeline:** 2-4 weeks

## Overview

The Last Collection is implementing a progressive Content Security Policy (CSP) migration to enhance security while maintaining functionality. This document outlines the current state, migration path, and implementation details.

## Phase 1: Relaxed CSP (Current)

### Current Policy

```
default-src 'self'; 
img-src 'self' data: https:; 
script-src 'self' 'unsafe-inline'; 
style-src 'self' 'unsafe-inline'; 
connect-src 'self' https: wss:; 
frame-ancestors 'self'; 
object-src 'none'; 
base-uri 'self'
```

### Implementation Location

- **File:** `apps/web/next.config.js`
- **Method:** Next.js `async headers()` configuration
- **Applied to:** All routes (`/(.*)`

### Current Allowances

| Directive | Policy | Reason |
|-----------|--------|--------|
| `script-src` | `'self' 'unsafe-inline'` | Allows inline scripts during development |
| `style-src` | `'self' 'unsafe-inline'` | Allows inline styles and Tailwind CSS |
| `img-src` | `'self' data: https:` | External images (Unsplash placeholders, S3) |
| `connect-src` | `'self' https: wss:` | API calls and WebSocket connections |

### Security Headers Included

```javascript
{
  'Content-Security-Policy': '[policy]',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block'
}
```

## Phase 2: Nonce-Based CSP (Target)

### Target Policy Template

```
default-src 'self'; 
img-src 'self' data: https:; 
script-src 'self' 'nonce-{{nonce}}' 'strict-dynamic'; 
style-src 'self' 'nonce-{{nonce}}'; 
connect-src 'self' https: wss:; 
frame-ancestors 'self'; 
object-src 'none'; 
base-uri 'self'
```

### Key Changes

1. **Remove `'unsafe-inline'`** from script-src and style-src
2. **Add nonce generation** middleware
3. **Apply nonces** to all inline scripts and styles
4. **Use `'strict-dynamic'`** for script loading
5. **Refactor inline handlers** to external event listeners

## Migration Steps

### Step 1: Audit Inline Scripts and Styles

```bash
# Find inline scripts
grep -r "<script" apps/web/src/app/
grep -r "onClick=" apps/web/src/components/
grep -r "onSubmit=" apps/web/src/components/

# Find inline styles
grep -r "style={{" apps/web/src/
grep -r "<style" apps/web/src/
```

**Expected Findings:**
- Tailwind CSS classes (no inline styles)
- Next.js Script components
- Event handlers in React components (already external)

### Step 2: Create Nonce Middleware

**File:** `apps/web/src/middleware.ts`

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales } from './i18n';
import { randomBytes } from 'crypto';

export default function middleware(request: NextRequest) {
  // Generate nonce for CSP
  const nonce = randomBytes(16).toString('base64');
  
  // Create response with i18n
  const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: 'en'
  });
  
  const response = intlMiddleware(request);
  
  // Add nonce to response headers
  response.headers.set('x-nonce', nonce);
  
  // Update CSP with nonce
  const csp = `
    default-src 'self';
    img-src 'self' data: https:;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    connect-src 'self' https: wss:;
    frame-ancestors 'self';
    object-src 'none';
    base-uri 'self'
  `.replace(/\s+/g, ' ').trim();
  
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)']
};
```

### Step 3: Update Root Layout with Nonce

**File:** `apps/web/src/app/layout.tsx`

```typescript
import { headers } from 'next/headers';

export default function RootLayout({ children }) {
  const nonce = headers().get('x-nonce') || '';
  
  return (
    <html lang="en">
      <head>
        {/* Next.js will automatically add nonce to scripts */}
        <meta property="csp-nonce" content={nonce} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

### Step 4: Update Next.js Configuration

**File:** `apps/web/next.config.js`

```javascript
const nextConfig = {
  // ... existing config
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // CSP now handled by middleware, but keep other headers
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

### Step 5: Refactor Inline Scripts

**Before:**
```tsx
<button onClick="handleClick()">Click</button>
```

**After:**
```tsx
<button onClick={handleClick}>Click</button>
```

**Before:**
```html
<script>
  window.config = { apiUrl: '...' };
</script>
```

**After:**
```tsx
// In component or dedicated script file
useEffect(() => {
  window.config = { apiUrl: process.env.NEXT_PUBLIC_API_URL };
}, []);
```

### Step 6: Handle Third-Party Scripts

**Before:**
```html
<script src="https://cdn.example.com/analytics.js"></script>
```

**After:**
```tsx
import Script from 'next/script';

<Script 
  src="https://cdn.example.com/analytics.js"
  strategy="afterInteractive"
  nonce={nonce}
/>
```

### Step 7: Testing

```bash
# Test CSP compliance
npm run build
npm run start

# Use browser DevTools to check for CSP violations
# Console will show blocked resources

# Test with CSP Evaluator
# https://csp-evaluator.withgoogle.com/
```

## Migration Checklist

### Pre-Migration
- [x] Document current inline scripts and styles
- [x] Audit third-party dependencies
- [x] Create migration plan
- [x] Set up development environment

### Implementation
- [ ] Implement nonce generation middleware
- [ ] Update root layout with nonce
- [ ] Refactor inline event handlers (if any)
- [ ] Update Next.js Script components with nonces
- [ ] Move inline configurations to external files
- [ ] Update Tailwind CSS handling (should work without changes)
- [ ] Test in development environment

### Testing
- [ ] Verify all pages load correctly
- [ ] Check browser console for CSP violations
- [ ] Test real-time bidding (WebSocket)
- [ ] Test image loading from external sources
- [ ] Test authentication flows
- [ ] Test admin functionality
- [ ] Validate with CSP Evaluator tool

### Monitoring
- [ ] Deploy to staging environment
- [ ] Monitor CSP violation reports
- [ ] Address any reported violations
- [ ] Performance testing
- [ ] User acceptance testing

### Production
- [ ] Deploy strict CSP to production
- [ ] Monitor error logs
- [ ] Set up CSP violation reporting endpoint
- [ ] Document any exceptions or allowances

## CSP Violation Reporting

### Setup Reporting Endpoint

```javascript
// Add to CSP policy
report-uri /api/csp-violations;
report-to csp-endpoint
```

### API Endpoint

**File:** `apps/web/src/app/api/csp-violations/route.ts`

```typescript
export async function POST(request: Request) {
  const violation = await request.json();
  
  // Log violation
  console.error('CSP Violation:', violation);
  
  // Store in database or send to monitoring service
  // await logCspViolation(violation);
  
  return new Response('OK', { status: 204 });
}
```

## Known Issues and Solutions

### Issue 1: Tailwind CSS with Nonce

**Problem:** Tailwind generates style tags dynamically  
**Solution:** Tailwind CSS is CSS-in-JS via PostCSS, not inline styles. No nonce needed.

### Issue 2: Next.js Script Components

**Problem:** Next.js injects scripts that need nonces  
**Solution:** Next.js automatically applies nonces when `<meta property="csp-nonce">` is in head

### Issue 3: WebSocket Connections

**Problem:** Real-time bidding uses WebSocket (wss://)  
**Solution:** Already allowed in `connect-src 'self' https: wss:`

### Issue 4: External Images

**Problem:** Unsplash and S3 images need to load  
**Solution:** Already allowed in `img-src 'self' data: https:`

## Performance Impact

### Nonce Generation
- **Overhead:** Minimal (< 1ms per request)
- **Method:** cryptographically secure random bytes
- **Caching:** Not cached, regenerated per request

### Strict Dynamic
- **Benefit:** Allows dynamically loaded scripts without unsafe-eval
- **Compatibility:** Modern browsers (95%+ support)
- **Fallback:** Ensure critical scripts are nonce-tagged

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSP 3.0 | ✅ 59+ | ✅ 58+ | ✅ 15.4+ | ✅ 79+ |
| Nonces | ✅ | ✅ | ✅ | ✅ |
| strict-dynamic | ✅ | ✅ | ✅ 15.4+ | ✅ |

## References

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Level 3 Specification](https://www.w3.org/TR/CSP3/)
- [Google CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)

## Support

For questions or issues during migration:
- **Technical Lead:** [Name]
- **Security Team:** security@thelastcollection.org
- **Documentation:** This file and related docs

---

**Last Updated:** October 12, 2024  
**Next Review:** After Phase 2 implementation  
**Owner:** Security & DevOps Team
