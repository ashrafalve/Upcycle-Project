import { apiClient } from './client';
import { 
  Product, 
  Category, 
  ApiResponse, 
  PaginatedResponse 
} from './types';

export interface ProductFilters {
  category?: string;
  condition?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
  page?: number;
  page_size?: number;
}

export interface CreateProductData {
  title: string;
  description: string;
  images: string[];
  price: number;
  category: string;
  condition: string;
}

export const productApi = {
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    return apiClient.get<PaginatedResponse<Product>>('/products/', { params: filters });
  },

  async getProduct(id: number): Promise<Product> {
    return apiClient.get<Product>(`/products/${id}/`);
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    return apiClient.post<Product>('/products/', data);
  },

  async updateProduct(id: number, data: Partial<CreateProductData>): Promise<Product> {
    return apiClient.patch<Product>(`/products/${id}/`, data);
  },

  async deleteProduct(id: number): Promise<void> {
    return apiClient.delete(`/products/${id}/`);
  },

  async getCategories(): Promise<Category[]> {
    return apiClient.get<Category[]>('/categories/');
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products/featured/');
    return response.data;
  },
};
