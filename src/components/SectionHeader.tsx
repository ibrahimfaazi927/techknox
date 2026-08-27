import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  description,
  align = 'left',
  className = ''
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div className="section-badge mb-5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-signal" />
          </span>
          <span>{badge}</span>
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-star leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-steel leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
