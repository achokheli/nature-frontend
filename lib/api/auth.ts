/**
 * Authentication API
 * API endpoints for user authentication
 */

import api from './config';
import { LoginCredentials, SignupData, User, ApiResponse } from '@/types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', credentials);
    return response.data.data;
  },

  signup: async (data: SignupData): Promise<{ user: User; token: string }> => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/signup', data);
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },
};
