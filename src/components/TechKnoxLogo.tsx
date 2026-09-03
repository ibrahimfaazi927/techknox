import React from 'react';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'stacked' | 'mark';
  brandName?: string;
  text?: string;
  showIcon?: boolean;
  showDot?: boolean;
  showTrademark?: boolean;
  showTagline?: boolean;
}

export default function TechKnoxLogo({
  className = '',
  size = 'md',
  variant = 'horizontal',
  showIcon = true,
  showTrademark = true,
  showTagline = false,
  brandName,
  text
}: LogoProps) {
  const sizeConfig = {
    sm: {
      gap: 'gap-2',
      badge: 'w-6 h-6 rounded-lg p-1',
      text: 'text-[17px]',
      tm: 'text-[9px] -translate-y-1',
      tagline: 'text-[9px] tracking-wider'
    },
    md: {
      gap: 'gap-2.5',
      badge: 'w-8 h-8 rounded-xl p-1.5',
      text: 'text-[21px] sm:text-[22px]',
      tm: 'text-[10px] -translate-y-1.5',
      tagline: 'text-[10px] tracking-widest'
    },
    lg: {
      gap: 'gap-3',
      badge: 'w-10 h-10 rounded-xl p-2',
      text: 'text-[26px] sm:text-[28px]',
      tm: 'text-[11px] -translate-y-2',
      tagline: 'text-[11px] tracking-widest'
    },
    xl: {
      gap: 'gap-4',
      badge: 'w-14 h-14 rounded-2xl p-2.5',
      text: 'text-3xl sm:text-[40px]',
      tm: 'text-xs -translate-y-2.5',
      tagline: 'text-xs tracking-widest'
    }
  };

  const current = sizeConfig[size] || sizeConfig.md;
  const rawText = text || brandName || 'teknox';
  const isTeknox = rawText.toLowerCase().includes('tek') || rawText.toLowerCase().includes('tex');

  // Pure SVG Emblem inspired by the TK monogram, tuned to the site UI
  const emblemSvg = (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 bg-slate-950 dark:bg-slate-900 border border-slate-800/90 dark:border-white/10 shadow-xs shadow-indigo-500/10 group-hover:border-indigo-500/40 group-hover:shadow-indigo-500/20 transition-all duration-200 ${current.badge}`}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="tk-blue-grad" x1="14" y1="7" x2="26" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="tk-facet-grad" x1="17" y1="14" x2="26" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>

        {/* T Letter with beveled edge */}
        <path
          d="M 5 7.5 H 17.5 L 16 10.5 H 12.5 V 23.5 L 9.5 24.5 V 10.5 H 5 Z"
          fill="#FFFFFF"
        />

        {/* K Top Arm with electric cyan/indigo gradient */}
        <path
          d="M 15 13.5 L 21.5 7.5 H 26 L 18 15.5 L 15 13.5 Z"
          fill="url(#tk-blue-grad)"
        />

        {/* K Bottom Arm faceted */}
        <path
          d="M 17.5 15 L 25.5 24.5 H 20.5 L 14.5 17 L 17.5 15 Z"
          fill="url(#tk-facet-grad)"
        />

        {/* Subtle accent specular node */}
        <circle cx="23.5" cy="8.5" r="1.5" fill="#38BDF8" />
      </svg>
    </span>
  );

  // Standalone Mark
  if (variant === 'mark') {
    return (
      <span
        className={`inline-flex items-center select-none group transition-transform duration-200 hover:scale-105 ${className}`}
        aria-label="Teknox"
      >
        {emblemSvg}
      </span>
    );
  }

  // Stacked Layout (Emblem centered on top, wordmark below, optional tagline)
  if (variant === 'stacked') {
    return (
      <div
        className={`inline-flex flex-col items-center select-none group transition-transform duration-200 hover:scale-[1.01] ${className}`}
        aria-label="Teknox"
      >
        {showIcon && emblemSvg}

        <div className="mt-2.5 flex items-baseline font-display font-bold leading-none">
          {isTeknox ? (
            <>
              <span className="text-slate-950 dark:text-white font-extrabold tracking-tight">tek</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold tracking-tight">nox</span>
            </>
          ) : (
            <span className="text-slate-950 dark:text-white font-extrabold tracking-tight">{rawText}</span>
          )}
          {showTrademark && (
            <sup className={`font-mono font-bold text-indigo-500 dark:text-indigo-400 ml-1 select-none ${current.tm}`}>
              ™
            </sup>
          )}
        </div>

        {(showTagline || variant === 'stacked') && (
          <div className="mt-2 flex items-center gap-2 text-slate-400 dark:text-steeldim font-mono uppercase">
            <span className="w-3 h-px bg-slate-300 dark:bg-line-bright" />
            <span className={current.tagline}>Automate · Innovate · Elevate</span>
            <span className="w-3 h-px bg-slate-300 dark:bg-line-bright" />
          </div>
        )}
      </div>
    );
  }

  // Horizontal Layout (Classic, sleek, perfectly balanced for Navbar & Footer)
  return (
    <span
      className={`inline-flex items-center select-none font-display group transition-transform duration-200 hover:scale-[1.01] ${current.gap} ${className}`}
      aria-label="Teknox"
    >
      {showIcon && emblemSvg}

      <span className={`font-extrabold tracking-[-0.03em] leading-none flex items-baseline ${current.text}`}>
        {isTeknox ? (
          <>
            <span className="text-slate-950 dark:text-white font-black tracking-tight">tek</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-black tracking-tight">nox</span>
          </>
        ) : (
          <span className="text-slate-950 dark:text-white font-black tracking-tight">{rawText}</span>
        )}

        {showTrademark && (
          <sup className={`font-mono font-bold text-indigo-600/80 dark:text-indigo-400/90 ml-1 select-none ${current.tm}`}>
            ™
          </sup>
        )}
      </span>
    </span>
  );
}

// Named alias export for convenience
export { TechKnoxLogo as TeknoxLogo };
