import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { RestaurantProvider } from './context/RestaurantContext';

// Pages
import Home from './pages/Home/Home';
import RestaurantPage from './pages/RestaurantPage/RestaurantPage';
import CartPage from './pages/CartPage/CartPage';
import Checkout from './pages/Checkout/Checkout';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AdminDashboard from './pages/Admin/AdminDashboard';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <RestaurantProvider>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurant/:id" element={<RestaurantPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
              <Footer />
            </div>
          </RestaurantProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;