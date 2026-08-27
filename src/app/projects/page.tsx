import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjects } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ArrowRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Projects & Case Demonstrations — TechKnox',
  description:
    'Explore custom software architectures, concept systems, AI pipelines, and API integrations built by TechKnox.'
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Portfolio & Concepts"
          title="Architecture blueprints & working software systems"
          description="Explore working proof-of-concept builds, system architectures, and software tools designed to demonstrate our engineering capabilities and technical standards."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {projects.map((project) => (
            <div
              key={project.id}
              id={project.slug}
              className="glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between glass-card-hover border border-line-bright"
            >
              <div>
                {/* Header Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                    {project.industry || project.project_type || 'Software System'}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.is_demo && (
                      <span className="px-2.5 py-0.5 rounded-full border border-accent-amber/40 bg-accent-amber/10 font-mono text-[11px] text-accent-amber font-medium">
                        Concept Project
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full border border-line bg-panel font-mono text-[11px] text-steeldim capitalize">
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
                  <div className="rounded-xl bg-ink/70 border border-line/60 p-4 mb-6 space-y-2 text-xs">
                    <div>
                      <span className="font-mono uppercase text-steeldim block text-[10px]">Problem</span>
                      <p className="text-steel">{project.problem}</p>
                    </div>
                    {project.solution && (
                      <div className="pt-2 border-t border-line/40">
                        <span className="font-mono uppercase text-signal block text-[10px]">Solution Architecture</span>
                        <p className="text-star font-medium">{project.solution}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                {/* Tech Stack Pills */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-panel border border-line font-mono text-[11px] text-steel"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Links */}
                <div className="flex items-center justify-between pt-4 border-t border-line/60">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-signal hover:text-white transition"
                  >
                    <span>View Case Breakdown</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex gap-4 font-mono text-xs text-steeldim">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-star transition"
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-star transition"
                      >
                        Source Code ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Start Project Banner */}
        <div className="rounded-3xl border border-line-bright bg-gradient-to-b from-panel to-ink p-10 sm:p-14 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-4">
            Have a project or internal tool in mind?
          </h2>
          <p className="max-w-xl mx-auto text-steel text-sm sm:text-base mb-8">
            We can architect and build a custom prototype or full production application designed for your team.
          </p>
          <Link
            href="/request-a-solution"
            className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-4 font-mono text-sm font-semibold text-white shadow-lg shadow-signal/20 transition hover:bg-signal-hover"
          >
            <span>Scope Your Build</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
