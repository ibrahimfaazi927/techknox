import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import { CheckIcon, ArrowRightIcon } from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'About TechKnox — Custom Technology & Engineering Agency',
  description:
    'Learn about TechKnox: our mission, problem-first engineering mindset, software principles, and how we help businesses build custom technology.'
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <div className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <SectionHeader
          badge="Our Mission & Philosophy"
          title="Turning operational challenges into practical technology"
          description="TechKnox exists to help growing businesses turn ideas, manual friction, and complex workflows into reliable, custom-engineered software systems."
        />

        {/* Narrative */}
        <ScrollReveal>
          <div className="glass-card rounded-3xl p-8 sm:p-14 border border-line-bright mb-16 space-y-6 text-base sm:text-lg text-steel leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-signal/5 blur-3xl rounded-full pointer-events-none" />
            <div className="relative">
              <p>
                Modern businesses often face a common dilemma: off-the-shelf software doesn&apos;t fit
                their unique workflows, but hiring an in-house engineering department is slow, costly,
                and complex.
              </p>
              <p>
                <strong className="text-star font-semibold">TechKnox was founded to bridge that gap.</strong>{' '}
                We operate as an agile, high-caliber engineering partner. Whether you need a customer portal,
                an intelligent automation pipeline, or an API bridge between disconnected systems, we design
                and build software tailored strictly around your operational needs.
              </p>
              <p>
                We don&apos;t sell bloated generic templates or chase short-lived tech fads. We focus on
                clean architecture, reliable integrations, fast performance, and code you truly own.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Core Principles */}
        <div className="mb-16">
          <ScrollReveal>
            <SectionHeader
              badge="Engineering Standards"
              title="Our core operating principles"
              description="The values that guide every line of code and architectural decision we make."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Problem-First, Not Tech-First',
                desc: 'We start by diagnosing your actual workflow bottleneck. The technology stack is chosen solely to solve that problem efficiently, securely, and cost-effectively.',
                accent: 'bg-signal/10 border-signal/20 text-signal'
              },
              {
                title: 'Full Intellectual Property Ownership',
                desc: 'You own 100% of the custom source code, database architectures, and digital assets we build for your project. No recurring per-seat fees or lock-ins.',
                accent: 'bg-accent-emerald/10 border-accent-emerald/20 text-accent-emerald'
              },
              {
                title: 'Milestone-Driven Transparency',
                desc: 'We build in rapid, reviewable milestones. You test working software early, inspect the progress, and provide feedback every step of the way.',
                accent: 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan'
              },
              {
                title: 'Security & Production Resiliency',
                desc: 'From strict environment secret isolation to encrypted database schemas and robust API retry algorithms, our solutions are built for high availability.',
                accent: 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple'
              }
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 70}>
                <div className="glass-card rounded-2xl p-8 border border-line glass-card-hover h-full">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${item.accent}`}>
                    <CheckIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-star mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-steel leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Technology Foundation */}
        <ScrollReveal>
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-line-bright mb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-tech-grid opacity-20 rounded-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold text-star mb-3">
                Our Technology Foundation
              </h2>
              <p className="text-steel text-sm sm:text-base mb-8">
                We build with proven modern technologies optimized for speed, maintainability, and developer ergonomics:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                {[
                  { label: 'Frontend', color: 'text-signal', stack: 'React · Next.js · TypeScript · Tailwind CSS' },
                  { label: 'Backend & APIs', color: 'text-accent-purple', stack: 'Node.js · Python · FastAPI · REST · GraphQL' },
                  { label: 'Data & Storage', color: 'text-accent-cyan', stack: 'PostgreSQL · Supabase · Redis · pgvector' },
                  { label: 'AI & Pipelines', color: 'text-accent-emerald', stack: 'Claude · OpenAI · LangChain · n8n · Docker' }
                ].map(({ label, color, stack }) => (
                  <div key={label} className="p-4 rounded-xl bg-ink/60 dark:bg-ink-900/80 border border-line hover:border-line-bright transition-colors duration-200">
                    <div className={`font-semibold mb-2 ${color}`}>{label}</div>
                    <div className="text-steel leading-relaxed">{stack}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="rounded-3xl border border-line-bright bg-gradient-to-b from-panel/90 to-ink/80 p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-signal/10 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute inset-0 bg-tech-grid opacity-15 rounded-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-4">
                Want to collaborate on your next digital build?
              </h2>
              <p className="max-w-xl mx-auto text-steel text-sm sm:text-base mb-8">
                Let&apos;s discuss your requirements and draft a clear, actionable plan.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/request-a-solution"
                  className="btn-primary inline-flex items-center gap-2 rounded-xl bg-signal px-8 py-4 font-mono text-sm font-semibold text-white shadow-signal-md transition hover:bg-signal-hover hover:shadow-signal-lg active:scale-[0.97]"
                >
                  <span>Start a Project</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-line-bright bg-panel/70 backdrop-blur-sm px-7 py-4 font-mono text-sm font-medium text-star transition hover:border-signal/40"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
