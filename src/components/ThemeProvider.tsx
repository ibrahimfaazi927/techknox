'use client';

import React from 'react';

/**
 * ThemeProvider — simplified passthrough for dark-only theme.
 * Kept as a module so existing imports don't break, but does nothing.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useTheme() {
  return {
    theme: 'dark' as const,
    resolvedTheme: 'dark' as const,
    setTheme: (_theme?: 'dark' | 'light' | 'system' | string) => {}
  };
}
