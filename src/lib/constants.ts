// ========================================
// COLOR PALETTE CONSTANTS
// ========================================

export const LUXURY_COLORS = {
  obsidian: '#060709',      // Primary dark background
  chrome: '#E5E9F0',        // Light neutral text
  aurum: '#C5A059',         // Gold accent
  haze: '#8A92A6',          // Platinum gray
} as const

// ========================================
// BREAKPOINTS
// ========================================

export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// ========================================
// ANIMATION DURATIONS (ms)
// ========================================

export const ANIMATION_DURATION = {
  fast: 150,
  base: 300,
  moderate: 400,
  slow: 500,
  leisurely: 600,
  very_slow: 800,
} as const

// ========================================
// Z-INDEX SCALE
// ========================================

export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal_backdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const

// ========================================
// PAGINATION
// ========================================

export const PAGINATION = {
  DEFAULT_LIMIT: 12,
  DEFAULT_PAGE: 1,
  MAX_LIMIT: 100,
} as const

// ========================================
// CURRENCY
// ========================================

export const SUPPORTED_CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'JPY',
  'CHF',
  'CNY',
  'INR',
  'AED',
  'SGD',
  'HKD',
] as const

// ========================================
// LANGUAGES
// ========================================

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'sv', name: 'Svenska' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'vi', name: 'Tiếng Việt' },
] as const

// ========================================
// PAYMENT METHODS
// ========================================

export const PAYMENT_METHODS = [
  'credit_card',
  'paypal',
  'apple_pay',
  'google_pay',
  'bank_transfer',
  'crypto',
] as const

// ========================================
// PRODUCT LIMITS
// ========================================

export const PRODUCT_LIMITS = {
  MIN_PRICE: 0,
  MAX_PRICE: 1000000,
  MIN_RATING: 0,
  MAX_RATING: 5,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 999,
} as const

// ========================================
// CACHE DURATIONS (seconds)
// ========================================

export const CACHE_DURATION = {
  SHORT: 60,
  MEDIUM: 300,
  LONG: 3600,
  VERY_LONG: 86400,
} as const

// ========================================
// API ENDPOINTS
// ========================================

export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/api/products',
  PRODUCT: (id: string) => `/api/products/${id}`,
  PRODUCT_SEARCH: '/api/products/search',
  PRODUCT_RECOMMENDATIONS: (id: string) => `/api/products/${id}/recommendations`,

  // Collections
  COLLECTIONS: '/api/collections',
  COLLECTION: (handle: string) => `/api/collections/${handle}`,

  // Cart
  CART: '/api/cart',
  CART_ITEMS: '/api/cart/items',
  CART_ITEM: (id: string) => `/api/cart/items/${id}`,

  // Orders
  ORDERS: '/api/orders',
  ORDER: (id: string) => `/api/orders/${id}`,
  ORDER_TRACKING: (id: string) => `/api/orders/${id}/tracking`,

  // Customers
  CUSTOMER: '/api/customer',
  CUSTOMER_ORDERS: '/api/customer/orders',
  CUSTOMER_WISHLIST: '/api/customer/wishlist',

  // Reviews
  REVIEWS: '/api/reviews',
  PRODUCT_REVIEWS: (id: string) => `/api/products/${id}/reviews`,

  // Checkout
  CHECKOUT: '/api/checkout',
  PAYMENT_INTENT: '/api/checkout/payment-intent',

  // Auth
  AUTH_LOGIN: '/api/auth/login',
  AUTH_SIGNUP: '/api/auth/signup',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_SESSION: '/api/auth/session',
} as const

// ========================================
// ERROR MESSAGES
// ========================================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Unauthorized. Please sign in.',
  FORBIDDEN: 'Forbidden. You do not have permission.',
  NOT_FOUND: 'Resource not found.',
  INVALID_INPUT: 'Invalid input. Please check your data.',
  CHECKOUT_ERROR: 'Checkout failed. Please try again.',
  PAYMENT_ERROR: 'Payment failed. Please try again.',
} as const

// ========================================
// SUCCESS MESSAGES
// ========================================

export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: 'Added to cart',
  REMOVED_FROM_CART: 'Removed from cart',
  CART_UPDATED: 'Cart updated',
  ORDER_PLACED: 'Order placed successfully',
  PROFILE_UPDATED: 'Profile updated',
  WISHLIST_UPDATED: 'Wishlist updated',
  REVIEW_SUBMITTED: 'Review submitted',
} as const
