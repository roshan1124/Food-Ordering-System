import React, { useEffect, useState, useContext } from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';
import RestaurantCard from '../../components/Restaurant/RestaurantCard';
import './Home.css';

const Home = () => {
  const { restaurants, loading, error, fetchRestaurants } = useContext(RestaurantContext);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const cuisines = ['all', 'North Indian', 'South Indian', 'Chinese', 'Italian', 'Fast Food'];

  const filteredRestaurants = restaurants?.filter(restaurant => {
    const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine?.includes(selectedCuisine);
    const matchesSearch = restaurant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine?.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCuisine && matchesSearch;
  });

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Craving <span className="highlight">Delicious Food?</span>
          </h1>
          <p className="hero-subtitle">
            Discover the best restaurants in your city and get food delivered to your doorstep
          </p>
          
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              Search
            </button>
          </div>

          <div className="location-tag">
            <span className="location-icon">📍</span>
            <span>Deliver to: </span>
            <select className="location-select">
              <option>Current Location</option>
              <option>Home</option>
              <option>Office</option>
            </select>
          </div>
        </div>
      </section>

      {/* Cuisine Filter */}
      <section className="cuisine-section">
        <h2 className="section-title">Popular Cuisines</h2>
        <div className="cuisine-filters">
          {cuisines.map(cuisine => (
            <button
              key={cuisine}
              className={`cuisine-btn ${selectedCuisine === cuisine ? 'active' : ''}`}
              onClick={() => setSelectedCuisine(cuisine)}
            >
              {cuisine === 'all' ? 'All' : cuisine}
            </button>
          ))}
        </div>
      </section>

      {/* Restaurant List */}
      <section className="restaurant-section">
        <div className="section-header">
          <h2 className="section-title">
            {searchTerm || selectedCuisine !== 'all' 
              ? 'Search Results' 
              : 'Popular Restaurants Near You'}
          </h2>
          {filteredRestaurants?.length > 0 && (
            <span className="result-count">{filteredRestaurants.length} restaurants</span>
          )}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading restaurants...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>Failed to load restaurants. Please try again.</p>
            <button onClick={fetchRestaurants} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredRestaurants?.length === 0 && (
          <div className="empty-state">
            <img 
              src="https://via.placeholder.com/200" 
              alt="No restaurants found"
              className="empty-image"
            />
            <h3>No restaurants found</h3>
            <p>Try changing your search or filters</p>
          </div>
        )}

        <div className="restaurant-grid">
          {filteredRestaurants?.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fast Delivery</h3>
            <p>Quick delivery at your doorstep in 30-40 minutes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍽️</div>
            <h3>Wide Variety</h3>
            <p>Choose from 1000+ restaurants and cuisines</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Great deals and offers on your favorite food</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Quality Food</h3>
            <p>Hygienic and high-quality food preparation</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;