import type { Metadata } from 'next';
import Link from 'next/link';
import { getCompanyProfile } from '@/lib/data';
import { ArrowRightIcon, WhatsAppOutlineIcon } from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'About Teknox — Software Engineering Studio',
  description:
    'Teknox is a modern technology studio specializing in custom software, AI automation, and API integration for businesses.'
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
    <div className="relative overflow-hidden bg-black text-white selection:bg-zinc-800 selection:text-white">
      {/* ================================================================== */}
      {/* 1. HERO                                                             */}
      {/* ================================================================== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 px-6 md:px-12 border-b border-zinc-900 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 text-xs font-mono uppercase tracking-widest text-violet-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            <span>About Teknox</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            A software engineering studio building{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              systems for real businesses.
            </span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {profile.full_description ||
              profile.short_description ||
              'Teknox is a technology-focused company helping businesses turn ideas into scalable digital solutions. From modern websites and applications to automation and data-driven systems, we combine technology with practical business thinking.'}
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. WHAT WE ACTUALLY DO                                              */}
      {/* ================================================================== */}
      <section className="py-20 sm:py-28 px-6 md:px-12 border-b border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-3 block">
                  WHAT WE BUILD
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
                  End-to-end digital systems for operational businesses.
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-4 font-normal">
                  Most software agencies build generic applications from template stacks. Teknox is different — we design systems around specific operational workflows. Every component of our code is purposefully engineered for your exact business logic.
                </p>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
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
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 sm:p-8 hover:border-violet-500/40 transition-all duration-300">
                    <h3 className="text-lg font-bold text-white mb-2">{item.label}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">{item.detail}</p>
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
      <section className="py-20 sm:py-28 px-6 md:px-12 border-b border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-3 block">
                HOW WE WORK
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Operating principles that guide every project.
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
                These principles apply to every client engagement, regardless of project size.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 60}>
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 h-full hover:border-violet-500/40 transition-all duration-300">
                  <span className="font-mono text-xs font-bold text-violet-400 block mb-3 uppercase tracking-wider">
                    Principle 0{i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">{item.label}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. TECHNOLOGY FOUNDATION                                            */}
      {/* ================================================================== */}
      <section className="py-20 sm:py-28 px-6 md:px-12 border-b border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-3 block">
                TECHNOLOGY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Our engineering stack.
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
                We use industry-standard, well-maintained technologies selected for reliability, performance, and long-term support.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techPillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 60}>
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 sm:p-8 h-full hover:border-violet-500/40 transition-all duration-300">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-4">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
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
      <section className="py-20 sm:py-28 px-6 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-600 via-indigo-700 to-indigo-900 p-10 sm:p-14 text-white shadow-cta-glow relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Let&apos;s talk about your project.
            </h2>
            <p className="text-violet-100/90 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-normal">
              We are direct, transparent, and focused on building software that creates genuine operational value for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/request-a-solution"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-zinc-100 transition-all duration-200 shadow-md"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918310179301?text=Hi%20teknox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/20 transition-all"
              >
                <WhatsAppOutlineIcon className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp Us</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/20 transition-all"
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
