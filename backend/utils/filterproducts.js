/**
 * Filters products based on category, price range, and minimum rating.
 * Then sorts the filtered result based on sortBy option.
 *
 * @param {Array} products - master inventory array
 * @param {Object} criteria - { categories: string[], minPrice: number, maxPrice: number, minRating: number, sortBy: string }
 * @returns {Array} filtered and sorted products
 */
function filterProducts(products, criteria) {
  const {
    categories = [],
    minPrice = null,
    maxPrice = null,
    minRating = 0,
    sortBy = null
  } = criteria;

  // Graceful null handling: if no filters are active, return full base inventory
  const noCategoryFilter = !categories || categories.length === 0;
  const noPriceFilter = minPrice === null && maxPrice === null;
  const noRatingFilter = !minRating || minRating <= 0;

  let filtered = products.filter((product) => {
    // Category check — only applies if categories were selected
    const matchesCategory = noCategoryFilter || categories.includes(product.category);

    // Price boundary check — only applies if price range was set
    const matchesPrice =
      noPriceFilter ||
      ((minPrice === null || product.price >= minPrice) &&
        (maxPrice === null || product.price <= maxPrice));

    // Rating check — product rating must meet or exceed minRating
    const matchesRating = noRatingFilter || product.rating >= minRating;

    return matchesCategory && matchesPrice && matchesRating;
  });

  // Sort AFTER filtering — pipeline order matters per the spec
  if (sortBy === "price_low_high") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "top_rated") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

module.exports = filterProducts;