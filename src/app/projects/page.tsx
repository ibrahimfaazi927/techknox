import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjects } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ArrowRightIcon } from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Projects & Case Studies — TechKnox',
  description:
    'Explore custom software architectures, concept systems, AI pipelines, and API integrations built by TechKnox.'
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

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
              <span>Portfolio &amp; Case Studies</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-star leading-[1.15] mb-6">
              Architecture blueprints &amp; working software systems.
            </h1>
            <p className="text-base sm:text-lg text-steel leading-relaxed max-w-2xl">
              Explore working proof-of-concept builds, system architectures, and software tools designed to demonstrate our engineering capabilities and technical standards.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. PROJECTS GRID                                                    */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 border-b border-line bg-ink-800/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 50}>
                <div
                  id={project.slug}
                  className="rounded-xl border border-line bg-panel p-6 sm:p-8 shadow-sm hover:border-line-bright transition flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Header Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                        {project.industry || project.project_type || 'Software System'}
                      </span>
                      <div className="flex items-center gap-2">
                        {project.is_demo && (
                          <span className="px-2.5 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 font-mono text-[10px] text-amber-600 font-medium">
                            Concept Project
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded border border-line bg-ink-800 font-mono text-[10px] text-steeldim capitalize">
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <h2 className="font-display text-2xl font-bold text-star mb-3">
                      {project.name}
                    </h2>

                    <p className="text-sm text-steel leading-relaxed mb-6">
                      {project.short_description}
                    </p>

                    {/* Problem & Solution Snapshot */}
                    {project.problem && (
                      <div className="rounded-lg bg-ink-800 border border-line p-4 mb-6 space-y-2 text-xs">
                        <div>
                          <span className="font-mono uppercase text-steeldim block text-[10px] font-semibold">
                            Challenge:
                          </span>
                          <p className="text-steel">{project.problem}</p>
                        </div>
                        {project.solution && (
                          <div className="pt-2 border-t border-line">
                            <span className="font-mono uppercase text-signal block text-[10px] font-semibold">
                              Solution Architecture:
                            </span>
                            <p className="text-star font-medium">{project.solution}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-ink-800 border border-line font-mono text-[10px] text-steel"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-line">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:underline"
                      >
                        <span>View Case Breakdown</span>
                        <ArrowRightIcon className="w-3 h-3" />
                      </Link>

                      <div className="flex gap-3 text-xs text-steeldim">
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-star transition"
                          >
                            Demo ↗
                          </a>
                        )}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-star transition"
                          >
                            Source ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. CTA BANNER                                                       */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-panel">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-line bg-ink-800 p-8 sm:p-12 shadow-sm">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-3">
              Have a project or internal tool in mind?
            </h2>
            <p className="text-sm sm:text-base text-steel max-w-xl mx-auto mb-8">
              We can architect and build a custom prototype or full production application designed for your team.
            </p>
            <Link
              href="/request-a-solution"
              className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3.5 text-xs font-semibold text-white shadow-sm hover:bg-signal-hover transition"
            >
              <span>Scope Your Build</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
