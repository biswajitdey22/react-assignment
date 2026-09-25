import React from 'react';
import './cart.css';
import { CartProvider, useCart } from './context/CartContext';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import CartDrawer from './components/CartDrawer';
import OrderReceiptModal from './components/OrderReceiptModal';
import WishlistDrawer from './components/WishlistDrawer';
import ProductQuickViewModal from './components/ProductQuickViewModal';

const CartAppContent = () => {
  const {
    activeView,
    navigateToCart,
    navigateToShop,
    openCartDrawer,
    totalItemCount,
    toast,
    grandTotal,
    products,
    wishlist,
    setIsWishlistOpen
  } = useCart();

  return (
    <div className="cart-app-container">
      {/* Toast Alert */}
      {toast && (
        <aside className={`cart-toast ${toast.type}`}>
          <span>{toast.message}</span>
          {activeView === 'shop' && totalItemCount > 0 && (
            <button
              type="button"
              onClick={navigateToCart}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#ffffff',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: 600,
                marginLeft: '0.5rem'
              }}
            >
              View Cart →
            </button>
          )}
        </aside>
      )}

      {/* Top Navbar */}
      <header className="cart-navbar">
        <div className="cart-navbar-inner">
          <div className="cart-brand" onClick={navigateToShop} style={{ cursor: 'pointer' }}>
            <div
              className="cart-brand-logo"
              style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
            >
              ⚽
            </div>
            <div className="cart-brand-text">
              <h1>StrikerPro Sports</h1>
              <p>Official Football Boots, Kits & Match Gear</p>
            </div>
          </div>

          {/* Navigation Controls: Shop vs Cart */}
          <div className="cart-nav-meta">
            <nav className="nav-page-tabs">
              <button
                type="button"
                className={`nav-tab-btn ${activeView === 'shop' ? 'active' : ''}`}
                onClick={navigateToShop}
                id="nav-tab-shop"
              >
                ⚽ Store Catalog
              </button>
              <button
                type="button"
                className={`nav-tab-btn ${activeView === 'cart' ? 'active' : ''}`}
                onClick={navigateToCart}
                id="nav-tab-cart"
              >
                🛒 Cart Page
                {totalItemCount > 0 && (
                  <span className="cart-tab-badge">{totalItemCount}</span>
                )}
              </button>
            </nav>

            {/* Wishlist Button */}
            <button
              type="button"
              className="cart-counter-btn wishlist-nav-btn"
              onClick={() => setIsWishlistOpen(true)}
              title="Open Wishlist"
              id="nav-wishlist-btn"
            >
              <span>❤️ Wishlist</span>
              <span className="cart-count-bubble" style={{ background: '#f43f5e' }}>
                {wishlist.length}
              </span>
            </button>

            {/* Cart Button / Quick Drawer Trigger */}
            <button
              type="button"
              className={`cart-counter-btn ${activeView === 'cart' ? 'active-view' : ''}`}
              onClick={navigateToCart}
              title="Go to Cart & Checkout Page"
              id="nav-cart-btn"
            >
              <span>🛒 Cart</span>
              <span className="cart-count-bubble">{totalItemCount}</span>
              {totalItemCount > 0 && (
                <span style={{ fontSize: '0.8rem', color: '#93c5fd' }}>
                  • ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main View: Either Full Catalog (Shop) OR Dedicated Cart Page */}
      {activeView === 'shop' ? (
        <>
          {/* Hero Highlights */}
          <section className="cart-hero-banner">
            <div className="cart-hero-card">
              <div className="hero-content">
                <h2>Pro Football Equipment & Matchday Gear</h2>
                <p>
                  Official match-grade boots, balls, kits, and training gear. Built with React{' '}
                  <strong>useReducer</strong>, centralized <strong>Context API</strong>, promo
                  coupons, and automated 18% GST calculation.
                </p>
              </div>
              <div className="hero-highlights">
                <div className="hero-stat">
                  <span className="stat-value">{products.length}</span>
                  <span className="stat-label">Gear Items</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-value">20%</span>
                  <span className="stat-label">Promo Code</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-value">18%</span>
                  <span className="stat-label">GST Tax</span>
                </div>
              </div>
            </div>
          </section>

          {/* Full Width Catalog (Main Page without cramped Cart sidebar) */}
          <main className="catalog-full-layout">
            <ProductList />
          </main>

          {/* Floating Cart Quick Bar when items are in cart */}
          {totalItemCount > 0 && (
            <div className="floating-cart-bar" id="floating-cart-pill">
              <div className="floating-cart-info" onClick={openCartDrawer} style={{ cursor: 'pointer' }}>
                <span className="floating-cart-icon">🛒</span>
                <span className="floating-cart-text">
                  <strong>{totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}</strong> in cart
                </span>
                <span className="floating-cart-amount">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="floating-cart-actions">
                <button
                  type="button"
                  className="floating-drawer-btn"
                  onClick={openCartDrawer}
                  title="Open Quick Cart Drawer"
                >
                  Quick Drawer
                </button>
                <button
                  type="button"
                  className="floating-checkout-btn"
                  onClick={navigateToCart}
                  title="Go to full Cart Page"
                >
                  View Full Cart & Checkout →
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Dedicated Cart Page outside of main page */
        <main className="cart-page-wrapper">
          <CartPage />
        </main>
      )}

      {/* Product Quick View Lightbox Modal */}
      <ProductQuickViewModal />

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer />

      {/* Cart Slide-Over Drawer (Outside of main page) */}
      <CartDrawer />

      {/* Order Confirmation Receipt Modal */}
      <OrderReceiptModal />

      {/* Footer */}
      <footer className="cart-footer">
        <p>
          Assignment 5 • <strong>Shopping Cart Management System</strong> • React useReducer &
          Context API • 18% Indian GST (9% CGST + 9% SGST)
        </p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <CartAppContent />
    </CartProvider>
  );
};

export default App;
