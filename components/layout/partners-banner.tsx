'use client';

import { useSyncExternalStore } from 'react';

const partners = [
  { name: 'EcoTech Solutions' },
  { name: 'GreenLoop Inc' },
  { name: 'SustainableCo' },
  { name: 'ReNew Design' },
  { name: 'UpGreen Labs' },
  { name: 'Circle Economy' },
  { name: 'EcoCraft Studio' },
  { name: 'ReCreate Global' },
];

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function PartnersBanner() {
  const isHydrated = useHydrated();

  if (!isHydrated) return null;

  return (
    <section className="py-10 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wider">
          Trusted by Leading Brands & Collaborators
        </p>
        
        {/* Sliding Banner */}
        <div className="relative">
          <div className="flex animate-scroll">
            {/* First set */}
            {partners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-12 md:mx-16"
              >
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 dark:text-gray-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-12 md:mx-16"
              >
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 dark:text-gray-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @media (min-width: 768px) {
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        }
        @media (min-width: 1024px) {
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        }
      `}</style>
    </section>
  );
}
