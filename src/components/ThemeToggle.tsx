'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon } from './Icons';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentIsDark = mounted
      ? resolvedTheme === 'dark'
      : typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : true;

    setTheme(currentIsDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-panel text-steel transition-colors hover:border-line-bright hover:text-star focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${className}`}
    >
      {mounted && resolvedTheme === 'dark' ? (
        <SunIcon className="h-4 w-4 text-amber-400" />
      ) : (
        <MoonIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
      )}
    </button>
  );
}

export function ThemeMenuSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <div className="flex items-center justify-between p-2 rounded-xl border border-line bg-panel">
      <div className="flex items-center gap-2 pl-1">
        <span className="text-xs font-medium text-star">Appearance</span>
      </div>
      <div className="flex items-center gap-1 bg-ink-800 p-1 rounded-lg border border-line">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            !isDark
              ? 'bg-panel text-star shadow-xs border border-line'
              : 'text-steel hover:text-star'
          }`}
          aria-label="Set Light Theme"
        >
          <SunIcon className="w-3.5 h-3.5 text-amber-500" />
          <span>Light</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            isDark
              ? 'bg-panel text-star shadow-xs border border-line'
              : 'text-steel hover:text-star'
          }`}
          aria-label="Set Dark Theme"
        >
          <MoonIcon className="w-3.5 h-3.5 text-purple-500" />
          <span>Dark</span>
        </button>
      </div>
    </div>
  );
}

