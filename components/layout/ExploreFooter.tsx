import React from 'react';
import Link from 'next/link';
import { FooterProps } from '@/types';


const ExploreFooter: React.FC<FooterProps> = ({
  logoUrl,
  logoAlt = 'ImpactInvest',
  companyInfo = {},
  resourcesLinks = [],
  legalLinks = [],
  partners = [],
  className = '',
}) => {
  const {
    companyName = 'IMPACTINVEST',
    registrationNumber,
    address,
    city,
    country,
  } = companyInfo;

  return (
    <footer className={`bg-[#1f1e20] text-white ${className}`} style={{ height: '453px' }}>
      <div className="max-w-[1440px] mx-auto px-16 py-16">
        <div className="grid grid-cols-4 gap-24">
          {/* Company Logo & Info */}
          <div>
            {logoUrl ? (
              <img src={logoUrl} alt={logoAlt} style={{ height: '154px', width: '96px' }} />
            ) : (
              <div className="flex flex-col items-center">
                <svg className="w-24 h-24 mb-2" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2"/>
                  <path d="M30 70 Q40 60 50 70 Q60 80 70 70" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
                <div className="text-center">
                  <div className="text-xs font-medium uppercase tracking-wide">{companyName}</div>
                  <div className="text-[10px] uppercase tracking-wide">Team</div>
                </div>
              </div>
            )}
          </div>

          {/* Resources */}
          <div>
            <h3 
              className="text-white font-extrabold uppercase mb-8"
              style={{
                fontSize: '24px',
                lineHeight: '24px',
              }}
            >
              RESOURCES
            </h3>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-white hover:text-gray-300 transition-colors"
                    style={{
                      fontSize: '20px',
                      lineHeight: '30px',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 
              className="text-white font-extrabold uppercase mb-8"
              style={{
                fontSize: '24px',
                lineHeight: '24px',
              }}
            >
              LEGAL
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-white hover:text-gray-300 transition-colors"
                    style={{
                      fontSize: '20px',
                      lineHeight: '30px',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 
              className="text-white font-extrabold uppercase mb-8"
              style={{
                fontSize: '24px',
                lineHeight: '24px',
              }}
            >
              PARTNERS
            </h3>
            <ul className="space-y-3 text-white">
              {partners.map((partner, index) => (
                <li 
                  key={index}
                  style={{
                    fontSize: '20px',
                    lineHeight: '30px',
                  }}
                >
                  {partner}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ExploreFooter;
