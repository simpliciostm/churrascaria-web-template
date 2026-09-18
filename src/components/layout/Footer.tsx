import type { RestaurantConfig } from '../../types/restaurant';

interface FooterProps {
  restaurant: RestaurantConfig;
}

const footerNavigation = [
  { label: 'Início', href: '#inicio' },
  { label: 'A casa', href: '#a-casa' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Localização', href: '#localizacao' },
];

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

function Footer({ restaurant }: FooterProps) {
  const year = new Date().getFullYear();
  const locationLabel = [restaurant.address.city, restaurant.address.state]
    .filter(Boolean)
    .join(', ');
  const instagramHref = createInstagramHref(restaurant.socialLinks.instagram);

  return (
    <footer className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="site-container border-t border-[var(--color-line)] py-12 sm:py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <a
              href="#inicio"
              className="font-display text-[2rem] font-semibold tracking-[0.08em] text-[var(--color-foreground)] outline-offset-8 transition-colors hover:text-[var(--color-muted)]"
              aria-label={`${restaurant.name} - voltar ao início`}
            >
              {restaurant.shortName}
            </a>

            <p className="mt-4 text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-muted)]">
              {restaurant.footer.category}
              {locationLabel ? ` • ${locationLabel}` : ''}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé" className="lg:justify-self-end">
            <ul className="grid gap-2 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-1">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-base font-semibold text-[var(--color-muted)] outline-offset-4 transition-colors hover:text-[var(--color-foreground)] sm:min-h-10"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-7 border-t border-[var(--color-line)] pt-8 text-[0.9375rem] leading-6 text-[var(--color-muted)] sm:mt-12 sm:gap-6 sm:pt-7 sm:text-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p>
              © {year} {restaurant.name}
            </p>
            <p>{restaurant.footer.disclaimer}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
            {restaurant.socialLinks.instagram && instagramHref ? (
              <a
                href={instagramHref}
                className="inline-flex min-h-11 items-center font-semibold outline-offset-4 transition-colors hover:text-[var(--color-foreground)] sm:min-h-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
            ) : null}

            <a
              href="#inicio"
              className="inline-flex min-h-11 items-center font-semibold outline-offset-4 transition-colors hover:text-[var(--color-foreground)] sm:min-h-10"
            >
              Topo ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
