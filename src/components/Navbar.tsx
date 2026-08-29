'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import TechKnoxLogo from './TechKnoxLogo';
import { ThemeMenuSwitch } from './ThemeToggle';
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

export default function Navbar({ email = 'contact@techknox.dev' }: NavbarProps) {
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
    'https://wa.me/918310179301?text=Hi%20techknox%2C%20I%27d%20like%20to%20discuss%20a%20project.';
  const emailAddress = email || 'contact@techknox.dev';

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'border-b border-line bg-panel/90 backdrop-blur-md shadow-xs'
            : 'border-b border-line/60 bg-panel/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
          {/* LEFT: Clean Text-Based Wordmark */}
          <div className="flex items-center">
            <Link
              href="/"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-md p-1 transition-opacity hover:opacity-85"
              aria-label="techknox home"
            >
              <TechKnoxLogo size="md" />
            </Link>
          </div>

          {/* CENTER: Desktop Navigation (Hidden on mobile/tablet, visible on lg+) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-ink-800/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-6 h-[2px] rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Contact Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* WhatsApp Contact Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-panel text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-150 active:scale-95 shadow-xs"
              title="Chat on WhatsApp"
              aria-label="Chat with TechKnox on WhatsApp"
            >
              <WhatsAppOutlineIcon className="h-4 w-4" />
            </a>

            {/* Email Contact Button */}
            <a
              href={`mailto:${emailAddress}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-panel text-steel hover:text-star hover:border-line-bright hover:bg-ink-800 transition-all duration-150 active:scale-95 shadow-xs"
              title={`Email us at ${emailAddress}`}
              aria-label={`Email TechKnox at ${emailAddress}`}
            >
              <MailIcon className="h-4 w-4" />
            </a>

            {/* Mobile/Tablet Hamburger Menu Button (Only visible on screens < lg) */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-panel text-star hover:border-line-bright hover:bg-ink-800 transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside className="relative w-full max-w-sm bg-panel border-l border-line h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-250 overflow-y-auto">
            {/* Drawer Top Header */}
            <div>
              <div className="flex items-center justify-between px-5 py-4 border-b border-line">
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-panel text-steel hover:text-star hover:bg-ink-800 transition-colors"
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
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold border border-purple-500/20'
                          : 'text-steel hover:text-star hover:bg-ink-800 border border-transparent'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? 'text-purple-600 dark:text-purple-400'
                            : 'text-steeldim'
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="mx-4 my-2 border-t border-line" />

              {/* Theme Section inside Drawer */}
              <div className="px-4 py-2">
                <p className="font-mono text-[10px] uppercase tracking-wider text-steeldim font-semibold mb-2 pl-1">
                  Theme
                </p>
                <ThemeMenuSwitch />
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 border-t border-line bg-ink-800/40 space-y-3">
              <Link
                href="/request-a-solution"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-line bg-panel text-steel hover:text-emerald-600 transition-colors"
                >
                  <WhatsAppOutlineIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`mailto:${emailAddress}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-line bg-panel text-steel hover:text-star transition-colors truncate"
                >
                  <MailIcon className="w-3.5 h-3.5 text-steeldim" />
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


