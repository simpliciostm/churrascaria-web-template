import { ArrowRight } from 'lucide-react';
import type { RestaurantConfig } from '../../types/restaurant';

interface AboutProps {
  restaurant: RestaurantConfig;
}

function About({ restaurant }: AboutProps) {
  const { about } = restaurant;
  return (
    <section id="a-casa" className="about-section">
      <figure className="about-section__image image-reveal" data-reveal>
        <img
          src={about.image.src}
          alt={about.image.alt}
          width={about.image.width ?? 1400}
          height={about.image.height ?? 1050}
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="about-section__content" data-reveal>
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2>{about.title}</h2>
          <p className="about-section__manifesto">{about.introText}</p>
          <div className="about-section__copy">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a className="text-link" href="#experiencia">
            Conheça a experiência <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
