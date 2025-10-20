import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

const host = new URL(siteConfig.baseUrl).host;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...siteConfig.robots.disallow],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', ...siteConfig.robots.allowForAi],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', ...siteConfig.robots.allowForAi],
      },
    ],
    host,
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  };
}
