import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  getAllOrders, 
  updateOrderStatus,
  getOrderStatistics 
} from '../../services/orderService';
import {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '../../services/restaurantService';
import {
  getFoodItems,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem
} from '../../services/foodService';
import './Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useContext(AuthContext);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({});

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadStatistics();
    } else if (activeTab === 'orders') {
      loadOrders();
    } else if (activeTab === 'restaurants') {
      loadRestaurants();
    } else if (activeTab === 'foods') {
      loadFoodItems();
    }
  }, [activeTab]);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      const data = await getOrderStatistics();
      setStatistics(data);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRestaurants = async () => {
    setLoading(true);
    try {
      const data = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFoodItems = async (restaurantId = null) => {
    setLoading(true);
    try {
      if (restaurantId) {
        const data = await getFoodItems(restaurantId);
        setFoodItems(data);
      }
    } catch (error) {
      console.error('Failed to load food items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadOrders(); // Refresh orders
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'add') {
        await createRestaurant(formData);
      } else {
        await updateRestaurant(formData.id, formData);
      }
      setShowModal(false);
      loadRestaurants();
    } catch (error) {
      console.error('Failed to save restaurant:', error);
    }
  };

  const handleFoodItemSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'add') {
        await createFoodItem({ ...formData, restaurantId: selectedRestaurant });
      } else {
        await updateFoodItem(formData.id, formData);
      }
      setShowModal(false);
      loadFoodItems(selectedRestaurant);
    } catch (error) {
      console.error('Failed to save food item:', error);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }

    try {
      if (type === 'restaurant') {
        await deleteRestaurant(id);
        loadRestaurants();
      } else if (type === 'food') {
        await deleteFoodItem(id);
        loadFoodItems(selectedRestaurant);
      }
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
    }
  };

  const openModal = (type, data = null) => {
    setModalType(type);
    setFormData(data || {});
    setShowModal(true);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-profile">
          <div className="admin-avatar">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="admin-info">
            <h3>{user?.name || 'Admin'}</h3>
            <p>{user?.email}</p>
          </div>
        </div>

        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Orders
          </button>
          <button
            className={`nav-item ${activeTab === 'restaurants' ? 'active' : ''}`}
            onClick={() => setActiveTab('restaurants')}
          >
            🏪 Restaurants
          </button>
          <button
            className={`nav-item ${activeTab === 'foods' ? 'active' : ''}`}
            onClick={() => setActiveTab('foods')}
          >
            🍽️ Food Items
          </button>
          <button
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <h1>Dashboard</h1>
            
            {loading ? (
              <div className="loader">Loading...</div>
            ) : (
              <>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                      <h3>Total Revenue</h3>
                      <p>₹{statistics?.totalRevenue || 0}</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-info">
                      <h3>Total Orders</h3>
                      <p>{statistics?.totalOrders || 0}</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                      <h3>Total Users</h3>
                      <p>{statistics?.totalUsers || 0}</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🏪</div>
                    <div className="stat-info">
                      <h3>Restaurants</h3>
                      <p>{statistics?.totalRestaurants || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="recent-orders">
                  <h2>Recent Orders</h2>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.customerName}</td>
                          <td>₹{order.totalAmount}</td>
                          <td>
                            <span className={`status-badge status-${order.status?.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-content">
            <h1>Manage Orders</h1>
            
            {loading ? (
              <div className="loader">Loading...</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Restaurant</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.restaurantName}</td>
                      <td>₹{order.totalAmount}</td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value)}
                          className={`status-select status-${order.status?.toLowerCase()}`}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="PREPARING">Preparing</option>
                          <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                      <td>{order.paymentMethod}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="action-btn view"
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'restaurants' && (
          <div className="restaurants-content">
            <div className="content-header">
              <h1>Manage Restaurants</h1>
              <button 
                className="add-btn"
                onClick={() => openModal('add-restaurant')}
              >
                + Add Restaurant
              </button>
            </div>

            {loading ? (
              <div className="loader">Loading...</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Cuisine</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map(restaurant => (
                    <tr key={restaurant.id}>
                      <td>#{restaurant.id}</td>
                      <td>{restaurant.name}</td>
                      <td>{restaurant.cuisines?.join(', ')}</td>
                      <td>{restaurant.rating || 'New'}</td>
                      <td>
                        <span className={`status-badge ${restaurant.isActive ? 'active' : 'inactive'}`}>
                          {restaurant.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="action-btn edit"
                          onClick={() => openModal('edit-restaurant', restaurant)}
                        >
                          Edit
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => handleDelete('restaurant', restaurant.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {modalType === 'add-restaurant' && 'Add New Restaurant'}
                {modalType === 'edit-restaurant' && 'Edit Restaurant'}
                {modalType === 'add-food' && 'Add Food Item'}
                {modalType === 'edit-food' && 'Edit Food Item'}
              </h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form 
              onSubmit={modalType.includes('restaurant') ? handleRestaurantSubmit : handleFoodItemSubmit}
              className="modal-form"
            >
              {modalType.includes('restaurant') ? (
                <>
                  <div className="form-group">
                    <label>Restaurant Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Cuisines (comma separated)</label>
                    <input
                      type="text"
                      value={formData.cuisines?.join(', ') || ''}
                      onChange={(e) => setFormData({
                        ...formData, 
                        cuisines: e.target.value.split(',').map(c => c.trim())
                      })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      value={formData.address || ''}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Cost for Two (₹)</label>
                    <input
                      type="number"
                      value={formData.costForTwo || ''}
                      onChange={(e) => setFormData({...formData, costForTwo: e.target.value})}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Food Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Vegetarian?</label>
                    <select
                      value={formData.isVegetarian || false}
                      onChange={(e) => setFormData({...formData, isVegetarian: e.target.value === 'true'})}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </>
              )}

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;