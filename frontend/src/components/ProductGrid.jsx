import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import SortDropdown from "./SortDropdown";

function ProductGrid({ products, sortBy, onSortChange, onReset, loading }) {
  return (
    <main className="product-grid-section">
      <div className="grid-header">
        <h2>Products {!loading && `(${products.length})`}</h2>
        <SortDropdown sortBy={sortBy} onChange={onSortChange} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <EmptyState onReset={onReset} />
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default ProductGrid;