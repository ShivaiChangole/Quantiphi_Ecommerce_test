const CATEGORIES = ["Electronics", "Apparel", "Footwear"];

function CategoryFilter({ selectedCategories, onChange }) {
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter((c) => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="filter-group">
      <h3>Category</h3>
      {CATEGORIES.map((category) => (
        <label key={category} className="checkbox-label">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => toggleCategory(category)}
          />
          {category}
        </label>
      ))}
    </div>
  );
}

export default CategoryFilter;