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
        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-line bg-panel text-[11px] font-mono uppercase tracking-wider font-semibold text-signal mb-4 shadow-sm ${isCenter ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-signal" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-star leading-[1.18]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base sm:text-lg text-steel leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
