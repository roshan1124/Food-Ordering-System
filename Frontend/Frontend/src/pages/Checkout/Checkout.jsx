import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, restaurantName, getCartTotal, clearCart, isEmpty } = useContext(CartContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [instructions, setInstructions] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (isEmpty) {
      navigate('/cart');
      return;
    }
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    // Load user addresses (mock for now - replace with API call)
    const loadAddresses = async () => {
      try {
        setLoadingAddresses(true);
        // TODO: Replace with actual API call
        setTimeout(() => {
          setAddresses([
            {
              id: 1,
              type: 'Home',
              address: '123 Main Street',
              area: 'Downtown',
              city: 'Mumbai',
              pincode: '400001',
              landmark: 'Near Central Park'
            }
          ]);
          setLoadingAddresses(false);
        }, 500);
      } catch (error) {
        console.error('Failed to load addresses:', error);
        setLoadingAddresses(false);
      }
    };

    loadAddresses();
  }, [isEmpty, isAuthenticated, navigate]);

  const deliveryCharge = 40;
  const subtotal = getCartTotal() || 0;
  const tax = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + deliveryCharge + tax;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful order
      clearCart();
      navigate('/orders', { state: { orderPlaced: true } });
      
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isEmpty) {
    return null; // Will redirect to cart
  }

  if (loadingAddresses) {
    return <LoadingSpinner message="Loading delivery addresses..." />;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Delivery</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Confirm</span>
          </div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-main">
          {/* Step 1: Delivery Address */}
          {step === 1 && (
            <div className="delivery-section">
              <h2>Select Delivery Address</h2>
              
              <div className="address-list">
                {addresses.length > 0 ? (
                  addresses.map(address => (
                    <div
                      key={address.id}
                      className={`address-card ${selectedAddress?.id === address.id ? 'selected' : ''}`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="address-type">
                        <span className="type-badge">{address.type}</span>
                        {selectedAddress?.id === address.id && (
                          <span className="selected-check">✓</span>
                        )}
                      </div>
                      <p className="address-line">{address.address}</p>
                      <p className="address-line">{address.area}, {address.city}</p>
                      <p className="address-line">Pincode: {address.pincode}</p>
                      {address.landmark && (
                        <p className="address-landmark">Landmark: {address.landmark}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="no-address">No saved addresses. Please add a new address.</p>
                )}
                
                <button className="add-address-btn">
                  + Add New Address
                </button>
              </div>

              <div className="delivery-instructions">
                <label htmlFor="instructions">Delivery Instructions (Optional)</label>
                <textarea
                  id="instructions"
                  rows="3"
                  placeholder="e.g., Leave at door, Call before delivery..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>

              <div className="step-actions">
                <button
                  className="next-btn"
                  onClick={() => setStep(2)}
                  disabled={!selectedAddress}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="payment-section">
              <h2>Select Payment Method</h2>
              
              <div className="payment-methods">
                <label className={`payment-card ${paymentMethod === 'cash' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <span className="payment-icon">💵</span>
                    <div>
                      <h3>Cash on Delivery</h3>
                      <p>Pay with cash when your order arrives</p>
                    </div>
                  </div>
                </label>

                <label className={`payment-card ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <span className="payment-icon">💳</span>
                    <div>
                      <h3>Credit/Debit Card</h3>
                      <p>Pay securely with your card</p>
                    </div>
                  </div>
                </label>

                <label className={`payment-card ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <span className="payment-icon">📱</span>
                    <div>
                      <h3>UPI</h3>
                      <p>Pay using Google Pay, PhonePe, etc.</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="step-actions">
                <button className="back-btn" onClick={() => setStep(1)}>
                  Back
                </button>
                <button className="next-btn" onClick={() => setStep(3)}>
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Order Confirmation */}
          {step === 3 && (
            <div className="confirm-section">
              <h2>Review Your Order</h2>
              
              <div className="confirm-details">
                <div className="detail-group">
                  <h3>Delivery Address</h3>
                  <div className="detail-box">
                    <p><strong>{selectedAddress?.type}</strong></p>
                    <p>{selectedAddress?.address}</p>
                    <p>{selectedAddress?.area}, {selectedAddress?.city}</p>
                    <p>Pincode: {selectedAddress?.pincode}</p>
                  </div>
                </div>

                <div className="detail-group">
                  <h3>Payment Method</h3>
                  <div className="detail-box">
                    {paymentMethod === 'cash' && '💵 Cash on Delivery'}
                    {paymentMethod === 'card' && '💳 Credit/Debit Card'}
                    {paymentMethod === 'upi' && '📱 UPI'}
                  </div>
                </div>

                {instructions && (
                  <div className="detail-group">
                    <h3>Instructions</h3>
                    <div className="detail-box">
                      <p>{instructions}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="step-actions">
                <button className="back-btn" onClick={() => setStep(2)}>
                  Back
                </button>
                <button
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : `Place Order • ₹${totalAmount}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-sidebar">
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            {restaurantName && (
              <div className="restaurant-info">
                <h4>{restaurantName}</h4>
              </div>
            )}

            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <span className="item-quantity">{item.quantity}x</span>
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="price-row">
                <span>Delivery Charge</span>
                <span>₹{deliveryCharge}</span>
              </div>
              <div className="price-row">
                <span>Tax (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <div className="delivery-time">
              <span className="time-icon">🕐</span>
              <span>Estimated delivery: 30-40 mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;