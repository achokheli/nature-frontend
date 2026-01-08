'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/constants';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/projects';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setApiError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Register-specific validation
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    try {
      // Call your Express backend to register
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // After successful registration, sign in with NextAuth
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect on success
      router.push(callbackUrl);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const handleLogin = async () => {
    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    if (result?.ok) {
      router.push(callbackUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setApiError(
        error?.message || 
        `${isLogin ? 'Login' : 'Registration'} failed. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setApiError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center space-x-2">
            <div className="relative w-10 h-10">
              <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 2v20M2 12h20"
                  />
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="10"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                  />
                </svg>
              </div>
              <div className="absolute -left-1 bottom-0 w-3 h-4 border-l-2 border-white rounded-l-full opacity-70"></div>
              <div className="absolute -right-1 bottom-0 w-3 h-4 border-r-2 border-white rounded-r-full opacity-70"></div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white text-sm font-medium uppercase tracking-wide">EARTH RESTORE</span>
              <span className="text-white text-sm font-medium uppercase tracking-wide">NETWORK</span>
            </div>
          </Link>
        </div>

        {/* Auth Card */}
        <div className="bg-[#2D2D2D] rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-400 text-center mb-6">
            {isLogin 
              ? 'Sign in to continue to your account' 
              : 'Sign up to start investing in nature'}
          </p>

          {apiError && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
              <p className="text-red-500 text-sm">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.name}
                required
              />
            )}

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              required
            />

            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                required
              />
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-6"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              {' '}
              <button
                type="button"
                onClick={switchMode}
                className="text-orange-500 hover:text-orange-400 font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D]">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}
