'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import TechKnoxLogo from './TechKnoxLogo';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' }
];

interface NavbarProps {
  brandName?: string;
  email?: string | null;
}

export default function Navbar({ email = 'contact@teknox.dev' }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md py-3 md:py-4 border-b border-zinc-900'
          : 'bg-transparent backdrop-blur-none py-5 md:py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="block cursor-pointer">
            <TechKnoxLogo size="md" />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-widest font-mono whitespace-nowrap">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 transition-colors duration-300 group ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right: CTA + Hamburger */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <div className="hidden md:block">
            <Link
              href="/request-a-solution"
              className="px-5 py-2.5 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-zinc-200 transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="block md:hidden text-white focus:outline-none p-2"
            aria-label="Toggle Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${mobileOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-4 right-4 mt-2 p-6 rounded-2xl border border-zinc-900 bg-black/95 backdrop-blur-lg flex flex-col items-center gap-6 z-50 md:hidden transition-all duration-300 ${
          mobileOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-3 text-sm uppercase tracking-widest font-mono w-full">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`py-2.5 px-4 w-full text-center rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? 'text-white font-semibold bg-gradient-to-r from-violet-950/30 to-indigo-950/30 border border-violet-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-950/30 border border-transparent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/request-a-solution"
          onClick={() => setMobileOpen(false)}
          className="w-full text-center px-5 py-3 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-zinc-200 transition-all duration-200 shadow-md cursor-pointer"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
