import Link from 'next/link';
import { signOut } from '../actions';
import TechKnoxLogo from '@/components/TechKnoxLogo';
import ThemeToggle from '@/components/ThemeToggle';

const links = [
  { href: '/admin', label: 'Overview', icon: '📊' },
  { href: '/admin/services', label: 'Services', icon: '⚡' },
  { href: '/admin/solutions', label: 'Solutions', icon: '🎯' },
  { href: '/admin/projects', label: 'Projects', icon: '💼' },
  { href: '/admin/inquiries', label: 'Leads & Inquiries', icon: '📬' },
  { href: '/admin/company-profile', label: 'Settings & Profile', icon: '⚙️' },
  { href: '/admin/legal-pages', label: 'Legal Pages', icon: '⚖️' }
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink">
      {/* Admin Sidebar */}
      <aside className="w-64 shrink-0 border-r border-line bg-ink-900/90 px-6 py-8 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="mb-8">
            <TechKnoxLogo brandName="TechKnox" />
            <div className="mt-2 font-mono text-[11px] text-signal font-medium uppercase tracking-wider pl-1">
              Admin & CMS Portal
            </div>
          </div>

          <nav className="flex flex-col gap-1.5 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-steel transition hover:bg-panel hover:text-star hover:border-line border border-transparent font-medium text-xs"
              >
                <span>{l.icon}</span>
                <span>{l.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-line space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-steeldim">Theme</span>
            <ThemeToggle />
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-lg border border-line bg-panel/60 px-3 py-2 text-xs font-mono text-steel hover:text-star hover:border-line-bright transition"
          >
            <span>View Public Site</span>
            <span>↗</span>
          </Link>

          <form action={signOut}>
            <button
              type="submit"
              className="w-full rounded-lg border border-line bg-ink px-3 py-2 text-left font-mono text-xs text-steeldim transition hover:border-red-500/40 hover:text-red-400"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Admin Navigation Header */}
        <div className="md:hidden border-b border-line bg-panel p-4 flex items-center justify-between">
          <div className="font-display font-bold text-star text-sm">TechKnox Admin</div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/" target="_blank" className="font-mono text-xs text-signal">Site ↗</Link>
            <form action={signOut}>
              <button type="submit" className="font-mono text-xs text-steeldim">Sign Out</button>
            </form>
          </div>
        </div>

        <div className="md:hidden overflow-x-auto border-b border-line bg-ink-900 px-4 py-2 flex gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 font-mono text-xs px-2.5 py-1 rounded bg-panel text-steel hover:text-star"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <main className="flex-1 px-6 py-8 md:px-12 md:py-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
