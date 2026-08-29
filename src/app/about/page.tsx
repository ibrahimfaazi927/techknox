import type { Metadata } from 'next';
import Link from 'next/link';
import { getCompanyProfile } from '@/lib/data';
import { ArrowRightIcon, WhatsAppOutlineIcon } from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'About TechKnox — Software Engineering Studio',
  description:
    'TechKnox is a technology company specializing in custom software, AI automation, and API integration for businesses.'
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
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-line bg-panel text-[10px] sm:text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>About TechKnox</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-star leading-[1.15] mb-5">
              A software engineering company building systems for real businesses.
            </h1>
            <p className="text-sm sm:text-base text-steel leading-relaxed max-w-2xl">
              {profile.full_description ||
                profile.short_description ||
                'TechKnox is a technology-focused company helping businesses turn ideas into scalable digital solutions. From modern websites and applications to automation and data-driven systems, we combine technology with practical business thinking.'}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. WHAT WE ACTUALLY DO                                              */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-line bg-ink-800/40">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold mb-2">
                  What We Build
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-4">
                  End-to-end digital systems for operational businesses.
                </h2>
                <p className="text-sm sm:text-base text-steel leading-relaxed mb-4">
                  Most software agencies build generic applications from template stacks. TechKnox is different — we design systems around specific operational workflows. Every component of our code is purposefully engineered for your exact business logic.
                </p>
                <p className="text-sm sm:text-base text-steel leading-relaxed">
                  From backend API architecture to fully integrated customer-facing portals and automated background workflows — we handle the complete technical scope, design, implementation, and handover.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 gap-3.5">
              {[
                { label: 'Custom Software Applications', detail: 'Web portals, dashboards, internal business tools, and customer-facing platforms.' },
                { label: 'AI & Business Automation', detail: 'Workflow automation, AI document processing, intelligent lead routing and CRM sync.' },
                { label: 'API Integration Projects', detail: 'Connecting payment systems, CRMs, third-party SaaS, and internal databases.' }
              ].map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 60}>
                  <div className="rounded-xl border border-line bg-panel p-5 sm:p-6 shadow-xs">
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
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-2xl mb-10 sm:mb-12">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold mb-2">
                How We Work
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-3">
                Operating principles that guide every project.
              </h2>
              <p className="text-sm sm:text-base text-steel leading-relaxed">
                These principles apply to every client engagement, regardless of project size.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {principles.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 60}>
                <div className="rounded-xl border border-line bg-panel p-6 sm:p-7 shadow-xs h-full">
                  <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400 block mb-2">
                    Principle 0{i + 1}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-star mb-2">{item.label}</h3>
                  <p className="text-xs sm:text-sm text-steel leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. TECHNOLOGY FOUNDATION                                            */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-line bg-ink-800/40">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-2xl mb-10 sm:mb-12">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold mb-2">
                Technology
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-3">
                Our engineering stack.
              </h2>
              <p className="text-sm sm:text-base text-steel leading-relaxed">
                We use industry-standard, well-maintained technologies selected for reliability, performance, and long-term support.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {techPillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 60}>
                <div className="rounded-xl border border-line bg-panel p-5 sm:p-6 shadow-xs h-full">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-star mb-3.5">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-2">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-steel">
                        <span className="w-1 h-1 rounded-full bg-purple-500 shrink-0" />
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
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-panel">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-line bg-ink-800/40 p-6 sm:p-12 shadow-xs">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-3">
              Let&apos;s talk about your project.
            </h2>
            <p className="text-xs sm:text-sm text-steel max-w-xl mx-auto mb-8 leading-relaxed">
              We are direct, transparent, and focused on building software that creates genuine operational value for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
              <Link
                href="/request-a-solution"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-semibold text-white shadow-xs transition-colors"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918310179301?text=Hi%20techknox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 sm:px-5 py-3 sm:py-3.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-500/20 transition-colors"
              >
                <WhatsAppOutlineIcon className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 sm:px-5 py-3 sm:py-3.5 text-xs font-medium text-star hover:bg-ink-800 transition-colors"
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

