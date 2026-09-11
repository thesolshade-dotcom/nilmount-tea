import { create } from 'zustand';
import { Wishlist } from '@/lib/types';

interface WishlistState {
  items: Wishlist[];
  addItem: (item: Wishlist) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('wishlist') || '[]') : [],
  
  addItem: (item) =>
    set((state) => {
      const exists = state.items.some((i) => i.product_id === item.product_id);
      const newItems = exists ? state.items : [...state.items, item];
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(newItems));
      }
      
      return { items: newItems };
    }),
  
  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.product_id !== productId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(newItems));
      }
      return { items: newItems };
    }),
  
  isInWishlist: (productId) => {
    return get().items.some((i) => i.product_id === productId);
  },
  
  clearWishlist: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wishlist');
    }
    set({ items: [] });
  },
}));
