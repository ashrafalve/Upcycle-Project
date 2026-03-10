import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthTokens } from '@/services/api/types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, tokens: AuthTokens) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      setAuth: (user, tokens) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', tokens.access);
          localStorage.setItem('refresh_token', tokens.refresh);
        }
        set({ user, tokens, isAuthenticated: true, isLoading: false });
      },
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
        set({ user: null, tokens: null, isAuthenticated: false });
      },
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, tokens: state.tokens }),
    }
  )
);
