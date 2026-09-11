import { create } from 'zustand';
import { User } from '@/lib/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    set({
      user: null,
      isAuthenticated: false,
    });
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
}));
