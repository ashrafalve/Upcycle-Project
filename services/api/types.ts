export interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar?: string | null;
  bio?: string | null;
  account_type: 'user' | 'designer' | 'admin';
  role?: 'buyer' | 'seller' | 'designer' | 'admin';
  created_at?: string;
  date_joined?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  seller: User;
  status: 'available' | 'sold' | 'pending';
  created_at: string;
  updated_at: string;
}

export interface DesignRequest {
  id: string;
  title: string;
  description: string;
  item_images: string[];
  budget_min: number;
  budget_max: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  client: User;
  designer?: User;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface AuthTokens {
  access: string;
  refresh: string;
  expires_in?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
  first_name: string;
  last_name: string;
  account_type: 'user' | 'designer';
}
