'use client';

import React, { useState } from 'react';
import ExploreHeader from '../layout/ExploreHeader';
import ExploreFooter from '../layout/ExploreFooter';
import ExploreProjectsCard from '../ui/ExploreProjectsCard';
import RewardCard from '../ui/RewardCard';
import VideoLightbox from '../ui/VideoLightbox';
import { ProjectDetailPageProps } from '@/types';

/**
 * Component 4.1.1 - Project Detail Page
 * Navbar, hero with video lightbox overlay, project overview line, project details section,
 * rewards section with reward cards, similar projects section, footer
 * For logged in: also project navbar, company details section, project updates section,
 * and project documents section - desktop
 * All data and handlers are passed via props for maximum independence
 */
const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  headerProps = {},
  heroBackgroundImage,
  heroCategory,
  heroTitle,
  videoUrl,
  videoThumbnailUrl,
  onVideoOpen,
  onVideoClose,
  overviewStats = {},
  overviewTabs = [],
  activeTab = 'about',
  onTabChange,
  projectDetails = {},
  rewards = [],
  onRewardPledgeClick,
  similarProjects = [],
  onSimilarProjectClick,
  onViewAllProjectsClick,
  isLoggedIn = false,
  projectNavbarItems = [],
  companyDetails = {},
  projectUpdates = [],
  projectDocuments = [],
  footerProps = {},
  className = '',
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const {
    backersCount = 0,
    backersAvatars = [],
    goalAmount = 0,
    raisedAmount = 0,
    progressPercentage = 0,
    daysLeft = 0,
  } = overviewStats;

  const handleVideoOpen = () => {
    setIsVideoOpen(true);
    if (onVideoOpen) onVideoOpen();
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false);
    if (onVideoClose) onVideoClose();
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white ${className}`}>
      {/* Hero Section with Navbar overlaid on image */}
      <div
        className="relative min-h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: heroBackgroundImage ? `url(${heroBackgroundImage})` : 'none',
          backgroundColor: heroBackgroundImage ? 'transparent' : '#4F5D6B',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
        
        {/* Navbar - absolutely positioned overlaid on image */}
        <ExploreHeader {...headerProps} />
        
        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex flex-col justify-center items-center text-center">
          {heroCategory && (
            <span className="text-gray-300 text-sm mb-2 uppercase">
              {heroCategory}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {heroTitle || 'Project Title'}
          </h1>
          {(videoUrl || videoThumbnailUrl) && (
            <div className="mt-4">
              <VideoLightbox
                videoUrl={videoUrl}
                thumbnailUrl={videoThumbnailUrl}
                thumbnailAlt={heroTitle}
                isOpen={isVideoOpen}
                onOpen={handleVideoOpen}
                onClose={handleVideoClose}
                className="cursor-pointer"
              />
              {!videoThumbnailUrl && (
                <button
                  onClick={handleVideoOpen}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-gray-900 ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm">View Video</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Project Overview Bar */}
      <div className="bg-white rounded-t-3xl -mt-12 relative z-10 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tabs */}
            {overviewTabs.length > 0 && (
              <div className="flex space-x-1 border-b border-gray-200 md:border-none">
                {overviewTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange && onTabChange(tab.id)}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-gray-900 border-b-2 border-orange-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                    {tab.badge && (
                      <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Backers */}
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {backersAvatars.slice(0, 3).map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Backer ${index + 1}`}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-gray-700 font-semibold">
                  {backersCount.toLocaleString()} Backers
                </span>
              </div>

              {/* Goal */}
              <div>
                <span className="text-gray-700 font-semibold">
                  ${goalAmount.toLocaleString()} Goal
                </span>
              </div>

              {/* Raised */}
              <div>
                <span className="text-gray-700 font-semibold">
                  ${raisedAmount.toLocaleString()} Raised
                </span>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center space-x-4">
                <div className="w-48">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-gray-700 font-semibold">{progressPercentage}%</span>
              </div>

              {/* Days Left */}
              <div className="flex items-center text-gray-700">
                <svg
                  className="w-5 h-5 mr-1"
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
                <span className="font-semibold">{daysLeft} days left</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Project Navbar (for logged-in users) */}
          {isLoggedIn && projectNavbarItems.length > 0 && (
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex space-x-6">
                {projectNavbarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => item.onClick && item.onClick(item.id)}
                    className={`py-4 font-medium transition-colors ${
                      item.active
                        ? 'text-orange-500 border-b-2 border-orange-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - About the Project */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase">
                About the Project
              </h2>
              <div className="prose max-w-none">
                {projectDetails.description && (
                  <p className="text-gray-700 mb-4 whitespace-pre-line">
                    {projectDetails.description}
                  </p>
                )}
                {projectDetails.images && projectDetails.images.length > 0 && (
                  <div className="space-y-4 mb-6">
                    {projectDetails.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={image.alt || `Project image ${index + 1}`}
                        className="w-full rounded-lg"
                      />
                    ))}
                  </div>
                )}
                {projectDetails.subheadings && projectDetails.subheadings.length > 0 && (
                  <div className="space-y-6">
                    {projectDetails.subheadings.map((section, index) => (
                      <div key={index}>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase">
                          {section.title}
                        </h3>
                        <p className="text-gray-700 whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Company Details (for logged-in users) */}
              {isLoggedIn && companyDetails && Object.keys(companyDetails).length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase">
                    Company Details
                  </h2>
                  <div className="space-y-2 text-gray-700">
                    {companyDetails.name && (
                      <p><strong>Name:</strong> {companyDetails.name}</p>
                    )}
                    {companyDetails.description && (
                      <p>{companyDetails.description}</p>
                    )}
                    {companyDetails.website && (
                      <p>
                        <strong>Website:</strong>{' '}
                        <a
                          href={companyDetails.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-500 hover:underline"
                        >
                          {companyDetails.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Project Updates (for logged-in users) */}
              {isLoggedIn && projectUpdates.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase">
                    Project Updates
                  </h2>
                  <div className="space-y-6">
                    {projectUpdates.map((update, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {update.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {update.date}
                        </p>
                        <p className="text-gray-700">{update.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Documents (for logged-in users) */}
              {isLoggedIn && projectDocuments.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase">
                    Project Documents
                  </h2>
                  <div className="space-y-2">
                    {projectDocuments.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-orange-500 hover:underline"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{doc.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Rewards Section */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase">
                Rewards
              </h2>
              <div className="space-y-4">
                {rewards.length > 0 ? (
                  rewards.map((reward, index) => (
                    <RewardCard
                      key={reward.id || index}
                      reward={reward}
                      onPledgeClick={onRewardPledgeClick}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No rewards available at this time.</p>
                    <p className="text-sm mt-2">
                      Rewards will be available soon.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Similar Projects Section */}
          {similarProjects.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 uppercase">
                  Similar Projects
                </h2>
                {onViewAllProjectsClick && (
                  <button
                    onClick={onViewAllProjectsClick}
                    className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors"
                  >
                    View all projects
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProjects.map((project) => (
                  <ExploreProjectsCard
                    key={project.id}
                    project={project}
                    onCardClick={onSimilarProjectClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <ExploreFooter {...footerProps} />
    </div>
  );
};

export default ProjectDetailPage;
