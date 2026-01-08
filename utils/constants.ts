/**
 * Application Constants
 * Route constants, API endpoints, and other global constants
 */

export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  PROJECT_DETAIL: (id: string) => `/projects/${id}`,
  PROJECT_ABOUT: (id: string) => `/projects/${id}/about`,
  PROJECT_UPDATES: (id: string) => `/projects/${id}/updates`,
  PROJECT_DOCUMENTS: (id: string) => `/projects/${id}/documents`,
  PROJECT_BACKERS: (id: string) => `/projects/${id}/backers`,
  CREATE_PROJECT: '/project/create',
  LOGIN: 'api/auth/login',
  SIGNUP: 'api/auth/signup',
  PROFILE: '/profile',
  PROFILE_INVESTMENTS: '/profile/investments',
  PROFILE_CAMPAIGNS: '/profile/campaigns',
  INVEST_STEP: (step: number) => `/invest/${step}`,
} as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const PROJECT_CATEGORIES = [
  'Environmental',
  'Renewable Energy',
  'Sustainable Agriculture',
  'Clean Water',
  'Wildlife Conservation',
  'Reforestation',
] as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export const INVESTMENT_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  SIGNED: 'signed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Shared background image for hero sections
export const HERO_BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=600&fit=crop';
