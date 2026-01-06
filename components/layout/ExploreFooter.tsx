import React from 'react';
import Link from 'next/link';
import { FooterProps } from '@/types';

/**
 * Footer Component for Explore Projects Page (Component 3.1.1)
 * Matches the design specification
 * All links and data are passed via props
 */
const ExploreFooter: React.FC<FooterProps> = ({
  logoUrl,
  logoAlt = 'Earth Restore Network',
  companyInfo = {},
  resourcesLinks = [],
  legalLinks = [],
  partners = [],
  className = '',
}) => {
  const {
    companyName = 'Fundwise OU',
    registrationNumber = 'Reg nr 10670440',
    address = 'Address: Rävala pst 8',
    city = 'Tallinn 10143',
    country = 'Estonia',
  } = companyInfo;

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            {logoUrl ? (
              <img src={logoUrl} alt={logoAlt} className="h-8 mb-4" />
            ) : (
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2v1a2 2 0 002 2h2.945M15 6v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-white text-sm font-medium">EARTH RESTORE NETWORK</span>
              </div>
            )}
            <p className="text-gray-400 text-sm">{companyName}</p>
            <p className="text-gray-400 text-sm mt-1">{registrationNumber}</p>
            <p className="text-gray-400 text-sm mt-2">{address}</p>
            <p className="text-gray-400 text-sm">{city}</p>
            <p className="text-gray-400 text-sm">{country}</p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase">Resources</h3>
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase">Partners</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {partners.map((partner, index) => (
                <li key={index}>{partner}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ExploreFooter;
