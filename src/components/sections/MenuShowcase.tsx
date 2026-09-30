import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
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
const isShowcaseItem = (item: RestaurantMenuItem): item is ShowcaseItem =>
  Boolean(item.featured && item.image);

function MenuShowcase({ restaurant }: MenuShowcaseProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ back: false, forward: false });
  const items = restaurant.menu.categories
    .flatMap((category) => category.items)
    .filter(isShowcaseItem);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () =>
      setPosition({
        back: list.scrollLeft > 2,
        forward: list.scrollLeft < list.scrollWidth - list.clientWidth - 2,
      });
    update();
    list.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      list.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items.length]);

  const move = (direction: number) => {
    const list = listRef.current;
    if (!list) return;
    const card = list.querySelector('li')?.getBoundingClientRect().width ?? 300;
    list.scrollBy({ left: direction * (card + 24), behavior: 'smooth' });
  };

  if (!items.length) return null;

  return (
    <section id="pratos" className="showcase section-light">
      <div className="site-container showcase__layout">
        <div className="showcase__intro" data-reveal>
          <p className="eyebrow">{restaurant.menu.showcase.eyebrow}</p>
          <h2>{restaurant.menu.showcase.title}</h2>
          {restaurant.menu.showcase.description ? (
            <p>{restaurant.menu.showcase.description}</p>
          ) : null}
          {items.length > 1 ? (
            <div className="slider-controls">
              <button
                onClick={() => move(-1)}
                disabled={!position.back}
                aria-label="Pratos anteriores"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => move(1)}
                disabled={!position.forward}
                aria-label="Próximos pratos"
              >
                <ChevronRight />
              </button>
            </div>
          ) : null}
        </div>
        <ul ref={listRef} className="showcase__list" aria-label="Vitrine visual de pratos">
          {items.map((item, index) => (
            <li key={item.id} data-reveal style={{ '--delay': `${index * 80}ms` } as CSSProperties}>
              <figure>
                <div className="image-frame">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width ?? 900}
                    height={item.image.height ?? 675}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>{item.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default MenuShowcase;
