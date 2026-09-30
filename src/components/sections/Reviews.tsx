import type { CSSProperties } from 'react';
import type { RestaurantConfig } from '../../types/restaurant';

interface ReviewsProps {
  restaurant: RestaurantConfig;
}

function Reviews({ restaurant }: ReviewsProps) {
  const { reviews } = restaurant;
  if (!reviews.items.length) return null;

  return (
    <section id="avaliacoes" className="reviews-section">
      <div className="site-container reviews-section__layout">
        <header data-reveal>
          <p className="eyebrow">{reviews.eyebrow}</p>
          <h2>{reviews.title}</h2>
        </header>
        <div className="reviews-grid">
          {reviews.items.map((item, index) => (
            <blockquote
              key={`${item.quote}-${index}`}
              data-reveal
              style={{ '--delay': `${index * 90}ms` } as CSSProperties}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>“{item.quote}”</p>
              <cite>{item.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
