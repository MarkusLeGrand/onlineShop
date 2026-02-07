import type { Product } from './product';

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price_at_time: number;
  product: Product;
}

export interface Order {
  id: number;
  total: number;
  status: string;
  shipping_address: string;
  created_at: string;
  items: OrderItem[];
}
