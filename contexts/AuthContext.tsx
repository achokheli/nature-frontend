'use client';

import React, { createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const user: User | null = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as 'user' | 'admin',
      }
    : null;

  const login = async (email: string, password: string) => {
    console.warn('Use signIn from next-auth/react instead of this method');
    throw new Error('Use signIn from next-auth/react');
  };

  const signup = async (name: string, email: string, password: string) => {
    console.warn('Signup should be handled separately, then use signIn');
    throw new Error('Signup should be handled separately');
  };

  const logout = () => {
    console.warn('Use signOut from next-auth/react instead of this method');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!session,
    isAdmin: user?.role === 'admin',
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
