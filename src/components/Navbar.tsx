'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import TechKnoxLogo from './TechKnoxLogo';
import ThemeToggle from './ThemeToggle';
import { WhatsAppIcon, MailIcon } from './Icons';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

interface NavbarProps {
  brandName?: string;
  email?: string | null;
}

export default function Navbar({ brandName = 'TechKnox', email }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'border-b border-line bg-panel/95 backdrop-blur-md shadow-sm'
          : 'border-b border-line/60 bg-panel/85 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-md p-0.5 transition-opacity hover:opacity-90"
          aria-label={`${brandName} Home`}
        >
          <TechKnoxLogo brandName={brandName} />
        </Link>

        {/* Center: Desktop Navigation Links (Home | Services | Solutions | Projects | About | Contact) */}
        <div className="hidden items-center gap-1 text-sm md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-md font-medium text-sm transition-colors ${
                  isActive
                    ? 'text-signal bg-ink-800 font-semibold'
                    : 'text-steel hover:text-star hover:bg-ink-800/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Desktop Actions & Contact */}
        <div className="hidden md:flex items-center gap-3">
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-steel hover:text-signal transition-colors px-2 py-1"
              title={`Email us at ${email}`}
            >
              <MailIcon className="w-3.5 h-3.5 text-steeldim" />
              <span>{email}</span>
            </a>
          )}

          <a
            href="https://wa.me/918310179301?text=Hi%20TechKnox%2C%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-steel hover:text-emerald-600 transition-colors px-2 py-1"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <div className="h-4 w-px bg-line" />

          <ThemeToggle />

          <Link
            href="/request-a-solution"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-signal px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-signal-hover transition active:scale-[0.98]"
          >
            <span>Start a Project</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Mobile Header Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-panel text-star transition hover:bg-ink-800"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-line bg-panel px-5 py-5 md:hidden animate-in fade-in slide-in-from-top-2 duration-150 shadow-lg">
          <div className="flex flex-col gap-1 text-sm">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition ${
                    isActive ? 'bg-ink-800 text-signal font-semibold' : 'text-steel hover:bg-ink-800 hover:text-star'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Quick Mobile Contact Actions */}
            <div className="mt-3 pt-3 border-t border-line space-y-2">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center justify-center gap-2 rounded-lg border border-line bg-panel px-4 py-2.5 text-xs font-medium text-steel hover:text-star transition"
                >
                  <MailIcon className="w-3.5 h-3.5 text-steeldim" />
                  <span>{email}</span>
                </a>
              )}

              <Link
                href="/request-a-solution"
                className="flex items-center justify-center gap-2 rounded-lg bg-signal px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-signal-hover transition"
              >
                <span>Start a Project</span>
                <span>→</span>
              </Link>
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <a
                  href="https://wa.me/918310179301?text=Hi%20TechKnox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-line bg-panel p-2.5 text-steel hover:text-star"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center rounded-lg border border-line bg-panel p-2.5 text-steel hover:text-star"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
