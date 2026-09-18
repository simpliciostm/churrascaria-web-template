import type { RestaurantConfig } from '../../types/restaurant';

interface HeroProps {
  restaurant: RestaurantConfig;
}

function createWhatsappHref(whatsapp: string | null) {
  if (!whatsapp) {
    return null;
  }

  const digits = whatsapp.replace(/\D/g, '');

  return digits ? `https://wa.me/${digits}` : null;
}

function Hero({ restaurant }: HeroProps) {
  const { address, hero } = restaurant;
  const locationLabel = `${address.city} • ${address.state}`;
  const googleMapsHref = address.googleMapsUrl;
  const whatsappHref = createWhatsappHref(restaurant.whatsapp);
  const hasMenu = restaurant.menu.categories.some((category) => category.items.length > 0);
  const hasCtas = hasMenu || googleMapsHref || whatsappHref;

  return (
    <section
      id="inicio"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--color-background)]"
    >
      <img
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center] sm:object-center"
        src={hero.image.src}
        alt={hero.image.alt}
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(23,21,18,0.92)_0%,rgba(23,21,18,0.72)_42%,rgba(23,21,18,0.28)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-[linear-gradient(0deg,var(--color-background),rgba(23,21,18,0))]"
        aria-hidden="true"
      />

      <div className="site-container flex min-h-[100svh] items-end pb-16 pt-36 sm:pb-20 sm:pt-36 lg:items-start lg:pb-0 lg:pt-44 xl:pt-52">
        <div className="max-w-[42rem] lg:max-w-[48rem]">
          <p className="mb-6 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-muted)] sm:mb-5 sm:text-sm">
            <span className="h-px w-11 bg-[var(--color-copper)]" aria-hidden="true" />
            {hero.eyebrow} • {locationLabel}
          </p>

          <h1 className="font-display text-[clamp(3.25rem,10vw,7.25rem)] font-semibold leading-[0.9] text-[var(--color-foreground)]">
            {hero.title}
          </h1>

          <p className="mt-8 max-w-[35rem] text-[1.0625rem] leading-8 text-[var(--color-muted)] sm:text-xl">
            {hero.description}
          </p>

          {hasCtas ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {hasMenu ? (
                <a
                  href="#cardapio"
                  className="inline-flex min-h-12 items-center justify-center border border-[var(--color-copper)] bg-[var(--color-copper)] px-6 text-sm font-bold text-[var(--color-background)] outline-offset-4 transition-colors hover:bg-transparent hover:text-[var(--color-foreground)]"
                >
                  Ver cardápio
                </a>
              ) : null}

              {googleMapsHref ? (
                <a
                  href={googleMapsHref}
                  className={`inline-flex min-h-12 items-center justify-center border px-6 text-sm font-bold outline-offset-4 transition-colors ${
                    hasMenu
                      ? 'border-white/25 text-[var(--color-foreground)] hover:border-[var(--color-copper)] hover:text-[var(--color-copper)]'
                      : 'border-[var(--color-copper)] bg-[var(--color-copper)] text-[var(--color-background)] hover:bg-transparent hover:text-[var(--color-foreground)]'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Como chegar
                </a>
              ) : null}

              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  className="inline-flex min-h-12 items-center justify-center border border-white/25 px-6 text-sm font-bold text-[var(--color-foreground)] outline-offset-4 transition-colors hover:border-[var(--color-copper)] hover:text-[var(--color-copper)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {hero.image.isDemo ? (
        <p className="sr-only">
          Imagem demonstrativa temporária. Substituir por fotografia autorizada antes de publicação
          comercial.
        </p>
      ) : null}
    </section>
  );
}

export default Hero;
