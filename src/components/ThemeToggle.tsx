'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // If resolvedTheme is available from state, toggle based on it,
    // otherwise fallback to inspecting document.documentElement
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
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-panel text-steel transition hover:border-line-bright hover:text-star focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${className}`}
    >
      {/* Sun Icon (Visible in dark mode, switches to light) */}
      <svg
        className={`h-4 w-4 text-amber-400 transition-transform duration-300 ${
          mounted ? (resolvedTheme === 'dark' ? 'block' : 'hidden') : 'dark:block hidden'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon Icon (Visible in light mode, switches to dark) */}
      <svg
        className={`h-4 w-4 text-signal transition-transform duration-300 ${
          mounted ? (resolvedTheme === 'light' ? 'block' : 'hidden') : 'dark:hidden block'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}
