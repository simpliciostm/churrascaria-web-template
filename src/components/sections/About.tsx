import type { RestaurantConfig } from '../../types/restaurant';

interface AboutProps {
  restaurant: RestaurantConfig;
}

function About({ restaurant }: AboutProps) {
  const { about } = restaurant;

  return (
    <section
      id="a-casa"
      className="bg-[var(--color-warm-background)] text-[var(--color-warm-foreground)]"
    >
      <div className="grid border-b border-[var(--color-warm-line)] lg:grid-cols-[1.05fr_1.15fr]">
        <figure className="min-h-[18rem] bg-[var(--color-warm-line)] lg:min-h-[30rem]">
          <img
            className="h-full min-h-[18rem] w-full object-cover text-transparent lg:min-h-[30rem]"
            src={about.image.src}
            alt={about.image.alt}
            width={about.image.width ?? 1400}
            height={about.image.height ?? 1050}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="flex items-center px-[var(--container-padding)] py-12 sm:py-14 lg:py-16 lg:pr-[max(var(--container-padding),calc((100vw-var(--container-max))/2+var(--container-padding)))] lg:pl-14">
          <div className="max-w-[36rem]">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.26em] text-[var(--color-warm-muted)]">
              {about.eyebrow}
            </p>

            <h2 className="max-w-md font-display text-[clamp(2.15rem,4vw,3.25rem)] font-semibold leading-[0.96] text-[var(--color-warm-foreground)]">
              {about.title}
            </h2>

            <p className="mt-5 max-w-[31rem] font-display text-[1.35rem] font-semibold leading-7 text-[var(--color-warm-foreground)] sm:text-[1.55rem] sm:leading-8">
              {about.introText}
            </p>

            <div className="mt-6 space-y-4 text-[1.0625rem] leading-7 text-[var(--color-warm-body)]">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
