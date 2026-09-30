import { Flame, Utensils, Users } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { RestaurantConfig } from '../../types/restaurant';

interface ExperienceProps {
  restaurant: RestaurantConfig;
}

function Experience({ restaurant }: ExperienceProps) {
  const { experience } = restaurant;
  const highlights = experience.highlights?.length
    ? experience.highlights
    : experience.keywords.map((title) => ({
        title,
        description: experience.description,
        icon: 'utensils' as const,
      }));
  const icons = { flame: Flame, users: Users, utensils: Utensils };
  const background = experience.images[0];

  return (
    <section id="experiencia" className="experience-section">
      {background ? (
        <img
          className="experience-section__background"
          src={background.src}
          alt=""
          width={background.width ?? 1600}
          height={background.height ?? 900}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      ) : null}
      <div className="experience-section__veil" aria-hidden="true" />
      <div className="site-container experience-section__layout">
        <div data-reveal>
          <p className="eyebrow">{experience.eyebrow}</p>
          <h2>{experience.title}</h2>
        </div>
        <ul>
          {highlights.map((highlight, index) => {
            const Icon = icons[highlight.icon];
            return (
              <li
                key={highlight.title}
                data-reveal
                style={{ '--delay': `${index * 90}ms` } as CSSProperties}
              >
                <Icon aria-hidden="true" />
                <div>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Experience;
