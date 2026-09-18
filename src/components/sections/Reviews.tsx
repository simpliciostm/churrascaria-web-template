import type { RestaurantConfig, RestaurantReviewItem } from '../../types/restaurant';

interface ReviewsProps {
  restaurant: RestaurantConfig;
}

function ReviewQuote({ item, index }: { item: RestaurantReviewItem; index: number }) {
  return (
    <blockquote className="border border-[var(--color-warm-line)] bg-[rgba(255,255,255,0.32)] p-6">
      <span
        className="text-lg font-bold leading-none text-[var(--color-copper)]"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <p className="mt-4 font-display text-[1.25rem] font-semibold leading-7 text-[var(--color-warm-foreground)]">
        “{item.quote}”
      </p>

      <cite className="mt-5 block not-italic text-sm font-bold text-[var(--color-warm-body)]">
        {item.author}
      </cite>
    </blockquote>
  );
}

function Reviews({ restaurant }: ReviewsProps) {
  const { reviews } = restaurant;

  if (reviews.items.length === 0) {
    return null;
  }

  return (
    <section
      id="avaliacoes"
      className="bg-[var(--color-warm-surface)] text-[var(--color-warm-foreground)]"
    >
      <div className="site-container border-b border-[var(--color-warm-line)] py-12 sm:py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.6fr_1.7fr] lg:items-start lg:gap-14">
          <div className="max-w-[24rem]">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.26em] text-[var(--color-warm-muted)]">
              {reviews.eyebrow}
            </p>

            <h2 className="font-display text-[clamp(2rem,4vw,3.05rem)] font-semibold leading-[0.96]">
              {reviews.title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {reviews.items.map((item, index) => (
              <ReviewQuote key={`${item.quote}-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
