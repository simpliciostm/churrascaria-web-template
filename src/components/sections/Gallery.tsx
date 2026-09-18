import type { RestaurantConfig } from '../../types/restaurant';

interface GalleryProps {
  restaurant: RestaurantConfig;
}

function Gallery({ restaurant }: GalleryProps) {
  const { gallery } = restaurant;

  if (gallery.images.length === 0) {
    return null;
  }

  return (
    <section
      id="galeria"
      className="bg-[var(--color-warm-background)] text-[var(--color-warm-foreground)]"
    >
      <div className="site-container border-b border-[var(--color-warm-line)] py-12 sm:py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.58fr] lg:items-start lg:gap-14">
          <div className="max-w-[28rem]">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.26em] text-[var(--color-warm-muted)]">
              {gallery.eyebrow}
            </p>

            <h2 className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[0.96] text-[var(--color-warm-foreground)]">
              {gallery.title}
            </h2>

            <p className="mt-5 text-[1.0625rem] leading-7 text-[var(--color-warm-body)]">
              {gallery.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {gallery.images.map((image, index) => (
              <figure key={image.src} className="overflow-hidden bg-[var(--color-warm-line)]">
                <img
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-200 hover:scale-[1.02]"
                  src={image.src}
                  alt={image.alt}
                  width={image.width ?? (index === 0 || index === 3 ? 1000 : 900)}
                  height={image.height ?? 675}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
