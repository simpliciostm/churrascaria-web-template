import { ArrowDown } from 'lucide-react';
import type { RestaurantConfig } from '../../types/restaurant';

interface HeroProps {
  restaurant: RestaurantConfig;
}

function Hero({ restaurant }: HeroProps) {
  const { hero } = restaurant;
  const hasMenu = restaurant.menu.categories.some((category) => category.items.length > 0);

  return (
    <section
      id="inicio"
      className="relative isolate min-h-[38rem] overflow-hidden bg-[var(--color-background)] sm:min-h-[42rem] lg:min-h-[min(82svh,46rem)]"
    >
      <img
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[57%_center] sm:object-center"
        src={hero.image.src}
        alt={hero.image.alt}
        width={hero.image.width ?? 2200}
        height={hero.image.height ?? 1400}
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(21,18,15,0.9)_0%,rgba(21,18,15,0.68)_36%,rgba(21,18,15,0.16)_78%,rgba(21,18,15,0.48)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-[linear-gradient(0deg,rgba(21,18,15,0.78),rgba(21,18,15,0))]"
        aria-hidden="true"
      />

      <div className="site-container flex min-h-[38rem] items-center pb-12 pt-28 sm:min-h-[42rem] sm:pb-14 sm:pt-32 lg:min-h-[min(82svh,46rem)] lg:pt-36">
        <div className="max-w-[39rem]">
          <p className="mb-4 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-muted)] sm:text-sm">
            <span className="h-px w-12 bg-[var(--color-copper)]" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1 className="max-w-[11ch] font-display text-[clamp(3rem,7vw,4.65rem)] font-semibold leading-[0.9] text-[var(--color-foreground)]">
            {hero.title}
          </h1>

          <p className="mt-5 max-w-[30rem] text-[1.0625rem] font-semibold leading-7 text-[var(--color-muted)] sm:text-xl sm:leading-8">
            {hero.description}
          </p>

          {hasMenu ? (
            <a
              href="#cardapio"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 border border-[var(--color-copper)] bg-[var(--color-copper)] px-6 text-sm font-bold text-[var(--color-background)] outline-offset-4 transition-colors hover:bg-transparent hover:text-[var(--color-foreground)] sm:min-h-13 sm:px-7"
            >
              Ver cardápio
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
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
