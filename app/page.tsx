'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/contexts/ProjectContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, calculateProgress, getDaysRemaining } from '@/utils/helpers';
import { ROUTES } from '@/utils/constants';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ExploreHeader from '@/components/layout/ExploreHeader';
import ExploreFooter from '@/components/layout/ExploreFooter';
import { MOCK_PROJECTS } from '@/utils/mockData';

// Figma assets
const heroImage = 'https://www.figma.com/api/mcp/asset/6c3d1826-fe00-434c-ae58-dfc1a7ad476a';

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
      companyName: 'IMPACTINVEST',
      registrationNumber: '',
      address: '',
      city: '',
      country: '',
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
    partners: ['Swedbank', 'Deloitte', 'NJORD', 'EstBAN', 'FinanceEstonia'],
  };

  return (
    <div className="relative bg-white w-full">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[569px] overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomLeftRadius: '40px',
          borderBottomRightRadius: '40px',
        }}
      >
        {/* Navigation */}
        <ExploreHeader {...headerProps} isTransparent={true} />
        
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4" style={{ paddingTop: '165px' }}>
          {/* Main Heading */}
          <h1 
            className="text-white font-extrabold uppercase mb-4"
            style={{
              fontSize: '32px',
              lineHeight: '30px',
              letterSpacing: '-1.28px',
              maxWidth: '698px',
            }}
          >
            INVEST IN POSITIVE IMPACT<br />REAL ESTATE PROJECTS
          </h1>
          
          {/* Subheading with line break context */}
          <p 
            className="text-white mb-2"
            style={{
              fontSize: '40px',
              lineHeight: '40px',
              letterSpacing: '-1.28px',
              maxWidth: '586px',
            }}
          >
            WE NEED TO BALANCE OUR ECOSYSTEMS AND CLIMATE
          </p>

          {/* Description */}
          <p 
            className="text-white mb-8"
            style={{
              fontSize: '20px',
              lineHeight: '30px',
              maxWidth: '643px',
            }}
          >
            Impactinvest is the platform solution enabling sustainable investments in energy and housing projects for every kind of investor.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <Link href="/about">
              <button 
                className="bg-[#0088FF] hover:bg-[#0077EE] text-white font-medium transition-colors"
                style={{
                  padding: '14px 30px',
                  borderRadius: '32px',
                  fontSize: '16px',
                  lineHeight: '20px',
                }}
              >
                Read More
              </button>
            </Link>
            <Link href={ROUTES.PROJECTS}>
              <button 
                className="bg-white hover:bg-gray-50 text-[#1f1e20] font-medium transition-colors"
                style={{
                  padding: '14px 30px',
                  borderRadius: '32px',
                  fontSize: '16px',
                  lineHeight: '20px',
                }}
              >
                Explore projects
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-16">
          <div className="flex justify-between items-center mb-12">
            <h2 
              className="text-[#1f1e20] font-extrabold uppercase"
              style={{
                fontSize: '40px',
                lineHeight: '40px',
                letterSpacing: '-1.28px',
              }}
            >
              FEATURED PROJECTS
            </h2>
            <Link href={ROUTES.PROJECTS}>
              <button 
                className="bg-white border-2 border-[#dedfdf] hover:bg-gray-50 text-[#1f1e20] transition-colors"
                style={{
                  padding: '14px 20px',
                  borderRadius: '32px',
                  fontSize: '16px',
                  lineHeight: '20px',
                }}
              >
                View all projects
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => {
                const projectId = project.id || project._id || '';
                const progress = calculateProgress(
                  project.raisedAmount || project.raised || 0,
                  project.targetAmount || project.target || 0
                );
                const daysLeft = getDaysRemaining(
                  project.activePeriod?.end || project.endDate
                );

                // Title mapping based on Figma
                const titles = ['REAL ESTATE #1', 'ENERGY STORAGE', 'REAL ESTATE 2'];
                const displayTitle = titles[index] || project.name;

                return (
                  <Link
                    key={projectId}
                    href={ROUTES.PROJECT_DETAIL(projectId)}
                    className="bg-white rounded-3xl shadow-[0px_10px_20px_0px_rgba(0,0,0,0.04),0px_2px_6px_0px_rgba(0,0,0,0.04),0px_0px_1px_0px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-[276px] overflow-hidden rounded-t-3xl">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={displayTitle}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {displayTitle[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 
                        className="text-[#1f1e20] uppercase mb-4"
                        style={{
                          fontSize: '24px',
                          lineHeight: '24px',
                        }}
                      >
                        {displayTitle}
                      </h3>
                      <p 
                        className="text-[#1f1e20] mb-4 line-clamp-3"
                        style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                        }}
                      >
                        Plastic pollution is now omnipresent in the ocean, but causes the most harm in coastal waters and during its journey towards the open ocean.
                      </p>
                      
                      {/* Tag */}
                      <div className="inline-block mb-4">
                        <div 
                          className="bg-[#dedfdf] text-[#1f1e20] text-center"
                          style={{
                            padding: '4px 12px',
                            borderRadius: '50px',
                            fontSize: '14px',
                            lineHeight: '20px',
                          }}
                        >
                          Environmental
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-2">
                        <div className="w-full bg-[#dedfdf] rounded-lg h-2">
                          <div
                            className="bg-[#ffa300] h-2 rounded-lg transition-all"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-3">
                        <span 
                          className="text-[#1f1e20]"
                          style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                          }}
                        >
                          $101,189 raised
                        </span>
                        <span 
                          className="text-[#1f1e20]"
                          style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                          }}
                        >
                          {progress}%
                        </span>
                      </div>

                      {/* Days left */}
                      <div className="flex items-center text-[#1f1e20]" style={{ fontSize: '14px' }}>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
      <div 
        className="py-20 relative"
        style={{
          background: 'linear-gradient(to bottom, rgba(222, 223, 223, 0.3), rgba(222, 223, 223, 0.3))',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Text */}
            <div>
              <h2 
                className="text-[#1f1e20] uppercase mb-6"
                style={{
                  fontSize: '40px',
                  lineHeight: '40px',
                  letterSpacing: '-1.28px',
                  maxWidth: '372px',
                }}
              >
                LET&apos;S SAVE THE PLANET TOGETHER ONE PROJECT AT A TIME
              </h2>
              <p 
                className="text-[#1f1e20]"
                style={{
                  fontSize: '20px',
                  lineHeight: '30px',
                  maxWidth: '464px',
                }}
              >
                Impact Invest projects invest in green energy and real estate projects in Swiss countryside that help to make a better world possible.
              </p>
            </div>

            {/* Right Side - Button Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href={ROUTES.PROJECTS}>
                <div 
                  className="relative bg-[#1e76c2] hover:bg-[#1a68ad] rounded-3xl p-6 flex flex-col justify-between transition-colors cursor-pointer group"
                  style={{ height: '339px' }}
                >
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="mt-auto">
                    <p className="text-white mb-2" style={{ fontSize: '20px', lineHeight: '20px' }}>
                      Browse the
                    </p>
                    <p className="text-white font-bold uppercase" style={{ fontSize: '40px', lineHeight: '40px', letterSpacing: '-1.28px' }}>
                      BUILDINGS
                    </p>
                  </div>
                </div>
              </Link>

              <Link href={ROUTES.PROJECTS}>
                <div 
                  className="relative bg-[#1f1e20] hover:bg-[#2a292b] rounded-3xl p-6 flex flex-col justify-between transition-colors cursor-pointer group"
                  style={{ height: '339px' }}
                >
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="mt-auto">
                    <p className="text-white mb-2" style={{ fontSize: '20px', lineHeight: '20px' }}>
                      Start
                    </p>
                    <p className="text-white font-bold uppercase" style={{ fontSize: '40px', lineHeight: '40px', letterSpacing: '-1.28px' }}>
                      INVESTING
                    </p>
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
