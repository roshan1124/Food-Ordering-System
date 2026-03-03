import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    if (window.confirm('Remove this item from cart?')) {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img 
          src={item.imageUrl || 'https://via.placeholder.com/80'} 
          alt={item.name}
        />
      </div>

      <div className="cart-item-details">
        <div className="cart-item-header">
          <h3>{item.name}</h3>
          <button className="remove-btn" onClick={handleRemove}>×</button>
        </div>

        <p className="item-description">{item.description}</p>

        {item.customizations && Object.keys(item.customizations).length > 0 && (
          <div className="item-customizations">
            {Object.entries(item.customizations).map(([key, value]) => (
              <span key={key} className="customization-tag">
                + {value.name}
              </span>
            ))}
          </div>
        )}

        <div className="cart-item-footer">
          <div className="quantity-controls">
            <button 
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => handleQuantityChange(item.quantity + 1)}>
              +
            </button>
          </div>

          <div className="item-price">
            ₹{item.price * item.quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;