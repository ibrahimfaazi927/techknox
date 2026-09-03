import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ServiceIconMapper, ArrowRightIcon, CheckIcon } from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Services — Software Solutions & Technology Consulting · Teknox',
  description:
    'Explore Teknox engineering services: Custom Web & Mobile Apps, AI & Automation, API Integrations, Business Dashboards, and CRM Systems.'
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="relative overflow-hidden bg-white dark:bg-ink text-slate-900 dark:text-star">
      {/* ================================================================== */}
      {/* 1. HERO                                                             */}
      {/* ================================================================== */}
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-line bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-ink-900 dark:via-ink dark:to-ink-800">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-200/80 dark:border-indigo-800/40 bg-indigo-50/80 dark:bg-indigo-950/50 text-[10px] sm:text-xs font-mono font-semibold text-indigo-700 dark:text-indigo-400 mb-5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Services &amp; Capabilities</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-slate-950 dark:text-star leading-[1.15] mb-4">
              Technology engineered around your specific business requirements.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-steel leading-relaxed max-w-2xl font-normal">
              From web applications and business portals to AI-driven automation and API integrations, explore our core engineering disciplines below.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. SERVICES CATALOG                                                 */}
      {/* ================================================================== */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-line bg-slate-50/40 dark:bg-ink-800/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 50}>
                <div
                  id={service.slug}
                  className="rounded-2xl border border-slate-200/80 dark:border-line bg-white dark:bg-panel p-6 sm:p-10 shadow-xs hover:border-slate-300 dark:hover:border-line-bright transition"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Info */}
                    <div className="lg:col-span-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-ink-800 border border-indigo-100 dark:border-line flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-2xs">
                          <ServiceIconMapper icon={service.icon} className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-wider text-slate-400 dark:text-steeldim font-semibold">
                          Service 0{index + 1}
                        </span>
                      </div>

                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-star mb-3">
                        {service.title}
                      </h2>

                      <p className="text-sm sm:text-base text-slate-600 dark:text-steel leading-relaxed mb-6 font-normal">
                        {service.description || service.short_description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors"
                        >
                          <span>Explore Service Details</span>
                          <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/request-a-solution?service=${encodeURIComponent(service.title)}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-steel hover:text-slate-900 dark:hover:text-star transition px-3 py-2"
                        >
                          <span>Request Scoping →</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right: Key Deliverables & Tech */}
                    <div className="lg:col-span-6 rounded-2xl bg-slate-50/70 dark:bg-ink-800 p-6 sm:p-7 border border-slate-200/70 dark:border-line space-y-4">
                      {service.features && service.features.length > 0 && (
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-steeldim font-semibold mb-3">
                            Key Deliverables &amp; Capabilities
                          </p>
                          <ul className="space-y-2">
                            {service.features.map((feat) => (
                              <li key={feat} className="flex items-start gap-2 text-xs text-slate-700 dark:text-steel">
                                <CheckIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.technologies && service.technologies.length > 0 && (
                        <div className="pt-3 border-t border-slate-200/60 dark:border-line">
                          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-steeldim font-semibold mb-2">
                            Supported Technologies
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {service.technologies.map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-0.5 rounded-md bg-white dark:bg-panel border border-slate-200 dark:border-line font-mono text-[10px] text-slate-700 dark:text-steel"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. CTA BANNER                                                       */}
      {/* ================================================================== */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white dark:bg-panel">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-3xl border border-slate-200/80 dark:border-line bg-slate-50/50 dark:bg-ink-800/40 p-8 sm:p-12 shadow-xs">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-star mb-3">
              Need a cross-discipline solution?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-steel max-w-xl mx-auto mb-8 leading-relaxed font-normal">
              Most business challenges combine custom software with API integrations and automated workflows. We can architect a unified solution for your specific requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/request-a-solution"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3.5 text-xs font-semibold text-white shadow-xs transition-colors"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-line bg-white dark:bg-panel px-5 py-3.5 text-xs font-medium text-slate-800 dark:text-star hover:bg-slate-50 transition-colors"
              >
                <span>Talk with an Engineer</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
