import React from 'react';
import { useCart } from '../context/CartContext';

const OrderReceiptModal = () => {
  const { orderReceipt, closeReceiptModal } = useCart();

  if (!orderReceipt) return null;

  return (
    <div className="order-modal-backdrop" onClick={closeReceiptModal}>
      <div className="order-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="order-modal-header">
          <div className="order-success-icon">✓</div>
          <h3>Order Confirmed!</h3>
          <p>Tax Invoice & Electronic Payment Receipt</p>
        </div>

        <div className="order-modal-body">
          <div className="receipt-meta-box">
            <div className="receipt-meta-item">
              <span className="meta-label">Order Reference</span>
              <div className="meta-val">{orderReceipt.orderId}</div>
            </div>
            <div className="receipt-meta-item">
              <span className="meta-label">Date & Time</span>
              <div className="meta-val">{orderReceipt.timestamp}</div>
            </div>
            <div className="receipt-meta-item">
              <span className="meta-label">Customer</span>
              <div className="meta-val">Biswajit Dey (Hooghly, WB)</div>
            </div>
            <div className="receipt-meta-item">
              <span className="meta-label">Payment Method</span>
              <div className="meta-val">UPI / Net Banking / Card</div>
            </div>
          </div>

          <table className="receipt-items-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th style={{ textAlign: 'center' }}>Qty</th>
                <th style={{ textAlign: 'right' }}>Price</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderReceipt.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right' }}>₹{item.price.toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'right' }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bill-breakdown" style={{ background: 'rgba(2, 6, 23, 0.4)' }}>
            <div className="bill-row">
              <span>Items Gross Amount</span>
              <span>₹{orderReceipt.subtotal.toLocaleString('en-IN')}</span>
            </div>

            {orderReceipt.discountAmount > 0 && (
              <div className="bill-row discount">
                <span>Coupon Applied ({orderReceipt.couponCode})</span>
                <span>- ₹{orderReceipt.discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="bill-row">
              <span>Taxable Value</span>
              <span>₹{orderReceipt.taxableSubtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="bill-row gst">
              <span>CGST (9%) + SGST (9%)</span>
              <span>+ ₹{orderReceipt.gstAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="bill-row total">
              <span>Amount Paid</span>
              <span>₹{orderReceipt.grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="order-modal-footer">
          <button
            type="button"
            className="category-chip-btn"
            onClick={() => window.print()}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
          >
            🖨️ Print Receipt
          </button>
          <button
            type="button"
            className="modal-close-btn"
            onClick={closeReceiptModal}
            id="btn-close-receipt-modal"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderReceiptModal;
