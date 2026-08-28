import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechBadge({ name }: TechIconProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line bg-panel hover:border-line-bright transition-colors text-xs font-medium text-star shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
      <span>{name}</span>
    </div>
  );
}

export function TechStackLogo({ name, className = 'w-6 h-6' }: TechIconProps) {
  const n = name.toLowerCase();

  // React — React Blue (#149ECA / #61DAFB)
  if (n.includes('react')) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="#149ECA">
        <circle cx="0" cy="0" r="2.05" fill="#149ECA" />
        <g stroke="#149ECA" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // Next.js — Theme-aware Black/White
  if (n.includes('next')) {
    return (
      <svg className={className} viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" className="fill-star" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          className="fill-panel"
        />
        <rect x="115" y="54" width="12" height="72" className="fill-panel" />
      </svg>
    );
  }

  // TypeScript — TypeScript Blue (#3178C6)
  if (n.includes('typescript')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path
          d="M4 10.5h6v1.8H7.9V19H6.1v-6.7H4v-1.8zm8.7 5.6c.6.4 1.3.7 2.1.7.9 0 1.4-.4 1.4-1 0-.6-.4-.9-1.5-1.3-1.4-.5-2.3-1.2-2.3-2.3 0-1.4 1.1-2.4 2.8-2.4 1 0 1.8.3 2.4.7l-.6 1.5c-.5-.3-1.1-.6-1.8-.6-.8 0-1.2.4-1.2.9 0 .5.4.8 1.4 1.2 1.5.5 2.4 1.2 2.4 2.4 0 1.4-1.1 2.5-3 2.5-1.1 0-2.1-.4-2.8-.9l.7-1.4z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Python — Official Python Blue (#3776AB) & Yellow (#FFD438)
  if (n.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.81v.826H3.89S0 5.79 0 11.934c0 6.14 3.4 5.92 3.4 5.92h2.03v-2.857s-.11-3.4 3.34-3.4h5.757s3.23.05 3.23-3.134V2.656S18.25 0 11.914 0zm-3.23 1.83a1.01 1.01 0 1 1 0 2.02 1.01 1.01 0 0 1 0-2.02z"
          fill="#3776AB"
        />
        <path
          d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.752h-5.81v-.826h8.126s3.89.444 3.89-5.7 0-6.14-3.4-5.92h-2.03v2.857s.11 3.4-3.34 3.4H9.473s-3.23-.05-3.23 3.134v5.454S5.75 24 12.086 24zm3.23-1.83a1.01 1.01 0 1 1 0-2.02 1.01 1.01 0 0 1 0 2.02z"
          fill="#FFD438"
        />
      </svg>
    );
  }

  // Node.js — Node Green (#5FA04E / #339933)
  if (n.includes('node')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#5FA04E">
        <path d="M11.998 0L1.732 5.927v11.854l10.266 5.928 10.27-5.928V5.927L11.998 0zm.001 2.308l7.632 4.406-3.69 2.13-7.633-4.407 3.691-2.13zm-8.267 5.097l6.634 3.83v7.662l-6.634-3.83V7.405zm16.535 7.662l-6.634 3.83v-7.662l6.634-3.83v7.662z" />
      </svg>
    );
  }

  // PostgreSQL — Postgres Blue (#336791)
  if (n.includes('postgres')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#336791">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93V18h-2v-.07c-2.84-.48-5-2.94-5-5.93h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.99-2.16 5.45-5 5.93zM12 6c1.66 0 3 1.34 3 3v2h-6V9c0-1.66 1.34-3 3-3z" />
      </svg>
    );
  }

  // Supabase — Supabase Emerald Green (#3ECF8E)
  if (n.includes('supabase')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#3ECF8E">
        <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.362 14.646H9.724v8.958a.396.396 0 0 0 .716.233l10.922-14.483z" />
      </svg>
    );
  }

  // Docker — Docker Blue (#2496ED)
  if (n.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#2496ED">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.93 0h2.12a.185.185 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.17a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm8.79 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.186.186v1.888c0 .102.083.185.186.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.888c0 .102.083.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.888c0 .102.083.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H2.24a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185zM23.97 11.53c-.372-.612-1.127-.92-1.92-.79a4.84 4.84 0 00-1.89-.982 7.02 7.02 0 00-3.32-.23H.215a.214.214 0 00-.215.215v3.457c0 1.25.32 2.45.926 3.49C2.47 19.46 5.86 21.6 9.87 21.6c4.68 0 8.52-2.88 9.94-7.05.58.07 1.17-.03 1.68-.31.81-.44 1.34-1.22 1.48-2.1.06-.37.06-.44 1-6.61z" />
      </svg>
    );
  }

  // AWS — AWS Orange (#FF9900)
  if (n.includes('aws')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#FF9900">
        <path d="M8.65 10.74c-.08-.34-.23-.62-.47-.85-.23-.22-.52-.34-.86-.34-.41 0-.74.15-.99.45-.25.3-.38.74-.38 1.32 0 .58.12 1.01.37 1.31.25.3.57.45.98.45.34 0 .62-.12.85-.35.23-.23.38-.52.48-.88l1.41.44c-.21.63-.56 1.13-1.06 1.51-.5.37-1.08.56-1.74.56-.84 0-1.52-.27-2.03-.81-.51-.54-.77-1.3-.77-2.26 0-.98.27-1.75.8-2.31.54-.56 1.24-.84 2.11-.84.66 0 1.22.18 1.69.54.46.36.78.85.95 1.48l-1.35.38zm6.75 3.38h-1.5V6.78h1.5v7.34zM12 21.5c-4.42 0-8.28-2.43-10.33-6.05-.2-.35.05-.79.45-.73 3.12.44 6.36.68 9.88.68 3.52 0 6.76-.24 9.88-.68.4-.06.65.38.45.73C20.28 19.07 16.42 21.5 12 21.5z" />
      </svg>
    );
  }

  // Default clean code symbol
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}
