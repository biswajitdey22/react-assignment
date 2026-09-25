import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { VALID_COUPONS } from '../productsData';

const CouponBox = () => {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setErrorMessage('Please enter a coupon code.');
      return;
    }

    if (VALID_COUPONS[code]) {
      applyCoupon(VALID_COUPONS[code]);
      setCouponInput('');
    } else {
      setErrorMessage('Invalid coupon code. Try INDIA20, FOOTBALL20, or REACT20.');
    }
  };

  const handleQuickApply = (code) => {
    setErrorMessage('');
    if (VALID_COUPONS[code]) {
      applyCoupon(VALID_COUPONS[code]);
      setCouponInput('');
    }
  };

  return (
    <div className="coupon-box" id="coupon-engine">
      <div className="coupon-box-header">
        <span>🏷️ Promo Discount Engine</span>
        {appliedCoupon && (
          <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>Active</span>
        )}
      </div>

      {appliedCoupon ? (
        <div className="coupon-applied-badge">
          <span>
            ✓ <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF total)
          </span>
          <button
            type="button"
            className="coupon-applied-remove"
            onClick={removeCoupon}
            title="Remove coupon"
            id="btn-remove-coupon"
          >
            ✕ Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="coupon-form">
          <input
            type="text"
            placeholder="ENTER CODE (e.g. REACT20)"
            value={couponInput}
            onChange={(e) => {
              setCouponInput(e.target.value);
              setErrorMessage('');
            }}
            className="coupon-input"
            id="coupon-input"
          />
          <button type="submit" className="coupon-btn" id="btn-apply-coupon">
            Apply
          </button>
        </form>
      )}

      {errorMessage && (
        <p style={{ color: '#fb7185', fontSize: '0.76rem', margin: '0.5rem 0 0', fontWeight: 600 }}>
          ⚠️ {errorMessage}
        </p>
      )}

      {/* Quick clickable test chips */}
      <div className="coupon-quick-chips">
        <span className="coupon-chip-label">Quick apply:</span>
        {Object.values(VALID_COUPONS).map((coupon) => (
          <button
            key={coupon.code}
            type="button"
            className="coupon-code-pill"
            onClick={() => handleQuickApply(coupon.code)}
            title={`Click to apply ${coupon.desc}`}
          >
            {coupon.code} ({coupon.discountPercent}%)
          </button>
        ))}
      </div>
    </div>
  );
};

export default CouponBox;
