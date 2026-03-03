import api from './api';

// Get orders for the logged-in user
export const getMyOrders = async () => {
  try {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    console.log('📦 Fetching orders for userId:', userId);
    console.log('📦 Token present:', token ? 'Yes' : 'No');
    
    if (!userId) {
      console.error('❌ No user ID found in localStorage');
      throw new Error('No user ID found');
    }
    
    if (!token) {
      console.error('❌ No token found in localStorage');
      throw new Error('No authentication token found');
    }
    
    const response = await api.get(`/orders/user/${userId}`);
    console.log('📦 Orders response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching orders:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // If unauthorized, clear token and redirect
    if (error.response?.status === 401) {
      console.log('🚫 401 Unauthorized - clearing session');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('user');
      
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    throw error;
  }
};

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const userId = localStorage.getItem('userId');
    console.log('📦 Creating order for userId:', userId);
    console.log('📦 Order data:', orderData);
    
    if (!userId) {
      throw new Error('No user ID found');
    }
    
    const response = await api.post(`/orders/${userId}`, orderData);
    console.log('📦 Order created:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating order:', error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching order:', error);
    throw error;
  }
};

// Cancel order
export const cancelOrder = async (orderId) => {
  try {
    const response = await api.delete(`/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    console.error('❌ Error cancelling order:', error);
    throw error;
  }
};

// Reorder
export const reorder = async (orderId) => {
  try {
    const response = await api.post(`/orders/${orderId}/reorder`);
    return response.data;
  } catch (error) {
    console.error('❌ Error reordering:', error);
    throw error;
  }
};

// Track order
export const trackOrder = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}/track`);
    return response.data;
  } catch (error) {
    console.error('❌ Error tracking order:', error);
    throw error;
  }
};

// Admin endpoints
export const getAllOrders = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.restaurantId) params.append('restaurantId', filters.restaurantId);
    if (filters.fromDate) params.append('fromDate', filters.fromDate);
    if (filters.toDate) params.append('toDate', filters.toDate);
    
    const response = await api.get('/admin/orders', { params });
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching all orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.patch(`/admin/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('❌ Error updating order status:', error);
    throw error;
  }
};

export const getOrderStatistics = async () => {
  try {
    const response = await api.get('/admin/orders/statistics');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching order statistics:', error);
    throw error;
  }
};

export const assignDeliveryPartner = async (orderId, partnerId) => {
  try {
    const response = await api.post(`/admin/orders/${orderId}/assign-partner`, { partnerId });
    return response.data;
  } catch (error) {
    console.error('❌ Error assigning delivery partner:', error);
    throw error;
  }
};