import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

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

  const handleTrackOrder = () => {
    navigate(`/orders/${order.id}/track`);
  };

  const handleViewDetails = () => {
    navigate(`/orders/${order.id}`);
  };

  const handleReorder = () => {
    // Reorder logic will be implemented
    console.log('Reorder:', order.id);
  };

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div>
          <h3 className="order-restaurant">{order.restaurantName}</h3>
          <p className="order-id">Order #{order.id}</p>
        </div>
        <div className="order-status">
          <span 
            className="status-dot"
            style={{ backgroundColor: getStatusColor(order.status) }}
          ></span>
          <span className="status-text">
            {getStatusText(order.status)}
          </span>
        </div>
      </div>

      <div className="order-card-body">
        <div className="order-items-preview">
          {order.items?.slice(0, 3).map((item, index) => (
            <span key={item.id} className="order-item-preview">
              {item.quantity}x {item.name}
              {index < Math.min(order.items.length, 3) - 1 && ', '}
            </span>
          ))}
          {order.items?.length > 3 && (
            <span className="more-items">+{order.items.length - 3} more</span>
          )}
        </div>

        <div className="order-details">
          <div className="order-detail">
            <span className="detail-label">Date:</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="order-detail">
            <span className="detail-label">Total:</span>
            <span className="order-amount">₹{order.totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="order-card-footer">
        <button 
          className="order-action-btn details"
          onClick={handleViewDetails}
        >
          View Details
        </button>
        {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
          <button 
            className="order-action-btn track"
            onClick={handleTrackOrder}
          >
            Track Order
          </button>
        )}
        {order.status === 'DELIVERED' && (
          <button 
            className="order-action-btn reorder"
            onClick={handleReorder}
          >
            Reorder
          </button>
        )}
        {order.status === 'CANCELLED' && (
          <button 
            className="order-action-btn reorder"
            onClick={handleReorder}
          >
            Order Again
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;