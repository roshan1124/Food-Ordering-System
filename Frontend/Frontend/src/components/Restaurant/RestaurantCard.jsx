import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  // Handle different possible field names from backend
  const restaurantName = restaurant.name || restaurant.restaurantName;
  const cuisineType = restaurant.cuisine || restaurant.cuisines;
  const restaurantRating = restaurant.rating || restaurant.averageRating;
  const deliveryTime = restaurant.deliveryTime || '30-40';
  const priceForTwo = restaurant.priceForTwo || restaurant.costForTwo || '300';

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <div className="card-image">
        <img 
          src={restaurant.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300'} 
          alt={restaurantName}
        />
        {restaurantRating >= 4.0 && (
          <div className="offer-badge">
            Featured
          </div>
        )}
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h3 className="restaurant-name">{restaurantName}</h3>
          {restaurantRating && (
            <div className="rating-box">
              <span className="rating">{restaurantRating}</span>
              <span className="star">★</span>
            </div>
          )}
        </div>
        
        <p className="restaurant-cuisine">
          {cuisineType || 'Various Cuisines'}
        </p>
        
        <p className="restaurant-address">
          {restaurant.address || 'Location available'}
        </p>
        
        <div className="restaurant-details">
          <div className="detail">
            <span className="icon">🕐</span>
            <span>{deliveryTime} mins</span>
          </div>
          <div className="detail">
            <span className="icon">💰</span>
            <span>₹{priceForTwo} for two</span>
          </div>
        </div>

        {restaurant.description && (
          <div className="restaurant-description">
            {restaurant.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;