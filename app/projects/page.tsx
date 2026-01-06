'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/contexts/ProjectContext';
import { useAuth } from '@/contexts/AuthContext';
import { calculateProgress, getDaysRemaining } from '@/utils/helpers';
import { ROUTES, HERO_BACKGROUND_IMAGE } from '@/utils/constants';
import { MOCK_PROJECTS } from '@/utils/mockData';
import ExploreHeader from '@/components/layout/ExploreHeader';
import ExploreFooter from '@/components/layout/ExploreFooter';
import ExploreProjectsCard from '@/components/ui/ExploreProjectsCard';
import Input from '@/components/common/Input';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { TransformedProject } from '@/types';

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, loading, fetchProjects } = useProjects();
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<TransformedProject[]>([]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    // Use mock data if no projects from backend, otherwise use backend data
    const projectsToUse = projects.length > 0 ? projects : MOCK_PROJECTS;
    
    let filtered = [...projectsToUse];
    
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Transform projects
    const transformed: TransformedProject[] = filtered.map((project) => ({
      id: project.id || project._id || '',
      image: project.image,
      name: project.name,
      description: project.description,
      category: project.category,
      raisedAmount: project.raisedAmount || project.raised || 0,
      targetAmount: project.targetAmount || project.target || 0,
      progressPercentage: calculateProgress(
        project.raisedAmount || project.raised || 0,
        project.targetAmount || project.target || 0
      ),
      daysLeft: getDaysRemaining(
        project.activePeriod?.end || project.endDate
      ),
    }));

    setFilteredProjects(transformed);
  }, [searchTerm, projects]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

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
        
        {/* Hero Title */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            EXPLORE PROJECTS
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="max-w-md">
              <Input
                placeholder="Search for campaign..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-gray-300"
              />
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'No projects found matching your search.' : 'No projects available.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ExploreProjectsCard
                  key={project.id}
                  project={project}
                  onCardClick={(id) => router.push(ROUTES.PROJECT_DETAIL(id))}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <ExploreFooter {...footerProps} />
    </div>
  );
}
