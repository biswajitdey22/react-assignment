import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductQuickViewModal = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addWithQty,
    toggleWishlist,
    wishlist,
    items
  } = useCart();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isSavedInWishlist = wishlist.some((w) => w.id === quickViewProduct.id);
  const cartItem = items.find((i) => i.id === quickViewProduct.id);
  const cartQty = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addWithQty(quickViewProduct, quantity);
    closeQuickView();
  };

  return (
    <div className="modal-backdrop" onClick={closeQuickView} id="quick-view-backdrop">
      <div
        className="quick-view-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={closeQuickView}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="quick-view-grid">
          {/* Product Media */}
          <div className="quick-view-image-wrap">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="quick-view-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80';
              }}
            />
            <span className="quick-view-cat-badge">{quickViewProduct.category}</span>
          </div>

          {/* Product Details */}
          <div className="quick-view-content">
            <div className="quick-view-header">
              <span className="quick-view-sku">Item ID: #{quickViewProduct.id}</span>
              <h2 id="quick-view-title">{quickViewProduct.name}</h2>
            </div>

            <div className="quick-view-price-box">
              <div className="quick-view-price">
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </div>
              <span className="tax-inclusive-tag">Price includes applicable taxes</span>
            </div>

            <p className="quick-view-desc">{quickViewProduct.description}</p>

            {/* Football Specifications */}
            <div className="quick-view-specs">
              <div className="spec-pill">
                <span className="spec-label">Discipline</span>
                <span className="spec-val">Association Football</span>
              </div>
              <div className="spec-pill">
                <span className="spec-label">Authenticity</span>
                <span className="spec-val">100% Genuine Match Grade</span>
              </div>
              <div className="spec-pill">
                <span className="spec-label">Warranty</span>
                <span className="spec-val">6-Month Manufacturer</span>
              </div>
              <div className="spec-pill">
                <span className="spec-label">Dispatch</span>
                <span className="spec-val">24-Hr Express Courier</span>
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="quick-view-actions">
              <div className="qty-picker">
                <label className="qty-label">Qty:</label>
                <div className="qty-controls">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="qty-display">{quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons-group">
                <button
                  type="button"
                  className="btn-modal-add"
                  onClick={handleAddToCart}
                  id="btn-quick-add-to-cart"
                >
                  🛒 Add to Cart (₹{(quickViewProduct.price * quantity).toLocaleString('en-IN')})
                </button>

                <button
                  type="button"
                  className={`btn-modal-wishlist ${isSavedInWishlist ? 'active' : ''}`}
                  onClick={() => toggleWishlist(quickViewProduct)}
                  title={isSavedInWishlist ? 'Remove from Wishlist' : 'Save to Wishlist'}
                >
                  {isSavedInWishlist ? '❤️ In Wishlist' : '🤍 Wishlist'}
                </button>
              </div>

              {cartQty > 0 && (
                <div className="cart-existing-notice">
                  ✓ You currently have <strong>{cartQty}</strong> of this item in your shopping cart.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
