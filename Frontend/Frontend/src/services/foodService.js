import api from './api';

export const getFoodItems = async (restaurantId) => {
  try {
    const response = await api.get(`/restaurants/${restaurantId}/foods`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFoodById = async (foodId) => {
  try {
    const response = await api.get(`/foods/${foodId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFoodByCategory = async (restaurantId, category) => {
  try {
    const response = await api.get(`/restaurants/${restaurantId}/foods/category/${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchFoods = async (query, restaurantId = null) => {
  try {
    const params = new URLSearchParams();
    params.append('q', query);
    if (restaurantId) params.append('restaurantId', restaurantId);
    
    const response = await api.get('/foods/search', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPopularFoods = async () => {
  try {
    const response = await api.get('/foods/popular');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Admin endpoints
export const createFoodItem = async (foodData) => {
  try {
    const response = await api.post('/admin/foods', foodData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFoodItem = async (id, foodData) => {
  try {
    const response = await api.put(`/admin/foods/${id}`, foodData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFoodItem = async (id) => {
  try {
    const response = await api.delete(`/admin/foods/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFoodAvailability = async (id, isAvailable) => {
  try {
    const response = await api.patch(`/admin/foods/${id}/availability`, { isAvailable });
    return response.data;
  } catch (error) {
    throw error;
  }
};