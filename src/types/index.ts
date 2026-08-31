// ========================================
// PRODUCT TYPES
// ========================================

export interface Product {
  id: string
  title: string
  description: string
  handle: string
  vendor: string
  productType: string
  price: MoneyV2
  compareAtPrice?: MoneyV2
  images: ProductImage[]
  variants: ProductVariant[]
  options: ProductOption[]
  collections: Collection[]
  ratings: number
  reviewCount: number
  tags: string[]
  createdAt: string
  updatedAt: string
  seo: SEO
}

export interface ProductImage {
  id: string
  url: string
  altText?: string
  width: number
  height: number
}

export interface ProductVariant {
  id: string
  title: string
  sku?: string
  barcode?: string
  price: MoneyV2
  compareAtPrice?: MoneyV2
  image?: ProductImage
  selectedOptions: SelectedOption[]
  available: boolean
  weight?: number
  weightUnit?: string
}

export interface SelectedOption {
  name: string
  value: string
}

export interface ProductOption {
  id: string
  name: string
  values: string[]
}

// ========================================
// COLLECTION TYPES
// ========================================

export interface Collection {
  id: string
  title: string
  handle: string
  description: string
  image?: CollectionImage
  products: Product[]
  productCount: number
  seo: SEO
}

export interface CollectionImage {
  url: string
  altText?: string
}

// ========================================
// CART & CHECKOUT TYPES
// ========================================

export interface CartItem {
  id: string
  product: Product
  variant: ProductVariant
  quantity: number
  merchandise: CartLineItem
}

export interface CartLineItem {
  id: string
  quantity: number
  cost: Cost
}

export interface Cart {
  id: string
  lines: CartLineItem[]
  cost: CartCost
  createdAt: string
  updatedAt: string
}

export interface Cost {
  totalAmount: MoneyV2
  subtotalAmount?: MoneyV2
  compareAtAmount?: MoneyV2
}

export interface CartCost {
  subtotalAmount: MoneyV2
  totalTaxAmount?: MoneyV2
  totalDutyAmount?: MoneyV2
  totalAmount: MoneyV2
}

export interface Checkout {
  id: string
  email?: string
  phone?: string
  shippingAddress?: MailingAddress
  billingAddress?: MailingAddress
  shippingLine?: ShippingRate
  paymentMethods: PaymentMethod[]
  totalPrice: MoneyV2
  subtotalPrice: MoneyV2
  totalTax: MoneyV2
}

export interface ShippingRate {
  id: string
  title: string
  price: MoneyV2
  handle: string
}

export interface MailingAddress {
  id: string
  address1: string
  address2?: string
  city: string
  province?: string
  country: string
  zip: string
  firstName?: string
  lastName?: string
  phone?: string
}

// ========================================
// PAYMENT TYPES
// ========================================

export type PaymentMethod = 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank_transfer' | 'crypto'

export interface PaymentIntent {
  id: string
  clientSecret: string
  amount: number
  currency: string
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded'
}

// ========================================
// ORDER TYPES
// ========================================

export interface Order {
  id: string
  orderNumber: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
  processedAt?: string
  financialStatus: FinancialStatus
  fulfillmentStatus: FulfillmentStatus
  lineItems: OrderLineItem[]
  shippingAddress: MailingAddress
  billingAddress?: MailingAddress
  shippingLine?: ShippingRate
  totalPrice: MoneyV2
  subtotalPrice: MoneyV2
  totalTax: MoneyV2
  note?: string
  cancelReason?: string
  cancelledAt?: string
  refunds: Refund[]
}

export type FinancialStatus = 'authorized' | 'pending' | 'paid' | 'partially_paid' | 'refunded' | 'partially_refunded' | 'voided'
export type FulfillmentStatus = 'fulfilled' | 'partial' | 'unfulfilled' | 'canceled'

export interface OrderLineItem {
  id: string
  variantId: string
  title: string
  quantity: number
  price: MoneyV2
  image?: ProductImage
}

export interface Refund {
  id: string
  createdAt: string
  note?: string
  user?: {
    email: string
  }
  refundLineItems: RefundLineItem[]
  transactions: Transaction[]
}

export interface RefundLineItem {
  id: string
  lineItemId: string
  quantity: number
  restockType: 'no_restock' | 'keep_stock' | 'cancel'
}

export interface Transaction {
  id: string
  type: 'charge' | 'refund' | 'partial_refund' | 'authorization'
  gateway: string
  status: 'success' | 'failure' | 'error' | 'pending'
  amount: MoneyV2
  processedAt: string
}

// ========================================
// CUSTOMER TYPES
// ========================================

export interface Customer {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  acceptsMarketing: boolean
  addresses: MailingAddress[]
  defaultAddress?: MailingAddress
  createdAt: string
  updatedAt: string
  numberOfOrders: number
  totalSpent: MoneyV2
  tags: string[]
  note?: string
}

export interface CustomerProfile extends Customer {
  orders: Order[]
  wishlist: WishlistItem[]
  reviews: Review[]
}

// ========================================
// WISHLIST & REVIEWS
// ========================================

export interface WishlistItem {
  id: string
  product: Product
  variant?: ProductVariant
  createdAt: string
}

export interface Review {
  id: string
  productId: string
  customerId: string
  rating: number // 1-5
  title: string
  body: string
  verified: boolean
  helpful: number
  createdAt: string
  updatedAt: string
  author?: {
    name: string
    email?: string
  }
}

// ========================================
// MONEY TYPES
// ========================================

export interface MoneyV2 {
  amount: string
  currencyCode: string
}

// ========================================
// SEO TYPES
// ========================================

export interface SEO {
  title?: string
  description?: string
  image?: ProductImage
}

// ========================================
// SEARCH & FILTER TYPES
// ========================================

export interface SearchFilters {
  query?: string
  collections?: string[]
  vendors?: string[]
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
  tags?: string[]
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'best_selling' | 'rating'
  limit?: number
  offset?: number
}

export interface SearchResult {
  products: Product[]
  collections: Collection[]
  pages: number
  total: number
}

// ========================================
// API RESPONSE TYPES
// ========================================

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  meta?: {
    timestamp: string
    version: string
  }
}

// ========================================
// AUTH TYPES
// ========================================

export interface AuthUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
  image?: string
  role: 'customer' | 'admin' | 'staff'
  createdAt: string
}

export interface AuthSession {
  user: AuthUser
  token: string
  expiresAt: string
}
