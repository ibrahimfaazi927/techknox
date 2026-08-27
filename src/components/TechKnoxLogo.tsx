import React from 'react';

export default function TechKnoxLogo({
  className = 'h-7 w-auto',
  showText = true,
  brandName = 'TechKnox'
}: {
  className?: string;
  showText?: boolean;
  brandName?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 group select-none cursor-pointer">
      {/* Precision Geometric Insignia */}
      <div className="relative flex items-center justify-center">
        <svg
          className={className}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary kinetic linear gradient */}
            <linearGradient id="tk-grad-primary" x1="12" y1="10" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            {/* Facet gradients for depth and premium metallic sheen */}
            <linearGradient id="tk-facet-upper" x1="18" y1="11" x2="25" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.15" />
            </linearGradient>

            <linearGradient id="tk-facet-lower" x1="18" y1="18" x2="25" y2="25" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
            </linearGradient>

            {/* Core luminous glow */}
            <radialGradient id="tk-glow" cx="18" cy="18" r="6" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* STRICT REQUIREMENT: EXACT Outer Hexagonal Shield Frame Preserved */}
          <path
            d="M18 3L31 10.5V25.5L18 33L5 25.5V10.5L18 3Z"
            className="stroke-line-bright transition-colors duration-300 group-hover:stroke-signal"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />

          {/* Geometric Faceted Shading Planes */}
          <path
            d="M18 11.5L24.5 11.5L18 18Z"
            fill="url(#tk-facet-upper)"
            className="transition-opacity duration-300 group-hover:opacity-100"
          />
          <path
            d="M18 18L24.5 24.5L18 24.5Z"
            fill="url(#tk-facet-lower)"
            className="transition-opacity duration-300 group-hover:opacity-100"
          />

          {/* Central Radial Ambient Glow */}
          <circle cx="18" cy="18" r="5" fill="url(#tk-glow)" />

          {/* Structural Geometric Monogram: T-Header */}
          <path
            d="M11.5 11.5H24.5"
            className="stroke-star transition-colors duration-300 group-hover:stroke-white dark:group-hover:stroke-white"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {/* Structural Geometric Monogram: Central Pillar */}
          <path
            d="M18 11.5V24.5"
            className="stroke-star transition-colors duration-300 group-hover:stroke-white dark:group-hover:stroke-white"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {/* Structural Geometric Monogram: Upper K-Vector */}
          <path
            d="M18 18L24.5 11.5"
            stroke="url(#tk-grad-primary)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Structural Geometric Monogram: Lower K-Vector */}
          <path
            d="M18 18L24.5 24.5"
            stroke="url(#tk-grad-primary)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Precision Sapphire Core Jewel */}
          <polygon
            points="18,16 20,18 18,20 16,18"
            className="fill-signal transition-transform duration-300 group-hover:scale-110"
          />
          <circle cx="18" cy="18" r="0.85" className="fill-white" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-display text-lg font-bold tracking-tight text-star transition-colors duration-200 group-hover:text-signal flex items-center">
            {brandName}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal ml-1"></span>
          </span>
        </div>
      )}
    </div>
  );
}
