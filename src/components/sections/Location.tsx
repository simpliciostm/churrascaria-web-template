import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react';
import type { RestaurantConfig } from '../../types/restaurant';

interface LocationProps {
  restaurant: RestaurantConfig;
}

interface ContactItem {
  label: string;
  value: string;
  href: string;
  external: boolean;
}

function isContactItem(item: ContactItem | null): item is ContactItem {
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

function createInstagramHref(instagram: string | null) {
  if (!instagram) {
    return null;
  }

  if (instagram.startsWith('http')) {
    return instagram;
  }

  const handle = instagram.replace('@', '').trim();

  return handle ? `https://www.instagram.com/${handle}/` : null;
}

function Location({ restaurant }: LocationProps) {
  const { address, locationSection, openingHours, phone, whatsapp, socialLinks } = restaurant;
  const streetLine = [address.street, address.number].filter(Boolean).join(', ');
  const districtLine = [address.district, address.postalCode].filter(Boolean).join(' • ');
  const cityLine = [address.city, address.state].filter(Boolean).join(' — ');
  const addressLines = [streetLine, districtLine, cityLine, address.country].filter(Boolean);
  const phoneHref = normalizePhoneHref(phone);
  const whatsappHref = createWhatsappHref(whatsapp);
  const instagramHref = createInstagramHref(socialLinks.instagram);
  const contactItems = [
    phone && phoneHref
      ? { label: 'Telefone', value: phone, href: phoneHref, external: false }
      : null,
    whatsappHref
      ? { label: 'WhatsApp', value: 'Falar no WhatsApp', href: whatsappHref, external: true }
      : null,
    socialLinks.instagram && instagramHref
      ? { label: 'Instagram', value: socialLinks.instagram, href: instagramHref, external: true }
      : null,
  ].filter(isContactItem);
  const hoursSummary =
    openingHours.length > 0
      ? openingHours.map((item) => `${item.days} ${item.time}`).join(' | ')
      : locationSection.hoursFallback;

  return (
    <section
      id="localizacao"
      className="bg-[var(--color-warm-background)] text-[var(--color-warm-foreground)]"
    >
      <div className="site-container py-12 sm:py-14 lg:py-16">
        <div className="grid gap-9 lg:grid-cols-[0.75fr_1.35fr] lg:items-start lg:gap-16">
          <div className="max-w-[30rem]">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.26em] text-[var(--color-warm-muted)]">
              {locationSection.eyebrow}
            </p>

            <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[0.96]">
              {locationSection.title}
            </h2>

            <p className="mt-5 text-[1.0625rem] leading-7 text-[var(--color-warm-body)]">
              {locationSection.description}
            </p>

            {address.googleMapsUrl ? (
              <a
                href={address.googleMapsUrl}
                className="mt-7 inline-flex min-h-12 items-center gap-3 bg-[var(--color-copper)] px-6 text-sm font-bold text-[var(--color-background)] outline-offset-4 transition-colors hover:bg-[var(--color-warm-foreground)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Como chegar
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <section className="border-t border-[rgba(93,74,49,0.14)] py-5 sm:col-span-2">
              <div className="flex gap-4">
                <MapPin
                  className="mt-1 size-6 shrink-0 text-[var(--color-copper)]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-warm-muted)]">
                    Endereço
                  </h3>
                  <address className="mt-3 space-y-1 text-lg font-semibold not-italic leading-7">
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
            </section>

            <section className="border-t border-[rgba(93,74,49,0.14)] py-5">
              <div className="flex gap-4">
                <Clock3
                  className="mt-1 size-6 shrink-0 text-[var(--color-copper)]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-warm-muted)]">
                    Funcionamento
                  </h3>
                  <p className="mt-3 text-lg font-semibold leading-7">{hoursSummary}</p>
                </div>
              </div>
            </section>

            <section className="border-t border-[rgba(93,74,49,0.14)] py-5">
              <div className="flex gap-4">
                <Phone
                  className="mt-1 size-6 shrink-0 text-[var(--color-copper)]"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-warm-muted)]">
                    Contato
                  </h3>
                  {contactItems.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {contactItems.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className="group inline-flex items-center gap-2 text-lg font-semibold leading-7 outline-offset-4 transition-colors hover:text-[var(--color-copper)]"
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noopener noreferrer' : undefined}
                          >
                            {item.value}
                            {item.external ? (
                              <ArrowUpRight
                                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                              />
                            ) : null}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-lg font-semibold leading-7">
                      {locationSection.contactFallback}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
