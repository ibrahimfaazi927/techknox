import type { Metadata } from 'next';
import Link from 'next/link';
import { getLegalPage } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Terms and Conditions — Teknox',
  description: 'Terms and conditions governing custom software engineering and website usage for Teknox.'
};

export const revalidate = 3600;

export default async function TermsAndConditionsPage() {
  const page = await getLegalPage('terms-and-conditions');

  return (
    <div className="relative overflow-hidden">
      <section className="pt-14 pb-20 md:pt-18 md:pb-24 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-steeldim mb-8">
            <Link href="/" className="hover:text-star transition">Home</Link>
            <span>/</span>
            <span className="text-star font-medium">Terms &amp; Conditions</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-line bg-ink-800 text-xs font-mono font-semibold text-signal mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            <span>Legal Terms</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-star leading-[1.15] mb-4">
            {page.title || 'Terms and Conditions'}
          </h1>
          <p className="text-base text-steel leading-relaxed max-w-2xl">
            Terms and conditions governing our technology services, client engagements, and website usage.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-ink-800/30">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-line bg-panel p-6 sm:p-12 shadow-sm">
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm sm:text-base text-steel leading-relaxed">
              {page.content.split('\n\n').map((block, idx) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('# ')) {
                  return (
                    <h2 key={idx} className="font-display text-2xl sm:text-3xl font-bold text-star pt-4 first:pt-0">
                      {trimmed.replace('# ', '')}
                    </h2>
                  );
                }
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="font-display text-xl font-bold text-star pt-6 border-t border-line">
                      {trimmed.replace('### ', '')}
                    </h3>
                  );
                }
                if (trimmed.startsWith('---')) {
                  return <hr key={idx} className="border-line my-6" />;
                }
                if (trimmed.startsWith('- ')) {
                  const items = trimmed.split('\n').filter((l) => l.startsWith('- '));
                  return (
                    <ul key={idx} className="space-y-2 list-none pl-0 my-3">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2 shrink-0" />
                          <span>{item.replace('- ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                return <p key={idx}>{trimmed}</p>;
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-steeldim">
              <span>Last reviewed: August 2026</span>
              <Link href="/privacy-policy" className="text-signal hover:underline transition">
                Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
