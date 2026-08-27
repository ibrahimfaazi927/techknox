import type { Metadata } from 'next';
import Link from 'next/link';
import { getSolutions } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ServiceIconMapper, ArrowRightIcon, CheckIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Solutions — Outcome-Focused Business Technology',
  description:
    'Explore TechKnox solutions: Lead Management, Customer Support Automation, Internal Business Automation, Custom Business Platforms, Data Reporting, and Booking Systems.'
};

export const revalidate = 3600;

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return (
    <div className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Outcomes & Systems"
          title="Technology built for tangible business outcomes"
          description="Most business challenges span multiple technologies. Explore our pre-architected solution frameworks designed to solve specific operational challenges."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              id={sol.slug}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between glass-card-hover border border-line-bright"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-panel-light border border-line-bright flex items-center justify-center text-signal mb-6 shadow-inner">
                  <ServiceIconMapper icon={sol.icon} className="w-6 h-6" />
                </div>

                <h2 className="font-display text-xl font-bold text-star mb-3">
                  {sol.title}
                </h2>

                <p className="text-sm text-steel leading-relaxed mb-6">
                  {sol.description}
                </p>

                {sol.features && sol.features.length > 0 && (
                  <div className="mb-6 space-y-2">
                    <div className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-2">
                      Included Capabilities
                    </div>
                    {sol.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-steel">
                        <CheckIcon className="w-3.5 h-3.5 text-signal mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {sol.use_cases && sol.use_cases.length > 0 && (
                  <div className="pt-4 border-t border-line/60 mb-6">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-steeldim mb-2">
                      Ideal For
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {sol.use_cases.map((uc) => (
                        <span
                          key={uc}
                          className="px-2 py-0.5 rounded bg-ink border border-line font-mono text-[11px] text-steel"
                        >
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href={`/request-a-solution?solution=${encodeURIComponent(sol.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-panel border border-line-bright px-5 py-3 font-mono text-xs font-semibold text-star transition hover:border-signal/50 hover:text-signal hover:bg-panel-light"
                >
                  <span>Build this Solution</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Solution Inquiry Banner */}
        <div className="rounded-3xl border border-line-bright bg-gradient-to-b from-panel to-ink p-10 sm:p-14 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-4">
            Need a specialized solution not listed here?
          </h2>
          <p className="max-w-xl mx-auto text-steel text-sm sm:text-base mb-8">
            Every business has unique internal workflows. We can design custom software specifically around your operational model.
          </p>
          <Link
            href="/request-a-solution"
            className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-4 font-mono text-sm font-semibold text-white shadow-lg shadow-signal/20 transition hover:bg-signal-hover"
          >
            <span>Request Custom Scoping</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
