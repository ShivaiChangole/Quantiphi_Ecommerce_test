function SortDropdown({ sortBy, onChange }) {
  return (
    <select className="sort-dropdown" value={sortBy} onChange={(e) => onChange(e.target.value)}>
      <option value="">Sort By</option>
      <option value="price_low_high">Price: Low to High</option>
      <option value="top_rated">Top Rated First</option>
    </select>
  );
}

export default SortDropdown;