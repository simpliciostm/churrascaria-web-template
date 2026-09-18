import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type {
  RestaurantConfig,
  RestaurantMenuImage,
  RestaurantMenuItem,
} from '../../types/restaurant';

interface MenuShowcaseProps {
  restaurant: RestaurantConfig;
}

interface ShowcaseItem extends RestaurantMenuItem {
  image: RestaurantMenuImage;
}

function isShowcaseItem(item: RestaurantMenuItem): item is ShowcaseItem {
  return Boolean(item.featured && item.image);
}

function getShowcaseItems(restaurant: RestaurantConfig) {
  return restaurant.menu.categories.flatMap((category) => category.items).filter(isShowcaseItem);
}

function MenuShowcase({ restaurant }: MenuShowcaseProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollBackward, setCanScrollBackward] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const showcaseItems = getShowcaseItems(restaurant);
  const hasMultipleItems = showcaseItems.length > 1;

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return;
    }

    const updateScrollState = () => {
      const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;

      setCanScrollBackward(scrollElement.scrollLeft > 1);
      setCanScrollForward(scrollElement.scrollLeft < maxScrollLeft - 1);
    };

    updateScrollState();

    scrollElement.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      scrollElement.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [showcaseItems.length]);

  const scrollByCard = (direction: 'backward' | 'forward') => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return;
    }

    const firstItem = scrollElement.querySelector('li');
    const cardWidth = firstItem?.getBoundingClientRect().width ?? scrollElement.clientWidth * 0.8;
    const gap = Number.parseFloat(window.getComputedStyle(scrollElement).columnGap) || 24;
    const scrollAmount = direction === 'forward' ? cardWidth + gap : -(cardWidth + gap);

    scrollElement.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  if (showcaseItems.length === 0) {
    return null;
  }

  const showControls = hasMultipleItems && (canScrollBackward || canScrollForward);
  const controls = showControls ? (
    <div className="hidden justify-start gap-3 md:flex lg:justify-end">
      <button
        type="button"
        className="inline-flex size-10 items-center justify-center border border-[var(--color-warm-line)] text-[var(--color-warm-foreground)] outline-offset-4 transition-colors hover:border-[var(--color-copper)] hover:text-[var(--color-copper)] disabled:cursor-default disabled:opacity-35 disabled:hover:border-[var(--color-warm-line)] disabled:hover:text-[var(--color-warm-foreground)]"
        aria-label="Pratos anteriores"
        disabled={!canScrollBackward}
        onClick={() => scrollByCard('backward')}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>

      <button
        type="button"
        className="inline-flex size-10 items-center justify-center border border-[var(--color-warm-line)] text-[var(--color-warm-foreground)] outline-offset-4 transition-colors hover:border-[var(--color-copper)] hover:text-[var(--color-copper)] disabled:cursor-default disabled:opacity-35 disabled:hover:border-[var(--color-warm-line)] disabled:hover:text-[var(--color-warm-foreground)]"
        aria-label="Próximos pratos"
        disabled={!canScrollForward}
        onClick={() => scrollByCard('forward')}
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  ) : null;

  return (
    <section
      id="pratos"
      className="bg-[var(--color-warm-background)] text-[var(--color-warm-foreground)]"
    >
      <div className="site-container border-t border-[var(--color-warm-line)] pb-18 pt-12 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.25fr_0.9fr] lg:gap-12">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-warm-muted)]">
            {restaurant.menu.showcase.eyebrow}
          </p>

          <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[0.98] text-[var(--color-warm-foreground)]">
            {restaurant.menu.showcase.title}
          </h2>

          <div className="max-w-sm self-end">
            {restaurant.menu.showcase.description ? (
              <p className="text-[1.0625rem] leading-8 text-[var(--color-warm-body)] sm:text-lg">
                {restaurant.menu.showcase.description}
              </p>
            ) : null}

            {controls ? <div className="mt-6">{controls}</div> : null}
          </div>
        </div>

        <div className="relative mt-10 sm:mt-12 lg:mt-14">
          <ul
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3 [scrollbar-width:none] sm:gap-5 lg:gap-6 [&::-webkit-scrollbar]:hidden"
            aria-label="Vitrine visual de pratos"
          >
            {showcaseItems.map((item) => (
              <li
                key={item.id}
                className="min-w-0 max-w-[18rem] flex-[0_0_74%] snap-start sm:max-w-none sm:flex-[0_0_46%] lg:flex-[0_0_calc((100%_-_3rem)/3)]"
              >
                <figure>
                  <div className="aspect-[4/3] overflow-hidden bg-[var(--color-warm-line)]">
                    <img
                      className="h-full w-full object-cover"
                      src={item.image.src}
                      alt={item.image.alt}
                      width="900"
                      height="675"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <figcaption className="mt-3 text-[0.9375rem] font-semibold text-[var(--color-warm-body)] sm:mt-4">
                    {item.name}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default MenuShowcase;
