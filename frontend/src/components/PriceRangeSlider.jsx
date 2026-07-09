const MIN_PRICE = 0;
const MAX_PRICE = 15000;

function PriceRangeSlider({ minPrice, maxPrice, onChange }) {
  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) {
      onChange({ minPrice: value, maxPrice });
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minPrice) {
      onChange({ minPrice, maxPrice: value });
    }
  };

  return (
    <div className="filter-group">
      <h3>Price Range</h3>
      <p>₹{minPrice} - ₹{maxPrice}</p>
      <div className="slider-group">
        <label>Min</label>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100}
          value={minPrice}
          onChange={handleMinChange}
        />
        <label>Max</label>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100}
          value={maxPrice}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}

export default PriceRangeSlider;