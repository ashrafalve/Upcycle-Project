import { apiClient } from './client';
import { User, ApiResponse } from './types';

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
}

export interface UserFilters {
  role?: 'buyer' | 'seller' | 'designer' | 'admin';
  is_active?: boolean;
  search?: string;
}

export const userApi = {
  async getUsers(filters?: UserFilters): Promise<User[]> {
    const response = await apiClient.get<ApiResponse<User[]>>('/users/', { params: filters });
    return response.data;
  },

  async getUser(id: number): Promise<User> {
    return apiClient.get<User>(`/users/${id}/`);
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/users/me/');
  },

  async updateCurrentUser(data: UpdateUserData): Promise<User> {
    return apiClient.patch<User>('/users/me/', data);
  },

  async updateUser(id: number, data: UpdateUserData): Promise<User> {
    return apiClient.patch<User>(`/users/${id}/`, data);
  },

  async deleteUser(id: number): Promise<void> {
    return apiClient.delete(`/users/${id}/`);
  },

  async activateUser(id: number): Promise<User> {
    return apiClient.post<User>(`/users/${id}/activate/`);
  },

  async deactivateUser(id: number): Promise<User> {
    return apiClient.post<User>(`/users/${id}/deactivate/`);
  },
};
