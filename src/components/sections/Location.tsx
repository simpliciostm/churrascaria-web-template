import { ArrowUpRight } from 'lucide-react';
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

  return (
    <section
      id="localizacao"
      className="bg-[var(--color-background)] text-[var(--color-foreground)]"
    >
      <div className="site-container py-20 sm:py-20 lg:py-28">
        <div className="grid gap-14 border-b border-[var(--color-line)] pb-16 sm:gap-12 sm:pb-16 lg:grid-cols-[0.75fr_1.25fr_0.9fr] lg:gap-16 lg:pb-20">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-copper)]">
            {locationSection.eyebrow}
          </p>

          <div>
            <h2 className="max-w-3xl font-display text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.9] text-[var(--color-foreground)]">
              {locationSection.title}
            </h2>

            <p className="mt-8 max-w-xl text-[1.0625rem] leading-8 text-[var(--color-muted)] sm:mt-7 sm:text-lg">
              {locationSection.description}
            </p>
          </div>

          <div className="lg:self-end">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Endereço
            </p>

            <address className="space-y-2.5 font-display text-[1.7rem] not-italic leading-tight text-[var(--color-foreground)] sm:space-y-2 sm:text-3xl lg:text-4xl">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            {address.googleMapsUrl ? (
              <a
                href={address.googleMapsUrl}
                className="mt-8 inline-flex min-h-12 items-center gap-3 border border-[var(--color-copper)] px-6 text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-foreground)] outline-offset-4 transition-colors hover:bg-[var(--color-copper)] hover:text-[var(--color-background)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Traçar rota
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="grid gap-14 pt-14 sm:gap-12 sm:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:pt-20">
          <section aria-labelledby="hours-title">
            <h3
              id="hours-title"
              className="mb-7 text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-copper)]"
            >
              Funcionamento
            </h3>

            {openingHours.length > 0 ? (
              <dl className="divide-y divide-[var(--color-line)]">
                {openingHours.map((item) => (
                  <div
                    key={`${item.days}-${item.time}`}
                    className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
                  >
                    <dt className="text-lg font-semibold text-[var(--color-foreground)]">
                      {item.days}
                    </dt>
                    <dd className="text-lg leading-7 text-[var(--color-muted)]">{item.time}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="border-t border-[var(--color-line)] pt-6 text-[1.0625rem] leading-8 text-[var(--color-muted)] sm:pt-5 sm:text-lg">
                {locationSection.hoursFallback}
              </p>
            )}
          </section>

          <section aria-labelledby="contact-title">
            <h3
              id="contact-title"
              className="mb-7 text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-copper)]"
            >
              Fale com a gente
            </h3>

            {contactItems.length > 0 ? (
              <ul className="divide-y divide-[var(--color-line)]">
                {contactItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group flex min-h-18 items-center justify-between gap-6 py-6 text-[1.0625rem] outline-offset-4 sm:min-h-16 sm:py-5 sm:text-lg"
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      <span>
                        <span className="block text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                          {item.label}
                        </span>
                        <span className="mt-1 block font-semibold text-[var(--color-foreground)]">
                          {item.value}
                        </span>
                      </span>

                      {item.external ? (
                        <ArrowUpRight
                          className="size-4 shrink-0 text-[var(--color-copper)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-t border-[var(--color-line)] pt-6 text-[1.0625rem] leading-8 text-[var(--color-muted)] sm:pt-5 sm:text-lg">
                {locationSection.contactFallback}
              </p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

export default Location;
