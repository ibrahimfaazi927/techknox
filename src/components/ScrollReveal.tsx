/**
 * ScrollReveal — zero-JS server component wrapper.
 *
 * Adds the `.reveal` class so the CSS fade-in-up transition applies
 * (defined in globals.css). RevealObserver (placed once in root layout)
 * handles the IntersectionObserver logic for all .reveal elements site-wide.
 *
 * Before: 'use client' + useEffect + useRef per element = N client bundles
 * After:  pure server component, no JS, no hydration cost
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms — passed as data attribute, read by RevealObserver
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0
}: ScrollRevealProps) {
  return (
    <div
      className={`reveal ${className}`}
      {...(delay > 0 ? { 'data-reveal-delay': delay } : {})}
    >
      {children}
    </div>
  );
}
