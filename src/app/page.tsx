import Link from 'next/link';
import {
  getServices,
  getSolutions,
  getProjects,
  getProcessSteps,
  getCompanyProfile
} from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ServiceIconMapper, ArrowRightIcon, CheckIcon } from '@/components/Icons';
import HeroGraphic from '@/components/HeroGraphic';
import ScrollReveal from '@/components/ScrollReveal';

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

  return (
    <div className="relative overflow-hidden">
      {/* ==================================================================== */}
      {/* 1. HERO SECTION                                                       */}
      {/* ==================================================================== */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 px-6 border-b border-line/50 overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />

        {/* Ambient radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-hero-gradient pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[300px] bg-signal/8 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-32 right-1/4 w-[300px] h-[250px] bg-signal2/6 blur-[100px] pointer-events-none rounded-full" />

        {/* Scanline accent at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal/25 to-transparent pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* Left: Text content */}
            <div className="text-left lg:pr-4">
              {/* Status badge */}
              <div className="animate-hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-signal/30 bg-signal/8 dark:bg-signal/10 text-xs font-mono text-signal mb-7 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
                </span>
                <span className="tracking-wide">Custom Technology & Engineering Agency</span>
              </div>

              {/* Main headline */}
              <h1 className="animate-hero-text font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-star leading-[1.08] mb-6">
                We build the{' '}
                <span className="text-gradient-signal">technology</span>{' '}
                your business needs.
              </h1>

              {/* Subtitle */}
              <p className="animate-hero-subtitle text-base sm:text-lg text-steel leading-relaxed mb-9 max-w-lg">
                TechKnox designs and engineers custom web applications, AI automation systems,
                API integrations, software tools, and real-time dashboards built specifically
                around your business bottlenecks.
              </p>

              {/* CTAs */}
              <div className="animate-hero-cta flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-12">
                <Link
                  href="/request-a-solution"
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-7 py-3.5 font-mono text-sm font-semibold text-white shadow-signal-md transition-all duration-200 hover:bg-signal-hover hover:shadow-signal-lg active:scale-[0.97]"
                >
                  <span>Start a Project</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-line-bright bg-panel/70 px-7 py-3.5 font-mono text-sm font-medium text-star transition-all duration-200 hover:border-signal/40 hover:bg-panel backdrop-blur-sm"
                >
                  Explore Services
                </Link>
              </div>

              {/* Capability badges */}
              <div className="animate-hero-badges grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Web & App Dev',
                  'AI Automation',
                  'API Integration',
                  'Custom Software',
                  'Business Dashboards',
                  'CRM Systems'
                ].map((cap) => (
                  <div
                    key={cap}
                    className="py-2 px-3 rounded-lg border border-line/60 bg-panel/40 dark:bg-ink-900/60 font-mono text-xs text-steeldim text-center hover:border-signal/30 hover:text-steel transition-all duration-200 backdrop-blur-sm"
                  >
                    {cap}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero Graphic */}
            <div className="animate-hero-graphic hidden lg:flex items-center justify-center h-[480px] xl:h-[520px] relative">
              <HeroGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. WHAT WE BUILD / ARCHITECTURE HIGHLIGHT                             */}
      {/* ==================================================================== */}
      <section className="py-24 px-6 border-b border-line/50 bg-ink-900/40 relative">
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl relative">
          <ScrollReveal>
            <SectionHeader
              badge="Capabilities"
              title="Engineered around your problem, not generic templates"
              description="We solve real operational friction with tailor-made software architectures. No cookie-cutter page builders — only maintainable, high-performance technology."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'code' as const,
                color: 'signal',
                colorClass: 'bg-signal/10 border-signal/20 text-signal',
                title: 'Applications & Portals',
                desc: 'High-speed web apps, client-facing portals, and internal management tools designed with modern frameworks (Next.js, React, Node.js, Python).',
                checks: [
                  'Full code ownership',
                  'Role-based permissions (RBAC)',
                  'Sub-second response speeds'
                ]
              },
              {
                icon: 'sparkles' as const,
                color: 'purple',
                colorClass: 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple',
                title: 'AI & Intelligent Workflows',
                desc: 'Practical AI integrations that eliminate repetitive manual labor — automated document extraction, smart support triaging, and private knowledge assistants.',
                checks: [
                  'Private zero-training data policies',
                  'Automated document parsing (OCR)',
                  'Deterministic validation guards'
                ]
              },
              {
                icon: 'plug' as const,
                color: 'cyan',
                colorClass: 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan',
                title: 'API & Ecosystem Integration',
                desc: 'Resilient middleware connecting payment processors, CRMs, WhatsApp Business, ERPs, accounting software, and internal databases into a single sync engine.',
                checks: [
                  'Guaranteed event delivery queues',
                  'Automated retry & dead-letter recovery',
                  'Webhook idempotency protection'
                ]
              }
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="glass-card rounded-2xl p-8 flex flex-col justify-between glass-card-hover relative">
                  <div>
                    <div className={`icon-ring w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${item.colorClass}`}>
                      <ServiceIconMapper icon={item.icon} className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-star mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-steel leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>
                  <ul className="space-y-2 text-xs font-mono text-steeldim border-t border-line/60 pt-4">
                    {item.checks.map((c) => (
                      <li key={c} className="flex items-center gap-2">
                        <CheckIcon className="text-signal w-3.5 h-3.5 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. CORE SERVICES GRID (DYNAMIC)                                       */}
      {/* ==================================================================== */}
      <section className="py-24 px-6 border-b border-line/50">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <ScrollReveal>
              <SectionHeader
                badge="Services"
                title="Tailored technology services"
                description="Explore our dedicated engineering disciplines. Each service is fully scoped around your exact technical needs."
                className="mb-0 md:mb-0"
              />
            </ScrollReveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-mono text-sm text-signal hover:text-signal2 transition shrink-0"
            >
              <span>View all services</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 60}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group glass-card rounded-2xl p-7 flex flex-col justify-between glass-card-hover relative overflow-hidden h-full"
                >
                  {/* Subtle hover background accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-signal/0 to-signal/0 group-hover:from-signal/3 group-hover:to-signal2/3 transition-all duration-500 rounded-2xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="icon-ring w-12 h-12 rounded-xl bg-panel-light border border-line-bright flex items-center justify-center text-signal group-hover:border-signal/50 group-hover:bg-signal/10 transition-all duration-300">
                        <ServiceIconMapper icon={service.icon} className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs text-steeldim/60 font-semibold tabular-nums">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-star group-hover:text-white transition-colors duration-200 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-steel leading-relaxed mb-6">
                      {service.short_description}
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    {service.technologies && service.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {service.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                        {service.technologies.length > 3 && (
                          <span className="tech-tag">+{service.technologies.length - 3}</span>
                        )}
                      </div>
                    )}
                    <span className="card-arrow flex items-center gap-1 font-mono text-xs text-signal ml-3 shrink-0">
                      View
                      <ArrowRightIcon className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. SPOTLIGHT: API & ECOSYSTEM INTEGRATION                              */}
      {/* ==================================================================== */}
      <section className="py-24 px-6 border-b border-line/50 bg-ink-900/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/8 dark:bg-accent-cyan/10 font-mono text-xs text-accent-cyan mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                <span>INTEGRATION ARCHITECTURE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-star mb-6">
                Connect the software your business already relies on
              </h2>
              <p className="text-base text-steel leading-relaxed mb-6">
                We engineer custom API integrations and data bridges that synchronize information
                in real time. Eliminate manual copy-pasting and keep your operations unified across platforms.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'Payment Processors (Stripe, Razorpay, PayPal, Bank Webhooks)',
                  'CRM & Lead Platforms (HubSpot, Salesforce, Zoho, Pipedrive)',
                  'WhatsApp Business API & Customer Communication Flows',
                  'ERP, Inventory & Accounting Systems (QuickBooks, Xero, SAP)',
                  'E-commerce Connectors (Shopify, WooCommerce, Custom Storefronts)'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-steel">
                    <CheckIcon className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl border border-line bg-panel/40 text-xs text-steeldim font-mono mb-6">
                * TechKnox builds custom integrations using official third-party APIs and developer SDKs.
                We do not claim official corporate partnerships unless explicitly noted.
              </div>

              <Link
                href="/services/api-integration"
                className="inline-flex items-center gap-2 font-mono text-sm text-accent-cyan hover:text-white transition"
              >
                <span>Read more about API Integration</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </ScrollReveal>

            {/* Visual integration matrix */}
            <ScrollReveal className="lg:col-span-6" delay={100}>
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-line-bright shimmer-bg">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-line/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald" />
                    <span className="font-mono text-xs font-semibold text-star">TechKnox Sync Bridge</span>
                  </div>
                  <span className="font-mono text-[11px] text-accent-cyan bg-accent-cyan/10 px-2.5 py-1 rounded-md border border-accent-cyan/20">
                    Real-time Webhook Engine
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { title: 'Payment Gateways', desc: 'Stripe · Razorpay · PayPal', state: 'Active Sync', color: 'text-accent-emerald' },
                    { title: 'Customer CRMs', desc: 'HubSpot · Zoho · Salesforce', state: 'Bi-directional', color: 'text-signal' },
                    { title: 'Messaging APIs', desc: 'WhatsApp · Email · SMS', state: 'Auto-Trigger', color: 'text-accent-cyan' },
                    { title: 'Accounting & ERP', desc: 'QuickBooks · Xero · SAP', state: 'Reconciled', color: 'text-accent-amber' }
                  ].map((block) => (
                    <div
                      key={block.title}
                      className="integration-item p-4 rounded-xl bg-ink/80 dark:bg-ink-900/90 border border-line"
                    >
                      <div className="font-display text-sm font-semibold text-star mb-1">{block.title}</div>
                      <div className="text-xs text-steeldim mb-2.5">{block.desc}</div>
                      <div className={`font-mono text-[10px] flex items-center gap-1.5 ${block.color}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {block.state}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-ink-900/80 p-3.5 border border-line/60 font-mono text-xs text-steeldim flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                    Latency: &lt;120ms
                  </span>
                  <span>Idempotency: 100% Guaranteed</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. SPOTLIGHT: AI & AUTOMATION                                          */}
      {/* ==================================================================== */}
      <section className="py-24 px-6 border-b border-line/50">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              badge="AI Engineering"
              title="Practical AI automation for real operational bottlenecks"
              description="We avoid generic marketing hype and focus on concrete business problems — extracting data from unstructured documents, triaging customer inquiries, and automating multi-step human workflows."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Intelligent Document Extraction',
                desc: 'Automatically parse complex PDF invoices, contracts, receipts, and order forms into validated, structured JSON in your database without manual typing.'
              },
              {
                num: '02',
                title: '24/7 AI Support & Triage Agents',
                desc: 'Domain-specific conversational assistants grounded strictly in your private product docs, answering customer queries with zero hallucinations and auto-escalation.'
              },
              {
                num: '03',
                title: 'Lead Automation & Routing',
                desc: 'Qualify incoming website or WhatsApp inquiries automatically, score intent based on your criteria, and schedule high-value prospects straight onto your calendar.'
              }
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 90}>
                <div className="glass-card rounded-2xl p-8 glass-card-hover h-full relative overflow-hidden">
                  {/* Subtle purple accent bg */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/5 blur-2xl rounded-full pointer-events-none" />
                  <div className="step-badge mb-6">
                    {item.num}
                  </div>
                  <h3 className="font-display text-lg font-bold text-star mb-3">
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
      </section>

      {/* ==================================================================== */}
      {/* 6. SOLUTIONS BY OUTCOME                                               */}
      {/* ==================================================================== */}
      <section className="py-24 px-6 border-b border-line/50 bg-ink-900/40">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <ScrollReveal>
              <SectionHeader
                badge="Outcomes"
                title="Solutions focused on business results"
                description="Discover outcome-driven systems designed to improve efficiency, eliminate manual overhead, and accelerate team velocity."
                className="mb-0 md:mb-0"
              />
            </ScrollReveal>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 font-mono text-sm text-signal hover:text-signal2 transition shrink-0"
            >
              <span>Explore all solutions</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.slice(0, 6).map((sol, i) => (
              <ScrollReveal key={sol.id} delay={i * 60}>
                <div className="glass-card rounded-2xl p-7 flex flex-col justify-between glass-card-hover h-full">
                  <div>
                    <div className="icon-ring w-11 h-11 rounded-xl bg-panel border border-line-bright flex items-center justify-center text-signal mb-5">
                      <ServiceIconMapper icon={sol.icon} className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-star mb-2">
                      {sol.title}
                    </h3>
                    <p className="text-sm text-steel leading-relaxed mb-6">
                      {sol.description}
                    </p>
                  </div>

                  {sol.benefits && sol.benefits.length > 0 && (
                    <div className="pt-4 border-t border-line/60 space-y-2">
                      {sol.benefits.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-xs text-steeldim font-mono">
                          <CheckIcon className="w-3 h-3 text-signal shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. FEATURED WORK / PROJECTS                                            */}
      {/* ==================================================================== */}
      <section className="py-24 px-6 border-b border-line/50">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <ScrollReveal>
              <SectionHeader
                badge="Portfolio"
                title="Selected builds & concept architectures"
                description="Explore working systems and concept builds showcasing our engineering standards, architecture decisions, and code quality."
                className="mb-0 md:mb-0"
              />
            </ScrollReveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-sm text-signal hover:text-signal2 transition shrink-0"
            >
              <span>View all projects</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 70}>
                <div className="glass-card rounded-2xl p-7 flex flex-col justify-between glass-card-hover h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                        {project.project_type || 'Software System'}
                      </span>
                      {project.is_demo && (
                        <span className="px-2 py-0.5 rounded-full border border-accent-amber/40 bg-accent-amber/10 font-mono text-[10px] text-accent-amber font-medium">
                          Concept
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold text-star mb-3">
                      {project.name}
                    </h3>
                    <p className="text-sm text-steel leading-relaxed mb-6">
                      {project.short_description}
                    </p>
                  </div>

                  <div>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-ink/80 dark:bg-ink-900/90 border border-line font-mono text-[11px] text-steel"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-signal hover:text-white transition font-medium"
                    >
                      <span>View Architecture Breakdown</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. HOW WE WORK (PROCESS)                                               */}
      {/* ==================================================================== */}
      <section className="py-24 px-6 border-b border-line/50 bg-ink-900/40">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              badge="Methodology"
              title="How we work with you"
              description="A transparent, milestone-driven engineering process from initial discovery to production deployment."
              align="center"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <ScrollReveal key={step.id} delay={i * 60}>
                <div className="glass-card rounded-2xl p-7 relative h-full">
                  {/* Step connector line at top for desktop */}
                  <div className="absolute top-7 left-7 w-8 h-px bg-gradient-to-r from-signal/40 to-transparent hidden lg:block" />
                  <div className="font-mono text-xs font-bold text-signal mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-signal/10 border border-signal/20 flex items-center justify-center text-[10px]">
                      {i + 1}
                    </span>
                    <span className="tracking-widest text-steeldim">STEP 0{i + 1}</span>
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
      </section>

      {/* ==================================================================== */}
      {/* 9. WHY TECHKNOX / VALUES                                              */}
      {/* ==================================================================== */}
      <section className="py-24 px-6 border-b border-line/50">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              badge="Why Us"
              title="Why businesses work with TechKnox"
              description="Our core operating principles ensure your technology investment is secure, scalable, and built for your real business needs."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Problem-First Focus',
                desc: 'We start with your operational bottleneck, not an arbitrary tech stack. The technology serves your business goal.',
                accent: 'bg-signal/10 border-signal/20 text-signal'
              },
              {
                title: '100% Code Ownership',
                desc: 'You own every line of custom code, database schema, and digital asset we build. No vendor lock-in.',
                accent: 'bg-accent-emerald/10 border-accent-emerald/20 text-accent-emerald'
              },
              {
                title: 'Transparent Scoping',
                desc: 'Clear milestones, upfront technical feasibility assessments, and realistic delivery timelines without false hype.',
                accent: 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan'
              },
              {
                title: 'Clean Architecture',
                desc: 'Engineered with modern TypeScript, modular components, and documented schemas that are easy to maintain and scale.',
                accent: 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple'
              }
            ].map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 70}>
                <div className="glass-card rounded-2xl p-6 glass-card-hover h-full">
                  <div className={`icon-ring w-9 h-9 rounded-xl border flex items-center justify-center mb-5 ${v.accent}`}>
                    <CheckIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-star mb-2">{v.title}</h3>
                  <p className="text-xs text-steel leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 10. FINAL CTA BANNER                                                  */}
      {/* ==================================================================== */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-50 pointer-events-none" />

        <ScrollReveal>
          <div className="mx-auto max-w-5xl rounded-3xl border border-line-bright bg-gradient-to-b from-panel/90 to-ink/80 p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Glow behind */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-signal/12 blur-3xl pointer-events-none rounded-full" />
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none rounded-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-signal/30 bg-signal/8 dark:bg-signal/12 font-mono text-xs text-signal mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-70" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-signal" />
                </span>
                <span>READY TO BUILD?</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-star mb-6 max-w-2xl mx-auto leading-[1.1]">
                Let&apos;s build the technology solution your business needs.
              </h2>

              <p className="max-w-xl mx-auto text-base sm:text-lg text-steel mb-10 leading-relaxed">
                Tell us about your project, workflow challenges, or integration requirements.
                We&apos;ll review your scope and provide a practical plan.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/request-a-solution"
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-8 py-4 font-mono text-sm font-semibold text-white shadow-signal-md transition hover:bg-signal-hover hover:shadow-signal-lg active:scale-[0.97]"
                >
                  <span>Request a Solution</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-line-bright bg-panel/70 backdrop-blur-sm px-8 py-4 font-mono text-sm font-medium text-star transition hover:border-signal/40 hover:text-white"
                >
                  Contact Us Directly
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
