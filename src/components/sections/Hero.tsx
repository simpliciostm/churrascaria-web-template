import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useHeroScroll } from '../../hooks/useHeroScroll';
import type { RestaurantConfig } from '../../types/restaurant';

interface HeroProps {
  restaurant: RestaurantConfig;
}

function getPrefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function Hero({ restaurant }: HeroProps) {
  const { hero } = restaurant;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getPrefersReducedMotion);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const shouldRenderVideo = Boolean(hero.video && !prefersReducedMotion);
  const { heroRef, imageRef, contentRef } = useHeroScroll(shouldRenderVideo);
  const hasMenu = restaurant.menu.categories.some((category) => category.items.length > 0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return (
    <section id="inicio" className="hero" ref={heroRef}>
      <img
        ref={imageRef}
        className="hero__image"
        src={hero.image.src}
        alt={hero.image.alt}
        width={hero.image.width ?? 2200}
        height={hero.image.height ?? 1400}
        fetchPriority="high"
        decoding="async"
      />
      {shouldRenderVideo && hero.video ? (
        <video
          className={`hero__video ${isVideoReady ? 'hero__video--ready' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={hero.image.src}
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={() => setIsVideoReady(true)}
        >
          <source src={hero.video.src} type={hero.video.type} />
        </video>
      ) : null}
      <div className="hero__veil" aria-hidden="true" />
      <div className="site-container hero__layout">
        <div className="hero__content" ref={contentRef}>
          <p className="eyebrow hero-reveal hero-reveal--1">{hero.eyebrow}</p>
          <h1 className="hero-reveal hero-reveal--2">{hero.title}</h1>
          <p className="hero__description hero-reveal hero-reveal--3">{hero.description}</p>
          {hasMenu ? (
            <a href="#cardapio" className="button button--gold hero-reveal hero-reveal--4">
              Ver cardápio <ArrowDown aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>

      <a href="#informacoes" className="hero__scroll">
        <span aria-hidden="true" />
      </a>
      {hero.image.isPlaceholder ? (
        <p className="sr-only">Imagem demonstrativa temporária.</p>
      ) : null}
    </section>
  );
}

export default Hero;
