import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getServices,
  getSolutions,
  getProjects,
  getProcessSteps,
  getCompanyProfile
} from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ServiceIconMapper, ArrowRightIcon, CheckIcon, WhatsAppIcon } from '@/components/Icons';
import HeroGraphic from '@/components/HeroGraphic';
import ScrollReveal from '@/components/ScrollReveal';
import { TechStackLogo } from '@/components/TechIcons';

export const metadata: Metadata = {
  title: 'TechKnox — Software Solutions, AI & Business Automation',
  description:
    'TechKnox designs and builds custom software, AI-powered automation, and API integrations that solve real business problems.'
};

export const revalidate = 3600;

export default async function HomePage() {
  const [profile, services, solutions, projects, steps] = await Promise.all([
    getCompanyProfile(),
    getServices(),
    getSolutions(),
    getProjects(),
    getProcessSteps()
  ]);

  const featuredProjects = projects.filter((p) => p.is_featured);
  const primaryProject = featuredProjects[0] || projects[0];
  const secondaryProjects = (featuredProjects.length > 1 ? featuredProjects.slice(1, 4) : projects.slice(1, 4));

  const techStackList = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'AI & Data' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Supabase', category: 'Backend/Auth' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'AWS', category: 'Cloud' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ================================================================== */}
      {/* 1. HERO                                                             */}
      {/* ================================================================== */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 border-b border-line bg-panel overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 text-left max-w-2xl">
              <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-md border border-line bg-ink-800 text-[11px] sm:text-xs font-mono font-semibold text-signal mb-6 max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                <span>Software Solutions · AI · Business Automation · API Integration</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-star leading-[1.12] mb-6">
                Technology that works for your business.
              </h1>

              <p className="text-base sm:text-lg text-steel leading-relaxed mb-8 max-w-xl">
                We engineer custom software applications, AI-powered automation pipelines, and API integrations that eliminate repetitive work and make your systems communicate seamlessly.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/request-a-solution"
                  id="hero-cta-primary"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-signal-hover transition active:scale-[0.98]"
                >
                  <span>Start a Project</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="/services"
                  id="hero-cta-secondary"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-panel px-6 py-3.5 text-sm font-medium text-star hover:bg-ink-800 transition"
                >
                  <span>Explore Services</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-8 mt-8 border-t border-line text-xs font-medium text-steel">
                <div className="p-2 sm:p-0">
                  <span className="block font-bold text-star text-sm">Custom Code</span>
                  <span>100% Client Owned</span>
                </div>
                <div className="p-2 sm:p-0">
                  <span className="block font-bold text-star text-sm">Direct Engineering</span>
                  <span>No Template Lock-in</span>
                </div>
                <div className="p-2 sm:p-0">
                  <span className="block font-bold text-star text-sm">Production Ready</span>
                  <span>Tested &amp; Scalable</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <HeroGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. INTRODUCTION / POSITIONING STATEMENT                             */}
      {/* ================================================================== */}
      <section className="py-16 px-4 sm:px-6 border-b border-line bg-ink-800/60">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-3">
              Our Core Philosophy
            </p>
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-star leading-snug tracking-tight">
              Technology should solve real problems, simplify everyday operations, and create better ways of working.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. THREE CORE SERVICE PILLARS                                       */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              badge="Services"
              title="Comprehensive technology capabilities"
              description="We design and build systems across three core pillars to help businesses modernize their software and automate repetitive tasks."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pillar 01 */}
            <ScrollReveal className="rounded-xl border border-line bg-panel p-8 flex flex-col justify-between hover:border-line-bright transition shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-signal font-bold font-mono text-xs mb-6">
                  01
                </div>
                <h3 className="font-display text-2xl font-bold text-star mb-3">Software Solutions</h3>
                <p className="text-sm text-steel leading-relaxed mb-6">
                  Custom web applications, business dashboards, and tailored software designed around specific operational workflows.
                </p>
                <ul className="space-y-2 text-xs text-steel border-t border-line pt-4">
                  {['Web Applications', 'Mobile Applications', 'Custom Business Software', 'Dashboards & Analytics', 'CRM Systems & Customer Portals'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-line">
                <Link href="/services/web-app-development" className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:underline">
                  <span>Explore Software Solutions</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Pillar 02 */}
            <ScrollReveal delay={80} className="rounded-xl border border-line bg-panel p-8 flex flex-col justify-between hover:border-line-bright transition shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-signal font-bold font-mono text-xs mb-6">
                  02
                </div>
                <h3 className="font-display text-2xl font-bold text-star mb-3">AI &amp; Automation</h3>
                <p className="text-sm text-steel leading-relaxed mb-6">
                  AI-powered automation for repetitive operational processes, intelligent chatbots, and document parsing workflows.
                </p>
                <ul className="space-y-2 text-xs text-steel border-t border-line pt-4">
                  {['AI Agents & Assistants', 'Business Workflow Automation', 'Document & Invoice OCR', 'Lead Routing & Qualification', 'n8n & Custom Event Triggers'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-line">
                <Link href="/services/ai-automation" className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:underline">
                  <span>Explore AI &amp; Automation</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Pillar 03 */}
            <ScrollReveal delay={160} className="rounded-xl border border-line bg-panel p-8 flex flex-col justify-between hover:border-line-bright transition shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-signal font-bold font-mono text-xs mb-6">
                  03
                </div>
                <h3 className="font-display text-2xl font-bold text-star mb-3">API &amp; System Integration</h3>
                <p className="text-sm text-steel leading-relaxed mb-6">
                  API integration connecting the third-party platforms, CRMs, payment gateways, and databases already used by your team.
                </p>
                <ul className="space-y-2 text-xs text-steel border-t border-line pt-4">
                  {['Custom API Integration', 'Third-Party Webhooks & Sync', 'Payment Gateway Integration', 'Database Connectors', 'Cloud System Connectivity'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-line">
                <Link href="/services/api-integration" className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:underline">
                  <span>Explore API Integrations</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. TECHNOLOGY STACK                                                 */}
      {/* ================================================================== */}
      <section className="py-16 px-4 sm:px-6 border-b border-line bg-ink-800/40">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-2">
              Technology Stack
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-star">
              Built with industry-standard technologies
            </h2>
            <p className="text-sm text-steel mt-2">
              We engineer with maintainable, reliable tools chosen for performance and long-term security.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-3 text-center">
            {techStackList.map((t) => (
              <div
                key={t.name}
                className="p-2.5 sm:p-4 rounded-lg border border-line bg-panel hover:border-line-bright transition flex flex-col items-center justify-center gap-1.5 sm:gap-2 shadow-sm min-w-0 overflow-hidden"
              >
                <TechStackLogo name={t.name} className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-[11px] sm:text-xs font-semibold text-star truncate max-w-full">{t.name}</span>
                <span className="text-[9px] sm:text-[10px] text-steeldim truncate max-w-full">{t.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. BUSINESS PROBLEMS & SOLUTIONS MATRIX                             */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              badge="Problem Solving"
              title="Technology for real business challenges"
              description="Common operational bottlenecks and how we engineer practical solutions to resolve them."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                problem: 'Too much manual work?',
                solution: 'Workflow Automation',
                desc: 'Automate multi-step data entry, status updates, and notifications across your teams.',
                link: '/services/ai-automation'
              },
              {
                problem: "Systems don't communicate?",
                solution: 'API & System Integration',
                desc: 'Connect your CRM, payment processors, spreadsheets, and databases into a unified flow.',
                link: '/services/api-integration'
              },
              {
                problem: 'Need a custom business platform?',
                solution: 'Custom Software Development',
                desc: 'Web applications and customer portals built specifically for your exact business requirements.',
                link: '/services/web-app-development'
              },
              {
                problem: 'Want AI inside existing operations?',
                solution: 'AI Agents & Document Automation',
                desc: 'Add AI capabilities to categorize inquiries, extract document data, and assist support staff.',
                link: '/services/ai-automation'
              },
              {
                problem: 'Need better operational visibility?',
                solution: 'Dashboards & Reporting',
                desc: 'Consolidated real-time metrics and executive dashboards that show key KPIs at a glance.',
                link: '/services/business-dashboards'
              },
              {
                problem: 'Legacy spreadsheets causing errors?',
                solution: 'Custom Database & Web Portals',
                desc: 'Transition fragile manual spreadsheets into secure, permission-controlled database systems.',
                link: '/services/custom-software'
              }
            ].map((card, i) => (
              <ScrollReveal key={card.problem} delay={i * 50}>
                <div className="rounded-xl border border-line bg-panel p-6 h-full flex flex-col justify-between hover:border-line-bright hover:shadow-md transition">
                  <div>
                    <span className="inline-block font-mono text-xs font-bold text-signal mb-2">
                      {card.problem}
                    </span>
                    <h3 className="font-display text-lg font-bold text-star mb-2">
                      → {card.solution}
                    </h3>
                    <p className="text-xs text-steel leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-line">
                    <Link href={card.link} className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:underline">
                      <span>View Capability</span>
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
      {/* 6. AUTOMATION SHOWCASE DIAGRAM                                      */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-line bg-ink-800/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-2">
              Workflow Demonstration
            </p>
            <h2 className="font-display text-3xl font-bold text-star">
              How business automation works in practice
            </h2>
            <p className="text-sm text-steel mt-2">
              A sample event-driven pipeline bridging customer input with internal team actions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              { step: '01', title: 'Customer Enquiry', sub: 'Web Form / WhatsApp', color: 'border-line' },
              { step: '02', title: 'AI Processing', sub: 'Parser & Enrichment', color: 'border-signal/40 bg-signal/5' },
              { step: '03', title: 'Qualification', sub: 'Rule Evaluation', color: 'border-line' },
              { step: '04', title: 'CRM Sync', sub: 'Database Record Added', color: 'border-line' },
              { step: '05', title: 'Team Alert', sub: 'Instant Notification', color: 'border-line' },
              { step: '06', title: 'Follow-up', sub: 'Automated Response', color: 'border-emerald-500/40 bg-emerald-500/5' }
            ].map((node, idx) => (
              <div
                key={node.step}
                className={`rounded-xl border ${node.color} bg-panel p-5 text-center flex flex-col justify-between shadow-sm relative`}
              >
                <div>
                  <span className="font-mono text-[10px] font-bold text-signal block mb-1">
                    Step {node.step}
                  </span>
                  <p className="font-display text-sm font-bold text-star">{node.title}</p>
                  <p className="text-[11px] text-steeldim mt-1">{node.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. FEATURED WORK (REAL PROJECTS ONLY)                               */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <ScrollReveal>
              <SectionHeader
                badge="Portfolio"
                title="Featured projects &amp; case studies"
                description="Real software architectures, custom portals, and automated systems built by TechKnox."
                className="mb-0 md:mb-0"
              />
            </ScrollReveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:underline shrink-0"
            >
              <span>View All Projects</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Featured Project */}
            {primaryProject && (
              <div className="lg:col-span-7 rounded-xl border border-line bg-panel p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                      Featured System
                    </span>
                    {primaryProject.is_demo && (
                      <span className="px-2.5 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-[10px] font-mono text-amber-600 font-medium">
                        Concept Build
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-star mb-3">
                    {primaryProject.name}
                  </h3>
                  <p className="text-sm sm:text-base text-steel leading-relaxed mb-6">
                    {primaryProject.short_description}
                  </p>
                  {primaryProject.problem && (
                    <div className="p-4 rounded-lg bg-ink-800 border border-line mb-6 text-xs text-steel space-y-1">
                      <span className="font-bold text-star block">Challenge Addressed:</span>
                      <p>{primaryProject.problem}</p>
                    </div>
                  )}
                </div>

                <div>
                  {primaryProject.technologies && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {primaryProject.technologies.slice(0, 5).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded border border-line bg-ink-800 text-[10px] font-mono text-steel">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/projects/${primaryProject.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-signal-hover transition"
                  >
                    <span>View Case Breakdown</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Secondary Projects List */}
            <div className="lg:col-span-5 space-y-4">
              {secondaryProjects.map((project) => (
                <div key={project.id} className="rounded-xl border border-line bg-panel p-6 shadow-sm hover:border-line-bright transition">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase text-signal font-semibold">
                      {project.project_type || 'Software System'}
                    </span>
                    {project.is_demo && (
                      <span className="px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-[9px] font-mono text-amber-600">
                        Concept
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-lg font-bold text-star mb-1">
                    {project.name}
                  </h4>
                  <p className="text-xs text-steel leading-relaxed mb-4">
                    {project.short_description}
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-signal hover:underline"
                  >
                    <span>Read Details</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. HOW WE WORK (PROCESS)                                            */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-line bg-ink-800/40">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              badge="Execution"
              title="How we work with you"
              description="A clear, milestone-based development process from discovery through handover."
              align="center"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Understand', desc: 'We analyze your business workflows, operational friction, and exact system requirements.' },
              { num: '02', title: 'Plan & Architect', desc: 'We design the system architecture, database schema, data flows, and project milestones.' },
              { num: '03', title: 'Build & Integrate', desc: 'We engineer the software with clean code, testing, and third-party API integrations.' },
              { num: '04', title: 'Launch & Handover', desc: 'Production deployment, team onboarding, and complete ownership transfer of custom assets.' }
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 60}>
                <div className="rounded-xl border border-line bg-panel p-6 shadow-sm h-full flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-md bg-ink-800 border border-line flex items-center justify-center font-mono text-xs font-bold text-signal mb-4">
                      {step.num}
                    </span>
                    <h3 className="font-display text-lg font-bold text-star mb-2">{step.title}</h3>
                    <p className="text-xs text-steel leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. WHY TECHKNOX                                                     */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              badge="Why Choose Us"
              title="A serious engineering partner for your business"
              description="Four principles that define how we deliver high-quality technology solutions."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Business-Focused Solutions',
                desc: 'We select technology to solve your actual workflow bottleneck — not to satisfy tech trends.'
              },
              {
                title: 'Custom Architectures',
                desc: 'Tailored systems built around your specific operational requirements and data models.'
              },
              {
                title: 'Modern & Maintainable',
                desc: 'Clean, documented code using industry standards so future maintenance is straightforward.'
              },
              {
                title: 'Transparent Process',
                desc: 'Clear scope, weekly milestones, direct communication, and 100% intellectual property ownership.'
              }
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60}>
                <div className="rounded-xl border border-line bg-panel p-6 shadow-sm h-full">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-base font-bold text-star mb-2">{item.title}</h3>
                  <p className="text-xs text-steel leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 10. REACH OUT / FINAL CONTACT BANNER                                */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-ink-800">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-line bg-panel p-8 sm:p-14 text-center shadow-sm">
            <p className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-3">
              Get In Touch
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-star mb-4">
              Let&apos;s discuss your project.
            </h2>
            <p className="max-w-lg mx-auto text-sm sm:text-base text-steel leading-relaxed mb-8">
              Tell us what you are trying to build, improve, or automate. We will provide an honest architectural evaluation and scoping proposal.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-full">
              <Link
                href="/request-a-solution"
                id="footer-start-project-btn"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-semibold text-white shadow-sm hover:bg-signal-hover transition active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/918310179301?text=Hi%20TechKnox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 sm:px-5 py-3 sm:py-3.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-500/20 transition"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-panel px-4 sm:px-5 py-3 sm:py-3.5 text-xs font-medium text-star hover:bg-ink-800 transition max-w-full truncate"
                >
                  <span className="truncate">Email: {profile.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
