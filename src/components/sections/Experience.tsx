import { Flame, Utensils, Users } from 'lucide-react';
import type { RestaurantConfig } from '../../types/restaurant';

interface ExperienceProps {
  restaurant: RestaurantConfig;
}

function Experience({ restaurant }: ExperienceProps) {
  const { experience } = restaurant;
  const highlights =
    experience.highlights && experience.highlights.length > 0
      ? experience.highlights
      : experience.keywords.map((keyword) => ({
          title: keyword,
          description: experience.description,
          icon: 'utensils' as const,
        }));
  const icons = {
    flame: Flame,
    users: Users,
    utensils: Utensils,
  };

  return (
    <section
      id="experiencia"
      className="bg-[var(--color-background)] text-[var(--color-foreground)]"
    >
      <div className="site-container py-8 sm:py-9 lg:py-10">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.7fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-copper)]">
              {experience.eyebrow}
            </p>
            <h2 className="mt-3 max-w-lg font-display text-[clamp(1.75rem,3.6vw,2.7rem)] font-semibold leading-[0.98]">
              {experience.title}
            </h2>
          </div>

          <ul className="grid gap-6 sm:grid-cols-3 lg:gap-8">
            {highlights.map((highlight) => {
              const Icon = icons[highlight.icon];

              return (
                <li
                  key={highlight.title}
                  className="flex gap-4 border-t border-[var(--color-line)] pt-5 sm:border-t-0 sm:pt-0"
                >
                  <Icon
                    className="mt-1 size-7 shrink-0 text-[var(--color-copper)]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-base font-bold leading-6 text-[var(--color-foreground)]">
                      {highlight.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                      {highlight.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Experience;
