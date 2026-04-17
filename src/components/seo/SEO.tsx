/* eslint-disable react-refresh/only-export-components */

import { Helmet } from 'react-helmet-async';
import { useParams, useLocation } from 'react-router-dom';

const SITE_URL = 'https://makeitneon.ch';
const SITE_NAME = 'Make It Neon';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Reusable SEO component that injects meta tags via react-helmet-async.
 * Handles:
 * - <title> and <meta name="description">
 * - Open Graph (og:*) tags
 * - Twitter Card tags
 * - Canonical URL
 * - Hreflang alternate links (en ↔ de)
 * - Optional JSON-LD structured data
 */
export function SEO({
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd,
}: SEOProps) {
  const { lang } = useParams();
  const location = useLocation();
  const currentLang = lang || 'en';
  const alternateLang = currentLang === 'en' ? 'de' : 'en';

  // Build canonical & alternate URLs
  const pathWithoutLang = location.pathname.replace(`/${currentLang}`, '');
  const canonicalUrl = `${SITE_URL}/${currentLang}${pathWithoutLang}`;
  const alternateUrl = `${SITE_URL}/${alternateLang}${pathWithoutLang}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical + Hreflang */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang={currentLang} href={canonicalUrl} />
      <link rel="alternate" hrefLang={alternateLang} href={alternateUrl} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en${pathWithoutLang}`} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={currentLang === 'de' ? 'de_CH' : 'en_US'} />
      <meta property="og:locale:alternate" content={currentLang === 'de' ? 'en_US' : 'de_CH'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

// ─── Shared JSON-LD Schemas ───

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  image: DEFAULT_OG_IMAGE,
  url: SITE_URL,
  telephone: '+41XXXXXXXX',
  email: 'info@makeitneon.ch',
  description: 'Handcrafted LED neon signs made in Zurich, Switzerland. Custom text signs, logo signs, and ready-made designs.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bahnhofstrasse 10',
    addressLocality: 'Zurich',
    postalCode: '8001',
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.3769,
    longitude: 8.5417,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: 'CHF 148–368',
  sameAs: [
    'https://instagram.com/makeitneon',
    'https://tiktok.com/@makeitneon',
    'https://facebook.com/makeitneon',
  ],
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ['en', 'de'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/en/shop?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function createProductSchema(product: {
  name: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  slug: string;
  lang: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image || DEFAULT_OG_IMAGE,
    url: `${SITE_URL}/${product.lang}/shop/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'CHF',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}/#business` },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '120',
    },
  };
}

export function createArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  lang: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || DEFAULT_OG_IMAGE,
    url: `${SITE_URL}/${article.lang}/blog/${article.slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${article.lang}/blog/${article.slug}`,
    },
  };
}
