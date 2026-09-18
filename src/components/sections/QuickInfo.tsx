import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { RestaurantConfig, RestaurantOpeningHour } from '../../types/restaurant';

interface QuickInfoProps {
  restaurant: RestaurantConfig;
}

interface QuickInfoItem {
  id: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  Icon: LucideIcon;
}

function isQuickInfoItem(item: QuickInfoItem | null): item is QuickInfoItem {
  return item !== null;
}

function normalizePhoneHref(phone: string | null) {
  if (!phone) {
    return null;
  }

  const digits = phone.replace(/\D/g, '');

  return digits ? `tel:${digits}` : null;
}

function createWhatsappHref(whatsapp: string | null) {
  if (!whatsapp) {
    return null;
  }

  if (whatsapp.startsWith('http')) {
    return whatsapp;
  }

  const digits = whatsapp.replace(/\D/g, '');

  return digits ? `https://wa.me/${digits}` : null;
}

function formatHours(openingHours: RestaurantOpeningHour[], fallback: string) {
  if (openingHours.length === 0) {
    return fallback.trim() || null;
  }

  const [firstHours] = openingHours;

  return [firstHours.days, firstHours.time].filter(Boolean).join(' ');
}

function getGridClass(itemCount: number) {
  if (itemCount >= 4) {
    return 'grid-cols-2 sm:grid-cols-4';
  }

  if (itemCount === 3) {
    return 'grid-cols-2 sm:grid-cols-3';
  }

  if (itemCount === 2) {
    return 'grid-cols-2';
  }

  return 'grid-cols-1';
}

function QuickInfoContent({ item, isAction = false }: { item: QuickInfoItem; isAction?: boolean }) {
  return (
    <>
      <item.Icon
        className={`mt-0.5 size-5 shrink-0 ${isAction ? 'text-current' : 'text-[var(--color-warm-muted)]'} sm:size-6`}
        aria-hidden="true"
      />
      <span className="min-w-0">
        <span className="block text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--color-warm-muted)] sm:text-xs">
          {item.label}
        </span>
        <span className="mt-1.5 block text-[0.98rem] font-bold leading-5 text-[var(--color-warm-foreground)] sm:text-[1.0625rem] sm:leading-6">
          {item.value}
        </span>
      </span>
    </>
  );
}

function QuickInfo({ restaurant }: QuickInfoProps) {
  const { address, locationSection, openingHours, phone, whatsapp } = restaurant;
  const hoursSummary = formatHours(openingHours, locationSection.hoursFallback);
  const locationSummary = [address.city, address.state].filter(Boolean).join(' — ');
  const phoneHref = normalizePhoneHref(phone);
  const whatsappHref = createWhatsappHref(whatsapp);
  const contactItem =
    phone && phoneHref
      ? {
          id: 'phone',
          label: 'Fale com a gente',
          value: phone,
          href: phoneHref,
          Icon: Phone,
        }
      : whatsappHref
        ? {
            id: 'whatsapp',
            label: 'Fale com a gente',
            value: 'Falar no WhatsApp',
            href: whatsappHref,
            external: true,
            Icon: Phone,
          }
        : null;
  const items = [
    hoursSummary
      ? {
          id: 'hours',
          label: 'Horário de funcionamento',
          value: hoursSummary,
          Icon: Clock3,
        }
      : null,
    locationSummary
      ? {
          id: 'location',
          label: 'Nossa localização',
          value: locationSummary,
          Icon: MapPin,
        }
      : null,
    contactItem,
    address.googleMapsUrl
      ? {
          id: 'route',
          label: 'Rota',
          value: 'Como chegar',
          href: address.googleMapsUrl,
          external: true,
          Icon: ArrowUpRight,
        }
      : null,
  ].filter(isQuickInfoItem);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="border-y border-[var(--color-warm-line)] bg-[var(--color-warm-background)] text-[var(--color-warm-foreground)]"
      aria-label="Informações rápidas"
    >
      <div className="site-container py-5 sm:py-6 lg:py-7">
        <ul className={`grid ${getGridClass(items.length)} gap-x-6 gap-y-5 sm:gap-x-0`}>
          {items.map((item, index) => {
            const isAction = item.id === 'route';
            const className = isAction
              ? 'flex min-h-12 items-center justify-center gap-3 border border-[var(--color-warm-foreground)] px-5 text-[var(--color-warm-foreground)] outline-offset-4 transition-colors hover:border-[var(--color-copper)] hover:bg-[var(--color-copper)] hover:text-[var(--color-background)] sm:min-h-14'
              : `flex min-h-14 items-start gap-3.5 outline-offset-4 sm:min-h-16 ${
                  index > 0 ? 'sm:border-l sm:border-[var(--color-warm-line)] sm:pl-6 lg:pl-8' : ''
                }`;

            return (
              <li key={item.id} className="min-w-0">
                {item.href ? (
                  <a
                    href={item.href}
                    className={
                      isAction
                        ? className
                        : `${className} transition-colors hover:text-[var(--color-warm-muted)]`
                    }
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    <QuickInfoContent item={item} isAction={isAction} />
                  </a>
                ) : (
                  <div className={className}>
                    <QuickInfoContent item={item} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default QuickInfo;
