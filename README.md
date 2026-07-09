# Quantiphi E-Commerce Filter App

A full-stack product filtering app with a Node.js/Express API and a React (Vite) frontend. Users can filter products by category, price range, and minimum rating, and sort results by price or rating.

## Tech Stack

- **Backend:** Node.js, Express, CORS
- **Frontend:** React 19, Vite

## Project Structure

```
Quantiphi_Ecommerce_test/
├── backend/
│   ├── data/
│   │   └── products.js        # Static product inventory (20 sample items)
│   ├── utils/
│   │   └── filterProducts.js  # Core filter + sort logic
│   ├── server.js               # Express app & API route
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/         # Sidebar, ProductGrid, ProductCard, filters, sort dropdown, etc.
    │   ├── App.jsx              # Main app: filter state + data fetching
    │   └── main.jsx
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Backend Setup

```bash
cd backend
npm install
node server.js
```

The API runs on `http://localhost:5000`.

### 2. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` (Vite's default) and calls the backend at `http://localhost:5000`.

## API Reference

### `GET /api/products`

Returns filtered and sorted products from the inventory.

**Query Parameters**

| Param        | Type   | Description                                              |
|--------------|--------|------------------------------------------------------------|
| `categories` | string | Comma-separated list of categories (e.g. `Electronics,Footwear`) |
| `minPrice`   | number | Minimum price filter                                     |
| `maxPrice`   | number | Maximum price filter                                      |
| `minRating`  | number | Minimum rating (products with rating ≥ this value)        |
| `sortBy`     | string | `price_low_high` or `top_rated`                            |

All parameters are optional — omitting a filter returns unfiltered results for that field.

**Example Request**

```
GET /api/products?categories=Electronics,Footwear&minPrice=1000&maxPrice=5000&minRating=4&sortBy=top_rated
```

**Example Response**

```json
{
  "success": true,
  "count": 2,
  "products": [
    { "id": 4, "name": "Smart Watch", "category": "Electronics", "price": 4999, "rating": 4, "image": "..." },
    { "id": 14, "name": "Boots", "category": "Footwear", "price": 3999, "rating": 4, "image": "..." }
  ]
}
```

### `GET /`

Health check endpoint. Returns a plain text confirmation that the API is running.

## Filtering Logic

Filtering and sorting are handled in `backend/utils/filterProducts.js`:

1. **Category** — if no categories are selected, all categories pass.
2. **Price** — inclusive range check; either bound can be omitted.
3. **Rating** — products must have a rating greater than or equal to `minRating` (default: no minimum).
4. Sorting is applied **after** filtering, either by ascending price or descending rating.

## Frontend Features

- Sidebar with category, price range, and rating filters (`Sidebar.jsx`, `categoryFilter.jsx`, `PriceRangeSlider.jsx`, `RatingFilter.jsx`)
- Sort dropdown for price/rating (`SortDropdown.jsx`)
- Product grid with cards (`ProductGrid.jsx`, `ProductCard.jsx`)
- Empty state when no products match filters (`EmptyState.jsx`)
- Reset filters button
- Automatic refetch whenever filters or sort selection change

## Notes

- Product data is static/in-memory (`backend/data/products.js`) — no database is used.
- The frontend expects the backend to be running on `http://localhost:5000` (hardcoded in `App.jsx` as `API_BASE`).
