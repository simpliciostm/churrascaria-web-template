export type NullableString = string | null;

export type RestaurantPublicationStatus = 'template' | 'demo' | 'production';

export interface RestaurantPublicationConfig {
  status: RestaurantPublicationStatus;
}

export interface RestaurantAddress {
  street: NullableString;
  number: NullableString;
  district: NullableString;
  city: string;
  state: string;
  postalCode: NullableString;
  country: string;
  googleMapsUrl: NullableString;
  googleMapsEmbedUrl: NullableString;
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
  // Exemplos: "Segunda", "Terça a sexta", "Sábado e domingo".
  days: string;
  // Exemplos: "Fechado", "11h–14h30 / 18h–23h", "11h–23h".
  time: string;
}

export type RestaurantImageCategory = 'fire' | 'food' | 'grill' | 'table';

export interface RestaurantImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  isPlaceholder: boolean;
  sourceUrl?: NullableString;
  creditLabel?: NullableString;
  creditUrl?: NullableString;
  label?: string;
  category?: RestaurantImageCategory;
}

export type RestaurantHeroImage = RestaurantImage;

export interface RestaurantHeroVideo {
  src: string;
  type: 'video/mp4';
}

export type RestaurantMenuImage = RestaurantImage;
export type RestaurantSectionImage = RestaurantImage;

export interface RestaurantHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  image: RestaurantHeroImage;
  video?: RestaurantHeroVideo;
}

export interface RestaurantMenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number | null;
  image?: RestaurantMenuImage;
  featured?: boolean;
}

export interface RestaurantMenuCategory {
  id: string;
  label: string;
  items: RestaurantMenuItem[];
}

export interface RestaurantMenuShowcaseContent {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface RestaurantMenuContent {
  isPlaceholder: boolean;
  eyebrow: string;
  title: string;
  description?: string;
  categories: RestaurantMenuCategory[];
  showcase: RestaurantMenuShowcaseContent;
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
  highlights?: {
    title: string;
    description: string;
    icon: 'flame' | 'users' | 'utensils';
  }[];
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
  publication: RestaurantPublicationConfig;
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
  menu: RestaurantMenuContent;
  about: RestaurantAboutContent;
  experience: RestaurantExperienceContent;
  gallery: RestaurantGalleryContent;
  reviews: RestaurantReviewsContent;
  locationSection: RestaurantLocationContent;
  footer: RestaurantFooterContent;
  seo: RestaurantSeoConfig;
}
