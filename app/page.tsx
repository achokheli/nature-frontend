'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/contexts/ProjectContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, calculateProgress, getDaysRemaining } from '@/utils/helpers';
import { ROUTES, HERO_BACKGROUND_IMAGE } from '@/utils/constants';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ExploreHeader from '@/components/layout/ExploreHeader';
import ExploreFooter from '@/components/layout/ExploreFooter';
import { MOCK_PROJECTS } from '@/utils/mockData';

export default function HomePage() {
  const router = useRouter();
  const { projects, loading, fetchProjects } = useProjects();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Use mock data if backend doesn't return projects
  const projectsToDisplay = projects.length > 0 ? projects : MOCK_PROJECTS;
  const featuredProjects = projectsToDisplay.slice(0, 3);

  // Header configuration
  const headerProps = {
    navigationLinks: [
      { path: ROUTES.PROJECTS, label: 'Explore' },
      { path: '/articles', label: 'Articles' },
      { path: '/about', label: 'About' },
    ],
    activeLinkPath: ROUTES.HOME,
    onCreateProjectClick: () => {
      if (isAuthenticated && user?.role === 'admin') {
        router.push(ROUTES.CREATE_PROJECT);
      } else {
        router.push(ROUTES.LOGIN);
      }
    },
    onUserIconClick: () => {
      if (isAuthenticated) {
        router.push(ROUTES.PROFILE);
      } else {
        router.push(ROUTES.LOGIN);
      }
    },
    user,
    isAuthenticated,
  };

  // Footer configuration
  const footerProps = {
    companyInfo: {
      companyName: 'Fundwise OU',
      registrationNumber: 'Reg nr 10670440',
      address: 'Address: Rävala pst 8',
      city: 'Tallinn 10143',
      country: 'Estonia',
    },
    resourcesLinks: [
      { path: '/learn-about-ern', label: 'Learn About ERN' },
      { path: '/blog', label: 'Blog' },
      { path: '/team', label: 'Team' },
    ],
    legalLinks: [
      { path: '/terms', label: 'Terms of Service' },
      { path: '/pricing', label: 'Pricing' },
      { path: '/privacy', label: 'Privacy Statement' },
      { path: '/risk-warning', label: 'Risk Warning' },
    ],
    partners: ['Swedbank', 'Deloitte', 'NIORD', 'EstBAN', 'FinanceEstonia'],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section with Navbar overlaid on image */}
      <div
        className="relative min-h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${HERO_BACKGROUND_IMAGE})`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
        
        {/* Navbar - absolutely positioned overlaid on image */}
        <ExploreHeader {...headerProps} />
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              INVEST IN POSITIVE IMPACT
              <br />
              REAL ESTATE PROJECTS
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Impactinvest is the platform solution enabling sustainable investments
              in energy and housing projects for every kind of investor.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/about">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                  Read More
                </button>
              </Link>
              <Link href={ROUTES.PROJECTS}>
                <button className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-600 border-2 border-blue-600 font-semibold rounded-lg transition-colors">
                  Explore projects
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800">FEATURED PROJECTS</h2>
            <Link href={ROUTES.PROJECTS}>
              <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                View all projects
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => {
                const projectId = project.id || project._id || '';
                const progress = calculateProgress(
                  project.raisedAmount || project.raised || 0,
                  project.targetAmount || project.target || 0
                );
                const daysLeft = getDaysRemaining(
                  project.activePeriod?.end || project.endDate
                );

                return (
                  <Link
                    key={projectId}
                    href={ROUTES.PROJECT_DETAIL(projectId)}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {project.name?.[0]?.toUpperCase() || 'P'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500 font-medium">
                            {project.category}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-700 font-semibold">
                            {formatCurrency(project.raisedAmount || project.raised || 0)} raised
                          </span>
                          <span className="text-sm text-gray-700 font-semibold">
                            {progress}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{daysLeft} days left</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                LET&apos;S SAVE THE PLANET TOGETHER
                <br />
                ONE PROJECT AT A TIME
              </h2>
              <p className="text-lg text-gray-600">
                Impact Invest projects invest in green energy and real estate projects
                in Swiss countryside that help to make a better world possible.
              </p>
            </div>

            {/* Right Side - Button Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href={ROUTES.PROJECTS}>
                <div className="relative bg-blue-600 hover:bg-blue-700 rounded-2xl p-8 h-48 flex flex-col justify-between transition-colors cursor-pointer group">
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm mb-2">Browse the</p>
                    <p className="text-white text-3xl font-bold">BUILDINGS</p>
                  </div>
                </div>
              </Link>

              <Link href={ROUTES.PROJECTS}>
                <div className="relative bg-gray-800 hover:bg-gray-900 rounded-2xl p-8 h-48 flex flex-col justify-between transition-colors cursor-pointer group">
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm mb-2">Start</p>
                    <p className="text-white text-3xl font-bold">INVESTING</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <ExploreFooter {...footerProps} />
    </div>
  );
}
