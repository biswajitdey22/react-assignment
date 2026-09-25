import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CouponBox from './CouponBox';

const CartPage = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    discountPercent,
    discountAmount,
    discountedSubtotal,
    gstAmount,
    grandTotal,
    clearCart,
    processCheckout,
    FREE_SHIPPING_THRESHOLD,
    isFreeShippingUnlocked,
    amountForFreeShipping,
    freeShippingProgress,
    navigateToShop,
    totalItemCount
  } = useCart();

  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const cgstAmount = Math.round(gstAmount / 2);
  const sgstAmount = Math.round(gstAmount / 2);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setPincodeStatus({
        type: 'error',
        message: 'Please enter a valid 6-digit Indian PIN code (e.g. 560001, 110001).'
      });
      return;
    }

    const metroPrefixes = {
      '11': 'New Delhi / NCR',
      '40': 'Mumbai / MMR',
      '56': 'Bengaluru Hub',
      '60': 'Chennai Region',
      '70': 'Kolkata Metro',
      '50': 'Hyderabad Hub',
      '38': 'Ahmedabad',
      '41': 'Pune'
    };

    const prefix = cleanPin.substring(0, 2);
    const hubName = metroPrefixes[prefix] || `Postal Zone ${prefix}`;

    setPincodeStatus({
      type: 'success',
      hub: hubName,
      pin: cleanPin,
      eta: 'Guaranteed 24-48 hr Matchday Dispatch',
      courier: 'BlueDart / Delhivery Express Sports Logistics'
    });
  };

  return (
    <div className="cart-page-view" id="cart-page-view">
      {/* Breadcrumb Navigation & Top Action */}
      <div className="cart-page-top-nav">
        <div className="cart-page-breadcrumbs">
          <button type="button" className="breadcrumb-link" onClick={navigateToShop}>
            Home
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Shopping Cart & Checkout</span>
        </div>

        <button type="button" className="btn-continue-shopping" onClick={navigateToShop}>
          ← Continue Shopping
        </button>
      </div>

      <div className="cart-page-header">
        <div className="cart-page-title-wrap">
          <h2>🛒 Your Shopping Cart</h2>
          <span className="cart-page-count-badge">
            {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
          </span>
        </div>
        <p className="cart-page-subtitle">
          Review your selected football gear, apply promotional coupons, verify 18% GST, and complete your order.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="cart-page-empty-card">
          <div className="empty-cart-illustration">🛍️</div>
          <h3>Your Shopping Cart is Empty</h3>
          <p>
            You haven't added any football boots, match balls, jerseys, or training gear to your cart yet.
          </p>
          <button type="button" className="btn-explore-store" onClick={navigateToShop}>
            ⚽ Explore Football Store Catalog
          </button>
        </div>
      ) : (
        <div className="cart-page-grid-layout">
          {/* Left Column: Items List */}
          <div className="cart-page-items-panel">
            <div className="cart-items-header-bar">
              <span>Selected Products ({items.length})</span>
              <button
                type="button"
                className="cart-clear-all-btn"
                onClick={clearCart}
                title="Remove all items from cart"
              >
                Clear Entire Cart
              </button>
            </div>

            <div className="cart-page-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-page-item-card" id={`cart-page-row-${item.id}`}>
                  <div className="cart-page-item-media">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-page-item-img"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                  </div>

                  <div className="cart-page-item-info">
                    <span className="cart-page-item-cat">{item.category}</span>
                    <h3 className="cart-page-item-title">{item.name}</h3>
                    <div className="cart-page-item-unit-price">
                      Unit Price: <strong>₹{item.price.toLocaleString('en-IN')}</strong>
                    </div>

                    <div className="cart-page-item-controls">
                      <div className="cart-qty-ctrl">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          title="Decrease quantity"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="cart-qty-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          title="Increase quantity"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-page-item-subtotal">
                        Total: <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>

                      <button
                        type="button"
                        className="cart-page-remove-btn"
                        onClick={() => removeItem(item.id, item.name)}
                        title="Remove from cart"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-page-items-footer">
              <button type="button" className="btn-continue-shopping secondary" onClick={navigateToShop}>
                ← Add More Football Gear
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="cart-page-summary-panel">
            {/* Free Shipping Progress Meter */}
            <div className="shipping-progress-box">
              <div className="shipping-progress-text">
                {isFreeShippingUnlocked ? (
                  <span style={{ color: '#34d399', fontWeight: 600 }}>
                    🎉 Free Express Matchday Shipping Unlocked!
                  </span>
                ) : (
                  <span>
                    Add <strong style={{ color: '#38bdf8' }}>₹{amountForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong>FREE Shipping</strong> (Threshold: ₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')})
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

            {/* Coupon Code Section */}
            <CouponBox />

            {/* Indian Pincode Delivery Checker */}
            <div className="pincode-estimator-box">
              <div className="pincode-header">
                <span>📍 Delivery Pincode Checker</span>
              </div>
              <form onSubmit={handleCheckPincode} className="pincode-form">
                <input
                  type="text"
                  className="pincode-input"
                  placeholder="Enter 6-digit PIN (e.g. 560001)"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, ''));
                    setPincodeStatus(null);
                  }}
                />
                <button type="submit" className="pincode-btn">
                  Check
                </button>
              </form>

              {pincodeStatus && pincodeStatus.type === 'error' && (
                <p className="pincode-msg error">⚠️ {pincodeStatus.message}</p>
              )}

              {pincodeStatus && pincodeStatus.type === 'success' && (
                <div className="pincode-msg success">
                  <div style={{ fontWeight: 600, color: '#34d399' }}>
                    ✓ Delivery Available to {pincodeStatus.hub} ({pincodeStatus.pin})
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    ⚡ {pincodeStatus.eta} via {pincodeStatus.courier}
                  </div>
                </div>
              )}
            </div>

            {/* Financial Bill & Statutory 18% GST */}
            <div className="bill-breakdown">
              <div className="bill-row">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="bill-row discount">
                  <span>Coupon Discount ({discountPercent}%)</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="bill-row">
                <span>Shipping Fee</span>
                <span style={{ color: isFreeShippingUnlocked ? '#34d399' : '#f8fafc' }}>
                  {isFreeShippingUnlocked ? 'FREE' : '₹149'}
                </span>
              </div>

              <div className="bill-row">
                <span>Taxable Value</span>
                <span>₹{discountedSubtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="bill-row gst">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                  <span>GST (18% Statutory Rate)</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    CGST 9% (₹{cgstAmount.toLocaleString('en-IN')}) + SGST 9% (₹{sgstAmount.toLocaleString('en-IN')})
                  </span>
                </div>
                <span>+ ₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="bill-row total">
                <span>Grand Total</span>
                <span>
                  ₹{(grandTotal + (isFreeShippingUnlocked || items.length === 0 ? 0 : 149)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              type="button"
              className="checkout-btn"
              disabled={items.length === 0}
              onClick={processCheckout}
              id="btn-cart-page-checkout"
            >
              <span>
                Proceed to Checkout (₹{(grandTotal + (isFreeShippingUnlocked || items.length === 0 ? 0 : 149)).toLocaleString('en-IN')})
              </span>
              <span>→</span>
            </button>

            {/* Trust Assurances */}
            <div className="cart-trust-badges">
              <div className="trust-item">
                <span className="trust-icon">🛡️</span>
                <span>100% Genuine Match Grade Gear</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span>256-Bit Encrypted Secure Payment</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🚚</span>
                <span>Guaranteed Express All-India Courier</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
