export { apiClient } from './api/client';
export * from './api/types';

export { productApi, type ProductFilters, type CreateProductData } from './api/productApi';
export { userApi, type UpdateUserData, type UserFilters } from './api/userApi';
export { requestApi, type CreateRequestData, type UpdateRequestData, type RequestFilters } from './api/requestApi';
export { designerApi, type DesignerProfile, type PortfolioItem, type DesignerFilters } from './api/designerApi';
export { authApi, type LoginCredentials, type RegisterData, type AuthResponse } from './api/authApi';
