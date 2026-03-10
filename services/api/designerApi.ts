import { apiClient } from './client';
import { User, ApiResponse } from './types';

export interface DesignerProfile {
  user: User;
  specialty: string;
  skills: string[];
  hourly_rate: number;
  bio: string;
  portfolio: PortfolioItem[];
  rating: number;
  completed_projects: number;
  is_available: boolean;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  is_featured: boolean;
  created_at: string;
}

export interface DesignerFilters {
  specialty?: string;
  is_available?: boolean;
  min_rating?: number;
  search?: string;
}

export const designerApi = {
  async getDesigners(filters?: DesignerFilters): Promise<User[]> {
    const response = await apiClient.get<ApiResponse<User[]>>('/designers/', { params: filters });
    return response.data;
  },

  async getDesigner(id: number): Promise<DesignerProfile> {
    return apiClient.get<DesignerProfile>(`/designers/${id}/`);
  },

  async getDesignerByUserId(userId: number): Promise<DesignerProfile> {
    return apiClient.get<DesignerProfile>(`/designers/user/${userId}/`);
  },

  async updateProfile(data: Partial<DesignerProfile>): Promise<DesignerProfile> {
    return apiClient.patch<DesignerProfile>('/designers/me/', data);
  },

  async addPortfolioItem(data: {
    title: string;
    description: string;
    image: string;
    category: string;
    is_featured?: boolean;
  }): Promise<PortfolioItem> {
    return apiClient.post<PortfolioItem>('/designers/portfolio/', data);
  },

  async updatePortfolioItem(id: number, data: Partial<PortfolioItem>): Promise<PortfolioItem> {
    return apiClient.patch<PortfolioItem>(`/designers/portfolio/${id}/`, data);
  },

  async deletePortfolioItem(id: number): Promise<void> {
    return apiClient.delete(`/designers/portfolio/${id}/`);
  },

  async applyAsDesigner(data: {
    specialty: string;
    skills: string[];
    hourly_rate: number;
    bio: string;
  }): Promise<DesignerProfile> {
    return apiClient.post<DesignerProfile>('/designers/apply/', data);
  },

  async approveDesigner(id: number): Promise<User> {
    return apiClient.post<User>(`/designers/${id}/approve/`);
  },

  async rejectDesigner(id: number): Promise<void> {
    return apiClient.post(`/designers/${id}/reject/`);
  },
};
