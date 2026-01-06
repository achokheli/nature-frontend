import React from 'react';
import { ExploreProjectsCardProps } from '@/types';

/**
 * Project Card Component for Explore Projects Page
 * Displays project information in a card format
 * All data is passed via props for maximum independence
 */
const ExploreProjectsCard: React.FC<ExploreProjectsCardProps> = ({
  project,
  onCardClick,
  className = '',
}) => {
  const {
    id,
    image,
    name,
    description,
    category,
    raisedAmount,
    progressPercentage,
    daysLeft,
  } = project;

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(id);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name || 'Project image'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-4">
        {/* Description */}
        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
          {description || 'No description available'}
        </p>

        {/* Category Tag */}
        {category && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-gray-800 text-white text-xs rounded-full">
              {category}
            </span>
          </div>
        )}

        {/* Funding Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 font-medium">
              ${raisedAmount?.toLocaleString() || '0'} raised
            </span>
            <span className="text-gray-700 font-semibold">
              {progressPercentage || 0}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-yellow-400 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage || 0}%` }}
            />
          </div>

          {/* Days Left */}
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center">
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
              <span>{daysLeft || 0} days left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProjectsCard;
