import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  const [restaurantName, setRestaurantName] = useState(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const { items, restId, restName } = JSON.parse(savedCart);
      setCartItems(items || []);
      setRestaurantId(restId || null);
      setRestaurantName(restName || null);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0 || restaurantId) {
      localStorage.setItem('cart', JSON.stringify({
        items: cartItems,
        restId: restaurantId,
        restName: restaurantName
      }));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cartItems, restaurantId, restaurantName]);

  const addToCart = (item, quantity = 1, restaurantInfo = null) => {
    // Check if trying to add from different restaurant
    if (restaurantId && restaurantInfo && restaurantInfo.id !== restaurantId) {
      const confirm = window.confirm(
        `Items from different restaurants can't be added together. 
         Do you want to clear cart and add this item?`
      );
      if (confirm) {
        clearCart();
        setRestaurantId(restaurantInfo.id);
        setRestaurantName(restaurantInfo.name);
      } else {
        return false;
      }
    }

    // Set restaurant info if first item
    if (!restaurantId && restaurantInfo) {
      setRestaurantId(restaurantInfo.id);
      setRestaurantName(restaurantInfo.name);
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity }];
      }
    });

    return true;
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== itemId);
      
      // Clear restaurant info if cart becomes empty
      if (newItems.length === 0) {
        setRestaurantId(null);
        setRestaurantName(null);
      }
      
      return newItems;
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurantId(null);
    setRestaurantName(null);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartDetails = () => {
    return {
      items: cartItems,
      restaurantId,
      restaurantName,
      total: getCartTotal(),
      itemCount: getItemCount()
    };
  };

  const value = {
    cartItems,
    restaurantId,
    restaurantName,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemCount,
    getCartDetails,
    isEmpty: cartItems.length === 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};