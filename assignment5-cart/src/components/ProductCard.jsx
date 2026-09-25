import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart, updateQuantity, items, wishlist, toggleWishlist, openQuickView } = useCart();

  const cartItem = items.find((item) => item.id === product.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <article
      className={`product-card ${viewMode === 'list' ? 'list-view-card' : ''}`}
      id={`product-${product.id}`}
    >
      <div className="product-img-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
          onClick={() => openQuickView(product)}
          style={{ cursor: 'pointer' }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <span className="product-category-tag">{product.category}</span>

        {/* Wishlist toggle button */}
        <button
          type="button"
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>

        {/* Quick View Button Hover Action */}
        <button
          type="button"
          className="card-quick-view-btn"
          onClick={() => openQuickView(product)}
          title="Quick View specifications"
        >
          👁️ Quick View
        </button>
      </div>

      <div className="product-card-body">
        <h4
          className="product-title"
          title={product.name}
          onClick={() => openQuickView(product)}
          style={{ cursor: 'pointer' }}
        >
          {product.name}
        </h4>
        <p className="product-desc">{product.description}</p>

        <div className="product-card-footer">
          <div className="product-price-block">
            <span className="price-currency-label">Price</span>
            <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {qtyInCart === 0 ? (
              <button
                type="button"
                className="product-btn-add"
                onClick={() => addToCart(product)}
                id={`add-btn-${product.id}`}
              >
                + Add to Cart
              </button>
            ) : (
              <div className="card-qty-stepper">
                <button
                  type="button"
                  className="card-qty-step-btn"
                  onClick={() => updateQuantity(product.id, qtyInCart - 1)}
                  title="Decrease quantity"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="card-qty-step-val">{qtyInCart} in Cart</span>
                <button
                  type="button"
                  className="card-qty-step-btn"
                  onClick={() => updateQuantity(product.id, qtyInCart + 1)}
                  title="Increase quantity"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
