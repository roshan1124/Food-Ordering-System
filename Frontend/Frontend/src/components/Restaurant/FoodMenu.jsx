import React, { useState } from 'react';
import FoodItem from './FoodItem';
import './FoodMenu.css';

const FoodMenu = ({ menu = [], onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories from menu items
  const categories = ['all', ...new Set(menu.map(item => item.category).filter(Boolean))];

  // Filter items based on category and search
  const filteredItems = menu.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group items by category
  const groupedItems = filteredItems.reduce((groups, item) => {
    const category = item.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  if (!menu || menu.length === 0) {
    return (
      <div className="food-menu-empty">
        <p>No menu items available for this restaurant</p>
      </div>
    );
  }

  return (
    <div className="food-menu">
      {/* Search Bar */}
      <div className="menu-search">
        <input
          type="text"
          placeholder="Search in menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="menu-search-input"
        />
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="menu-items">
        {selectedCategory === 'all' ? (
          // Show all categories
          Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="menu-category">
              <h3 className="category-title">{category}</h3>
              <div className="category-items">
                {items.map(item => (
                  <FoodItem
                    key={item.id}
                    item={item}
                    onAddToCart={() => onAddToCart(item)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          // Show selected category
          <div className="category-items">
            {filteredItems.map(item => (
              <FoodItem
                key={item.id}
                item={item}
                onAddToCart={() => onAddToCart(item)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMenu;