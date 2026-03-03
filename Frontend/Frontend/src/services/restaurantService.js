import api from './api';

// Get all restaurants (with optional filters)
export const getRestaurants = async (filters = {}) => {
  try {
    console.log('Fetching restaurants with filters:', filters);
    
    const params = new URLSearchParams();
    if (filters.cuisine && filters.cuisine !== 'all') {
      params.append('cuisine', filters.cuisine);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    const queryString = params.toString();
    const url = `/restaurants${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

// Get single restaurant by ID
export const getRestaurantById = async (id) => {
  try {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    throw error;
  }
};

// Get restaurant menu
export const getRestaurantMenu = async (restaurantId) => {
  try {
    const response = await api.get(`/restaurants/${restaurantId}/menu`);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};

// Get restaurant reviews
export const getRestaurantReviews = async (restaurantId) => {
  try {
    const response = await api.get(`/restaurants/${restaurantId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// Add restaurant review
export const addRestaurantReview = async (restaurantId, reviewData) => {
  try {
    const response = await api.post(`/restaurants/${restaurantId}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// ADMIN ENDPOINTS

// Create new restaurant
export const createRestaurant = async (restaurantData) => {
  try {
    const response = await api.post('/admin/restaurants', restaurantData);
    return response.data;
  } catch (error) {
    console.error('Error creating restaurant:', error);
    throw error;
  }
};

// Update restaurant
export const updateRestaurant = async (id, restaurantData) => {
  try {
    const response = await api.put(`/admin/restaurants/${id}`, restaurantData);
    return response.data;
  } catch (error) {
    console.error('Error updating restaurant:', error);
    throw error;
  }
};

// Delete restaurant
export const deleteRestaurant = async (id) => {
  try {
    const response = await api.delete(`/admin/restaurants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw error;
  }
};

// Test API connection
export const testApiConnection = async () => {
  try {
    const response = await api.get('/restaurants');
    console.log('API Connection Test - Success:', response.data);
    return true;
  } catch (error) {
    console.error('API Connection Test - Failed:', error.message);
    return false;
  }
};