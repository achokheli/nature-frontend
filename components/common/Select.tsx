import React from 'react';
import { SelectProps } from '@/types';

const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
  placeholder,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 bg-dark-lighter border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-dark-lighter"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
