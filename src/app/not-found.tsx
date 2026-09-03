import Link from 'next/link';
import { ArrowRightIcon } from '@/components/Icons';

export const metadata = {
  title: '404 — Page Not Found · Teknox'
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 sm:p-12 border border-line-bright text-center shadow-2xl">
        <div className="inline-block px-3 py-1 rounded-full border border-signal/30 bg-signal/10 font-mono text-xs text-signal mb-6">
          404 ERROR
        </div>

        <h1 className="font-display text-3xl font-bold text-star mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-steel leading-relaxed mb-8">
          The page or system specification you are looking for might have been moved, renamed, or does not exist.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-6 py-3 font-mono text-xs font-semibold text-white shadow-md shadow-signal/20 transition hover:bg-signal-hover"
          >
            <span>Return to Homepage</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-xl border border-line bg-panel px-6 py-3 font-mono text-xs text-steel hover:text-star hover:border-line-bright transition"
          >
            Browse Services Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
