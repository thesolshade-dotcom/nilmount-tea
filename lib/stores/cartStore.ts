import { create } from 'zustand';
import { CartItem, ProductSize } from '@/lib/types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [],
  
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.product_id === item.product_id && i.size.id === item.size.id
      );
      
      const newItems = existingItem
        ? state.items.map((i) =>
            i.id === existingItem.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...state.items, item];
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newItems));
      }
      
      return { items: newItems };
    }),
  
  removeItem: (cartItemId) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== cartItemId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newItems));
      }
      return { items: newItems };
    }),
  
  updateQuantity: (cartItemId, quantity) =>
    set((state) => {
      const newItems = state.items.map((i) =>
        i.id === cartItemId ? { ...i, quantity: Math.max(1, quantity) } : i
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newItems));
      }
      return { items: newItems };
    }),
  
  clearCart: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    set({ items: [] });
  },
  
  getTotal: () => {
    return get().items.reduce((total, item) => total + item.size.price * item.quantity, 0);
  },
  
  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));
