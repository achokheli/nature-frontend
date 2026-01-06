'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProjects } from '@/contexts/ProjectContext';
import { useAuth } from '@/contexts/AuthContext';
import { calculateProgress, getDaysRemaining } from '@/utils/helpers';
import { ROUTES } from '@/utils/constants';
import { MOCK_PROJECTS } from '@/utils/mockData';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ExploreHeader from '@/components/layout/ExploreHeader';
import ExploreFooter from '@/components/layout/ExploreFooter';
import ExploreProjectsCard from '@/components/ui/ExploreProjectsCard';
import Button from '@/components/common/Button';
import { Project, TransformedProject } from '@/types';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentProject, loading, fetchProject, projects } = useProjects();
  const { user, isAuthenticated } = useAuth();
  const id = params.id as string;

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id, fetchProject]);

  // Use mock data if backend doesn't return a project
  const project: Project | null = React.useMemo(() => {
    if (currentProject) {
      return currentProject;
    }
    // Try to find project in mock data
    if (id) {
      return MOCK_PROJECTS.find((p) => p.id === id || p._id === id) || null;
    }
    return null;
  }, [currentProject, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Project not found</p>
      </div>
    );
  }

  const progress = calculateProgress(
    project.raisedAmount || project.raised || 0,
    project.targetAmount || project.target || 0
  );
  const daysLeft = getDaysRemaining(
    project.activePeriod?.end || project.endDate
  );

  // Get similar projects
  const allProjects = projects.length > 0 ? projects : MOCK_PROJECTS;
  const similarProjects: TransformedProject[] = allProjects
    .filter(
      (p) =>
        (p.id || p._id) !== id &&
        (p.category === project.category || !project.category)
    )
    .slice(0, 3)
    .map((p) => ({
      id: p.id || p._id || '',
      image: p.image,
      name: p.name,
      description: p.description,
      category: p.category,
      raisedAmount: p.raisedAmount || p.raised || 0,
      targetAmount: p.targetAmount || p.target || 0,
      progressPercentage: calculateProgress(
        p.raisedAmount || p.raised || 0,
        p.targetAmount || p.target || 0
      ),
      daysLeft: getDaysRemaining(
        p.activePeriod?.end || p.endDate
      ),
    }));

  // Header configuration
  const headerProps = {
    navigationLinks: [
      { path: ROUTES.PROJECTS, label: 'Explore' },
      { path: '/articles', label: 'Articles' },
      { path: '/about', label: 'About' },
    ],
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
          backgroundImage: project.image ? `url(${project.image})` : 'none',
          backgroundColor: project.image ? 'transparent' : '#4F5D6B',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
        
        {/* Navbar - absolutely positioned overlaid on image */}
        <ExploreHeader {...headerProps} />
        
        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex flex-col justify-center items-center text-center">
          {project.category && (
            <span className="text-gray-300 text-sm mb-2 uppercase">
              {project.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {project.name}
          </h1>
          <Button variant="primary" size="lg">
            View video
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-t-3xl -mt-12 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-8">
              <div>
                <p className="text-gray-600 text-sm">Goal</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(project.targetAmount || project.target || 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Raised</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(project.raisedAmount || project.raised || 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Investors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {project.investorsCount || project.backersCount || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-64">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-yellow-400 h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{progress}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{daysLeft} days left</p>
              </div>
              {isAuthenticated && (
                <Button
                  variant="primary"
                  onClick={() => {
                    router.push(`${ROUTES.INVEST_STEP(1)}?projectId=${id}`);
                  }}
                >
                  Invest
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">About the Project</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {project.fullDescription || project.description || 'No description available.'}
            </p>
            {project.subheadings && project.subheadings.length > 0 && (
              <div className="mt-8 space-y-6">
                {project.subheadings.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-bold text-white mb-3 uppercase">
                      {section.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {project.images && project.images.length > 0 && (
              <div className="mt-8 space-y-4">
                {project.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.alt || `Project image ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Similar Projects */}
        {similarProjects.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 uppercase">
                Similar Projects
              </h2>
              <button
                onClick={() => router.push(ROUTES.PROJECTS)}
                className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors"
              >
                View all projects
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProjects.map((proj) => (
                <ExploreProjectsCard
                  key={proj.id}
                  project={proj}
                  onCardClick={(projectId) => router.push(ROUTES.PROJECT_DETAIL(projectId))}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <ExploreFooter {...footerProps} />
    </div>
  );
}
