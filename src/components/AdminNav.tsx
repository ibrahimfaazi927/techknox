'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const adminLinks = [
  { href: '/admin', label: 'Overview', icon: '📊', exact: true },
  { href: '/admin/services', label: 'Services', icon: '⚡' },
  { href: '/admin/solutions', label: 'Solutions', icon: '🎯' },
  { href: '/admin/projects', label: 'Projects', icon: '💼' },
  { href: '/admin/process-steps', label: 'How We Work', icon: '🔄' },
  { href: '/admin/inquiries', label: 'Leads & Inquiries', icon: '📬' },
  { href: '/admin/company-profile', label: 'Settings & Profile', icon: '⚙️' },
  { href: '/admin/legal-pages', label: 'Legal Pages', icon: '⚖️' }
];

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1.5 text-sm">
      {adminLinks.map((l) => {
        const isActive = l.exact
          ? pathname === l.href
          : pathname.startsWith(l.href);

        return (
          <Link
            key={l.href}
            href={l.href}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition font-medium text-xs border ${
              isActive
                ? 'bg-signal/15 text-signal border-signal/30 font-semibold shadow-sm'
                : 'text-steel hover:bg-panel hover:text-star hover:border-line border-transparent'
            }`}
          >
            <span className="text-sm">{l.icon}</span>
            <span>{l.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <div className="overflow-x-auto border-b border-line bg-ink-900 px-4 py-2 flex gap-2 no-scrollbar">
      {adminLinks.map((l) => {
        const isActive = l.exact
          ? pathname === l.href
          : pathname.startsWith(l.href);

        return (
          <Link
            key={l.href}
            href={l.href}
            className={`shrink-0 font-mono text-xs px-3 py-1.5 rounded-lg border transition ${
              isActive
                ? 'bg-signal text-white border-signal font-semibold shadow-sm'
                : 'bg-panel text-steel border-line hover:text-star hover:border-line-bright'
            }`}
          >
            <span className="mr-1.5">{l.icon}</span>
            <span>{l.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
