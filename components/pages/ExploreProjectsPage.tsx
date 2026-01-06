'use client';

import React, { useState, useCallback } from 'react';
import ExploreHeader from '../layout/ExploreHeader';
import ExploreFooter from '../layout/ExploreFooter';
import ExploreProjectsCard from '../ui/ExploreProjectsCard';
import FilterDropdown from '../ui/FilterDropdown';
import { ExploreProjectsPageProps } from '@/types';

/**
 * Component 3.1.1 - Explore Projects Page
 * Navbar, hero, project results section with project cards, footer - desktop
 * Supports infinite scroll (no pagination design)
 * All data and handlers are passed via props for maximum independence
 */
const ExploreProjectsPage: React.FC<ExploreProjectsPageProps> = ({
  headerProps = {},
  heroBackgroundImage,
  heroTitle = 'EXPLORE PROJECTS',
  sortOptions = [],
  categoryOptions = [],
  searchValue = '',
  onSearchChange,
  onSortChange,
  onCategoryChange,
  projects = [],
  onProjectClick,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  footerProps = {},
  className = '',
}) => {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchValue(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    if (onSortChange) {
      onSortChange(value);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (onCategoryChange) {
      onCategoryChange(value);
    }
  };

  // Infinite scroll handler
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
    
    if (isNearBottom && hasMore && !isLoadingMore && onLoadMore) {
      onLoadMore();
    }
  }, [hasMore, isLoadingMore, onLoadMore]);

  return (
    <div className={`min-h-screen flex flex-col bg-white ${className}`}>
      {/* Header with Hero Background - Navbar overlaid on image */}
      <div
        className="relative bg-cover bg-center min-h-[400px]"
        style={{
          backgroundImage: heroBackgroundImage ? `url(${heroBackgroundImage})` : 'none',
          backgroundColor: heroBackgroundImage ? 'transparent' : '#4F5D6B',
        }}
      >
        {/* Overlay for better text readability - lighter overlay so image shows through */}
        {heroBackgroundImage && (
          <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
        )}
        
        {/* Navbar - absolutely positioned overlaid on image */}
        <ExploreHeader {...headerProps} />

        {/* Hero Section */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {heroTitle}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Filters and Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Filters */}
            <div className="flex gap-4 flex-1">
              {sortOptions.length > 0 && (
                <FilterDropdown
                  label="Trending"
                  value={selectedSort}
                  options={sortOptions}
                  onChange={handleSortChange}
                  icon={
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  }
                />
              )}
              
              {categoryOptions.length > 0 && (
                <FilterDropdown
                  label="All categories"
                  value={selectedCategory}
                  options={categoryOptions}
                  onChange={handleCategoryChange}
                  icon={
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  }
                />
              )}
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={localSearchValue}
                  onChange={handleSearchChange}
                  placeholder="Search for campaign"
                  className="w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            onScroll={handleScroll}
          >
            {projects.map((project) => (
              <ExploreProjectsCard
                key={project.id}
                project={project}
                onCardClick={onProjectClick}
              />
            ))}
          </div>

          {/* Loading More Indicator */}
          {isLoadingMore && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          )}

          {/* Empty State */}
          {projects.length === 0 && !isLoadingMore && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <ExploreFooter {...footerProps} />
    </div>
  );
};

export default ExploreProjectsPage;
