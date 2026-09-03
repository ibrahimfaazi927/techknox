import type { Metadata } from 'next';
import Link from 'next/link';
import { getSolutions } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ServiceIconMapper, ArrowRightIcon, CheckIcon } from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Solutions — Outcome-Focused Business Technology · Teknox',
  description:
    'Explore Teknox outcome-driven solutions: Lead Management, Customer Support Automation, Internal Business Automation, Custom Business Platforms, Data Reporting, and Booking Systems.'
};

export const revalidate = 3600;

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return (
    <div className="relative overflow-hidden">
      {/* ================================================================== */}
      {/* 1. HERO                                                             */}
      {/* ================================================================== */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-24 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-line bg-ink-800 text-xs font-mono font-semibold text-signal mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-signal" />
              <span>Outcome-Focused Technology</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-star leading-[1.15] mb-6">
              Technology built for tangible business outcomes.
            </h1>
            <p className="text-base sm:text-lg text-steel leading-relaxed max-w-2xl">
              Most business challenges span multiple technologies. Explore our pre-architected solution frameworks designed to solve specific operational bottlenecks.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. SOLUTIONS GRID                                                   */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-line bg-ink-800/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol, idx) => (
              <ScrollReveal key={sol.id} delay={idx * 50}>
                <div
                  id={sol.slug}
                  className="rounded-xl border border-line bg-panel p-6 sm:p-8 shadow-sm hover:border-line-bright transition h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-signal mb-6">
                      <ServiceIconMapper icon={sol.icon} className="w-5 h-5" />
                    </div>

                    <h2 className="font-display text-xl font-bold text-star mb-3">
                      {sol.title}
                    </h2>

                    <p className="text-sm text-steel leading-relaxed mb-6">
                      {sol.description}
                    </p>

                    {sol.features && sol.features.length > 0 && (
                      <div className="mb-6 space-y-2">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-steeldim font-semibold mb-2">
                          Included Capabilities
                        </p>
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
                      <div className="pt-4 border-t border-line mb-6">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-steeldim font-semibold mb-2">
                          Ideal For
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {sol.use_cases.map((uc) => (
                            <span
                              key={uc}
                              className="px-2 py-0.5 rounded bg-ink-800 border border-line font-mono text-[10px] text-steel"
                            >
                              {uc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/request-a-solution?solution=${encodeURIComponent(sol.title)}`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-panel border border-line px-4 py-2.5 text-xs font-semibold text-star hover:bg-ink-800 transition"
                    >
                      <span>Build this Solution</span>
                      <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. CUSTOM SOLUTION BANNER                                           */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-panel">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-line bg-ink-800 p-8 sm:p-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-3">
              Need a specialized solution not listed here?
            </h2>
            <p className="text-sm sm:text-base text-steel max-w-xl mx-auto mb-8">
              Every business has unique internal workflows. We can design custom software and automation specifically around your operational model.
            </p>
            <Link
              href="/request-a-solution"
              className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3.5 text-xs font-semibold text-white shadow-sm hover:bg-signal-hover transition"
            >
              <span>Request Custom Scoping</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
