import { useEffect, useRef } from 'react';

export function useHeroScroll(hasVideo: boolean) {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!hero || !image || !content) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;

    const update = () => {
      frameId = 0;
      if (mediaQuery.matches) {
        image.style.transform = '';
        content.style.transform = '';
        return;
      }

      const progress = Math.min(Math.max(window.scrollY / hero.offsetHeight, 0), 1);
      image.style.transform = hasVideo ? '' : `scale(${1 + progress * 0.09})`;
      content.style.transform = `translate3d(0, ${progress * (hasVideo ? 10 : 20)}px, 0)`;
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    mediaQuery.addEventListener('change', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      mediaQuery.removeEventListener('change', requestUpdate);
      window.cancelAnimationFrame(frameId);
    };
  }, [hasVideo]);

  return { heroRef, imageRef, contentRef };
}
