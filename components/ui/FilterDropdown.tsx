import React from 'react';
import { FilterDropdownProps } from '@/types';

/**
 * Filter Dropdown Component
 * Reusable dropdown for filtering options
 * All data and handlers are passed via props
 */
const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  options = [],
  onChange,
  icon,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 text-sm font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      >
        {label && (
          <option value="" disabled>
            {label}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Dropdown Icon */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        {icon || (
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
