import type { RestaurantConfig, RestaurantSectionImage } from '../../types/restaurant';

interface GalleryProps {
  restaurant: RestaurantConfig;
}

const imageLayouts = [
  'lg:col-start-3 lg:col-span-8',
  'sm:col-span-10 lg:col-start-1 lg:col-span-5',
  'sm:col-span-10 sm:col-start-3 lg:col-start-8 lg:col-span-5 lg:mt-20',
  'lg:col-start-3 lg:col-span-8',
];

const aspectLayouts = [
  'aspect-[4/3] lg:aspect-[16/10]',
  'aspect-[4/3]',
  'aspect-[4/3]',
  'aspect-[16/10]',
];

function GalleryFigure({
  image,
  index,
  className,
  aspectClassName,
}: {
  image: RestaurantSectionImage;
  index: number;
  className: string;
  aspectClassName: string;
}) {
  return (
    <figure className={`col-span-12 ${className}`}>
      <div className="group overflow-hidden bg-[var(--color-warm-line)]">
        <img
          className={`${aspectClassName} w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]`}
          src={image.src}
          alt={image.alt}
          width={index === 0 || index === 3 ? 1500 : 1200}
          height={index === 0 || index === 3 ? 950 : 900}
          loading="lazy"
          decoding="async"
        />
      </div>
    </figure>
  );
}

function Gallery({ restaurant }: GalleryProps) {
  const { gallery } = restaurant;

  return (
    <section
      id="galeria"
      className="bg-[var(--color-warm-background)] text-[var(--color-warm-foreground)]"
    >
      <div className="site-container py-20 sm:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr_0.9fr] lg:gap-12">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-warm-muted)]">
            {gallery.eyebrow}
          </p>

          <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[0.98] text-[var(--color-warm-foreground)]">
            {gallery.title}
          </h2>

          <p className="max-w-sm self-end text-[1.0625rem] leading-8 text-[var(--color-warm-body)] sm:text-lg">
            {gallery.description}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-10 sm:mt-16 sm:gap-y-10 lg:mt-18 lg:gap-x-8 lg:gap-y-14">
          {gallery.images.map((image, index) => (
            <GalleryFigure
              key={image.src}
              image={image}
              index={index}
              className={imageLayouts[index] ?? ''}
              aspectClassName={aspectLayouts[index] ?? 'aspect-[4/3]'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
