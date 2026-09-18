import type { RestaurantConfig } from '../../types/restaurant';

interface AboutProps {
  restaurant: RestaurantConfig;
}

function About({ restaurant }: AboutProps) {
  const { about, address } = restaurant;

  return (
    <section
      id="a-casa"
      className="bg-[var(--color-warm-background)] text-[var(--color-warm-foreground)]"
    >
      <div className="site-container grid gap-9 border-b border-[var(--color-warm-line)] py-20 sm:gap-8 sm:py-20 lg:grid-cols-[0.8fr_1.7fr] lg:gap-16 lg:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-warm-muted)]">
          {about.introLabel}
        </p>

        <p className="max-w-4xl font-display text-[clamp(2.2rem,6vw,5.6rem)] font-semibold leading-[0.98] text-[var(--color-warm-foreground)]">
          {about.introText}
        </p>
      </div>

      <div className="site-container grid gap-14 py-20 sm:gap-12 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:py-28">
        <figure className="relative">
          <img
            className="aspect-[4/5] w-full object-cover sm:aspect-[16/11] lg:aspect-[5/6]"
            src={about.image.src}
            alt={about.image.alt}
            width="1400"
            height="1750"
            loading="lazy"
            decoding="async"
          />

          <figcaption className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-warm-muted)] sm:mt-4">
            <span>{about.eyebrow}</span>
            <span className="h-px w-10 bg-[var(--color-copper)]" aria-hidden="true" />
            <span>
              {address.city}, {address.state}
            </span>
          </figcaption>
        </figure>

        <div className="lg:pl-4">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-warm-muted)] sm:mb-5">
            {about.eyebrow}
          </p>

          <h2 className="max-w-xl font-display text-[clamp(2.6rem,6vw,5.2rem)] font-semibold leading-[0.94] text-[var(--color-warm-foreground)]">
            {about.title}
          </h2>

          <div className="mt-9 space-y-6 text-[1.0625rem] leading-8 text-[var(--color-warm-body)] sm:mt-8 sm:space-y-5 sm:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
