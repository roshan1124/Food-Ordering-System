import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RestaurantContext } from '../../context/RestaurantContext';
import FoodMenu from '../../components/Restaurant/FoodMenu';
import { CartContext } from '../../context/CartContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './RestaurantPage.css';

const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedRestaurant, loading, error, fetchRestaurantById } = useContext(RestaurantContext);
  const { addToCart } = useContext(CartContext);
  const [activeTab, setActiveTab] = useState('menu');
  const [showSuccess, setShowSuccess] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        setLocalError(null);
        await fetchRestaurantById(id);
      } catch (err) {
        setLocalError('Failed to load restaurant. Please try again.');
      }
    };
    loadRestaurant();
  }, [id, fetchRestaurantById]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleAddToCart = (item) => {
    if (!selectedRestaurant) {
      setLocalError('Restaurant information not available');
      return;
    }
    
    try {
      const restaurantInfo = {
        id: selectedRestaurant.id,
        name: selectedRestaurant.name
      };
      const added = addToCart(item, 1, restaurantInfo);
      if (added) {
        setShowSuccess(true);
      }
    } catch (err) {
      setLocalError('Failed to add item to cart');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading restaurant details..." />;
  }

  if (error || localError || !selectedRestaurant) {
    return (
      <div className="restaurant-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error || localError || 'Restaurant not found'}</p>
        <div className="error-actions">
          <button onClick={() => navigate('/')} className="home-btn">
            Go to Home
          </button>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

// Safe access with default values
const restaurant = selectedRestaurant || {};
const {
  name = 'Restaurant',
  coverImage,
  imageUrl,  // Add this line
  cuisines = [],
  rating,
  reviewCount,
  address = 'Location not available',
  deliveryTime,
  costForTwo,
  offers = [],
  reviews = [],
  city,
  pinCode,
  phone,
  email,
  openingHours,
  menu = [],
  foodItems = []  // Get food items from backend
} = restaurant;

  // Use foodItems if available, otherwise fall back to menu
  const displayMenu = foodItems.length > 0 ? foodItems : menu;

  return (
    <div className="restaurant-page">
      {showSuccess && (
        <div className="success-toast">
          ✅ Item added to cart successfully!
        </div>
      )}

      {/* Restaurant Cover Image */}
   {/* Restaurant Cover Image */}
<div className="restaurant-cover">
  <img 
    src={coverImage || imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200'} 
    alt={name}
    onError={(e) => {
      // If image fails to load, try a restaurant-specific fallback based on cuisine
      const cuisineType = cuisines[0] || '';
      if (cuisineType.toLowerCase().includes('pizza') || cuisineType.toLowerCase().includes('italian')) {
        e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200';
      } else if (cuisineType.toLowerCase().includes('dessert')) {
        e.target.src = 'https://images.unsplash.com/photo-1464305795451-9ee5e2b9a2b0?w=1200';
      } else if (cuisineType.toLowerCase().includes('south')) {
        e.target.src = 'https://images.unsplash.com/photo-1589301762554-b1bd9e6361d3?w=1200';
      } else {
        e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200';
      }
    }}
  />
</div>

      {/* Restaurant Info */}
      <div className="restaurant-info-container">
        <div className="restaurant-info">
          <div className="restaurant-header">
            <div>
              <h1 className="restaurant-name">{name}</h1>
              <p className="restaurant-cuisine">
                {cuisines.length > 0 ? cuisines.join(' • ') : 'Various Cuisines'}
              </p>
            </div>
            {rating && (
              <div className="restaurant-rating-card">
                <div className="rating-box">
                  <span className="rating">{rating}</span>
                  <span className="rating-star">★</span>
                </div>
                {reviewCount > 0 && (
                  <span className="rating-count">{reviewCount}+ ratings</span>
                )}
              </div>
            )}
          </div>

          <div className="restaurant-details">
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span>{address}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🕐</span>
              <span>{deliveryTime || '30-40'} mins</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">💰</span>
              <span>₹{costForTwo || '300'} for two</span>
            </div>
          </div>

          {/* Offers */}
          {offers.length > 0 && (
            <div className="restaurant-offers">
              <h3>Offers</h3>
              <div className="offers-list">
                {offers.map((offer, index) => (
                  <div key={index} className="offer-item">
                    <span className="offer-icon">🎉</span>
                    <span className="offer-text">{offer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="restaurant-tabs">
        <button 
          className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
        <button 
          className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Info
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'menu' && (
          <FoodMenu 
            menu={displayMenu} 
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <h3>Customer Reviews</h3>
            {reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <img 
                        src={review.userAvatar || 'https://via.placeholder.com/40'} 
                        alt={review.userName || 'User'}
                        className="reviewer-avatar"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40';
                        }}
                      />
                      <div>
                        <h4>{review.userName || 'Anonymous'}</h4>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < (review.rating || 0) ? 'star filled' : 'star'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      {review.createdAt && (
                        <span className="review-date">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <p className="review-text">{review.comment || 'No comment provided'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-reviews">No reviews yet</p>
            )}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="info-section">
            <div className="info-card">
              <h4>Address</h4>
              <p>{address}</p>
              {city && <p>{city}</p>}
              {pinCode && <p>Pincode: {pinCode}</p>}
            </div>
            <div className="info-card">
              <h4>Opening Hours</h4>
              <p>{openingHours || 'Monday - Friday: 11:00 AM - 11:00 PM'}</p>
              <p>Saturday - Sunday: 10:00 AM - 12:00 AM</p>
            </div>
            <div className="info-card">
              <h4>Contact</h4>
              <p>{phone || 'Phone not available'}</p>
              <p>{email || 'Email not available'}</p>
            </div>
            <div className="info-card">
              <h4>Facilities</h4>
              <div className="facilities-list">
                <span className="facility">✓ Home Delivery</span>
                <span className="facility">✓ Takeaway</span>
                <span className="facility">✓ Dine-in</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;