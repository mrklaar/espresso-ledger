export default function RatingStars({ value, onChange, readonly = false, size = 'md' }) {
  return (
    <div className={`rating-stars rating-stars-${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= value ? 'star-filled' : ''}`}
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          {star <= value ? '\u2605' : '\u2606'}
        </button>
      ))}
    </div>
  );
}
