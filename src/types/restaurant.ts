export type NullableString = string | null;

export interface RestaurantAddress {
  street: NullableString;
  number: NullableString;
  district: NullableString;
  city: string;
  state: string;
  postalCode: NullableString;
  country: string;
  googleMapsUrl: NullableString;
}

export interface RestaurantSocialLinks {
  instagram: NullableString;
  facebook: NullableString;
  tripadvisor: NullableString;
}

export interface RestaurantReviewSource {
  name: string;
  rating: number | null;
  url: NullableString;
}

export interface RestaurantOpeningHour {
  days: string;
  time: string;
}

export interface RestaurantHeroImage {
  src: string;
  alt: string;
  isDemo: boolean;
}

export interface RestaurantHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  image: RestaurantHeroImage;
}

export interface RestaurantSectionImage {
  src: string;
  alt: string;
  isPlaceholder: boolean;
  creditLabel: string;
  creditUrl: string;
  label?: string;
  category?: 'fire' | 'food' | 'grill' | 'table';
}

export interface RestaurantAboutContent {
  introLabel: string;
  introText: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: RestaurantSectionImage;
}

export interface RestaurantExperienceContent {
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  images: RestaurantSectionImage[];
}

export interface RestaurantGalleryContent {
  eyebrow: string;
  title: string;
  description: string;
  images: RestaurantSectionImage[];
}

export interface RestaurantReviewItem {
  quote: string;
  author: string;
  isPlaceholder: boolean;
  rating?: number | null;
  source?: string | null;
  sourceUrl?: string | null;
}

export interface RestaurantReviewsContent {
  eyebrow: string;
  title: string;
  items: RestaurantReviewItem[];
}

export interface RestaurantLocationContent {
  eyebrow: string;
  title: string;
  description: string;
  hoursFallback: string;
  contactFallback: string;
}

export interface RestaurantFooterContent {
  category: string;
  disclaimer: string;
}

export interface RestaurantSeoConfig {
  title?: NullableString;
  description: string;
  siteUrl: NullableString;
  ogImage: NullableString;
  locale?: string;
  indexable: boolean;
}

export interface RestaurantConfig {
  name: string;
  shortName: string;
  slogan: NullableString;
  description: NullableString;
  phone: NullableString;
  whatsapp: NullableString;
  address: RestaurantAddress;
  openingHours: RestaurantOpeningHour[];
  socialLinks: RestaurantSocialLinks;
  reviewSources: RestaurantReviewSource[];
  externalLinks: {
    menu: NullableString;
    reservations: NullableString;
  };
  hero: RestaurantHeroContent;
  about: RestaurantAboutContent;
  experience: RestaurantExperienceContent;
  gallery: RestaurantGalleryContent;
  reviews: RestaurantReviewsContent;
  locationSection: RestaurantLocationContent;
  footer: RestaurantFooterContent;
  seo: RestaurantSeoConfig;
}
