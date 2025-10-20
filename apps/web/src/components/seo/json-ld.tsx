/**
 * JSON-LD Structured Data Components
 * 
 * These components add structured data to pages for better SEO and LLM discoverability.
 * They help search engines and AI assistants understand the content and context.
 */

import { siteConfig } from '@/config/site';

interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

export function OrganizationJsonLd({
  name = siteConfig.name,
  url = siteConfig.baseUrl,
  logo = `${siteConfig.baseUrl}/icons/icon-512x512.png`,
  description = 'Circular economy marketplace for quality used items. Supporting New World Kids nonprofit through sustainable auctions and donations.',
  sameAs = [siteConfig.social.offerup].filter(Boolean) as string[],
  address = {
    streetAddress: '1234 Reuse Way',
    addressLocality: 'Seattle',
    addressRegion: 'WA',
    postalCode: '98101',
    addressCountry: 'US',
  }
}: OrganizationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: siteConfig.contactEmail,
      availableLanguage: ['en', 'es'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  condition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition';
  category?: string;
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = 'USD',
  availability = 'InStock',
  condition = 'UsedCondition',
  category,
}: ProductJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      itemCondition: `https://schema.org/${condition}`,
    },
    ...(category && { category }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FAQJsonLdProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebSiteJsonLdProps {
  name?: string;
  url?: string;
  description?: string;
  potentialAction?: {
    query: string;
  };
}

export function WebSiteJsonLd({
  name = siteConfig.name,
  url = siteConfig.baseUrl,
  description = 'Circular economy marketplace for sustainable auctions and donations',
  potentialAction,
}: WebSiteJsonLdProps) {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
  };

  if (potentialAction) {
    jsonLd.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={${potentialAction.query}}`,
      },
      'query-input': `required name=${potentialAction.query}`,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
