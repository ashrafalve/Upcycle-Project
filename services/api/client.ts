import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  get instance(): AxiosInstance {
    return this.client;
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
