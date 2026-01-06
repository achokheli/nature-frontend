'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/contexts/ProjectContext';
import { useAuth } from '@/contexts/AuthContext';
import { calculateProgress, getDaysRemaining } from '@/utils/helpers';
import { ROUTES } from '@/utils/constants';
import { MOCK_PROJECTS } from '@/utils/mockData';
import ExploreHeader from '@/components/layout/ExploreHeader';
import ExploreFooter from '@/components/layout/ExploreFooter';
import ProjectCard from '@/components/ui/ProjectCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Figma assets
const heroImage = 'https://www.figma.com/api/mcp/asset/eabdab58-ae06-462d-8123-085c7dffe3b5';

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, loading, fetchProjects } = useProjects();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Use mock data if backend doesn't return projects
  const projectsToDisplay = projects.length > 0 ? projects : MOCK_PROJECTS;

  // Header configuration
  const headerProps = {
    navigationLinks: [
      { path: ROUTES.PROJECTS, label: 'Explore' },
      { path: '/articles', label: 'Articles' },
      { path: '/about', label: 'About' },
    ],
    activeLinkPath: ROUTES.PROJECTS,
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
    showCreateProject: true,
  };

  // Footer configuration
  const footerProps = {
    companyInfo: {
      companyName: 'Fundwise OU',
      registrationNumber: 'Reg nr 12678440',
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
    partners: ['Swedbank', 'Deloitte', 'NJORD', 'EstBAN', 'FinanceEstonia'],
  };

  return (
    <div className="relative bg-white w-full min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[430px] overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomLeftRadius: '40px',
          borderBottomRightRadius: '40px',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(31,30,32,0.5)] rounded-bl-[40px] rounded-br-[40px]" />
        
        {/* Navigation */}
        <ExploreHeader {...headerProps} isTransparent={true} />
        
        {/* Hero Title */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ paddingTop: '150px' }}>
          <h1 
            className="text-white font-bold uppercase"
            style={{
              fontSize: '80px',
              lineHeight: '80px',
              letterSpacing: '-1.28px',
            }}
          >
            Explore<br />PROJECTS
          </h1>
        </div>
      </div>

      {/* Projects Grid Section */}
      <div className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-16">
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : projectsToDisplay.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {projectsToDisplay.map((project) => {
                const projectId = project.id || project._id || '';
                const progress = calculateProgress(
                  project.raisedAmount || project.raised || 0,
                  project.targetAmount || project.target || 0
                );
                const daysLeft = getDaysRemaining(
                  project.activePeriod?.end || project.endDate
                );

                return (
                  <ProjectCard
                    key={projectId}
                    id={projectId}
                    image={project.image || 'https://via.placeholder.com/392x276'}
                    title={project.name || 'Project Title'}
                    description={project.description || 'Plastic pollution is now omnipresent in the ocean, but causes the most harm in coastal waters and during its journey towards the open ocean.'}
                    category={project.category || 'Environmental'}
                    raisedAmount={project.raisedAmount || project.raised || 101189}
                    progressPercentage={progress}
                    daysLeft={daysLeft}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <ExploreFooter {...footerProps} />
    </div>
  );
}
