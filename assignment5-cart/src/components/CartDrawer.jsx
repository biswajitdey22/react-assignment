import React from 'react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    grandTotal,
    discountAmount,
    discountPercent,
    gstAmount,
    isFreeShippingUnlocked,
    amountForFreeShipping,
    freeShippingProgress,
    FREE_SHIPPING_THRESHOLD,
    processCheckout,
    navigateToCart,
    navigateToShop
  } = useCart();

  if (!isCartDrawerOpen) return null;

  return (
    <div
      className="drawer-backdrop"
      onClick={closeCartDrawer}
      id="cart-drawer-backdrop"
    >
      <aside
        className="wishlist-drawer cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <span className="drawer-icon">🛒</span>
            <h3 id="cart-drawer-title">Shopping Cart</h3>
            <span className="drawer-count-badge">{items.length}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {items.length > 0 && (
              <button
                type="button"
                className="drawer-clear-btn"
                onClick={clearCart}
                title="Clear all cart items"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              className="drawer-close-btn"
              onClick={closeCartDrawer}
              aria-label="Close cart drawer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Free Shipping Meter */}
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border-glass)' }}>
          <div className="shipping-progress-text" style={{ fontSize: '0.75rem', marginBottom: '0.4rem' }}>
            {isFreeShippingUnlocked ? (
              <span style={{ color: '#34d399', fontWeight: 600 }}>
                🎉 Free Shipping Unlocked!
              </span>
            ) : (
              <span>
                Add <strong style={{ color: '#38bdf8' }}>₹{amountForFreeShipping.toLocaleString('en-IN')}</strong> for Free Delivery
              </span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div
              className={`shipping-progress-fill ${isFreeShippingUnlocked ? 'unlocked' : ''}`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Drawer Content */}
        {items.length === 0 ? (
          <div className="drawer-empty-state">
            <span className="empty-heart-icon">🛍️</span>
            <h4>Your cart is empty</h4>
            <p>
              Explore our football boots, balls, kits, and match gear to start building your order!
            </p>
            <button
              type="button"
              className="btn-browse-catalog"
              onClick={() => {
                closeCartDrawer();
                navigateToShop();
              }}
            >
              ⚽ Browse Football Gear
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-items-list" style={{ flex: 1, overflowY: 'auto' }}>
              {items.map((item) => (
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
                    <div className="drawer-item-price">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.4rem' }}>
                      <div className="cart-qty-ctrl">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="cart-qty-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f43f5e',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                        onClick={() => removeItem(item.id, item.name)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer with Totals & Actions */}
            <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-glass)', background: 'rgba(15, 23, 42, 0.75)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem', color: '#34d399' }}>
                  <span>Discount ({discountPercent}%)</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                <span>Total (incl. 18% GST)</span>
                <span style={{ color: '#38bdf8' }}>
                  ₹{(grandTotal + (isFreeShippingUnlocked || items.length === 0 ? 0 : 149)).toLocaleString('en-IN')}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="checkout-btn"
                  onClick={() => {
                    closeCartDrawer();
                    navigateToCart();
                  }}
                  style={{ width: '100%' }}
                >
                  <span>Open Full Cart & Checkout Page</span>
                  <span>→</span>
                </button>

                <button
                  type="button"
                  className="btn-modal-wishlist"
                  onClick={() => {
                    closeCartDrawer();
                    processCheckout();
                  }}
                  style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
                >
                  ⚡ Instant Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
