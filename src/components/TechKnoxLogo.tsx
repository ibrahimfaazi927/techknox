import React from 'react';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'stacked' | 'mark';
  brandName?: string;
  text?: string;
  showTrademark?: boolean;
}

export default function TechKnoxLogo({
  className = '',
  size = 'md',
  brandName,
  text
}: LogoProps) {
  const sizeConfig = {
    sm: 'text-xl sm:text-[22px]',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl'
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;
  const displayText = (text || brandName || 'teknox').toLowerCase();

  return (
    <span
      className={`inline-flex items-center select-none font-sans font-extrabold tracking-[-0.04em] leading-none text-white transition-opacity duration-200 hover:opacity-85 cursor-pointer ${currentSize} ${className}`}
      aria-label={displayText}
    >
      {displayText}
    </span>
  );
}

// Named alias export for convenience
export { TechKnoxLogo as TeknoxLogo };
