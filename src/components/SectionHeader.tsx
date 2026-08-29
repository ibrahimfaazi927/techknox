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
    <div className={`mb-10 md:mb-14 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-line bg-panel text-[10px] sm:text-xs font-mono uppercase tracking-wider font-semibold text-signal mb-3 shadow-xs ${isCenter ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-signal" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-star leading-snug">
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 text-sm sm:text-[15px] text-steel leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

