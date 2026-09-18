import type { RestaurantConfig } from '../../types/restaurant';

interface FooterProps {
  restaurant: RestaurantConfig;
}

const footerNavigation = [
  { label: 'Início', href: '#inicio' },
  { label: 'Cardápio', href: '#cardapio' },
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
      <div className="site-container py-10 sm:py-12 lg:py-14">
        <div className="grid gap-9 border-b border-[var(--color-line)] pb-9 lg:grid-cols-[0.8fr_1fr_0.8fr] lg:items-center">
          <div>
            <a
              href="#inicio"
              className="inline-flex flex-col outline-offset-8 transition-colors hover:text-[var(--color-muted)]"
              aria-label={`${restaurant.name} - voltar ao início`}
            >
              <span className="font-display text-[2rem] font-semibold leading-none tracking-[0.12em]">
                {restaurant.shortName}
              </span>
              <span className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-[var(--color-muted)]">
                {restaurant.footer.category}
              </span>
            </a>
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 lg:justify-center">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-10 items-center text-sm font-semibold text-[var(--color-muted)] outline-offset-4 transition-colors hover:text-[var(--color-foreground)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            {instagramHref ? (
              <a
                href={instagramHref}
                className="inline-flex size-11 items-center justify-center border border-white/15 text-[var(--color-muted)] outline-offset-4 transition-colors hover:border-[var(--color-copper)] hover:text-[var(--color-copper)]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${restaurant.socialLinks.instagram}`}
              >
                <span className="text-sm font-bold" aria-hidden="true">
                  IG
                </span>
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-sm leading-6 text-[var(--color-muted)] lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p>
              © {year} {restaurant.name}
            </p>
            <p>{restaurant.footer.disclaimer}</p>
          </div>

          {locationLabel ? <p>{locationLabel} • Feito para bons encontros.</p> : null}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
