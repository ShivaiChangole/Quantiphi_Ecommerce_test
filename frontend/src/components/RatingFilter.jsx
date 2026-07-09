function RatingFilter({ minRating, onChange }) {
  return (
    <div className="filter-group">
      <h3>Minimum Rating</h3>
      {[5, 4, 3, 2, 1].map((star) => (
        <label key={star} className="radio-label">
          <input
            type="radio"
            name="rating"
            checked={minRating === star}
            onChange={() => onChange(star)}
          />
          {"★".repeat(star)}{"☆".repeat(5 - star)} & up
        </label>
      ))}
      <label className="radio-label">
        <input
          type="radio"
          name="rating"
          checked={minRating === 0}
          onChange={() => onChange(0)}
        />
        Any rating
      </label>
    </div>
  );
}

export default RatingFilter;