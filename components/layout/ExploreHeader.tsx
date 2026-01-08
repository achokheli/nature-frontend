'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { HeaderProps } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Header Component for Explore Projects Page (Component 3.1.1)
 * Matches the design specification - navbar overlaid on image
 * All navigation handlers and user data are passed via props
 */
const ExploreHeader: React.FC<HeaderProps> = ({
  logoUrl,
  logoAlt = 'Earth Restore Network',
  navigationLinks = [],
  activeLinkPath,
  onCreateProjectClick,
  onUserIconClick,
  user: propUser,
  isAuthenticated: propIsAuthenticated,
  className = '',
}) => {
  const pathname = usePathname();
  const { user: authUser, isAuthenticated: authIsAuthenticated } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Use auth context user if no prop user provided
  const user = propUser || authUser;
  const isAuthenticated = propIsAuthenticated !== undefined ? propIsAuthenticated : authIsAuthenticated;
  
  // Determine active link - use prop if provided, otherwise check current pathname
  const getActivePath = () => {
    if (activeLinkPath !== undefined) return activeLinkPath;
    return pathname;
  };
  
  const activePath = getActivePath();

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className={`absolute top-0 left-0 right-0 z-20 bg-transparent ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {logoUrl ? (
              <img src={logoUrl} alt={logoAlt} className="h-8" />
            ) : (
              <div className="flex items-center space-x-2">
                {/* Globe icon with hands cradling it */}
                <div className="relative w-8 h-8">
                  {/* Globe circle */}
                  <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center relative overflow-visible">
                    {/* Globe grid lines */}
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/* Vertical lines */}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 2v20M2 12h20"
                      />
                      {/* Horizontal curve */}
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
                  {/* Hands cradling - left hand */}
                  <div className="absolute -left-1 bottom-0 w-3 h-4 border-l-2 border-white rounded-l-full opacity-70"></div>
                  {/* Hands cradling - right hand */}
                  <div className="absolute -right-1 bottom-0 w-3 h-4 border-r-2 border-white rounded-r-full opacity-70"></div>
                </div>
                {/* Logo text - two lines */}
                <div className="flex flex-col leading-tight">
                  <span className="text-white text-xs font-medium uppercase tracking-wide">EARTH RESTORE</span>
                  <span className="text-white text-xs font-medium uppercase tracking-wide">NETWORK</span>
                </div>
              </div>
            )}
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigationLinks.map((link) => {
              const isActive = activePath === link.path || 
                (link.path !== '/' && activePath.startsWith(link.path));
              
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-300 bg-opacity-30 text-white'
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Create Project Button */}
            {onCreateProjectClick && (
              <button
                onClick={onCreateProjectClick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Create a project
              </button>
            )}

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
                  aria-label="User menu"
                >
                  <div className="flex items-center space-x-2 bg-white bg-opacity-10 hover:bg-opacity-20 px-3 py-2 rounded-full">
                    <svg
                      className="w-5 h-5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-black">{user.name}</span>
                    <svg
                      className={`w-4 h-4 text-black transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    
                    <div className="absolute right-0 mt-2 w-56 bg-[#2D2D2D] rounded-lg shadow-xl border border-gray-700 py-2 z-20">
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                        {user.role === 'admin' && (
                          <span className="inline-block mt-2 px-2 py-1 bg-orange-500 bg-opacity-20 text-orange-400 text-xs rounded">
                            Admin
                          </span>
                        )}
                      </div>
                      
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExploreHeader;
