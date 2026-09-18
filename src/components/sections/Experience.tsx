import type { RestaurantConfig } from '../../types/restaurant';

interface ExperienceProps {
  restaurant: RestaurantConfig;
}

function Experience({ restaurant }: ExperienceProps) {
  const { experience } = restaurant;
  const [primaryImage, secondaryImage] = experience.images;

  return (
    <section
      id="experiencia"
      className="overflow-hidden bg-[var(--color-surface)] text-[var(--color-foreground)]"
    >
      <div className="site-container py-20 sm:py-20 lg:py-24">
        <div className="grid gap-8 border-b border-[var(--color-line)] pb-12 sm:gap-8 sm:pb-14 lg:grid-cols-[0.7fr_1.2fr_0.9fr] lg:gap-12 lg:pb-16">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-copper)]">
            {experience.eyebrow}
          </p>

          <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[0.98] text-[var(--color-foreground)]">
            {experience.title}
          </h2>

          <p className="max-w-md self-end text-[1.0625rem] leading-8 text-[var(--color-muted)] sm:text-lg">
            {experience.description}
          </p>
        </div>

        <div className="grid gap-11 pt-12 sm:gap-9 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16 lg:pt-18">
          <figure>
            <img
              className="aspect-[4/5] w-full object-cover sm:aspect-[16/10] lg:aspect-[5/4]"
              src={primaryImage.src}
              alt={primaryImage.alt}
              width="1600"
              height="1280"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="grid gap-11 sm:gap-9 lg:pt-24">
            <div className="flex flex-col gap-4 border-y border-[var(--color-line)] py-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3 sm:py-6 lg:flex-col lg:items-start lg:border-y-0 lg:border-l lg:py-0 lg:pl-8">
              {experience.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="font-display text-[clamp(1.45rem,4vw,3rem)] font-semibold uppercase leading-none tracking-[0.08em] text-[var(--color-muted)]"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <figure className="lg:ml-auto lg:w-[82%]">
              <img
                className="aspect-[4/3] w-full object-cover"
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                width="1100"
                height="825"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
