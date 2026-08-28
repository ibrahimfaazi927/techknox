import type { Metadata } from 'next';
import Link from 'next/link';
import { getCompanyProfile } from '@/lib/data';
import { ArrowRightIcon, WhatsAppIcon } from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'About TechKnox — Software Engineering Studio',
  description:
    'TechKnox is an engineering studio specialising in custom software, AI automation, and API integration for businesses. Learn about our philosophy and working principles.'
};

export const revalidate = 3600;

export default async function AboutPage() {
  const profile = await getCompanyProfile();

  const principles = [
    {
      label: 'Business-first engineering',
      desc: 'We start by understanding the operational problem, then determine the right technology stack. Not the other way around.'
    },
    {
      label: 'Custom solutions, not templates',
      desc: 'We build systems specifically designed around your workflows, data models, and integration landscape — never repurposed templates.'
    },
    {
      label: 'Clean & maintainable code',
      desc: 'Our code is structured, documented, and built with long-term maintainability in mind. Handover comes with a complete walkthrough.'
    },
    {
      label: 'Transparent by default',
      desc: 'Every project has clear scope, defined milestones, direct engineering communication, and full intellectual property ownership by the client.'
    }
  ];

  const techPillars = [
    { title: 'Frontend Engineering', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { title: 'Backend Systems', items: ['Node.js', 'Python', 'PostgreSQL', 'Supabase', 'REST & GraphQL APIs'] },
    { title: 'AI & Automation', items: ['OpenAI API', 'LangChain', 'n8n Workflows', 'Webhook Pipelines', 'Document OCR'] },
    { title: 'DevOps & Cloud', items: ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'Automated CI/CD'] }
  ];

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
              <span>About TechKnox</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-star leading-[1.15] mb-6">
              A software engineering studio building systems for real businesses.
            </h1>
            <p className="text-base sm:text-lg text-steel leading-relaxed max-w-2xl">
              {profile.full_description ||
                profile.short_description ||
                'TechKnox engineers custom software applications, AI-powered automation pipelines, and API integrations. We work with businesses that have real operational problems and need reliable, maintainable digital systems to solve them.'}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. WHAT WE ACTUALLY DO                                              */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-line bg-ink-800/40">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-3">
                  What We Build
                </p>
                <h2 className="font-display text-3xl font-bold text-star mb-5">
                  End-to-end digital systems for operational businesses.
                </h2>
                <p className="text-base text-steel leading-relaxed mb-4">
                  Most software agencies build generic applications from template stacks. TechKnox is different — we design systems around specific operational workflows. Every component of our code is purposefully engineered for your exact business logic.
                </p>
                <p className="text-base text-steel leading-relaxed">
                  From backend API architecture to fully integrated customer-facing portals and automated background workflows — we handle the complete technical scope, design, implementation, and handover.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 gap-4">
              {[
                { label: 'Custom Software Applications', detail: 'Web portals, dashboards, internal business tools, and customer-facing platforms.' },
                { label: 'AI & Business Automation', detail: 'Workflow automation, AI document processing, intelligent lead routing and CRM sync.' },
                { label: 'API Integration Projects', detail: 'Connecting payment systems, CRMs, third-party SaaS, and internal databases.' }
              ].map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 60}>
                  <div className="rounded-xl border border-line bg-panel p-6 shadow-sm">
                    <h3 className="font-display text-base font-bold text-star mb-1">{item.label}</h3>
                    <p className="text-xs text-steel leading-relaxed">{item.detail}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. OPERATING PRINCIPLES                                             */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-2xl mb-12">
              <p className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-3">
                How We Work
              </p>
              <h2 className="font-display text-3xl font-bold text-star mb-4">
                Operating principles that guide every project.
              </h2>
              <p className="text-base text-steel leading-relaxed">
                These principles apply to every client engagement, regardless of project size.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 60}>
                <div className="rounded-xl border border-line bg-panel p-8 shadow-sm h-full">
                  <span className="font-mono text-xs font-bold text-signal block mb-2">
                    Principle 0{i + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-star mb-3">{item.label}</h3>
                  <p className="text-sm text-steel leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. TECHNOLOGY FOUNDATION                                            */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-line bg-ink-800/40">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-2xl mb-12">
              <p className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-3">
                Technology
              </p>
              <h2 className="font-display text-3xl font-bold text-star mb-4">
                Our engineering stack.
              </h2>
              <p className="text-base text-steel leading-relaxed">
                We use industry-standard, well-maintained technologies selected for reliability, performance, and long-term support.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techPillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 60}>
                <div className="rounded-xl border border-line bg-panel p-6 shadow-sm h-full">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-star mb-4">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-2">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-steel">
                        <span className="w-1 h-1 rounded-full bg-signal shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. CONTACT BANNER                                                   */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-panel">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-line bg-ink-800 p-6 sm:p-12 shadow-sm">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-3">
              Let&apos;s talk about your project.
            </h2>
            <p className="text-sm sm:text-base text-steel max-w-xl mx-auto mb-8">
              We are direct, transparent, and focused on building software that creates genuine operational value for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/request-a-solution"
                className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3.5 text-xs font-semibold text-white shadow-sm hover:bg-signal-hover transition"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918310179301?text=Hi%20TechKnox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-5 py-3.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-500/20 transition"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-6 py-3.5 text-xs font-medium text-star hover:bg-ink-800 transition"
              >
                <span>Contact &amp; Inquiries</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
