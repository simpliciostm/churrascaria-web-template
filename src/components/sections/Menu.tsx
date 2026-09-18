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

function MenuCategory({ category, index }: { category: RestaurantMenuCategory; index: number }) {
  const isRightColumn = index % 2 === 1;

  return (
    <section
      aria-labelledby={`menu-category-${category.id}`}
      className={`border-t border-[var(--color-warm-line)] py-9 sm:py-10 lg:py-12 ${
        isRightColumn ? 'lg:border-l lg:pl-10 xl:pl-12' : ''
      }`}
    >
      <h3
        id={`menu-category-${category.id}`}
        className="mb-5 text-[0.8125rem] font-bold uppercase tracking-[0.24em] text-[var(--color-warm-muted)] sm:mb-6 sm:text-sm"
      >
        {category.label}
      </h3>

      <ul className="divide-y divide-[var(--color-warm-line)]">
        {category.items.map((item) => (
          <li key={item.id} className="py-4 first:pt-0 last:pb-0 sm:py-5">
            <div
              className={`grid items-baseline gap-x-4 gap-y-2 ${
                typeof item.price === 'number' ? 'grid-cols-[minmax(0,1fr)_auto]' : ''
              }`}
            >
              <p className="font-display text-[1.18rem] font-semibold leading-tight text-[var(--color-warm-foreground)] sm:text-[1.25rem]">
                {item.name}
              </p>

              {typeof item.price === 'number' ? (
                <p className="whitespace-nowrap text-[0.9375rem] font-bold text-[var(--color-warm-foreground)] sm:text-[1.0625rem]">
                  {formatMenuPrice(item.price)}
                </p>
              ) : null}
            </div>

            {item.description ? (
              <p className="mt-1.5 max-w-xl text-[0.9375rem] leading-6 text-[var(--color-warm-body)] sm:mt-2 sm:text-base sm:leading-7">
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

  if (categories.length === 0) {
    return null;
  }

  return (
    <section
      id="cardapio"
      className="bg-[var(--color-warm-background)] text-[var(--color-warm-foreground)]"
    >
      <div className="site-container py-18 sm:py-20 lg:py-24">
        <div className="grid gap-7 border-b border-[var(--color-warm-line)] pb-12 sm:pb-14 lg:grid-cols-[0.72fr_1.25fr_0.9fr] lg:gap-12 lg:pb-16">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-warm-muted)]">
            {menu.eyebrow}
          </p>

          <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[0.98] text-[var(--color-warm-foreground)]">
            {menu.title}
          </h2>

          {menu.description ? (
            <p className="max-w-sm self-end text-[1.0625rem] leading-8 text-[var(--color-warm-body)] sm:text-lg">
              {menu.description}
            </p>
          ) : null}
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-x-10 xl:gap-x-12">
          {categories.map((category, index) => (
            <MenuCategory key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;
