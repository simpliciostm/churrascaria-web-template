import type { RestaurantConfig, RestaurantReviewItem } from '../../types/restaurant';

interface ReviewsProps {
  restaurant: RestaurantConfig;
}

function ReviewQuote({ item, index }: { item: RestaurantReviewItem; index: number }) {
  const isOffset = index % 2 === 1;

  return (
    <blockquote
      className={`border-t border-[var(--color-warm-line)] py-10 sm:py-11 lg:py-12 ${
        isOffset ? 'lg:ml-auto lg:w-[72%]' : 'lg:w-[78%]'
      }`}
    >
      <div className="grid gap-5 sm:grid-cols-[4rem_1fr] sm:gap-8">
        <span
          className="font-display text-3xl font-semibold leading-none text-[var(--color-copper)]"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="max-w-[38rem]">
          <p className="font-display text-[clamp(1.125rem,5.2vw,1.3125rem)] font-semibold leading-[1.42] text-[var(--color-warm-foreground)] sm:text-[clamp(1.5rem,2.2vw,1.875rem)] sm:leading-[1.34]">
            “{item.quote}”
          </p>

          <cite className="mt-5 block not-italic text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-warm-muted)] sm:mt-5 sm:text-sm">
            — {item.author}
          </cite>
        </div>
      </div>
    </blockquote>
  );
}

function Reviews({ restaurant }: ReviewsProps) {
  const { reviews } = restaurant;

  return (
    <section
      id="avaliacoes"
      className="bg-[var(--color-warm-background)] text-[var(--color-warm-foreground)]"
    >
      <div className="site-container border-t border-[var(--color-warm-line)] py-20 sm:py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.35fr] lg:gap-12">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-warm-muted)]">
            {reviews.eyebrow}
          </p>

          <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[0.98] text-[var(--color-warm-foreground)]">
            {reviews.title}
          </h2>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-18">
          {reviews.items.map((item, index) => (
            <ReviewQuote key={`${item.quote}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
