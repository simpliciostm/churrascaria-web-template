import { ArrowRight } from 'lucide-react';
import type { RestaurantConfig, RestaurantMenuCategory } from '../../types/restaurant';

interface MenuProps {
  restaurant: RestaurantConfig;
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatMenuPrice(price: number) {
  return currencyFormatter.format(price);
}

function MenuCategory({ category }: { category: RestaurantMenuCategory }) {
  return (
    <section
      aria-labelledby={`menu-category-${category.id}`}
      className="border-t border-[var(--color-warm-line)] pt-5"
    >
      <h3
        id={`menu-category-${category.id}`}
        className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-warm-foreground)]"
      >
        {category.label}
      </h3>

      <ul className="divide-y divide-[var(--color-warm-line)]">
        {category.items.map((item) => (
          <li key={item.id} className="py-3.5 first:pt-0 last:pb-0">
            <div
              className={`grid items-baseline gap-x-4 gap-y-1 ${
                typeof item.price === 'number' ? 'grid-cols-[minmax(0,1fr)_auto]' : ''
              }`}
            >
              <p className="text-base font-bold leading-6 text-[var(--color-warm-foreground)] sm:text-[1.0625rem]">
                {item.name}
              </p>

              {typeof item.price === 'number' ? (
                <p className="whitespace-nowrap text-[0.95rem] font-bold leading-6 text-[var(--color-warm-foreground)]">
                  {formatMenuPrice(item.price)}
                </p>
              ) : null}
            </div>

            {item.description ? (
              <p className="mt-1 max-w-xl text-[0.92rem] leading-5 text-[var(--color-warm-body)] sm:text-[0.95rem]">
                {item.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Menu({ restaurant }: MenuProps) {
  const { menu } = restaurant;
  const categories = menu.categories.filter((category) => category.items.length > 0);
  const externalMenuHref = restaurant.externalLinks.menu;

  if (categories.length === 0) {
    return null;
  }

  return (
    <section
      id="cardapio"
      className="bg-[var(--color-warm-background)] text-[var(--color-warm-foreground)]"
    >
      <div className="site-container border-b border-[var(--color-warm-line)] py-12 sm:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.55fr] lg:gap-16">
          <div className="max-w-[28rem]">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.26em] text-[var(--color-warm-muted)]">
              {menu.eyebrow}
            </p>

            <h2 className="max-w-xl font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[0.94] text-[var(--color-warm-foreground)]">
              {menu.title}
            </h2>

            {menu.description ? (
              <p className="mt-5 max-w-sm text-[1.0625rem] leading-7 text-[var(--color-warm-body)]">
                {menu.description}
              </p>
            ) : null}

            {externalMenuHref ? (
              <a
                href={externalMenuHref}
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--color-warm-foreground)] outline-offset-4 transition-colors hover:text-[var(--color-copper)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver cardápio completo
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>

          <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2 xl:gap-x-16">
            {categories.map((category) => (
              <MenuCategory key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
