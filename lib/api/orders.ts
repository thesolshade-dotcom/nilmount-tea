import apiClient from './client';
import { Order } from '@/lib/types';

export const orderAPI = {
  createOrder: async (orderData: {
    items: any[];
    shippingAddress: any;
    couponCode?: string;
  }) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  getOrders: async (page = 1, limit = 10) => {
    const response = await apiClient.get('/orders', {
      params: { page, limit },
    });
    return response.data;
  },

  getOrderById: async (orderId: string): Promise<Order> => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  },

  cancelOrder: async (orderId: string) => {
    const response = await apiClient.post(`/orders/${orderId}/cancel`);
    return response.data;
  },

  returnOrder: async (orderId: string, reason: string) => {
    const response = await apiClient.post(`/orders/${orderId}/return`, { reason });
    return response.data;
  },

  trackOrder: async (orderId: string) => {
    const response = await apiClient.get(`/orders/${orderId}/track`);
    return response.data;
  },
};
