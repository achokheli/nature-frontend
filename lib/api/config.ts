/**
 * API Configuration
 * Axios instance with interceptors for authentication
 */

import axios from 'axios';
import { getSession } from 'next-auth/react';
import { API_BASE_URL } from '@/utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token from NextAuth session
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      const session = await getSession();
      if (session?.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Clear auth data and redirect to login
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;
