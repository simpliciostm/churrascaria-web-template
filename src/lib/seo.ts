import type { RestaurantConfig } from '../types/restaurant.ts';

export interface SeoMetadata {
  title: string;
  description: string;
  robots: string;
  locale: string;
  siteUrl: string | null;
  ogImage: string | null;
  instagramUrl: string | null;
  jsonLd: Record<string, unknown>;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function createTag(tag: string, attributes: Record<string, string>) {
  const parsedAttributes = Object.entries(attributes)
    .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
    .join(' ');

  return `<${tag} ${parsedAttributes} />`;
}

function createJsonLdScript(data: Record<string, unknown>) {
  const json = JSON.stringify(data).replaceAll('<', '\\u003c');

  return `<script type="application/ld+json">${json}</script>`;
}

function removeEmptyValues<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => {
      if (Array.isArray(entryValue)) {
        return entryValue.length > 0;
      }

      return entryValue !== null && entryValue !== undefined && entryValue !== '';
    }),
  ) as Partial<T>;
}

function normalizeAbsoluteUrl(url: string | null) {
  if (!url) {
    return null;
  }

  const normalizedUrl = url.trim();

  return /^https?:\/\/\S+$/i.test(normalizedUrl) ? normalizedUrl : null;
}

export function createInstagramUrl(instagram: string | null) {
  if (!instagram) {
    return null;
  }

  if (instagram.startsWith('http')) {
    return normalizeAbsoluteUrl(instagram);
  }

  const handle = instagram.replace('@', '').trim();

  return handle ? `https://www.instagram.com/${handle}/` : null;
}

function createTitle(restaurant: RestaurantConfig) {
  if (restaurant.seo.title) {
    return restaurant.seo.title;
  }

  return `${restaurant.name} | Churrascaria em ${restaurant.address.city} - ${restaurant.address.state}`;
}

function createStreetAddress(restaurant: RestaurantConfig) {
  return [restaurant.address.street, restaurant.address.number].filter(Boolean).join(', ');
}

function createPostalAddress(restaurant: RestaurantConfig) {
  const streetAddress = createStreetAddress(restaurant);

  const address = removeEmptyValues({
    '@type': 'PostalAddress',
    streetAddress,
    addressLocality: restaurant.address.city,
    addressRegion: restaurant.address.state,
    postalCode: restaurant.address.postalCode,
    addressCountry: restaurant.address.country,
  });

  return Object.keys(address).length > 1 ? address : null;
}

export function buildSeoMetadata(restaurant: RestaurantConfig): SeoMetadata {
  const title = createTitle(restaurant);
  const description = restaurant.seo.description;
  const robots = restaurant.seo.indexable ? 'index, follow' : 'noindex, nofollow';
  const locale = restaurant.seo.locale ?? 'pt_BR';
  const siteUrl = normalizeAbsoluteUrl(restaurant.seo.siteUrl);
  const ogImage = normalizeAbsoluteUrl(restaurant.seo.ogImage);
  const instagramUrl = createInstagramUrl(restaurant.socialLinks.instagram);
  const sameAs = [instagramUrl].filter((url): url is string => Boolean(url));
  const address = createPostalAddress(restaurant);

  const jsonLd = removeEmptyValues({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    description,
    url: siteUrl,
    telephone: restaurant.phone,
    address,
    sameAs,
  });

  return {
    title,
    description,
    robots,
    locale,
    siteUrl,
    ogImage,
    instagramUrl,
    jsonLd,
  };
}

export function renderSeoHead(metadata: SeoMetadata, siteName: string) {
  const tags = [
    `<title>${escapeHtml(metadata.title)}</title>`,
    createTag('meta', { name: 'description', content: metadata.description }),
    createTag('meta', { name: 'robots', content: metadata.robots }),
    createTag('meta', { property: 'og:title', content: metadata.title }),
    createTag('meta', { property: 'og:description', content: metadata.description }),
    createTag('meta', { property: 'og:type', content: 'website' }),
    createTag('meta', { property: 'og:locale', content: metadata.locale }),
    createTag('meta', { property: 'og:site_name', content: siteName }),
    createTag('meta', {
      name: 'twitter:card',
      content: metadata.ogImage ? 'summary_large_image' : 'summary',
    }),
    createTag('meta', { name: 'twitter:title', content: metadata.title }),
    createTag('meta', { name: 'twitter:description', content: metadata.description }),
  ];

  if (metadata.siteUrl) {
    tags.push(createTag('meta', { property: 'og:url', content: metadata.siteUrl }));
    tags.push(createTag('link', { rel: 'canonical', href: metadata.siteUrl }));
  }

  if (metadata.ogImage) {
    tags.push(createTag('meta', { property: 'og:image', content: metadata.ogImage }));
    tags.push(createTag('meta', { name: 'twitter:image', content: metadata.ogImage }));
  }

  tags.push(createJsonLdScript(metadata.jsonLd));

  return tags.join('\n    ');
}
