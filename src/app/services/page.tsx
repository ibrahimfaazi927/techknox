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
    <div className="relative overflow-hidden bg-black text-white selection:bg-zinc-800 selection:text-white">
      {/* ================================================================== */}
      {/* 1. HERO                                                             */}
      {/* ================================================================== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 px-6 md:px-12 border-b border-zinc-900 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 text-xs font-mono uppercase tracking-widest text-violet-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            <span>Services &amp; Capabilities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Technology engineered around your{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              specific requirements.
            </span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            From web applications and business portals to AI-driven automation and API integrations, explore our core engineering disciplines below.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. SERVICES CATALOG                                                 */}
      {/* ================================================================== */}
      <section className="py-20 sm:py-28 px-6 md:px-12 border-b border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 50}>
                <div
                  id={service.slug}
                  className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 sm:p-12 hover:border-violet-500/40 hover:shadow-glow-violet transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left: Info */}
                    <div className="lg:col-span-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-violet-400 shadow-xs">
                          <ServiceIconMapper icon={service.icon} className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                          Service 0{index + 1}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                        {service.title}
                      </h2>

                      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 font-normal">
                        {service.description || service.short_description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-zinc-200 transition-all duration-200 shadow-md"
                        >
                          <span>Explore Details</span>
                          <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/request-a-solution?service=${encodeURIComponent(service.title)}`}
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-zinc-400 hover:text-violet-400 transition-colors px-4 py-3"
                        >
                          <span>Request Scoping &rarr;</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right: Key Deliverables & Tech */}
                    <div className="lg:col-span-6 rounded-2xl bg-black border border-zinc-900 p-6 sm:p-8 space-y-6">
                      {service.features && service.features.length > 0 && (
                        <div>
                          <p className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold mb-4">
                            Key Deliverables &amp; Capabilities
                          </p>
                          <ul className="space-y-3">
                            {service.features.map((feat) => (
                              <li key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                                <CheckIcon className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.technologies && service.technologies.length > 0 && (
                        <div className="pt-4 border-t border-zinc-900">
                          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">
                            Technologies Used
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 rounded-lg border border-zinc-900 bg-zinc-900/50 text-xs font-mono text-zinc-400"
                              >
                                {tech}
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
      {/* 3. CTA BANNER                                                      */}
      {/* ================================================================== */}
      <section className="py-20 sm:py-28 px-6 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-600 via-indigo-700 to-indigo-900 p-10 sm:p-14 text-center text-white shadow-cta-glow relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Ready to scope your engineering requirements?
            </h2>
            <p className="text-violet-100/90 text-sm sm:text-base mb-8 max-w-xl mx-auto font-normal">
              Book an architectural consultation or submit your project details. We&apos;ll evaluate feasibility and deliver a transparent scope within 48 hours.
            </p>
            <Link
              href="/request-a-solution"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-zinc-100 transition-all duration-200 shadow-lg cursor-pointer"
            >
              <span>Submit Project Inquiry</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
