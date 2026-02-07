import { create } from 'zustand';
import client from '../api/client';
import type { User } from '../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('access_token'),
  isLoading: false,

  login: async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    const { data } = await client.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    localStorage.setItem('access_token', data.access_token);
    set({ token: data.access_token });
    const me = await client.get('/auth/me');
    set({ user: me.data });
  },

  register: async (email, password, fullName) => {
    await client.post('/auth/register', {
      email,
      password,
      full_name: fullName,
    });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    set({ user: null, token: null });
  },

  fetchMe: async () => {
    set({ isLoading: true });
    try {
      const { data } = await client.get('/auth/me');
      set({ user: data, isLoading: false });
    } catch {
      set({ user: null, token: null, isLoading: false });
      localStorage.removeItem('access_token');
    }
  },
}));
