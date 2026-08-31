import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Cart, CartItem, Customer, WishlistItem } from '@/types'

// ========================================
// CART STORE
// ========================================

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()((
  set,
  get,
) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id)
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        }
      }
      return { items: [...state.items, item] }
    }),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      ),
    })),
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    const state = get()
    return state.items.reduce(
      (total, item) => total + parseFloat(item.variant.price.amount) * item.quantity,
      0
    )
  },
  getItemCount: () => {
    const state = get()
    return state.items.reduce((count, item) => count + item.quantity, 0)
  },
}))

// ========================================
// WISHLIST STORE
// ========================================

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (itemId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistStore>()((
  set,
  get,
) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const exists = state.items.some((i) => i.product.id === item.product.id)
      if (!exists) {
        return { items: [...state.items, item] }
      }
      return state
    }),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    })),
  clearWishlist: () => set({ items: [] }),
  isInWishlist: (productId) => {
    const state = get()
    return state.items.some((i) => i.product.id === productId)
  },
}))

// ========================================
// USER STORE
// ========================================

interface UserStore {
  user: Customer | null
  isAuthenticated: boolean
  setUser: (user: Customer | null) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()((
  set,
) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}))

// ========================================
// UI STORE
// ========================================

interface UIStore {
  isDarkMode: boolean
  isMenuOpen: boolean
  isSearchOpen: boolean
  toggleDarkMode: () => void
  toggleMenu: () => void
  toggleSearch: () => void
  setDarkMode: (isDark: boolean) => void
}

export const useUIStore = create<UIStore>()((
  persist,
)((set) => ({
  isDarkMode: false,
  isMenuOpen: false,
  isSearchOpen: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
}), {
  name: 'ui-storage',
}))
