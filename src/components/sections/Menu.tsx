import { ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { RestaurantConfig, RestaurantMenuCategory } from '../../types/restaurant';

interface MenuProps {
  restaurant: RestaurantConfig;
}
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function MenuCategory({ category, index }: { category: RestaurantMenuCategory; index: number }) {
  return (
    <section
      className="menu-category"
      data-reveal
      style={{ '--delay': `${index * 70}ms` } as CSSProperties}
    >
      <h3>{category.label}</h3>
      <ul>
        {category.items.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.name}</strong>
              {typeof item.price === 'number' ? <b>{currency.format(item.price)}</b> : null}
            </div>
            {item.description ? <p>{item.description}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Menu({ restaurant }: MenuProps) {
  const categories = restaurant.menu.categories.filter((category) => category.items.length);
  if (!categories.length) return null;

  return (
    <section id="cardapio" className="menu-section">
      <div
        className="menu-section__fire"
        style={{ backgroundImage: `url(${restaurant.hero.image.src})` }}
        aria-hidden="true"
      />
      <div className="site-container menu-section__layout">
        <div className="menu-intro" data-reveal>
          <p className="eyebrow">{restaurant.menu.eyebrow}</p>
          <h2>{restaurant.menu.title}</h2>
          {restaurant.menu.description ? <p>{restaurant.menu.description}</p> : null}
          {restaurant.externalLinks.menu ? (
            <a
              className="text-link"
              href={restaurant.externalLinks.menu}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver cardápio completo <ArrowRight aria-hidden="true" />
            </a>
          ) : null}
        </div>
        <div className="menu-grid">
          {categories.map((category, index) => (
            <MenuCategory key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;
