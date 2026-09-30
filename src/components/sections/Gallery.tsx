import type { CSSProperties } from 'react';
import type { RestaurantConfig } from '../../types/restaurant';

interface GalleryProps {
  restaurant: RestaurantConfig;
}

function Gallery({ restaurant }: GalleryProps) {
  const { gallery } = restaurant;
  if (!gallery.images.length) return null;

  return (
    <section id="galeria" className="gallery-section section-light">
      <div className="site-container">
        <header className="gallery-section__header" data-reveal>
          <div>
            <p className="eyebrow">{gallery.eyebrow}</p>
            <h2>{gallery.title}</h2>
          </div>
          <p>{gallery.description}</p>
        </header>
        <div className="gallery-grid">
          {gallery.images.map((image, index) => (
            <figure
              key={image.src}
              className={`gallery-grid__item gallery-grid__item--${index + 1} image-reveal`}
              data-reveal
              style={{ '--delay': `${(index % 3) * 80}ms` } as CSSProperties}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width ?? 1000}
                height={image.height ?? 675}
                loading="lazy"
                decoding="async"
              />
              {image.label ? <figcaption>{image.label}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
