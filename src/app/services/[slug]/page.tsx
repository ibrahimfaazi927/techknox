import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/data';
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
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} — Services`,
    description: service.short_description || `Learn about ${service.title} services from TechKnox.`,
    openGraph: {
      title: `${service.title} — TechKnox`,
      description: service.short_description || undefined
    }
  };
}

export default async function ServiceDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    notFound();
  }

  return (
    <div className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-xs text-steeldim mb-10">
          <Link href="/" className="hover:text-star transition">Home</Link>
          <span className="text-steeldim/40">/</span>
          <Link href="/services" className="hover:text-star transition">Services</Link>
          <span className="text-steeldim/40">/</span>
          <span className="text-signal">{service.title}</span>
        </div>

        {/* Hero Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-line-bright mb-16 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-signal/5 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-tech-grid opacity-20 rounded-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-signal/10 border border-signal/25 flex items-center justify-center text-signal shadow-signal-sm">
                <ServiceIconMapper icon={service.icon} className="w-8 h-8" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full border border-signal/30 bg-signal/10 font-mono text-xs text-signal mb-2">
                  Engineering Discipline
                </span>
                <h1 className="font-display text-3xl sm:text-5xl font-bold text-star leading-tight">
                  {service.title}
                </h1>
              </div>
            </div>

            <p className="max-w-3xl text-lg sm:text-xl text-steel leading-relaxed mb-8">
              {service.description || service.short_description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/request-a-solution?service=${encodeURIComponent(service.title)}`}
                className="btn-primary inline-flex items-center gap-2 rounded-xl bg-signal px-7 py-3.5 font-mono text-sm font-semibold text-white shadow-signal-md transition hover:bg-signal-hover hover:shadow-signal-lg active:scale-[0.97]"
              >
                <span>{service.cta_label || 'Start This Project'}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-line-bright bg-panel/70 px-6 py-3.5 font-mono text-sm font-medium text-star transition hover:border-signal/40 backdrop-blur-sm"
              >
                Contact Us Directly
              </Link>
            </div>
          </div>
        </div>

        {/* Features & Deliverables */}
        {service.features && service.features.length > 0 && (
          <div className="mb-16">
            <ScrollReveal>
              <SectionHeader
                badge="Capabilities"
                title="What we deliver"
                description={`Key engineering deliverables and capabilities included in our ${service.title.toLowerCase()} service.`}
              />
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feat, i) => (
                <ScrollReveal key={feat} delay={i * 50}>
                  <div className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-line glass-card-hover">
                    <div className="w-8 h-8 rounded-lg bg-signal/10 text-signal flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-4 h-4" />
                    </div>
                    <span className="text-base text-star font-medium leading-snug">{feat}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        {service.technologies && service.technologies.length > 0 && (
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-line-bright mb-16">
              <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                  Technology Stack
                </span>
                <h2 className="font-display text-2xl font-bold text-star mt-1">
                  Technologies & Frameworks
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-xl bg-ink/80 dark:bg-ink-900/90 border border-line-bright font-mono text-sm text-star hover:border-signal/40 hover:text-signal transition-colors duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Business Benefits */}
        {service.benefits && service.benefits.length > 0 && (
          <div className="mb-16">
            <ScrollReveal>
              <SectionHeader
                badge="Advantages"
                title="Why build this with TechKnox?"
                description="Measurable operational advantages when implementing this solution."
              />
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, i) => (
                <ScrollReveal key={benefit} delay={i * 60}>
                  <div className="glass-card rounded-2xl p-7 border border-line glass-card-hover">
                    <div className="font-mono text-xs text-signal font-semibold mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-signal/10 border border-signal/20 flex items-center justify-center text-[9px]">{i + 1}</span>
                      <span className="tracking-widest text-steeldim">BENEFIT 0{i + 1}</span>
                    </div>
                    <p className="text-base text-steel leading-relaxed">{benefit}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Delivery Process */}
        {service.process && service.process.length > 0 && (
          <div className="mb-16">
            <ScrollReveal>
              <SectionHeader
                badge="Execution"
                title="Our delivery process"
                description="How we take your project from initial requirement scoping to production handoff."
              />
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.process.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 60}>
                  <div className="glass-card rounded-2xl p-7 relative h-full">
                    <div className="font-mono text-xs font-bold text-signal mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-signal/10 border border-signal/20 flex items-center justify-center text-[10px]">
                        {i + 1}
                      </span>
                      <span className="tracking-widest text-steeldim">STEP {step.step}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-star mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-steel leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {service.faq && service.faq.length > 0 && (
          <div className="mb-16">
            <ScrollReveal>
              <SectionHeader
                badge="FAQ"
                title="Frequently asked questions"
                description={`Common questions regarding our ${service.title.toLowerCase()} engagements.`}
              />
            </ScrollReveal>
            <div className="space-y-4">
              {service.faq.map((item, i) => (
                <ScrollReveal key={item.question} delay={i * 50}>
                  <div className="glass-card rounded-2xl p-6 sm:p-8 border border-line glass-card-hover">
                    <h3 className="font-display text-lg font-semibold text-star mb-3">
                      {item.question}
                    </h3>
                    <p className="text-sm text-steel leading-relaxed">{item.answer}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <ScrollReveal>
          <div className="rounded-3xl border border-line-bright bg-gradient-to-b from-panel/90 to-ink/80 p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-signal/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-tech-grid opacity-15 rounded-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-4">
                Ready to discuss your {service.title.toLowerCase()} requirements?
              </h2>
              <p className="max-w-xl mx-auto text-steel text-sm sm:text-base mb-8">
                Tell us about your current systems, constraints, and timeline.
                We&apos;ll provide an honest architectural evaluation.
              </p>
              <Link
                href={`/request-a-solution?service=${encodeURIComponent(service.title)}`}
                className="btn-primary inline-flex items-center gap-2 rounded-xl bg-signal px-8 py-4 font-mono text-sm font-semibold text-white shadow-signal-md transition hover:bg-signal-hover hover:shadow-signal-lg active:scale-[0.97]"
              >
                <span>Request a Solution Plan</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
