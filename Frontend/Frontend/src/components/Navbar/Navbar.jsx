import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const cartItemCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return '👤';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Food<span>App</span>
        </Link>

        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for restaurants or dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <span className="search-icon">🔍</span>
          </button>
        </form>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          
          {isAuthenticated && user ? (
            <div 
              className="profile-wrapper"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="profile-container" ref={profileRef}>
                <div className="profile-icon">
                  {getUserInitials()}
                </div>
              </div>
              
              {showDropdown && (
                <div className="profile-dropdown" ref={dropdownRef}>
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <span className="dropdown-icon">👤</span>
                    My Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <span className="dropdown-icon">📦</span>
                    My Orders
                  </Link>
                  <Link to="/favorites" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <span className="dropdown-icon">❤️</span>
                    Favorites
                  </Link>
                  <Link to="/addresses" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <span className="dropdown-icon">📍</span>
                    Saved Addresses
                  </Link>
                  {user.role === 'ADMIN' && (
                    <Link to="/admin" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                      <span className="dropdown-icon">⚙️</span>
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    <span className="dropdown-icon">🚪</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-btn">Sign Up</Link>
            </div>
          )}

          <Link to="/cart" className="nav-cart">
            <span className="cart-icon">🛒</span>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;