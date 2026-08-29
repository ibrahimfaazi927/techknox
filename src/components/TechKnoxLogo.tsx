import React from 'react';

export default function TechKnoxLogo({
  className = '',
  size = 'md',
  showDot = false
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDot?: boolean;
  brandName?: string;
}) {
  const sizeClasses = {
    sm: 'text-[15px] tracking-tight',
    md: 'text-[18px] sm:text-[19px] tracking-tight',
    lg: 'text-2xl sm:text-[26px] tracking-tight',
    xl: 'text-3xl sm:text-4xl tracking-tight'
  };

  return (
    <span
      className={`inline-flex items-center font-display font-bold select-none lowercase transition-opacity duration-200 hover:opacity-90 ${sizeClasses[size] || sizeClasses.md} ${className}`}
      aria-label="techknox"
    >
      <span className="text-star transition-colors duration-200 font-bold">
        techkno
      </span>
      <span className="relative text-purple-500 dark:text-purple-400 font-extrabold inline-block ml-[0.5px]">
        x
        <span className="absolute -top-0.5 -right-0.5 w-[3px] h-[3px] rounded-full bg-purple-400 opacity-90" />
      </span>
      {showDot && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 ml-0.5 mb-1" />
      )}
    </span>
  );
}



