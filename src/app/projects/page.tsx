import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjects } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ArrowRightIcon } from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Projects & Case Studies — Teknox',
  description:
    'Explore custom software architectures, concept systems, AI pipelines, and API integrations built by Teknox.'
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

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
            <span>Portfolio &amp; Case Studies</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Architecture blueprints &amp;{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              working software systems.
            </span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Explore working proof-of-concept builds, system architectures, and software tools designed to demonstrate our engineering capabilities and technical standards.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. PROJECTS GRID                                                    */}
      {/* ================================================================== */}
      <section className="py-20 sm:py-28 px-6 md:px-12 border-b border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 50}>
                <div
                  id={project.slug}
                  className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 sm:p-10 hover:border-violet-500/40 hover:shadow-glow-violet transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Header Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold">
                        {project.industry || project.project_type || 'Software System'}
                      </span>
                      <div className="flex items-center gap-2">
                        {project.is_demo && (
                          <span className="px-2.5 py-1 rounded border border-amber-500/30 bg-amber-500/10 font-mono text-[10px] text-amber-400 font-medium">
                            Concept Project
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded border border-zinc-900 bg-zinc-900/40 font-mono text-[10px] text-zinc-500 capitalize">
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                      {project.name}
                    </h2>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                      {project.short_description}
                    </p>

                    {/* Problem & Solution Snapshot */}
                    {project.problem && (
                      <div className="rounded-xl bg-black border border-zinc-900 p-5 mb-6 space-y-3 text-xs sm:text-sm">
                        <div>
                          <span className="font-mono uppercase text-zinc-500 block text-[10px] font-semibold mb-1">
                            Challenge:
                          </span>
                          <p className="text-zinc-400">{project.problem}</p>
                        </div>
                        {project.solution && (
                          <div className="pt-3 border-t border-zinc-900">
                            <span className="font-mono uppercase text-violet-400 block text-[10px] font-semibold mb-1">
                              Solution Architecture:
                            </span>
                            <p className="text-white font-medium">{project.solution}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-violet-400 hover:text-white transition-colors"
                      >
                        <span>View Case Breakdown</span>
                        <ArrowRightIcon className="w-3 h-3" />
                      </Link>

                      <div className="flex gap-4 text-xs font-mono text-zinc-500">
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                          >
                            Demo ↗
                          </a>
                        )}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
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
      <section className="py-20 sm:py-28 px-6 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-600 via-indigo-700 to-indigo-900 p-10 sm:p-14 text-white shadow-cta-glow relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Have a project or internal tool in mind?
            </h2>
            <p className="text-violet-100/90 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-normal">
              We can architect and build a custom prototype or full production application designed for your team.
            </p>
            <Link
              href="/request-a-solution"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-zinc-100 transition-all duration-200 shadow-md"
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
