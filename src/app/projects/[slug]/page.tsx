import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/data';
import { ArrowRightIcon, CheckIcon } from '@/components/Icons';
import ScrollReveal from '@/components/ScrollReveal';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export const revalidate = 3600;

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found — TechKnox' };

  return {
    title: `${project.name} — Case Study · TechKnox`,
    description: project.short_description || `Technical case study for ${project.name}`,
    openGraph: {
      title: `${project.name} — TechKnox`,
      description: project.short_description || undefined
    }
  };
}

export default async function ProjectDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden">
      {/* ================================================================== */}
      {/* 1. HERO                                                             */}
      {/* ================================================================== */}
      <section className="pt-16 pb-20 md:pt-20 md:pb-24 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-steeldim mb-8">
            <Link href="/" className="hover:text-star transition">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-star transition">Projects</Link>
            <span>/</span>
            <span className="text-star font-medium">{project.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                  {project.industry || project.project_type || 'Software System'}
                </span>
                {project.is_demo && (
                  <span className="px-2.5 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 font-mono text-[10px] text-amber-600">
                    Concept Project
                  </span>
                )}
                <span className="px-2 py-0.5 rounded border border-line bg-ink-800 font-mono text-[10px] text-steeldim capitalize">
                  {project.status?.replace('_', ' ')}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-star mb-5 leading-tight">
                {project.name}
              </h1>

              <p className="text-base sm:text-lg text-steel leading-relaxed max-w-2xl mb-8">
                {project.short_description}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-signal-hover transition"
                  >
                    <span>View Live Demo</span>
                    <span aria-hidden>↗</span>
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-5 py-2.5 text-xs font-medium text-star hover:bg-ink-800 transition"
                  >
                    <span>View Source</span>
                    <span aria-hidden>↗</span>
                  </a>
                )}
                <Link
                  href="/request-a-solution"
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-5 py-2.5 text-xs font-medium text-star hover:bg-ink-800 transition"
                >
                  Build Something Similar
                </Link>
              </div>
            </div>

            {/* Quick Facts Sidebar */}
            <div className="lg:col-span-4 rounded-xl border border-line bg-ink-800 p-6 space-y-4 text-xs">
              {project.status && (
                <div>
                  <span className="font-mono uppercase text-steeldim font-semibold block mb-1">Status</span>
                  <span className="text-star font-medium capitalize">{project.status.replace('_', ' ')}</span>
                </div>
              )}
              {project.industry && (
                <div className="pt-3 border-t border-line">
                  <span className="font-mono uppercase text-steeldim font-semibold block mb-1">Industry</span>
                  <span className="text-star font-medium">{project.industry}</span>
                </div>
              )}
              {project.is_demo && (
                <div className="pt-3 border-t border-line">
                  <span className="font-mono uppercase text-steeldim font-semibold block mb-1">Build Type</span>
                  <span className="text-amber-600 font-medium">Architecture Concept</span>
                </div>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="pt-3 border-t border-line">
                  <span className="font-mono uppercase text-steeldim font-semibold block mb-2">Stack</span>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-panel border border-line font-mono text-[10px] text-steel">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. CHALLENGE                                                        */}
      {/* ================================================================== */}
      {project.problem && (
        <section className="py-16 px-4 sm:px-6 border-b border-line bg-panel">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="rounded-xl border border-line bg-ink-800 p-8">
                <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold block mb-3">
                  Business Challenge
                </span>
                <h2 className="font-display text-2xl font-bold text-star mb-4">
                  The problem we were solving
                </h2>
                <p className="text-base text-steel leading-relaxed">
                  {project.problem}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 3. SOLUTION ARCHITECTURE                                            */}
      {/* ================================================================== */}
      {project.solution && (
        <section className="py-16 px-4 sm:px-6 border-b border-line bg-ink-800/40">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="rounded-xl border border-line bg-panel p-8">
                <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold block mb-3">
                  Engineering Solution
                </span>
                <h2 className="font-display text-2xl font-bold text-star mb-4">
                  How we built it
                </h2>
                <p className="text-base text-steel leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 4. FULL DESCRIPTION                                                 */}
      {/* ================================================================== */}
      {project.detailed_description && (
        <section className="py-16 px-4 sm:px-6 border-b border-line bg-panel">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold text-star mb-6">
                Full Project Overview
              </h2>
              <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-steel leading-relaxed">
                {project.detailed_description.split('\n').map((para, i) =>
                  para.trim() ? (
                    <p key={i} className="mb-4 text-steel">{para}</p>
                  ) : null
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 5. KEY FEATURES                                                     */}
      {/* ================================================================== */}
      {project.features && project.features.length > 0 && (
        <section className="py-16 px-4 sm:px-6 border-b border-line bg-ink-800/40">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold text-star mb-8">
                System Capabilities &amp; Feature Set
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feat, i) => (
                <ScrollReveal key={feat} delay={i * 40}>
                  <div className="rounded-lg border border-line bg-panel p-5 flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-steel leading-relaxed">{feat}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 6. CTA BANNER                                                       */}
      {/* ================================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-panel">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-line bg-ink-800 p-8 sm:p-12 shadow-sm">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-3">
              Need a similar system for your business?
            </h2>
            <p className="text-sm sm:text-base text-steel max-w-xl mx-auto mb-8">
              We can design and build a custom version around your specific operational requirements, data structure, and integration landscape.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/request-a-solution"
                className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3.5 text-xs font-semibold text-white shadow-sm hover:bg-signal-hover transition"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-6 py-3.5 text-xs font-medium text-star hover:bg-ink-800 transition"
              >
                <span>View All Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
