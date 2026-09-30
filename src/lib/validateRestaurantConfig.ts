import type {
  RestaurantConfig,
  RestaurantImage,
  RestaurantMenuItem,
  RestaurantPublicationStatus,
  RestaurantReviewItem,
} from '../types/restaurant.ts';

export type ValidationLevel = 'error' | 'warning';
export type ValidationMode = 'content' | 'production';

export interface ValidationIssue {
  level: ValidationLevel;
  code: string;
  message: string;
  path?: string;
}

export interface ValidationResult {
  mode: ValidationMode;
  publicationStatus: RestaurantPublicationStatus | string;
  issues: ValidationIssue[];
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

interface ValidationOptions {
  mode?: ValidationMode;
}

interface ConfiguredImage {
  image: RestaurantImage;
  path: string;
  label: string;
  rendered: boolean;
}

const publicationStatuses: RestaurantPublicationStatus[] = ['template', 'demo', 'production'];

function isBlank(value: string | null | undefined) {
  return !value || value.trim().length === 0;
}

function parseUrl(value: string) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function isHttpUrl(value: string) {
  const url = parseUrl(value);

  return Boolean(url && (url.protocol === 'http:' || url.protocol === 'https:'));
}

function isHttpsUrl(value: string) {
  const url = parseUrl(value);

  return Boolean(url && url.protocol === 'https:');
}

function isForbiddenPublicHost(value: string) {
  const url = parseUrl(value);

  if (!url) {
    return false;
  }

  const hostname = url.hostname.toLowerCase();
  const forbiddenHosts = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    'example.com',
    'example.org',
    'example.net',
  ];

  return (
    forbiddenHosts.includes(hostname) ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.example.com') ||
    hostname.endsWith('.example.org') ||
    hostname.endsWith('.example.net')
  );
}

function isRemoteUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function hasUrlProtocol(value: string) {
  return /^[a-z][a-z\d+.-]*:/i.test(value);
}

function isProbablyLocalOgPath(value: string) {
  return (
    value.startsWith('/') ||
    value.startsWith('./') ||
    value.startsWith('../') ||
    value.includes('/src/assets/') ||
    value.includes('src/assets/')
  );
}

function isValidPhone(value: string | null) {
  if (!value) {
    return false;
  }

  return value.replace(/\D/g, '').length >= 8;
}

function isValidWhatsapp(value: string | null) {
  if (!value) {
    return false;
  }

  if (value.startsWith('http')) {
    return isHttpUrl(value);
  }

  return value.replace(/\D/g, '').length >= 10;
}

function isValidInstagram(value: string | null) {
  if (!value) {
    return false;
  }

  if (value.startsWith('http')) {
    return isHttpUrl(value);
  }

  const handle = value.replace('@', '').trim();

  return /^[a-zA-Z0-9._]{1,30}$/.test(handle);
}

function addIssue(issues: ValidationIssue[], issue: ValidationIssue) {
  issues.push(issue);
}

function productionLevel(isStrict: boolean): ValidationLevel {
  return isStrict ? 'error' : 'warning';
}

function findDuplicateValues(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  values.forEach((value) => {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  });

  return [...duplicates];
}

function getMenuItems(restaurant: RestaurantConfig) {
  return restaurant.menu.categories.flatMap((category, categoryIndex) =>
    category.items.map((item, itemIndex) => ({
      item,
      categoryIndex,
      itemIndex,
    })),
  );
}

function getConfiguredImages(restaurant: RestaurantConfig): ConfiguredImage[] {
  const menuImages = getMenuItems(restaurant)
    .filter(({ item }) => item.featured && item.image)
    .map(({ item, categoryIndex, itemIndex }) => ({
      image: item.image as RestaurantImage,
      path: `menu.categories[${categoryIndex}].items[${itemIndex}].image`,
      label: `Imagem do prato "${item.name}"`,
      rendered: true,
    }));

  const experienceImages = restaurant.experience.images.map((image, index) => ({
    image,
    path: `experience.images[${index}]`,
    label: `Imagem de experiência ${index + 1}`,
    rendered: false,
  }));

  const galleryImages = restaurant.gallery.images.map((image, index) => ({
    image,
    path: `gallery.images[${index}]`,
    label: `Imagem da galeria ${index + 1}`,
    rendered: true,
  }));

  return [
    {
      image: restaurant.hero.image,
      path: 'hero.image',
      label: 'Imagem do Hero',
      rendered: true,
    },
    ...menuImages,
    {
      image: restaurant.about.image,
      path: 'about.image',
      label: 'Imagem da seção A casa',
      rendered: true,
    },
    ...experienceImages,
    ...galleryImages,
  ];
}

function validateImage(
  issues: ValidationIssue[],
  configuredImage: ConfiguredImage,
  isStrict: boolean,
) {
  const { image, path, label, rendered } = configuredImage;
  const strictLevel = productionLevel(isStrict);

  if (isBlank(image.src)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'MISSING_IMAGE_SRC',
      path: `${path}.src`,
      message: `${label} não possui src configurado.`,
    });
  } else if ((isRemoteUrl(image.src) || hasUrlProtocol(image.src)) && !isHttpUrl(image.src)) {
    addIssue(issues, {
      level: 'error',
      code: 'INVALID_IMAGE_URL',
      path: `${path}.src`,
      message: `${label} possui URL remota inválida.`,
    });
  }

  if (rendered && isBlank(image.alt)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'MISSING_IMAGE_ALT',
      path: `${path}.alt`,
      message: `${label} é imagem de conteúdo e precisa de alt descritivo.`,
    });
  }

  if (image.width !== undefined && (!Number.isFinite(image.width) || image.width <= 0)) {
    addIssue(issues, {
      level: 'error',
      code: 'INVALID_IMAGE_WIDTH',
      path: `${path}.width`,
      message: `${label} possui width inválido.`,
    });
  }

  if (image.height !== undefined && (!Number.isFinite(image.height) || image.height <= 0)) {
    addIssue(issues, {
      level: 'error',
      code: 'INVALID_IMAGE_HEIGHT',
      path: `${path}.height`,
      message: `${label} possui height inválido.`,
    });
  }

  if (rendered && image.isPlaceholder) {
    addIssue(issues, {
      level: strictLevel,
      code: 'PLACEHOLDER_IMAGE',
      path,
      message: `${label} ainda está marcada como demonstrativa.`,
    });
  }

  if (image.sourceUrl && !isHttpUrl(image.sourceUrl)) {
    addIssue(issues, {
      level: 'warning',
      code: 'INVALID_SOURCE_URL',
      path: `${path}.sourceUrl`,
      message: `${label} possui sourceUrl em formato inválido.`,
    });
  }

  if (image.creditUrl && !isHttpUrl(image.creditUrl)) {
    addIssue(issues, {
      level: 'warning',
      code: 'INVALID_CREDIT_URL',
      path: `${path}.creditUrl`,
      message: `${label} possui creditUrl em formato inválido.`,
    });
  }
}

function validateMenuItem(issues: ValidationIssue[], item: RestaurantMenuItem, path: string) {
  if (isBlank(item.id)) {
    addIssue(issues, {
      level: 'error',
      code: 'MISSING_MENU_ITEM_ID',
      path: `${path}.id`,
      message: 'Item de menu precisa de id para renderização estável.',
    });
  }

  if (isBlank(item.name)) {
    addIssue(issues, {
      level: 'error',
      code: 'MISSING_MENU_ITEM_NAME',
      path: `${path}.name`,
      message: 'Item de menu precisa de nome.',
    });
  }

  if (
    item.price !== undefined &&
    item.price !== null &&
    (!Number.isFinite(item.price) || item.price < 0)
  ) {
    addIssue(issues, {
      level: 'error',
      code: 'INVALID_MENU_PRICE',
      path: `${path}.price`,
      message: 'Preço do menu deve ser número finito e maior ou igual a zero.',
    });
  }
}

function validateReview(
  issues: ValidationIssue[],
  item: RestaurantReviewItem,
  path: string,
  isStrict: boolean,
) {
  const strictLevel = productionLevel(isStrict);

  if (isBlank(item.quote)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'MISSING_REVIEW_QUOTE',
      path: `${path}.quote`,
      message: 'Review configurado precisa de texto.',
    });
  }

  if (isBlank(item.author)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'MISSING_REVIEW_AUTHOR',
      path: `${path}.author`,
      message: 'Review configurado precisa de autor ou fonte.',
    });
  }

  if (item.isPlaceholder) {
    addIssue(issues, {
      level: strictLevel,
      code: 'PLACEHOLDER_REVIEW',
      path,
      message: 'Depoimento ainda está marcado como placeholder.',
    });
  }

  if (item.sourceUrl && !isHttpUrl(item.sourceUrl)) {
    addIssue(issues, {
      level: 'warning',
      code: 'INVALID_REVIEW_SOURCE_URL',
      path: `${path}.sourceUrl`,
      message: 'Review possui sourceUrl em formato inválido.',
    });
  }

  if (
    item.rating !== undefined &&
    item.rating !== null &&
    (!Number.isFinite(item.rating) || item.rating < 0 || item.rating > 5)
  ) {
    addIssue(issues, {
      level: 'warning',
      code: 'INVALID_REVIEW_RATING',
      path: `${path}.rating`,
      message: 'Review possui rating fora do intervalo esperado de 0 a 5.',
    });
  }
}

export function validateRestaurantConfig(
  restaurant: RestaurantConfig,
  options: ValidationOptions = {},
): ValidationResult {
  const mode = options.mode ?? 'content';
  const status = restaurant.publication.status;
  const isStrict = mode === 'production' || status === 'production';
  const strictLevel = productionLevel(isStrict);
  const issues: ValidationIssue[] = [];

  if (!publicationStatuses.includes(status as RestaurantPublicationStatus)) {
    addIssue(issues, {
      level: 'error',
      code: 'INVALID_PUBLICATION_STATUS',
      path: 'publication.status',
      message: 'publication.status deve ser template, demo ou production.',
    });
  }

  if (mode === 'production' && status !== 'production') {
    addIssue(issues, {
      level: 'error',
      code: 'PUBLICATION_STATUS_NOT_PRODUCTION',
      path: 'publication.status',
      message: 'Configuração ainda não está marcada como produção.',
    });
  }

  if (status !== 'production' && restaurant.seo.indexable) {
    addIssue(issues, {
      level: 'error',
      code: 'NON_PRODUCTION_INDEXABLE',
      path: 'seo.indexable',
      message: 'Template e demo devem permanecer com indexable false.',
    });
  }

  if (isStrict && !restaurant.seo.indexable) {
    addIssue(issues, {
      level: 'error',
      code: 'PRODUCTION_NOT_INDEXABLE',
      path: 'seo.indexable',
      message: 'Site oficial deve estar com seo.indexable true.',
    });
  }

  if (isBlank(restaurant.name)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'MISSING_RESTAURANT_NAME',
      path: 'name',
      message: 'Nome do restaurante não configurado.',
    });
  }

  if (isBlank(restaurant.shortName)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'MISSING_RESTAURANT_SHORT_NAME',
      path: 'shortName',
      message: 'Nome curto do restaurante não configurado.',
    });
  }

  if (isBlank(restaurant.address.city)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'MISSING_CITY',
      path: 'address.city',
      message: 'Cidade não configurada.',
    });
  }

  if (isBlank(restaurant.address.state)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'MISSING_STATE',
      path: 'address.state',
      message: 'Estado não configurado.',
    });
  }

  if (
    isStrict &&
    [
      restaurant.address.street,
      restaurant.address.number,
      restaurant.address.city,
      restaurant.address.state,
    ].some(isBlank)
  ) {
    addIssue(issues, {
      level: 'error',
      code: 'INCOMPLETE_ADDRESS',
      path: 'address',
      message: 'Endereço de produção precisa de rua, número, cidade e estado.',
    });
  }

  if (
    !isValidPhone(restaurant.phone) &&
    !isValidWhatsapp(restaurant.whatsapp) &&
    !isValidInstagram(restaurant.socialLinks.instagram)
  ) {
    addIssue(issues, {
      level: strictLevel,
      code: 'MISSING_PRIMARY_CONTACT',
      path: 'phone',
      message: 'Configure telefone ou outro contato principal válido.',
    });
  }

  if (restaurant.phone && !isValidPhone(restaurant.phone)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'INVALID_PHONE',
      path: 'phone',
      message: 'Telefone possui formato insuficiente.',
    });
  }

  if (restaurant.whatsapp && !isValidWhatsapp(restaurant.whatsapp)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'INVALID_WHATSAPP',
      path: 'whatsapp',
      message: 'WhatsApp deve ser URL válida ou número com DDD.',
    });
  }

  if (restaurant.socialLinks.instagram && !isValidInstagram(restaurant.socialLinks.instagram)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'INVALID_INSTAGRAM',
      path: 'socialLinks.instagram',
      message: 'Instagram deve ser URL válida ou handle simples.',
    });
  }

  if (restaurant.address.googleMapsUrl) {
    if (!isHttpUrl(restaurant.address.googleMapsUrl)) {
      addIssue(issues, {
        level: strictLevel,
        code: 'INVALID_MAPS_URL',
        path: 'address.googleMapsUrl',
        message: 'URL de mapa/rota possui formato inválido.',
      });
    }
  } else {
    addIssue(issues, {
      level: 'warning',
      code: 'MISSING_MAPS_URL',
      path: 'address.googleMapsUrl',
      message: 'Google Maps ou rota não configurado.',
    });
  }

  if (restaurant.address.googleMapsEmbedUrl && !isHttpsUrl(restaurant.address.googleMapsEmbedUrl)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'INVALID_MAPS_EMBED_URL',
      path: 'address.googleMapsEmbedUrl',
      message: 'URL de incorporação do mapa possui formato inválido.',
    });
  }

  if (restaurant.openingHours.length === 0) {
    addIssue(issues, {
      level: 'warning',
      code: 'MISSING_OPENING_HOURS',
      path: 'openingHours',
      message: 'Horários não configurados.',
    });
  }

  if (isBlank(restaurant.seo.description)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'MISSING_SEO_DESCRIPTION',
      path: 'seo.description',
      message: 'Descrição de SEO não configurada.',
    });
  }

  if (
    isBlank(restaurant.seo.title) &&
    (isBlank(restaurant.name) ||
      isBlank(restaurant.address.city) ||
      isBlank(restaurant.address.state))
  ) {
    addIssue(issues, {
      level: strictLevel,
      code: 'INVALID_DERIVED_SEO_TITLE',
      path: 'seo.title',
      message: 'Título de SEO não pode ser derivado sem nome, cidade e estado.',
    });
  }

  if (restaurant.seo.siteUrl) {
    if (!isHttpUrl(restaurant.seo.siteUrl)) {
      addIssue(issues, {
        level: 'error',
        code: 'INVALID_SITE_URL',
        path: 'seo.siteUrl',
        message: 'siteUrl deve ser URL absoluta válida.',
      });
    } else if (!isHttpsUrl(restaurant.seo.siteUrl)) {
      addIssue(issues, {
        level: strictLevel,
        code: 'SITE_URL_NOT_HTTPS',
        path: 'seo.siteUrl',
        message: 'siteUrl de produção deve usar HTTPS.',
      });
    } else if (isForbiddenPublicHost(restaurant.seo.siteUrl)) {
      addIssue(issues, {
        level: strictLevel,
        code: 'SITE_URL_NOT_PUBLIC',
        path: 'seo.siteUrl',
        message: 'siteUrl não deve usar localhost, IP local ou domínio fictício.',
      });
    }
  } else {
    addIssue(issues, {
      level: strictLevel,
      code: 'MISSING_SITE_URL',
      path: 'seo.siteUrl',
      message: 'siteUrl não configurado.',
    });
  }

  if (restaurant.seo.ogImage) {
    if (
      isProbablyLocalOgPath(restaurant.seo.ogImage) ||
      !isHttpUrl(restaurant.seo.ogImage) ||
      !isHttpsUrl(restaurant.seo.ogImage) ||
      isForbiddenPublicHost(restaurant.seo.ogImage)
    ) {
      addIssue(issues, {
        level: strictLevel,
        code: 'INVALID_OG_IMAGE',
        path: 'seo.ogImage',
        message: 'ogImage deve ser URL pública absoluta em HTTPS.',
      });
    }
  } else {
    addIssue(issues, {
      level: 'warning',
      code: 'MISSING_OG_IMAGE',
      path: 'seo.ogImage',
      message: 'Imagem Open Graph não configurada.',
    });
  }

  if (restaurant.menu.isPlaceholder) {
    addIssue(issues, {
      level: strictLevel,
      code: 'PLACEHOLDER_MENU',
      path: 'menu.isPlaceholder',
      message: 'Cardápio ainda está marcado como demonstrativo/não confirmado.',
    });
  }

  const visibleMenuCategories = restaurant.menu.categories.filter(
    (category) => category.items.length > 0,
  );

  if (visibleMenuCategories.length === 0) {
    addIssue(issues, {
      level: strictLevel,
      code: 'EMPTY_MENU',
      path: 'menu.categories',
      message: 'Cardápio não possui categorias com itens para renderizar.',
    });
  }

  const duplicatedCategoryIds = findDuplicateValues(
    restaurant.menu.categories.map((category) => category.id).filter(Boolean),
  );

  duplicatedCategoryIds.forEach((id) => {
    addIssue(issues, {
      level: 'warning',
      code: 'DUPLICATED_MENU_CATEGORY_ID',
      path: 'menu.categories',
      message: `Categoria de menu com id duplicado: ${id}.`,
    });
  });

  const menuItems = getMenuItems(restaurant);
  const duplicatedItemIds = findDuplicateValues(
    menuItems.map(({ item }) => item.id).filter(Boolean),
  );

  duplicatedItemIds.forEach((id) => {
    addIssue(issues, {
      level: 'warning',
      code: 'DUPLICATED_MENU_ITEM_ID',
      path: 'menu.categories[].items',
      message: `Item de menu com id duplicado: ${id}.`,
    });
  });

  menuItems.forEach(({ item, categoryIndex, itemIndex }) => {
    validateMenuItem(issues, item, `menu.categories[${categoryIndex}].items[${itemIndex}]`);
  });

  getConfiguredImages(restaurant).forEach((configuredImage) => {
    validateImage(issues, configuredImage, isStrict);
  });

  const duplicatedGallerySources = findDuplicateValues(
    restaurant.gallery.images.map((image) => image.src).filter(Boolean),
  );

  duplicatedGallerySources.forEach((src) => {
    addIssue(issues, {
      level: 'warning',
      code: 'DUPLICATED_GALLERY_IMAGE_SRC',
      path: 'gallery.images',
      message: `Galeria possui src duplicado usado como chave React: ${src}.`,
    });
  });

  restaurant.reviews.items.forEach((item, index) => {
    validateReview(issues, item, `reviews.items[${index}]`, isStrict);
  });

  if (restaurant.externalLinks.menu && !isHttpUrl(restaurant.externalLinks.menu)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'INVALID_EXTERNAL_MENU_URL',
      path: 'externalLinks.menu',
      message: 'Link externo do cardápio possui formato inválido.',
    });
  }

  if (restaurant.externalLinks.reservations && !isHttpUrl(restaurant.externalLinks.reservations)) {
    addIssue(issues, {
      level: strictLevel,
      code: 'INVALID_RESERVATIONS_URL',
      path: 'externalLinks.reservations',
      message: 'Link de reservas possui formato inválido.',
    });
  }

  const errors = issues.filter((issue) => issue.level === 'error');
  const warnings = issues.filter((issue) => issue.level === 'warning');

  return {
    mode,
    publicationStatus: status,
    issues,
    errors,
    warnings,
  };
}

function formatIssue(issue: ValidationIssue) {
  const lines = [`[${issue.code}]`];

  if (issue.path) {
    lines.push(issue.path);
  }

  lines.push(issue.message);

  return lines.join('\n');
}

function formatIssueSection(title: string, issues: ValidationIssue[]) {
  if (issues.length === 0) {
    return [`${title} (0)`];
  }

  return [`${title} (${issues.length})`, '', ...issues.map(formatIssue).join('\n\n').split('\n')];
}

export function formatValidationReport(result: ValidationResult) {
  const lines = [
    'Restaurant config validation',
    `Mode: ${result.mode}`,
    `Publication status: ${result.publicationStatus}`,
    '',
    ...formatIssueSection('ERRORS', result.errors),
    '',
    ...formatIssueSection('WARNINGS', result.warnings),
    '',
  ];

  if (result.errors.length > 0) {
    lines.push(
      `Validation failed: ${result.errors.length} errors, ${result.warnings.length} warnings.`,
    );
  } else {
    lines.push(`Validation passed: 0 errors, ${result.warnings.length} warnings.`);
  }

  return lines.join('\n');
}
