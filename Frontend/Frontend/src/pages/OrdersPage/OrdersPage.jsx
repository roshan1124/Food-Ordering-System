import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getMyOrders } from '../../services/orderService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './OrdersPage.css';

const OrdersPage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, delivered, cancelled

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': '#ffa726',
      'CONFIRMED': '#29b6f6',
      'PREPARING': '#66bb6a',
      'OUT_FOR_DELIVERY': '#7e57c2',
      'DELIVERED': '#4caf50',
      'CANCELLED': '#ef5350'
    };
    return colors[status] || '#999';
  };

  const getStatusText = (status) => {
    return status?.replace(/_/g, ' ') || 'PENDING';
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') {
      return ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(order.status);
    }
    return order.status === filter.toUpperCase();
  });

  if (!isAuthenticated) {
    return (
      <div className="orders-container">
        <div className="no-orders">
          <div className="no-orders-icon">🔒</div>
          <h3>Please Login</h3>
          <p>You need to login to view your orders</p>
          <button className="browse-btn" onClick={() => window.location.href = '/login'}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner message="Loading your orders..." />;
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p className="order-count">{orders.length} {orders.length === 1 ? 'order' : 'orders'} found</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-icon">🍽️</div>
          <h3>No orders yet</h3>
          <p>Looks like you haven't placed any orders yet</p>
          <button className="browse-btn" onClick={() => window.location.href = '/'}>
            Browse Restaurants
          </button>
        </div>
      ) : (
        <>
          <div className="order-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Orders
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
              onClick={() => setFilter('delivered')}
            >
              Delivered
            </button>
            <button 
              className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilter('cancelled')}
            >
              Cancelled
            </button>
          </div>

          <div className="orders-list">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-restaurant-info">
                    <h3>{order.restaurantName}</h3>
                    <span className="order-id">Order #{order.id}</span>
                  </div>
                  <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                    {getStatusText(order.status)}
                  </div>
                </div>

                <div className="order-card-body">
                  <div className="order-items">
                    {order.items?.map((item, index) => (
                      <div key={index} className="order-item">
                        <span className="item-quantity">{item.quantity}x</span>
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-details">
                    <div className="detail-row">
                      <span className="detail-label">Order Date:</span>
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Delivery Address:</span>
                      <span>{order.deliveryAddress?.address}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Payment Method:</span>
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="order-card-footer">
                  <div className="order-total">
                    <span>Total Amount:</span>
                    <span className="total-price">₹{order.totalAmount}</span>
                  </div>
                  <div className="order-actions">
                    {order.status === 'DELIVERED' && (
                      <button className="action-btn reorder">Reorder</button>
                    )}
                    {order.status === 'PENDING' && (
                      <button className="action-btn cancel">Cancel Order</button>
                    )}
                    <button className="action-btn details">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;