/**
 * Utility Helper Functions
 * Reusable helper functions for formatting and calculations
 */

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const calculateProgress = (raised: number, target: number): number => {
  if (!target || target === 0) return 0;
  return Math.min(Math.round((raised / target) * 100), 100);
};

export const getDaysRemaining = (endDate: string | Date | null | undefined): number => {
  if (!endDate) return 0;
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

export const isAdmin = (user: { role?: string } | null): boolean => {
  return user?.role === 'admin';
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};

export const getStoredUser = (): any | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Get future date helper for mock data
export const getFutureDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString();
};
