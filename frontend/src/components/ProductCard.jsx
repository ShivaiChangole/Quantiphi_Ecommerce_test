function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h4>{product.name}</h4>
        <p className="product-price">₹{product.price}</p>
        <p className="product-rating">{"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}</p>
      </div>
    </div>
  );
}

export default ProductCard;