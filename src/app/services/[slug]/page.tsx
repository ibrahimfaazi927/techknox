import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices, getProjects } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ServiceIconMapper, ArrowRightIcon, CheckIcon } from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export const revalidate = 3600;

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: 'Service Not Found — Teknox' };

  return {
    title: `${service.title} — Services · Teknox`,
    description: service.short_description || `Learn about ${service.title} services from Teknox.`,
    openGraph: {
      title: `${service.title} — Teknox`,
      description: service.short_description || undefined
    }
  };
}

export default async function ServiceDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const [service, allProjects] = await Promise.all([
    getServiceBySlug(params.slug),
    getProjects()
  ]);

  if (!service) {
    notFound();
  }

  const relatedProjects = allProjects
    .filter((p) => service.technologies?.some((tech) => p.technologies?.includes(tech)))
    .slice(0, 2);

  const displayProjects = relatedProjects.length > 0 ? relatedProjects : allProjects.slice(0, 2);

  return (
    <div className="relative overflow-hidden">
      {/* ================================================================== */}
      {/* 1. HERO & BREADCRUMB                                                */}
      {/* ================================================================== */}
      <section className="pt-16 pb-20 md:pt-20 md:pb-24 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-steeldim mb-8">
            <Link href="/" className="hover:text-star transition">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-star transition">Services</Link>
            <span>/</span>
            <span className="text-star font-medium">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-signal">
                  <ServiceIconMapper icon={service.icon} className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                  Engineering Capability
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-star mb-6 leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-steel leading-relaxed mb-8 max-w-2xl">
                {service.short_description || service.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/request-a-solution?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-signal-hover transition"
                >
                  <span>{service.cta_label || 'Start a Project'}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-5 py-3 text-xs font-medium text-star hover:bg-ink-800 transition"
                >
                  <span>View Projects</span>
                </Link>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="lg:col-span-4 rounded-xl border border-line bg-ink-800 p-6 space-y-4 text-xs">
              <div>
                <span className="font-mono uppercase text-steeldim font-semibold block mb-1">Delivery Model</span>
                <span className="text-star font-medium">Milestone-driven custom engineering</span>
              </div>
              <div className="pt-3 border-t border-line">
                <span className="font-mono uppercase text-steeldim font-semibold block mb-1">Code Ownership</span>
                <span className="text-star font-medium">100% Client-owned IP &amp; schemas</span>
              </div>
              <div className="pt-3 border-t border-line">
                <span className="font-mono uppercase text-steeldim font-semibold block mb-1">Support</span>
                <span className="text-star font-medium">Architecture, implementation &amp; handover</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. OVERVIEW NARRATIVE                                               */}
      {/* ================================================================== */}
      {service.description && (
        <section className="py-16 px-4 sm:px-6 border-b border-line bg-panel">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold text-star mb-4">
                Engineered for practical business requirements
              </h2>
              <p className="text-base text-steel leading-relaxed">
                {service.description}
              </p>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 3. CAPABILITIES / FEATURES                                          */}
      {/* ================================================================== */}
      {service.features && service.features.length > 0 && (
        <section className="py-20 px-4 sm:px-6 border-b border-line bg-ink-800/40">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionHeader
                badge="Capabilities"
                title="What we deliver"
                description={`Specific deliverables and modules included in our ${service.title.toLowerCase()} engagements.`}
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feat, i) => (
                <ScrollReveal key={feat} delay={i * 40}>
                  <div className="rounded-xl border border-line bg-panel p-6 flex items-start gap-4 shadow-sm h-full">
                    <div className="w-7 h-7 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-star leading-snug">{feat}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 4. TECHNOLOGIES                                                     */}
      {/* ================================================================== */}
      {service.technologies && service.technologies.length > 0 && (
        <section className="py-16 px-4 sm:px-6 border-b border-line bg-panel">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionHeader
                badge="Stack"
                title="Technologies &amp; Frameworks"
                description="Industry-standard tools selected for security, performance, and long-term maintainability."
              />
            </ScrollReveal>

            <div className="flex flex-wrap gap-2">
              {service.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 rounded-lg border border-line bg-ink-800 font-mono text-xs text-star shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 5. BENEFITS                                                         */}
      {/* ================================================================== */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-20 px-4 sm:px-6 border-b border-line bg-ink-800/40">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionHeader
                badge="Advantages"
                title="Why build this with Teknox"
                description="Measurable operational advantages when implementing this solution with our engineering team."
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, i) => (
                <ScrollReveal key={benefit} delay={i * 50}>
                  <div className="rounded-xl border border-line bg-panel p-6 shadow-sm h-full">
                    <span className="font-mono text-xs font-bold text-signal block mb-2">
                      Benefit 0{i + 1}
                    </span>
                    <p className="text-sm text-steel leading-relaxed">{benefit}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 6. DELIVERY PROCESS                                                 */}
      {/* ================================================================== */}
      {service.process && service.process.length > 0 && (
        <section className="py-20 px-4 sm:px-6 border-b border-line bg-panel">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionHeader
                badge="Methodology"
                title="Our delivery process"
                description="How we take your requirements from initial scoping to production deployment."
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.process.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 60}>
                  <div className="rounded-xl border border-line bg-ink-800 p-6 h-full flex flex-col justify-between">
                    <div>
                      <span className="w-7 h-7 rounded-md bg-panel border border-line flex items-center justify-center font-mono text-xs font-bold text-signal mb-4">
                        {step.step || i + 1}
                      </span>
                      <h3 className="font-display text-base font-bold text-star mb-2">{step.title}</h3>
                      <p className="text-xs text-steel leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 7. FAQ                                                              */}
      {/* ================================================================== */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-20 px-4 sm:px-6 border-b border-line bg-ink-800/40">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <SectionHeader
                badge="FAQ"
                title="Frequently asked questions"
                description={`Common questions regarding our ${service.title.toLowerCase()} engagements.`}
              />
            </ScrollReveal>

            <div className="space-y-4">
              {service.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-line bg-panel p-6 shadow-sm">
                  <h3 className="font-display text-base font-bold text-star mb-2">{item.question}</h3>
                  <p className="text-sm text-steel leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 8. RELATED PROJECTS                                                 */}
      {/* ================================================================== */}
      {displayProjects && displayProjects.length > 0 && (
        <section className="py-20 px-4 sm:px-6 border-b border-line bg-panel">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <ScrollReveal>
                <SectionHeader
                  badge="Case Studies"
                  title="Related builds &amp; architectures"
                  description="Working software systems and concept builds developed by Teknox."
                  className="mb-0 md:mb-0"
                />
              </ScrollReveal>
              <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:underline">
                <span>All Projects →</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayProjects.map((proj) => (
                <div key={proj.id} className="rounded-xl border border-line bg-ink-800 p-6 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-signal font-semibold block mb-1">
                      {proj.project_type || 'Software System'}
                    </span>
                    <h4 className="font-display text-lg font-bold text-star mb-2">{proj.name}</h4>
                    <p className="text-xs text-steel leading-relaxed mb-4">{proj.short_description}</p>
                  </div>
                  <div>
                    <Link href={`/projects/${proj.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:underline">
                      <span>View Case Study</span>
                      <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 9. CTA BANNER                                                       */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-ink-800">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-line bg-panel p-8 sm:p-12 shadow-sm">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-3">
              Ready to discuss your {service.title.toLowerCase()} requirements?
            </h2>
            <p className="text-sm text-steel max-w-xl mx-auto mb-8">
              Tell us about your current systems, constraints, and timeline. We will provide an honest architectural evaluation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={`/request-a-solution?service=${encodeURIComponent(service.title)}`}
                className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3.5 text-xs font-semibold text-white shadow-sm hover:bg-signal-hover transition"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-6 py-3.5 text-xs font-medium text-star hover:bg-ink-800 transition"
              >
                <span>Contact Us Directly</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
