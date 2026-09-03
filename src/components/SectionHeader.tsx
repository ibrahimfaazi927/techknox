import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlightWord?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  highlightWord,
  description,
  align = 'center',
  className = ''
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  // If highlightWord is provided, split the title around it and apply gradient
  const renderTitle = () => {
    if (highlightWord && title.includes(highlightWord)) {
      const parts = title.split(highlightWord);
      return (
        <>
          {parts[0]}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            {highlightWord}
          </span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <div className={`mb-16 md:mb-20 ${isCenter ? 'text-center' : ''} ${className}`}>
      {badge && (
        <div className={`text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-4 ${isCenter ? 'mx-auto' : ''}`}>
          {badge}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
        {renderTitle()}
      </h2>
      {description && (
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal max-w-xl mt-4 mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
