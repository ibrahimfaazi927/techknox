import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ServiceIconMapper, ArrowRightIcon, CheckIcon } from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Services — Software Solutions & Technology Consulting · TechKnox',
  description:
    'Explore TechKnox engineering services: Custom Web & Mobile Apps, AI & Automation, API Integrations, Business Dashboards, and CRM Systems.'
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="relative overflow-hidden">
      {/* ================================================================== */}
      {/* 1. HERO                                                             */}
      {/* ================================================================== */}
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-line bg-panel text-[10px] sm:text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>Services &amp; Capabilities</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-star leading-[1.15] mb-4">
              Technology engineered around your specific business requirements.
            </h1>
            <p className="text-sm sm:text-base text-steel leading-relaxed max-w-2xl">
              From web applications and business portals to AI-driven automation and API integrations, explore our core engineering disciplines below.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. SERVICES CATALOG                                                 */}
      {/* ================================================================== */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-b border-line bg-ink-800/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 50}>
                <div
                  id={service.slug}
                  className="rounded-xl border border-line bg-panel p-6 sm:p-10 shadow-sm hover:border-line-bright transition"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Info */}
                    <div className="lg:col-span-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-purple-600 dark:text-purple-400">
                          <ServiceIconMapper icon={service.icon} className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-wider text-steeldim font-semibold">
                          Service 0{index + 1}
                        </span>
                      </div>

                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-3">
                        {service.title}
                      </h2>

                      <p className="text-sm sm:text-base text-steel leading-relaxed mb-6">
                        {service.description || service.short_description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 px-4 sm:px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors"
                        >
                          <span>Explore Service Details</span>
                          <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/request-a-solution?service=${encodeURIComponent(service.title)}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-steel hover:text-star transition px-3 py-2"
                        >
                          <span>Request Scoping →</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right: Key Deliverables & Tech */}
                    <div className="lg:col-span-6 rounded-lg bg-ink-800 p-6 border border-line space-y-4">
                      {service.features && service.features.length > 0 && (
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-steeldim font-semibold mb-3">
                            Key Deliverables &amp; Capabilities
                          </p>
                          <ul className="space-y-2">
                            {service.features.map((feat) => (
                              <li key={feat} className="flex items-start gap-2 text-xs text-steel">
                                <CheckIcon className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.technologies && service.technologies.length > 0 && (
                        <div className="pt-3 border-t border-line">
                          <p className="font-mono text-[10px] uppercase tracking-wider text-steeldim font-semibold mb-2">
                            Supported Technologies
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {service.technologies.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-panel border border-line font-mono text-[10px] text-steel"
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
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-panel">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-line bg-ink-800/40 p-8 sm:p-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-3">
              Need a cross-discipline solution?
            </h2>
            <p className="text-xs sm:text-sm text-steel max-w-xl mx-auto mb-8 leading-relaxed">
              Most business challenges combine custom software with API integrations and automated workflows. We can architect a unified solution for your specific requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
              <Link
                href="/request-a-solution"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-semibold text-white shadow-xs transition-colors"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 sm:px-5 py-3 sm:py-3.5 text-xs font-medium text-star hover:bg-ink-800 transition-colors"
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
