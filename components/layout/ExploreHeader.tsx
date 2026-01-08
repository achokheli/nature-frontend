'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { HeaderProps } from '@/types';
import { useAuth } from '@/contexts/AuthContext';


const ExploreHeader: React.FC<HeaderProps & { isTransparent?: boolean; showCreateProject?: boolean }> = ({
  logoUrl,
  logoAlt = 'ImpactInvest',
  navigationLinks = [],
  activeLinkPath,
  onCreateProjectClick,
  onUserIconClick,
  user: propUser,
  isAuthenticated: propIsAuthenticated,
  className = '',
  isTransparent = false,
  showCreateProject = false,
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
    <header className={`absolute top-0 left-0 right-0 z-20 ${isTransparent ? 'bg-transparent' : ''} ${className}`}>
      <div className="max-w-[1440px] mx-auto px-16 py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logoUrl ? (
              <img src={logoUrl} alt={logoAlt} className="h-24 w-24" />
            ) : (
              <div className="text-white">
                <div className="flex flex-col items-center">
                  <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2"/>
                    <path d="M30 70 Q40 60 50 70 Q60 80 70 70" stroke="white" strokeWidth="2" fill="none"/>
                  </svg>
                  <span className="text-xs font-medium uppercase tracking-wide mt-1">IMPACTINVEST</span>
                  <span className="text-[10px] uppercase tracking-wide">Team</span>
                </div>
              </div>
            )}
          </Link>

          {/* Navigation Links - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
            {navigationLinks.map((link) => {
              const isActive = activePath === link.path || 
                (link.path !== '/' && activePath.startsWith(link.path));
              
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-white hover:text-gray-200 transition-colors ${
                    isActive && showCreateProject ? 'bg-white/20 px-4 py-2 rounded-full' : ''
                  }`}
                  style={{
                    fontSize: '16px',
                    lineHeight: '20px',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Button - Blue for Projects or Orange for Create Project */}
            {showCreateProject ? (
              <button
                onClick={onCreateProjectClick}
                className="bg-[#ffa300] hover:bg-[#e69400] text-white transition-colors"
                style={{
                  padding: '14px 30px',
                  borderRadius: '32px',
                  fontSize: '16px',
                  lineHeight: '20px',
                }}
              >
                Create a project
              </button>
            ) : (
              <Link href="/projects">
                <button
                  className="bg-[#0088FF] hover:bg-[#0077EE] text-white transition-colors"
                  style={{
                    padding: '14px 40px',
                    borderRadius: '32px',
                    fontSize: '16px',
                    lineHeight: '20px',
                  }}
                >
                  Projects
                </button>
              </Link>
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
