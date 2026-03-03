import React, { useState } from 'react';
import './FoodItem.css';

const FoodItem = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({ ...item, quantity });
    setShowModal(false);
    setQuantity(1);
  };

  const isVegetarian = item.isVegetarian === true;
  const isAvailable = item.isAvailable !== false;
  const isPopular = item.isPopular || item.isBestseller;

  return (
    <>
      <div className={`food-item ${!isAvailable ? 'unavailable' : ''}`}>
        <div className="food-item-content">
          <div className="food-item-header">
            <div className="food-type">
              <span className={`food-icon ${isVegetarian ? 'veg' : 'non-veg'}`}>
                {isVegetarian ? '🟢' : '🔴'}
              </span>
              {isPopular && (
                <span className="popular-badge">Popular</span>
              )}
            </div>
            <h3 className="food-name">{item.name}</h3>
          </div>

          {item.description && (
            <p className="food-description">{item.description}</p>
          )}

          <div className="food-item-footer">
            <span className="food-price">₹{item.price}</span>
            
            {!isAvailable ? (
              <span className="unavailable-text">Not available</span>
            ) : (
              <button 
                className="add-btn"
                onClick={() => setShowModal(true)}
              >
                ADD
              </button>
            )}
          </div>
        </div>

        {item.imageUrl && (
          <div className="food-item-image">
            <img src={item.imageUrl} alt={item.name} />
          </div>
        )}
      </div>

      {/* Quantity Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{item.name}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <div className="modal-body">
              {item.description && (
                <p className="modal-description">{item.description}</p>
              )}
              
              <div className="modal-price">₹{item.price}</div>

              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="total-price">
                Total: ₹{item.price * quantity}
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart • ₹{item.price * quantity}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodItem;