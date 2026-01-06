import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

interface ProjectCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  category?: string;
  raisedAmount: number;
  progressPercentage: number;
  daysLeft: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  image,
  title,
  description,
  category = 'Environmental',
  raisedAmount,
  progressPercentage,
  daysLeft,
}) => {
  return (
    <Link
      href={ROUTES.PROJECT_DETAIL(id)}
      className="block bg-white rounded-3xl shadow-[0px_10px_20px_0px_rgba(0,0,0,0.04),0px_2px_6px_0px_rgba(0,0,0,0.04),0px_0px_1px_0px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-xl transition-shadow"
      style={{ width: '392px', height: '547px' }}
    >
      {/* Project Image */}
      <div className="relative h-[276px] overflow-hidden rounded-t-3xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 
          className="text-[#1f1e20] uppercase mb-4"
          style={{
            fontSize: '24px',
            lineHeight: '24px',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p 
          className="text-[#1f1e20] mb-4 line-clamp-3"
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            height: '65px',
          }}
        >
          {description}
        </p>

        {/* Category Tag */}
        <div className="mb-4">
          <div 
            className="inline-block bg-[#dedfdf] text-[#1f1e20] text-center"
            style={{
              padding: '4px 12px',
              borderRadius: '50px',
              fontSize: '14px',
              lineHeight: '20px',
            }}
          >
            {category}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="w-full bg-[#dedfdf] rounded-lg h-2">
            <div
              className="bg-[#ffa300] h-2 rounded-lg transition-all"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-3">
          <span 
            className="text-[#1f1e20]"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
            }}
          >
            ${raisedAmount.toLocaleString()} raised
          </span>
          <span 
            className="text-[#1f1e20]"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
            }}
          >
            {progressPercentage}%
          </span>
        </div>

        {/* Days Left */}
        <div className="flex items-center text-[#1f1e20]" style={{ fontSize: '14px' }}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span style={{ lineHeight: '20px' }}>{daysLeft} days left</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

