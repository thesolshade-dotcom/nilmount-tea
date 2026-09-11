import apiClient from './client';
import { Product, ProductSize } from '@/lib/types';

export const productAPI = {
  getAllProducts: async (page = 1, limit = 12, category?: string) => {
    const response = await apiClient.get('/products', {
      params: { page, limit, category },
    });
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category: string, page = 1, limit = 12) => {
    const response = await apiClient.get('/products', {
      params: { category, page, limit },
    });
    return response.data;
  },

  searchProducts: async (query: string, page = 1, limit = 12) => {
    const response = await apiClient.get('/products/search', {
      params: { q: query, page, limit },
    });
    return response.data;
  },

  getProductSizes: async (productId: string): Promise<ProductSize[]> => {
    const response = await apiClient.get(`/products/${productId}/sizes`);
    return response.data;
  },
};
