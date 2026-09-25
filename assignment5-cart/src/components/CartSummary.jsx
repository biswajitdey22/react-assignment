import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CouponBox from './CouponBox';

const CartSummary = () => {
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
    freeShippingProgress
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
    <aside className="cart-summary-card" id="cart-summary-panel">
      <div className="cart-summary-header">
        <h3>
          <span>🛒 Order Summary</span>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500 }}>
            ({items.length} {items.length === 1 ? 'item' : 'items'})
          </span>
        </h3>
        {items.length > 0 && (
          <button
            type="button"
            className="clear-cart-btn"
            onClick={clearCart}
            id="btn-clear-cart"
          >
            Clear Cart
          </button>
        )}
      </div>

      {/* Free Shipping Progress Meter */}
      <div className="shipping-progress-box">
        <div className="shipping-progress-text">
          {isFreeShippingUnlocked ? (
            <span style={{ color: '#34d399', fontWeight: 600 }}>
              🎉 Free Express Matchday Shipping Unlocked!
            </span>
          ) : (
            <span>
              Add <strong style={{ color: '#38bdf8' }}>₹{amountForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong>FREE Shipping</strong> (Orders over ₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')})
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

      {/* Cart Items List */}
      {items.length === 0 ? (
        <div className="cart-empty-message">
          <span className="empty-icon">🛍️</span>
          <p>Your cart is empty</p>
          <span>Select football gear from the catalog on the left</span>
        </div>
      ) : (
        <div className="cart-items-list">
          {items.map((item) => (
            <div key={item.id} className="cart-item-row" id={`cart-row-${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-thumb"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=120&q=80';
                }}
              />

              <div className="cart-item-info">
                <div className="cart-item-name" title={item.name}>
                  {item.name}
                </div>
                <div className="cart-item-price">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}{' '}
                  {item.quantity > 1 && (
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 400 }}>
                      (@₹{item.price.toLocaleString('en-IN')})
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Stepper */}
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

              {/* Remove button */}
              <button
                type="button"
                className="cart-item-remove-btn"
                onClick={() => removeItem(item.id, item.name)}
                title="Remove item"
                aria-label={`Remove ${item.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Coupon Application Box */}
      <CouponBox />

      {/* Indian Delivery Pincode Estimator */}
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

      {/* Bill & GST Breakdown */}
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
              CGST 9% (₹{cgstAmount.toLocaleString('en-IN')}) + SGST 9% (₹
              {sgstAmount.toLocaleString('en-IN')})
            </span>
          </div>
          <span>+ ₹{gstAmount.toLocaleString('en-IN')}</span>
        </div>

        <div className="bill-row total">
          <span>Grand Total</span>
          <span>
            ₹{(grandTotal + (isFreeShippingUnlocked || items.length === 0 ? 0 : 149)).toLocaleString(
              'en-IN'
            )}
          </span>
        </div>
      </div>

      {/* Checkout Action Button */}
      <button
        type="button"
        className="checkout-btn"
        disabled={items.length === 0}
        onClick={processCheckout}
        id="btn-checkout"
      >
        <span>
          Proceed to Checkout (₹
          {(grandTotal + (isFreeShippingUnlocked || items.length === 0 ? 0 : 149)).toLocaleString(
            'en-IN'
          )}
          )
        </span>
        <span>→</span>
      </button>
    </aside>
  );
};

export default CartSummary;
