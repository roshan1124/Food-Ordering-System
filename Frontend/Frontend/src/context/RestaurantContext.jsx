import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getRestaurants, getRestaurantById, testApiConnection } from '../services/restaurantService';

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiConnected, setApiConnected] = useState(true);
  const [filters, setFilters] = useState({
    cuisine: 'all',
    search: ''
  });

  // Test API connection on mount
  useEffect(() => {
    const testConnection = async () => {
      const isConnected = await testApiConnection();
      setApiConnected(isConnected);
      if (isConnected) {
        fetchRestaurants();
      }
    };
    testConnection();
  }, []);

  // Fetch all restaurants
  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching restaurants with filters:', filters);
      const data = await getRestaurants(filters);
      console.log('Fetched restaurants:', data);
      
      // Handle different response formats
      const restaurantsData = Array.isArray(data) ? data : data?.data || [];
      setRestaurants(restaurantsData);
      
      if (restaurantsData.length === 0) {
        console.log('No restaurants found');
      }
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
      setError(err.response?.data?.message || 'Failed to load restaurants. Please check if backend is running.');
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch single restaurant by ID
  const fetchRestaurantById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching restaurant by ID:', id);
      const data = await getRestaurantById(id);
      console.log('Fetched restaurant:', data);
      setSelectedRestaurant(data);
    } catch (err) {
      console.error('Failed to fetch restaurant details:', err);
      setError('Failed to fetch restaurant details');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      cuisine: 'all',
      search: ''
    });
  };

  const value = {
    restaurants,
    selectedRestaurant,
    loading,
    error,
    apiConnected,
    filters,
    fetchRestaurants,
    fetchRestaurantById,
    updateFilters,
    clearFilters,
    setSelectedRestaurant
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};