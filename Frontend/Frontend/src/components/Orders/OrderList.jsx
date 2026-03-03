import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import { getMyOrders } from '../../services/orderService';
import './Orders.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') {
      return ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(order.status);
    }
    return order.status === filter.toUpperCase();
  });

  const filters = ['all', 'active', 'delivered', 'cancelled'];

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loader"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-error">
        <p>{error}</p>
        <button onClick={fetchOrders} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        
        <div className="order-filters">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-icon">📦</div>
          <h3>No orders found</h3>
          <p>You haven't placed any orders yet</p>
          <button 
            className="browse-btn"
            onClick={() => window.location.href = '/'}
          >
            Browse Restaurants
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;