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
import HeroGraphic from '@/components/HeroGraphic';
import {
  ServiceIconMapper,
  ArrowRightIcon,
  CheckIcon,
  WhatsAppOutlineIcon,
  GlobeIcon,
  SparklesIcon,
  MobileAppIcon,
  ChartIcon
} from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';
import { TechStackLogo } from '@/components/TechIcons';

export const metadata: Metadata = {
  title: 'Teknox — Modern Software, AI Automation & Scalable Systems',
  description:
    'Teknox transforms ambitious ideas into high-performance web applications, automation pipelines, and scalable software systems.'
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

  const capabilityCards = [
    {
      title: 'Web & App Development',
      description: 'Ultra-fast web platforms, client dashboards, responsive portals, and cross-platform mobile apps built with clean architecture.',
      icon: GlobeIcon,
      link: '/services/web-app-development',
      tag: 'Full-Stack'
    },
    {
      title: 'AI & Workflow Automation',
      description: 'Intelligent pipelines, document extraction, and event-driven automation that eliminate manual operational bottlenecks.',
      icon: SparklesIcon,
      link: '/services/ai-automation',
      tag: 'Intelligent Ops'
    },
    {
      title: 'Custom Software & APIs',
      description: 'Bespoke backend architectures, third-party system integrations, and scalable database schemas engineered for growth.',
      icon: MobileAppIcon,
      link: '/services/custom-software',
      tag: 'Enterprise Code'
    },
    {
      title: 'Data & Dashboards',
      description: 'Consolidated real-time analytics, operational telemetry, and executive KPI intelligence designed for clear decisions.',
      icon: ChartIcon,
      link: '/services/business-dashboards',
      tag: 'BI & Metrics'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-white dark:bg-ink text-slate-900 dark:text-star">
      {/* ================================================================== */}
      {/* 1. HERO SECTION: CLASSIC AIRY STARTUP WITH LIGHT AMBIENCE          */}
      {/* ================================================================== */}
      <section className="relative pt-12 pb-16 sm:pt-18 sm:pb-24 px-4 sm:px-6 border-b border-slate-200/80 dark:border-line bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-ink-900 dark:via-ink dark:to-ink-800 overflow-hidden">
        {/* Subtle Ambient Radial Mesh */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-tr from-indigo-500/8 via-cyan-500/5 to-purple-500/6 blur-3xl" />
          <div className="absolute inset-0 bg-dots opacity-40 dark:opacity-20" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 max-w-2xl text-left">
              {/* Modern Startup Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200/80 dark:border-indigo-800/40 bg-indigo-50/80 dark:bg-indigo-950/50 backdrop-blur-xs text-[11px] sm:text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                <span>Next-Generation Software &amp; AI Studio</span>
                <span className="text-indigo-400">|</span>
                <span className="font-normal text-slate-600 dark:text-slate-300">Custom Engineering</span>
              </div>

              {/* High-Impact Headline */}
              <h1 className="font-display text-3.5xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.12] mb-6">
                Where Ambitious Ideas
                <br />
                Evolve Into <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Digital Innovation.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-xl font-normal">
                <strong className="font-semibold text-slate-900 dark:text-white">Teknox</strong> engineers custom web applications, AI automation pipelines, third-party integrations, and scalable business software tailored to your exact operational requirements.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
                <Link
                  href="/request-a-solution"
                  id="hero-cta-primary"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:shadow-indigo-500/25 hover:shadow-md transition-all duration-200"
                >
                  <span>Start a Project</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/services"
                  id="hero-cta-secondary"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-line bg-white dark:bg-panel hover:bg-slate-50 dark:hover:bg-ink-800 active:scale-[0.98] px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-star shadow-2xs hover:border-slate-300 transition-all duration-200"
                >
                  <span>Explore Capabilities</span>
                </Link>
              </div>

              {/* Startup Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-line grid grid-cols-3 gap-3 text-left">
                <div>
                  <div className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">99.98%</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-steeldim">Target SLA Uptime</div>
                </div>
                <div>
                  <div className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">2x Faster</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-steeldim">Time to Deployment</div>
                </div>
                <div>
                  <div className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">100% Client</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-steeldim">Source Code Ownership</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive SaaS Console / System Architecture Illustration */}
            <div className="lg:col-span-5 w-full">
              <HeroGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. ABOUT US SECTION & CORE CAPABILITIES MATRIX                     */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-b border-slate-200/80 dark:border-line bg-slate-50/50 dark:bg-ink">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <span className="inline-block font-mono text-[11px] sm:text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold mb-2">
                CORE CAPABILITIES
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Building Technology That Powers Modern Business
              </h2>
              <div className="w-12 h-[3px] rounded-full bg-indigo-600/80 mx-auto my-4" />
              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
                Teknox is an engineering studio helping businesses turn complex workflows into scalable digital solutions. From custom platforms and API integrations to intelligent automation, we combine reliable code with practical business strategy.
              </p>
            </div>
          </ScrollReveal>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {capabilityCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <ScrollReveal
                  key={card.title}
                  delay={idx * 60}
                  className="rounded-2xl border border-slate-200/90 dark:border-line bg-white dark:bg-panel p-5 sm:p-6 flex flex-col justify-between hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-[0_12px_30px_-6px_rgba(79,70,229,0.12)] hover:-translate-y-1 transition-all duration-200 group"
                >
                  <div>
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl border border-indigo-100 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200 shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] uppercase font-semibold text-slate-400 dark:text-steeldim">
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed mb-5 font-normal">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-line">
                    <Link
                      href={card.link}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group-hover:underline"
                    >
                      <span>Explore details</span>
                      <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. TECHNOLOGY STACK                                                 */}
      {/* ================================================================== */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 border-b border-slate-200/80 dark:border-line bg-white dark:bg-panel">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
              Engineering Stack
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-star">
              Built with industry-standard technologies
            </h2>
            <p className="text-sm text-slate-600 dark:text-steel mt-2 font-normal">
              We build maintainable, battle-tested software designed for security, performance, and long-term stability.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5 sm:gap-3 text-center">
            {techStackList.map((t) => (
              <div
                key={t.name}
                className="p-3 sm:p-4 rounded-xl border border-slate-200/80 dark:border-line bg-slate-50/60 dark:bg-ink-800 hover:bg-white dark:hover:bg-panel hover:border-slate-300 hover:shadow-2xs transition flex flex-col items-center justify-center gap-1.5 sm:gap-2 min-w-0 overflow-hidden"
              >
                <TechStackLogo name={t.name} className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-star truncate max-w-full">{t.name}</span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-steeldim truncate max-w-full">{t.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. BUSINESS PROBLEMS & SOLUTIONS MATRIX                             */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-line bg-slate-50/40 dark:bg-ink">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              badge="Problem Solving"
              title="Technology for real business challenges"
              description="Common operational bottlenecks and how we engineer practical, high-impact solutions to resolve them."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                problem: 'Too much manual work?',
                solution: 'Workflow Automation',
                desc: 'Automate multi-step data entry, document validation, and notifications across your teams.',
                link: '/services/ai-automation'
              },
              {
                problem: "Systems don't communicate?",
                solution: 'API & System Integration',
                desc: 'Connect your CRM, payment processors, spreadsheets, and databases into a unified, reliable flow.',
                link: '/services/api-integration'
              },
              {
                problem: 'Need a custom business platform?',
                solution: 'Custom Web & Mobile Apps',
                desc: 'Web applications and customer portals built specifically for your exact business requirements.',
                link: '/services/web-app-development'
              },
              {
                problem: 'Want AI inside existing operations?',
                solution: 'AI Agents & Document Automation',
                desc: 'Add AI capabilities to categorize inquiries, extract invoice data, and assist support teams.',
                link: '/services/ai-automation'
              },
              {
                problem: 'Need better operational visibility?',
                solution: 'Dashboards & Reporting',
                desc: 'Consolidated real-time metrics and executive dashboards that display key KPIs at a glance.',
                link: '/services/business-dashboards'
              },
              {
                problem: 'Legacy spreadsheets causing errors?',
                solution: 'Custom Database & Portals',
                desc: 'Transition fragile manual spreadsheets into secure, permission-controlled relational databases.',
                link: '/services/custom-software'
              }
            ].map((card, i) => (
              <ScrollReveal key={card.problem} delay={i * 50}>
                <div className="rounded-2xl border border-slate-200/80 dark:border-line bg-white dark:bg-panel p-6 h-full flex flex-col justify-between hover:border-slate-300 dark:hover:border-line-bright hover:shadow-md transition">
                  <div>
                    <span className="inline-block font-mono text-xs font-bold text-indigo-600 dark:text-signal mb-2">
                      {card.problem}
                    </span>
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-star mb-2">
                      → {card.solution}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-steel leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-line">
                    <Link href={card.link} className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-signal hover:underline">
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
      {/* 5. WORKFLOW DEMONSTRATION DIAGRAM                                   */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-line bg-white dark:bg-panel">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-mono text-xs uppercase tracking-wider text-indigo-600 dark:text-signal font-semibold mb-2">
              Workflow Architecture
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-star">
              How business automation works in practice
            </h2>
            <p className="text-sm text-slate-600 dark:text-steel mt-2 font-normal">
              A sample event-driven pipeline bridging customer input with internal team actions in milliseconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              { step: '01', title: 'Customer Enquiry', sub: 'Web Form / WhatsApp', color: 'border-slate-200 dark:border-line' },
              { step: '02', title: 'AI Processing', sub: 'Parser & Enrichment', color: 'border-indigo-300 dark:border-signal/40 bg-indigo-50/50 dark:bg-signal/5' },
              { step: '03', title: 'Qualification', sub: 'Rule Evaluation', color: 'border-slate-200 dark:border-line' },
              { step: '04', title: 'CRM Sync', sub: 'Database Record Added', color: 'border-slate-200 dark:border-line' },
              { step: '05', title: 'Team Alert', sub: 'Instant Notification', color: 'border-slate-200 dark:border-line' },
              { step: '06', title: 'Follow-up', sub: 'Automated Response', color: 'border-emerald-300 dark:border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-500/5' }
            ].map((node) => (
              <div
                key={node.step}
                className={`rounded-xl border ${node.color} bg-white dark:bg-panel p-5 text-center flex flex-col justify-between shadow-2xs relative`}
              >
                <div>
                  <span className="font-mono text-[10px] font-bold text-indigo-600 dark:text-signal block mb-1">
                    Step {node.step}
                  </span>
                  <p className="font-display text-sm font-bold text-slate-900 dark:text-star">{node.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-steeldim mt-1 font-normal">{node.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. FEATURED PROJECTS / CASE STUDIES                                 */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-line bg-slate-50/40 dark:bg-ink">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <ScrollReveal>
              <SectionHeader
                badge="Portfolio"
                title="Featured systems &amp; case studies"
                description="Real software architectures, custom portals, and automated systems built by Teknox."
                className="mb-0 md:mb-0"
              />
            </ScrollReveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-signal hover:underline shrink-0"
            >
              <span>View All Projects</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Featured Project */}
            {primaryProject && (
              <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 dark:border-line bg-white dark:bg-panel p-8 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-indigo-600 dark:text-signal font-semibold">
                      Featured System
                    </span>
                    {primaryProject.is_demo && (
                      <span className="px-2.5 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-[10px] font-mono text-amber-700 dark:text-amber-500 font-medium">
                        Concept Build
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-star mb-3">
                    {primaryProject.name}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-steel leading-relaxed mb-6 font-normal">
                    {primaryProject.short_description}
                  </p>
                  {primaryProject.problem && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-ink-800 border border-slate-200/70 dark:border-line mb-6 text-xs text-slate-700 dark:text-steel space-y-1">
                      <span className="font-bold text-slate-900 dark:text-star block">Challenge Addressed:</span>
                      <p>{primaryProject.problem}</p>
                    </div>
                  )}
                </div>

                <div>
                  {primaryProject.technologies && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {primaryProject.technologies.slice(0, 5).map((tech) => (
                        <span key={tech} className="px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-line bg-slate-50 dark:bg-ink-800 text-[11px] font-mono text-slate-700 dark:text-steel">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/projects/${primaryProject.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition"
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
                <div key={project.id} className="rounded-2xl border border-slate-200/80 dark:border-line bg-white dark:bg-panel p-6 shadow-2xs hover:border-slate-300 dark:hover:border-line-bright transition">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase text-indigo-600 dark:text-signal font-semibold">
                      {project.project_type || 'Software System'}
                    </span>
                    {project.is_demo && (
                      <span className="px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-[9px] font-mono text-amber-700 dark:text-amber-500">
                        Concept
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-lg font-bold text-slate-900 dark:text-star mb-1">
                    {project.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-steel leading-relaxed mb-4 font-normal">
                    {project.short_description}
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-signal hover:underline"
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
      {/* 7. EXECUTION ROADMAP                                                */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-line bg-white dark:bg-panel">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              badge="Execution"
              title="How we work with you"
              description="A clear, milestone-based development process from discovery through production deployment."
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
                <div className="rounded-2xl border border-slate-200/80 dark:border-line bg-slate-50/50 dark:bg-ink-800 p-6 shadow-2xs h-full flex flex-col justify-between">
                  <div>
                    <span className="w-9 h-9 rounded-lg bg-white dark:bg-panel border border-slate-200 dark:border-line flex items-center justify-center font-mono text-xs font-bold text-indigo-600 dark:text-signal mb-4 shadow-2xs">
                      {step.num}
                    </span>
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-star mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-steel leading-relaxed font-normal">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. WHY TEKNOX PRINCIPLES                                           */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-line bg-slate-50/40 dark:bg-ink">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              badge="Why Choose Us"
              title="A serious engineering partner for your business"
              description="Four core principles that define how we deliver high-quality technology solutions."
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
                desc: 'Tailored systems built around your specific operational requirements and proprietary data models.'
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
                <div className="rounded-2xl border border-slate-200/80 dark:border-line bg-white dark:bg-panel p-6 shadow-2xs h-full">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-star mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-steel leading-relaxed font-normal">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. FINAL CTA BANNER                                                */}
      {/* ================================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white dark:bg-ink border-t border-slate-200/80 dark:border-line">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-200/90 dark:border-line bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 dark:bg-panel p-8 sm:p-12 text-center shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-200/80 dark:border-indigo-800/40 bg-indigo-50 dark:bg-indigo-950/50 text-[10px] sm:text-xs font-mono uppercase tracking-wider font-semibold text-indigo-700 dark:text-indigo-400 mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Get In Touch</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 dark:text-star mb-3">
              Let&apos;s discuss your project.
            </h2>
            <p className="max-w-lg mx-auto text-sm sm:text-base text-slate-600 dark:text-steel leading-relaxed mb-8 font-normal">
              Tell us what you are trying to build, improve, or automate. We will provide an honest architectural evaluation and scoping proposal.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 max-w-full">
              <Link
                href="/request-a-solution"
                id="footer-start-project-btn"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3.5 text-xs font-semibold text-white shadow-xs transition-colors active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/918310179301?text=Hi%20teknox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-5 py-3.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
              >
                <WhatsAppOutlineIcon className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-line bg-white dark:bg-panel px-5 py-3.5 text-xs font-medium text-slate-800 dark:text-star hover:bg-slate-50 hover:border-slate-300 transition-colors max-w-full truncate"
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
