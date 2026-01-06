'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderProps } from '@/types';


const ExploreHeader: React.FC<HeaderProps & { isTransparent?: boolean; showCreateProject?: boolean }> = ({
  logoUrl,
  logoAlt = 'ImpactInvest',
  navigationLinks = [],
  activeLinkPath,
  onCreateProjectClick,
  onUserIconClick,
  user,
  isAuthenticated = false,
  className = '',
  isTransparent = false,
  showCreateProject = false,
}) => {
  const pathname = usePathname();
  
  // Determine active link - use prop if provided, otherwise check current pathname
  const getActivePath = () => {
    if (activeLinkPath !== undefined) return activeLinkPath;
    return pathname;
  };
  
  const activePath = getActivePath();

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

            {/* User Icon */}
            {onUserIconClick && (
              <button
                onClick={onUserIconClick}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="User menu"
              >
                <svg
                  className="w-12 h-12"
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
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExploreHeader;
