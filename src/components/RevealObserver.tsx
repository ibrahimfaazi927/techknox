'use client';

import { useEffect } from 'react';

/**
 * RevealObserver — placed ONCE in the root layout.
 * Sets up a single shared IntersectionObserver for every `.reveal` element
 * on the page, replacing per-element useEffect/ref instances in ScrollReveal.
 * Pure side-effect component — renders nothing.
 */
export default function RevealObserver() {
  useEffect(() => {
    // Respect prefers-reduced-motion — CSS already handles the instant show,
    // but skip observer setup entirely so no JS runs at all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.revealDelay) || 0;
            if (delay > 0) {
              setTimeout(() => el.classList.add('revealed'), delay);
            } else {
              el.classList.add('revealed');
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all current .reveal elements
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Also observe any .reveal elements added after initial render
    // (e.g. from dynamic routes or client navigation)
    const mutation = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => observer.observe(el));
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
