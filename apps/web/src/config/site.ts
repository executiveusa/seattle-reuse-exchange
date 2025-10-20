export const siteConfig = {
  name: 'The Last Collection',
  tagline: "Auctions and donations that fund New World Kids' non-profit work.",
  description:
    "Auctions and donations that fund New World Kids' non-profit work. Furniture, electronics, sports cards, comics, and art.",
  locale: 'en_US',
  baseUrl: 'https://thelastcollection.org',
  contactEmail: 'support@thelastcollection.org',
  social: {
    offerup: 'https://offerup.co/profile/newworldkids',
  },
  sitemapRoutes: [
    '/',
    '/auctions',
    '/donate',
    '/about',
    '/contact',
    '/faq',
    '/thanks',
    '/privacy',
    '/terms',
    '/dmca',
    '/prohibited-items',
  ],
  robots: {
    disallow: ['/admin/', '/dashboard/', '/api/', '/login'],
    allowForAi: ['/.well-known/ai-plugin.json', '/.well-known/openapi.yaml', '/api/plugin/'],
  },
} as const;

export type SiteConfig = typeof siteConfig;
