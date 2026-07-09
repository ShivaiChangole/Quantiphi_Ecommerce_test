import CategoryFilter from "./CategoryFilter";
import PriceRangeSlider from "./PriceRangeSlider";
import RatingFilter from "./RatingFilter";

function Sidebar({ filters, setFilters, onReset }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Filters</h2>
        <button className="reset-btn" onClick={onReset}>Reset All</button>
      </div>

      <CategoryFilter
        selectedCategories={filters.categories}
        onChange={(categories) => setFilters((prev) => ({ ...prev, categories }))}
      />

      <PriceRangeSlider
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onChange={({ minPrice, maxPrice }) =>
          setFilters((prev) => ({ ...prev, minPrice, maxPrice }))
        }
      />

      <RatingFilter
        minRating={filters.minRating}
        onChange={(minRating) => setFilters((prev) => ({ ...prev, minRating }))}
      />
    </aside>
  );
}

export default Sidebar;