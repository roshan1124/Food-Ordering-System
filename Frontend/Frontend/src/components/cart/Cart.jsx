import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import './Cart.css';

const Cart = () => {
  const { 
    cartItems, 
    restaurantName, 
    getCartTotal, 
    getItemCount,
    isEmpty 
  } = useContext(CartContext);

  if (isEmpty) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet</p>
          <Link to="/" className="browse-btn">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p className="restaurant-info">
          Ordering from: <strong>{restaurantName}</strong>
        </p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <CartSummary 
          total={getCartTotal()} 
          itemCount={getItemCount()}
        />
      </div>
    </div>
  );
};

export default Cart;