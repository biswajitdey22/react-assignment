import React from 'react';
import { useCart } from '../context/CartContext';

const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    moveToCart,
    removeFromWishlist,
    clearWishlist
  } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div
      className="drawer-backdrop"
      onClick={() => setIsWishlistOpen(false)}
      id="wishlist-drawer-backdrop"
    >
      <aside
        className="wishlist-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-drawer-title"
      >
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <span className="drawer-icon">❤️</span>
            <h3 id="wishlist-drawer-title">My Wishlist</h3>
            <span className="drawer-count-badge">{wishlist.length}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {wishlist.length > 0 && (
              <button
                type="button"
                className="drawer-clear-btn"
                onClick={clearWishlist}
                title="Clear all saved items"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setIsWishlistOpen(false)}
              aria-label="Close wishlist"
            >
              ✕
            </button>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="drawer-empty-state">
            <span className="empty-heart-icon">🤍</span>
            <h4>Your wishlist is empty</h4>
            <p>
              Save boots, match balls, kits, and training gear here by tapping the heart icon on any product card!
            </p>
            <button
              type="button"
              className="btn-browse-catalog"
              onClick={() => setIsWishlistOpen(false)}
            >
              Explore Football Collection
            </button>
          </div>
        ) : (
          <div className="drawer-items-list">
            {wishlist.map((item) => (
              <div key={item.id} className="drawer-item-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="drawer-item-thumb"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=120&q=80';
                  }}
                />
                <div className="drawer-item-details">
                  <span className="drawer-item-cat">{item.category}</span>
                  <h4 className="drawer-item-name">{item.name}</h4>
                  <div className="drawer-item-price">₹{item.price.toLocaleString('en-IN')}</div>
                </div>

                <div className="drawer-item-actions">
                  <button
                    type="button"
                    className="btn-move-cart"
                    onClick={() => moveToCart(item)}
                    title="Move this item to Cart"
                  >
                    🛒 Move to Cart
                  </button>
                  <button
                    type="button"
                    className="btn-remove-wishlist"
                    onClick={() => removeFromWishlist(item.id)}
                    title="Remove from Wishlist"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlist.length > 0 && (
          <div className="drawer-footer">
            <p className="drawer-footer-note">
              Items in your wishlist remain saved during your current session.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};

export default WishlistDrawer;
