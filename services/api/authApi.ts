import { apiClient } from './client';
import { User, AuthTokens, ApiResponse } from './types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  account_type: 'user' | 'designer';
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login/', credentials);
    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
    }
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register/', data);
    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
    }
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout/');
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  async refreshToken(refresh: string): Promise<AuthTokens> {
    const response = await apiClient.post<ApiResponse<AuthTokens>>('/auth/refresh/', { refresh });
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
    }
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me/');
    return response.data;
  },

  async changePassword(data: {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
  }): Promise<void> {
    return apiClient.post('/auth/change-password/', data);
  },

  async resetPassword(email: string): Promise<void> {
    return apiClient.post('/auth/reset-password/', { email });
  },

  async resetPasswordConfirm(data: {
    uid: string;
    token: string;
    new_password: string;
  }): Promise<void> {
    return apiClient.post('/auth/reset-password/confirm/', data);
  },
};
