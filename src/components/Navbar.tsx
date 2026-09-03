'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import TechKnoxLogo from './TechKnoxLogo';
import {
  MenuIcon,
  CloseIcon,
  HomeIcon,
  ServicesIcon,
  ProjectsIcon,
  AboutIcon,
  ContactIcon,
  MailIcon,
  WhatsAppOutlineIcon,
  ArrowRightIcon
} from './Icons';

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/services', label: 'Services', icon: ServicesIcon },
  { href: '/projects', label: 'Projects', icon: ProjectsIcon },
  { href: '/about', label: 'About Us', icon: AboutIcon },
  { href: '/contact', label: 'Contact', icon: ContactIcon }
];

interface NavbarProps {
  brandName?: string;
  email?: string | null;
}

export default function Navbar({ email = 'contact@teknox.dev' }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  const whatsappUrl =
    'https://wa.me/918310179301?text=Hi%20teknox%2C%20I%27d%20like%20to%20discuss%20a%20project.';
  const emailAddress = email || 'contact@teknox.dev';

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'border-b border-slate-200/90 dark:border-line bg-white/90 dark:bg-panel/90 backdrop-blur-md shadow-xs'
            : 'border-b border-slate-200/60 dark:border-line/60 bg-white/80 dark:bg-panel/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3.5">
          {/* LEFT: Classic Trademark Text Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md p-1 transition-opacity hover:opacity-90"
              aria-label="Teknox home"
            >
              <TechKnoxLogo size="md" />
            </Link>
          </div>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Quick Actions (No Theme Switcher as requested) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Contact */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-line bg-white dark:bg-panel text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 hover:border-emerald-300 dark:hover:bg-emerald-500/10 transition-all duration-150 active:scale-95 shadow-2xs"
              title="Chat on WhatsApp"
              aria-label="Chat with us on WhatsApp"
            >
              <WhatsAppOutlineIcon className="h-4 w-4" />
            </a>

            {/* Email Contact */}
            <a
              href={`mailto:${emailAddress}`}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-line bg-white dark:bg-panel text-slate-600 dark:text-steel hover:text-slate-900 dark:hover:text-star hover:border-slate-300 transition-all duration-150 active:scale-95 shadow-2xs"
              title={`Email us at ${emailAddress}`}
              aria-label={`Email us at ${emailAddress}`}
            >
              <MailIcon className="h-4 w-4" />
            </a>

            {/* Primary CTA Button */}
            <Link
              href="/request-a-solution"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold shadow-xs hover:shadow-indigo-500/25 transition-all"
            >
              <span>Start a Project</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile/Tablet Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-line bg-white dark:bg-panel text-slate-800 dark:text-star hover:bg-slate-100 dark:hover:bg-ink-800 transition-all active:scale-95"
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
            >
              <MenuIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Drawer / Menu (Mobile & Tablet) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside className="relative w-full max-w-xs bg-white dark:bg-panel border-l border-slate-200 dark:border-line h-full flex flex-col justify-between shadow-xl z-10 overflow-y-auto">
            {/* Drawer Top Header */}
            <div>
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-line">
                <Link
                  href="/"
                  onClick={() => setDrawerOpen(false)}
                  className="focus-visible:outline-none"
                >
                  <TechKnoxLogo size="md" />
                </Link>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-line bg-white dark:bg-panel text-slate-600 dark:text-steel hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-1" aria-label="Mobile Navigation">
                {navItems.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-800/40'
                          : 'text-slate-600 dark:text-steel hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-ink-800 border border-transparent'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : 'text-slate-400 dark:text-steeldim'
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 border-t border-slate-200 dark:border-line bg-slate-50 dark:bg-ink-800/40 space-y-3">
              <Link
                href="/request-a-solution"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 dark:border-line bg-white dark:bg-panel text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  <WhatsAppOutlineIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`mailto:${emailAddress}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 dark:border-line bg-white dark:bg-panel text-slate-700 hover:text-slate-900 transition-colors truncate"
                >
                  <MailIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
