import React from 'react';
import { RewardCardProps } from '@/types';

/**
 * Reward Card Component
 * Displays reward information for a project
 * Structured for easy future payment integration
 * All data is passed via props
 */
const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  onPledgeClick,
  className = '',
}) => {
  const {
    id,
    title,
    description,
    pledgeAmount,
    backersCount = 0,
    itemsLeft,
    isOutOfStock = false,
  } = reward;

  const handlePledgeClick = () => {
    if (!isOutOfStock && onPledgeClick) {
      onPledgeClick(id, pledgeAmount);
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      {/* Reward Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase">
        {title || 'Reward'}
      </h3>

      {/* Reward Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {description || 'No description available'}
      </p>

      {/* Backers and Availability */}
      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>{backersCount} backers</span>
        </div>
        {itemsLeft !== undefined && itemsLeft !== null && (
          <span className="text-gray-600">{itemsLeft} left</span>
        )}
      </div>

      {/* Pledge Button */}
      <button
        onClick={handlePledgeClick}
        disabled={isOutOfStock}
        className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
          isOutOfStock
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
      >
        {isOutOfStock
          ? 'Out of rewards'
          : `Pledge over $${pledgeAmount?.toLocaleString() || '0'}`}
      </button>
    </div>
  );
};

export default RewardCard;
