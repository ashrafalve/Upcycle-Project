import { apiClient } from './client';
import { DesignRequest, ApiResponse } from './types';

export interface CreateRequestData {
  title: string;
  description: string;
  item_images: string[];
  budget_min: number;
  budget_max: number;
  desired_transformation: string;
  designer_id?: number;
}

export interface UpdateRequestData {
  title?: string;
  description?: string;
  budget_min?: number;
  budget_max?: number;
  status?: DesignRequest['status'];
}

export interface RequestFilters {
  status?: DesignRequest['status'];
  designer_id?: number;
  client_id?: number;
  min_budget?: number;
  max_budget?: number;
}

export const requestApi = {
  async getRequests(filters?: RequestFilters): Promise<DesignRequest[]> {
    const response = await apiClient.get<ApiResponse<DesignRequest[]>>('/upcycle-requests/', { params: filters });
    return response.data;
  },

  async getRequest(id: number): Promise<DesignRequest> {
    return apiClient.get<DesignRequest>(`/upcycle-requests/${id}/`);
  },

  async createRequest(data: CreateRequestData): Promise<DesignRequest> {
    return apiClient.post<DesignRequest>('/upcycle-requests/', data);
  },

  async updateRequest(id: number, data: UpdateRequestData): Promise<DesignRequest> {
    return apiClient.patch<DesignRequest>(`/upcycle-requests/${id}/`, data);
  },

  async deleteRequest(id: number): Promise<void> {
    return apiClient.delete(`/upcycle-requests/${id}/`);
  },

  async cancelRequest(id: number): Promise<DesignRequest> {
    return apiClient.post<DesignRequest>(`/upcycle-requests/${id}/cancel/`);
  },

  async acceptRequest(id: number): Promise<DesignRequest> {
    return apiClient.post<DesignRequest>(`/upcycle-requests/${id}/accept/`);
  },

  async rejectRequest(id: number): Promise<DesignRequest> {
    return apiClient.post<DesignRequest>(`/upcycle-requests/${id}/reject/`);
  },
};
