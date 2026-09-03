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
import {
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
  title: 'Teknox — Where Ideas Become Digital Solutions',
  description:
    'Teknox transforms ambitious ideas into high-performance web applications, AI automation pipelines, and scalable software systems.'
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
    { name: 'AWS', category: 'Cloud' },
    { name: 'GraphQL', category: 'API' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Redis', category: 'Caching' }
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
    <div className="relative overflow-hidden bg-black text-white selection:bg-zinc-800 selection:text-white">
      {/* ================================================================== */}
      {/* 1. HERO SECTION: ONREVV STYLE WITH WORD-BY-WORD ANIMATION          */}
      {/* ================================================================== */}
      <section className="relative w-full min-h-screen flex flex-col justify-center bg-black text-white px-6 md:px-12 pt-28 pb-16 overflow-hidden">
        {/* Background glow orbs matching onrevv.com */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-indigo-500/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none select-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none select-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto py-12 md:py-20 flex flex-col items-center text-center">
          {/* Tagline / Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-violet-400 mb-8 shadow-xs hero-fade-in">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span>Next-Generation Software &amp; AI Studio</span>
          </div>

          {/* Staggered Word Reveal Display Headline (Strictly 2 Lines, Larger Typography) */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.25rem] 2xl:text-[7rem] font-extrabold tracking-tight leading-[1.05] text-white w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center mb-10 gap-1 sm:gap-3"
            style={{ perspective: 1000 }}
          >
            {/* Line 1: Where Ideas Become */}
            <span className="inline-flex items-center justify-center whitespace-nowrap">
              <span className="inline-block overflow-hidden py-1">
                <span className="inline-block animate-word text-white delay-100">
                  Where
                </span>
                <span className="inline-block select-none">&nbsp;</span>
              </span>
              <span className="inline-block overflow-hidden py-1">
                <span className="inline-block animate-word text-white delay-200">
                  Ideas
                </span>
                <span className="inline-block select-none">&nbsp;</span>
              </span>
              <span className="inline-block overflow-hidden py-1">
                <span className="inline-block animate-word text-white delay-300">
                  Become
                </span>
              </span>
            </span>

            {/* Line 2: Digital Solutions */}
            <span className="inline-flex items-center justify-center whitespace-nowrap">
              <span className="inline-block overflow-hidden py-1">
                <span className="inline-block animate-word bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent delay-400">
                  Digital
                </span>
                <span className="inline-block select-none">&nbsp;</span>
              </span>
              <span className="inline-block overflow-hidden py-1">
                <span className="inline-block animate-word bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent delay-500">
                  Solutions
                </span>
              </span>
            </span>
          </h1>

          {/* Subtitle with fade in */}
          <p className="hero-fade-in delay-300 text-zinc-400 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            <strong className="text-white font-medium">Teknox</strong> engineers custom web applications, AI automation pipelines, third-party integrations, and scalable business systems tailored to your exact operational requirements.
          </p>

          {/* Dual Action Buttons (White Pill + Bordered Pill) with fade in */}
          <div className="hero-fade-in delay-450 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full sm:w-auto">
            <Link
              href="/request-a-solution"
              id="hero-cta-primary"
              className="px-8 py-4 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-zinc-200 transition-all duration-200 shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            <Link
              href="/services"
              id="hero-cta-secondary"
              className="px-8 py-4 rounded-lg border border-zinc-900 bg-black text-zinc-400 hover:text-white hover:border-zinc-800 hover:bg-zinc-950 text-xs font-semibold uppercase tracking-widest transition-all duration-200 cursor-pointer"
            >
              <span>Explore Capabilities</span>
            </Link>
          </div>

          {/* Trust / SLA Metrics Strip with fade in */}
          <div className="hero-fade-in delay-600 w-full max-w-3xl pt-10 border-t border-zinc-900 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">99.98%</div>
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-1">Target SLA Uptime</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">2x Faster</div>
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-1">Time to Deployment</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">100%</div>
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-1">Code Ownership</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. CAPABILITIES MATRIX ("HOW CAN TEKNOX HELP YOU?")                */}
      {/* ================================================================== */}
      <section className="relative w-full bg-black py-24 px-6 md:px-12 border-t border-zinc-900 overflow-hidden">
        <div className="absolute top-1/4 right-10 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none select-none" />
        <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none select-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <SectionHeader
              badge="SERVICES &amp; SOLUTIONS"
              title="How can Teknox help you?"
              highlightWord="Teknox"
              description="From custom platforms and API integrations to intelligent automation, we combine reliable code with practical business strategy."
              align="center"
            />
          </ScrollReveal>

          {/* Highlight Gradient Card (matching onrevv.com top banner) */}
          <ScrollReveal delay={150}>
            <div className="mb-10 rounded-3xl overflow-hidden border border-zinc-900 bg-gradient-to-br from-violet-600 to-indigo-900 p-8 sm:p-10 md:p-12 hover:border-zinc-800 transition-all duration-500 relative group shadow-2xl">
              <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-violet-950/60 blur-3xl pointer-events-none select-none" />
              <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-indigo-950/50 blur-3xl pointer-events-none select-none" />

              <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center justify-center space-y-5">
                <span className="inline-block font-mono text-xs uppercase tracking-widest text-violet-200 font-bold">
                  Featured Capability
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
                  Intelligent AI Automation &amp; Custom Web Systems
                </h3>
                <p className="text-violet-100/90 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
                  We engineer end-to-end automation pipelines that integrate directly into your existing CRMs, ERPs, and databases. Eliminate manual bottlenecks and scale seamlessly.
                </p>
                <div className="pt-3">
                  <Link
                    href="/services/ai-automation"
                    className="px-6 py-3.5 rounded-xl bg-white text-black hover:bg-zinc-100 font-bold text-xs uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Explore AI Automation</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 4 Capability Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilityCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={card.title} delay={idx * 80 + 100}>
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 sm:p-8 flex flex-col justify-between h-full hover:border-violet-500/40 hover:shadow-glow-violet hover:-translate-y-1 transition-all duration-300 group">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-center text-violet-400 group-hover:border-violet-500/40 group-hover:bg-violet-950/20 group-hover:text-white transition-all duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-zinc-500">
                          {card.tag}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal mb-6">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-900">
                      <Link
                        href={card.link}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-zinc-400 hover:text-white group-hover:text-violet-400 transition-colors"
                      >
                        <span>Explore details</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. TECHNOLOGY STACK MARQUEE (ONREVV STYLE AUTO-SCROLL)             */}
      {/* ================================================================== */}
      <section className="relative w-full bg-black py-24 border-t border-zinc-900 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none select-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none select-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-3 block">
                ENGINEERING FOUNDATION
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Built with battle-tested tech
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mt-4 font-normal">
                We engineer maintainable, secure software using the world&apos;s leading production frameworks.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Marquee Carousel Track with Gradient Fades on edges */}
        <div className="relative w-full overflow-hidden select-none">
          {/* Edge Blur Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-black to-transparent z-10" />

          {/* Row 1: Forward Marquee */}
          <div className="flex w-max animate-marquee gap-5 sm:gap-6 py-2">
            {[...techStackList, ...techStackList].map((t, index) => (
              <div
                key={`m1-${t.name}-${index}`}
                className="flex items-center gap-3 px-6 py-4 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:border-violet-500/40 hover:bg-zinc-900/60 transition-all duration-200 shrink-0 select-none shadow-md"
              >
                <TechStackLogo name={t.name} className="w-5 h-5 text-violet-400" />
                <span className="text-sm font-semibold text-white">{t.name}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 border-l border-zinc-800 pl-3">
                  {t.category}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2: Reverse Marquee */}
          <div className="flex w-max animate-marquee-reverse gap-5 sm:gap-6 py-2 mt-3">
            {[...techStackList.slice().reverse(), ...techStackList.slice().reverse()].map((t, index) => (
              <div
                key={`m2-${t.name}-${index}`}
                className="flex items-center gap-3 px-6 py-4 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:border-violet-500/40 hover:bg-zinc-900/60 transition-all duration-200 shrink-0 select-none shadow-md"
              >
                <TechStackLogo name={t.name} className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-semibold text-white">{t.name}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 border-l border-zinc-800 pl-3">
                  {t.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. BUSINESS PROBLEMS & SOLUTIONS MATRIX                             */}
      {/* ================================================================== */}
      <section className="relative w-full bg-black py-24 sm:py-32 px-6 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              badge="PROBLEM SOLVING"
              title="Technology for real business challenges"
              highlightWord="business challenges"
              description="Common operational bottlenecks and how we engineer practical, high-impact systems to resolve them."
              align="center"
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
              <ScrollReveal key={card.problem} delay={i * 60}>
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 h-full flex flex-col justify-between hover:border-violet-500/40 hover:shadow-glow-violet transition-all duration-300 group">
                  <div>
                    <span className="inline-block font-mono text-xs font-semibold text-violet-400 mb-3 uppercase tracking-wider">
                      {card.problem}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                      &rarr; {card.solution}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal mb-6">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-900">
                    <Link
                      href={card.link}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-zinc-400 hover:text-white group-hover:text-violet-400 transition-colors"
                    >
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
      {/* 5. WORKFLOW ARCHITECTURE FLOW                                      */}
      {/* ================================================================== */}
      <section className="relative w-full bg-black py-24 sm:py-32 px-6 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold mb-3 block">
                WORKFLOW ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                How business automation works in practice
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mt-4 font-normal">
                A sample event-driven pipeline bridging customer input with internal team actions in milliseconds.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { step: '01', title: 'Customer Enquiry', sub: 'Web Form / WhatsApp', glow: false },
              { step: '02', title: 'AI Processing', sub: 'Parser & Enrichment', glow: true },
              { step: '03', title: 'Qualification', sub: 'Rule Evaluation', glow: false },
              { step: '04', title: 'CRM Sync', sub: 'Database Record Added', glow: false },
              { step: '05', title: 'Team Alert', sub: 'Instant Notification', glow: false },
              { step: '06', title: 'Follow-up', sub: 'Automated Response', glow: true }
            ].map((node, i) => (
              <ScrollReveal key={node.step} delay={i * 50}>
                <div
                  className={`rounded-2xl border ${
                    node.glow
                      ? 'border-violet-500/40 bg-violet-950/20'
                      : 'border-zinc-900 bg-zinc-950/40'
                  } p-6 text-center flex flex-col justify-between hover:border-zinc-800 transition-all duration-200 h-full`}
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-violet-400 block mb-2">
                      Step {node.step}
                    </span>
                    <p className="text-sm font-bold text-white">{node.title}</p>
                    <p className="text-xs text-zinc-500 mt-2 font-normal">{node.sub}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. FEATURED PROJECTS / CASE STUDIES                                 */}
      {/* ================================================================== */}
      <section className="relative w-full bg-black py-24 sm:py-32 px-6 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <ScrollReveal>
              <SectionHeader
                badge="PORTFOLIO"
                title="Featured systems &amp; case studies"
                highlightWord="case studies"
                description="Real software architectures, custom portals, and automated systems built by Teknox."
                className="mb-0 md:mb-0 text-left"
                align="left"
              />
            </ScrollReveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold text-violet-400 hover:text-white shrink-0 transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Featured Project */}
            {primaryProject && (
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 sm:p-10 flex flex-col justify-between hover:border-violet-500/40 hover:shadow-glow-violet transition-all duration-300 h-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-6">
                        <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold">
                          Featured System
                        </span>
                        {primaryProject.is_demo && (
                          <span className="px-2.5 py-1 rounded border border-amber-500/30 bg-amber-500/10 text-[10px] font-mono text-amber-400 font-medium">
                            Concept Build
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                        {primaryProject.name}
                      </h3>
                      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6 font-normal">
                        {primaryProject.short_description}
                      </p>
                      {primaryProject.problem && (
                        <div className="p-5 rounded-xl bg-black border border-zinc-900 mb-6 text-xs sm:text-sm text-zinc-300 space-y-2">
                          <span className="font-bold text-white block">Challenge Addressed:</span>
                          <p className="text-zinc-400">{primaryProject.problem}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      {primaryProject.technologies && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {primaryProject.technologies.slice(0, 5).map((tech) => (
                            <span key={tech} className="px-3 py-1 rounded-lg border border-zinc-900 bg-zinc-900/40 text-xs font-mono text-zinc-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <Link
                        href={`/projects/${primaryProject.slug}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-zinc-200 transition-all duration-200 shadow-md"
                      >
                        <span>View Case Breakdown</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )}

            {/* Secondary Projects List */}
            <div className="lg:col-span-5 space-y-6">
              {secondaryProjects.map((project, idx) => (
                <ScrollReveal key={project.id} delay={idx * 80}>
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 sm:p-8 hover:border-violet-500/35 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-violet-400 font-semibold">
                        {project.project_type || 'Software System'}
                      </span>
                      {project.is_demo && (
                        <span className="px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-[9px] font-mono text-amber-400">
                          Concept
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {project.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4 font-normal">
                      {project.short_description}
                    </p>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-zinc-400 hover:text-violet-400 transition-colors"
                    >
                      <span>Read Details</span>
                      <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. EXECUTION ROADMAP                                                */}
      {/* ================================================================== */}
      <section className="relative w-full bg-black py-24 sm:py-32 px-6 md:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              badge="EXECUTION"
              title="How we work with you"
              highlightWord="work with you"
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
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 h-full flex flex-col justify-between hover:border-violet-500/40 transition-all duration-300">
                  <div>
                    <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs font-bold text-violet-400 mb-6">
                      {step.num}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. FINAL CTA BANNER (ONREVV STYLE GRADIENT BOX)                     */}
      {/* ================================================================== */}
      <section className="relative w-full bg-black py-24 sm:py-32 px-6 md:px-12 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-600 via-indigo-700 to-indigo-900 p-10 sm:p-16 text-center text-white shadow-cta-glow relative overflow-hidden">
              {/* Ambient blur inside the card */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none select-none" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="inline-block font-mono text-xs uppercase tracking-widest text-violet-200 font-semibold mb-4">
                  READY TO SCALE?
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
                  Let&apos;s build something extraordinary together.
                </h2>
                <p className="text-violet-100/90 text-sm sm:text-base leading-relaxed mb-10 font-normal">
                  Tell us what you are trying to build, automate, or improve. We will provide an honest architectural evaluation and scoping proposal.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/request-a-solution"
                    id="footer-start-project-btn"
                    className="px-8 py-4 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-zinc-100 transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Start a Project</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>

                  <a
                    href="https://wa.me/918310179301?text=Hi%20teknox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 text-xs font-semibold uppercase tracking-widest transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <WhatsAppOutlineIcon className="w-4 h-4 text-emerald-300" />
                    <span>WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
