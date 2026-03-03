export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PREPARING: 'PREPARING',
  READY: 'READY',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: '#ffa726',
  [ORDER_STATUS.CONFIRMED]: '#29b6f6',
  [ORDER_STATUS.PREPARING]: '#66bb6a',
  [ORDER_STATUS.READY]: '#42a5f5',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: '#7e57c2',
  [ORDER_STATUS.DELIVERED]: '#4caf50',
  [ORDER_STATUS.CANCELLED]: '#ef5350'
};

export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  RESTAURANT_OWNER: 'RESTAURANT_OWNER',
  DELIVERY_PARTNER: 'DELIVERY_PARTNER'
};

export const PAYMENT_METHODS = {
  CASH: 'CASH',
  CARD: 'CARD',
  UPI: 'UPI',
  WALLET: 'WALLET'
};

export const CUISINE_TYPES = [
  'North Indian',
  'South Indian',
  'Chinese',
  'Italian',
  'Continental',
  'Fast Food',
  'Beverages',
  'Desserts'
];

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' }
];

export const PRICE_RANGES = [
  { value: '0-300', label: 'Under ₹300' },
  { value: '300-600', label: '₹300 - ₹600' },
  { value: '600-1000', label: '₹600 - ₹1000' },
  { value: '1000+', label: 'Above ₹1000' }
];

export const DELIVERY_TIME = 30; // minutes

export const MIN_ORDER_VALUE = 100; // ₹100