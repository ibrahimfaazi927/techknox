'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import TechKnoxLogo from './TechKnoxLogo';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export default function Navbar({ brandName = 'TechKnox' }: { brandName?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line/80 bg-ink/92 backdrop-blur-xl shadow-lg shadow-black/8 dark:shadow-black/30 dark:border-line/60'
          : 'border-b border-transparent bg-ink/60 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Brand Logo */}
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-lg p-1"
          aria-label={`${brandName} Home`}
        >
          <TechKnoxLogo brandName={brandName} />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-0.5 text-sm text-steel md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 rounded-md font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-star bg-panel/80 border border-line/60 shadow-sm'
                    : 'hover:text-star hover:bg-panel/40'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-signal" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/request-a-solution"
            className="btn-primary group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-signal px-5 py-2.5 font-mono text-xs font-semibold text-white shadow-signal-sm transition-all duration-200 hover:bg-signal-hover hover:shadow-signal-md active:scale-[0.97]"
          >
            <span>Start a Project</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-panel text-star transition hover:border-line-bright md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-line bg-panel/98 px-6 py-5 backdrop-blur-xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-signal/10 text-signal font-semibold border border-signal/20'
                      : 'text-steel hover:bg-panel-light hover:text-star'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-signal" />}
                </Link>
              );
            })}

            <div className="mt-3 pt-3 border-t border-line flex flex-col gap-2.5">
              <Link
                href="/request-a-solution"
                className="flex items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3 font-mono text-sm font-semibold text-white shadow-signal-sm transition hover:bg-signal-hover"
              >
                <span>Start a Project</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center rounded-xl border border-line bg-panel/80 px-5 py-2.5 font-mono text-xs text-steel hover:text-star transition"
              >
                Direct Inquiry / Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
