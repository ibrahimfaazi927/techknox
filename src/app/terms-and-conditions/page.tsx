import type { Metadata } from 'next';
import Link from 'next/link';
import { getLegalPage } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Terms and Conditions — TechKnox',
  description: 'Terms and conditions governing custom software engineering and website usage for TechKnox.'
};

export const revalidate = 3600;

export default async function TermsAndConditionsPage() {
  const page = await getLegalPage('terms-and-conditions');

  return (
    <div className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          badge="Legal Terms"
          title={page.title || 'Terms and Conditions'}
          description="Terms and conditions governing our technology services, client engagements, and website usage."
        />

        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-line-bright">
          <div className="prose prose-invert max-w-none space-y-6 text-sm sm:text-base text-steel leading-relaxed">
            {page.content.split('\n\n').map((block, idx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('# ')) {
                return (
                  <h1 key={idx} className="font-display text-2xl sm:text-3xl font-bold text-star pt-4 first:pt-0">
                    {trimmed.replace('# ', '')}
                  </h1>
                );
              }
              if (trimmed.startsWith('### ')) {
                return (
                  <h2 key={idx} className="font-display text-xl font-bold text-star pt-6 border-t border-line/60">
                    {trimmed.replace('### ', '')}
                  </h2>
                );
              }
              if (trimmed.startsWith('---')) {
                return <hr key={idx} className="border-line/60 my-6" />;
              }
              if (trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').filter((l) => l.startsWith('- '));
                return (
                  <ul key={idx} className="space-y-2 list-none pl-0 my-3">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2 shrink-0"></span>
                        <span>{item.replace('- ', '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return <p key={idx}>{trimmed}</p>;
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-line flex items-center justify-between text-xs font-mono text-steeldim">
            <span>Last reviewed: August 2026</span>
            <Link href="/privacy-policy" className="text-signal hover:text-white transition">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
