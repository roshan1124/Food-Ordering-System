import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Cart.css';

const CartSummary = ({ total, itemCount }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const deliveryCharge = total > 300 ? 0 : 40;
  const tax = Math.round(total * 0.05);
  const grandTotal = total + deliveryCharge + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Subtotal ({itemCount} items)</span>
        <span>₹{total}</span>
      </div>

      <div className="summary-row">
        <span>Delivery Charge</span>
        {deliveryCharge === 0 ? (
          <span className="free-delivery">FREE</span>
        ) : (
          <span>₹{deliveryCharge}</span>
        )}
      </div>

      <div className="summary-row">
        <span>Tax (GST 5%)</span>
        <span>₹{tax}</span>
      </div>

      {total < 300 && (
        <div className="delivery-info">
          <span className="info-icon">ℹ️</span>
          <span>Add ₹{300 - total} more for free delivery</span>
        </div>
      )}

      <div className="summary-total">
        <span>Total</span>
        <span>₹{grandTotal}</span>
      </div>

      <button 
        className="checkout-btn"
        onClick={handleCheckout}
        disabled={itemCount === 0}
      >
        Proceed to Checkout
      </button>

      <div className="payment-info">
        <p>Accepted payment methods:</p>
        <div className="payment-icons">
          <span>💵 Cash</span>
          <span>💳 Card</span>
          <span>📱 UPI</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;