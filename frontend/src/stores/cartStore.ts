import { create } from 'zustand';
import client from '../api/client';
import type { CartItem } from '../types/cart';

interface CartState {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const { data } = await client.get('/cart/');
      set({ items: data.items, total: data.total, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  addItem: async (productId, quantity) => {
    await client.post('/cart/items', { product_id: productId, quantity });
    const { data } = await client.get('/cart/');
    set({ items: data.items, total: data.total });
  },

  updateItem: async (itemId, quantity) => {
    await client.patch(`/cart/items/${itemId}`, { quantity });
    const { data } = await client.get('/cart/');
    set({ items: data.items, total: data.total });
  },

  removeItem: async (itemId) => {
    await client.delete(`/cart/items/${itemId}`);
    const { data } = await client.get('/cart/');
    set({ items: data.items, total: data.total });
  },

  clearCart: async () => {
    await client.delete('/cart/');
    set({ items: [], total: 0 });
  },
}));
