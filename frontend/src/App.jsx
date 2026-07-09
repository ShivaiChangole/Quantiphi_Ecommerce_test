import { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import ProductGrid from "./components/ProductGrid";
import "./App.css";

const DEFAULT_FILTERS = {
  categories: [],
  minPrice: 0,
  maxPrice: 15000,
  minRating: 0
};

const API_BASE = "http://localhost:5000";

function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (filters.categories.length > 0) {
        params.set("categories", filters.categories.join(","));
      }
      params.set("minPrice", filters.minPrice);
      params.set("maxPrice", filters.maxPrice);
      if (filters.minRating > 0) {
        params.set("minRating", filters.minRating);
      }
      if (sortBy) {
        params.set("sortBy", sortBy);
      }

      const response = await fetch(`${API_BASE}/api/products?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy]);

  // Instant state feedback: refetch every time filters or sort change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setSortBy("");
  };

  return (
    <div className="app-container">
      <Sidebar filters={filters} setFilters={setFilters} onReset={handleReset} />
      <ProductGrid
        products={products}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onReset={handleReset}
        loading={loading}
      />
    </div>
  );
}

export default App;