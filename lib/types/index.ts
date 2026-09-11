export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  taste_profile: {
    strength: 'Mild' | 'Medium' | 'Strong';
    aroma: string;
    flavor: string;
    color: string;
  };
  brewing_guide: {
    tea_grams: string;
    water_ml: string;
    temperature: string;
    time_minutes: string;
  };
  sizes: ProductSize[];
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProductSize {
  id: string;
  product_id: string;
  size: '100g' | '250g' | '500g' | '1kg';
  price: number;
  mrp: number;
  stock: number;
}

export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  size: ProductSize;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  items: OrderItem[];
  shipping_address: ShippingAddress;
  subtotal: number;
  discount: number;
  shipping: number;
  gst: number;
  total: number;
  status: OrderStatus;
  payment_method: 'razorpay' | 'cod';
  payment_status: 'pending' | 'completed' | 'failed';
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  tracking_number?: string;
  estimated_delivery?: string;
}

export type OrderStatus = 'New' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Payment Failed' | 'Refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  size: string;
  price: number;
  quantity: number;
  total: number;
}

export interface ShippingAddress {
  name: string;
  mobile: string;
  email: string;
  house_flat: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  default_address?: ShippingAddress;
  created_at: string;
  updated_at: string;
  is_admin: boolean;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  minimum_order: number;
  max_uses: number;
  used_count: number;
  expiry_date: string;
  active: boolean;
  created_at: string;
}

export interface Wishlist {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}
