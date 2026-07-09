const express = require("express");
const cors = require("cors");
const products = require("./data/products");
const filterProducts = require("./utils/filterProducts");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// GET /api/products
// Query params: categories (comma-separated), minPrice, maxPrice, minRating, sortBy
app.get("/api/products", (req, res) => {
  try {
    const { categories, minPrice, maxPrice, minRating, sortBy } = req.query;

    const criteria = {
      categories: categories ? categories.split(",").filter(Boolean) : [],
      minPrice: minPrice !== undefined && minPrice !== "" ? Number(minPrice) : null,
      maxPrice: maxPrice !== undefined && maxPrice !== "" ? Number(maxPrice) : null,
      minRating: minRating !== undefined && minRating !== "" ? Number(minRating) : 0,
      sortBy: sortBy || null
    };

    const result = filterProducts(products, criteria);

    res.status(200).json({
      success: true,
      count: result.length,
      products: result
    });
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ success: false, message: "Server error while filtering products" });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("E-Commerce Filter API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});