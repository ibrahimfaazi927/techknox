import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ArrowRightIcon, CheckIcon } from '@/components/Icons';

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
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.name} — Project Case Study`,
    description: project.short_description || `Technical breakdown for ${project.name}`,
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
    <div className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-xs text-steeldim mb-8">
          <Link href="/" className="hover:text-star transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-star transition">
            Projects
          </Link>
          <span>/</span>
          <span className="text-signal">{project.name}</span>
        </div>

        {/* Hero Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-line-bright mb-16 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
              {project.industry || project.project_type || 'Case Demonstration'}
            </span>
            <div className="flex items-center gap-2">
              {project.is_demo && (
                <span className="px-3 py-1 rounded-full border border-accent-amber/40 bg-accent-amber/10 font-mono text-xs text-accent-amber font-medium">
                  Concept Prototype
                </span>
              )}
              <span className="px-3 py-1 rounded-full border border-line bg-panel font-mono text-xs text-steeldim capitalize">
                {project.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold text-star mb-6">
            {project.name}
          </h1>

          <p className="text-lg sm:text-xl text-steel leading-relaxed mb-8">
            {project.detailed_description || project.short_description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/request-a-solution"
              className="inline-flex items-center gap-2 rounded-lg bg-signal px-7 py-3.5 font-mono text-sm font-semibold text-white shadow-lg shadow-signal/20 transition hover:bg-signal-hover"
            >
              <span>Build a Similar System</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-line-bright bg-panel px-6 py-3.5 font-mono text-sm font-medium text-star transition hover:border-signal/50 hover:text-white"
              >
                View Repository ↗
              </a>
            )}
          </div>
        </div>

        {/* Problem vs Solution Architecture Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card rounded-3xl p-8 border border-line-bright">
            <div className="font-mono text-xs uppercase tracking-wider text-accent-amber font-semibold mb-3">
              The Operational Problem
            </div>
            <h2 className="font-display text-2xl font-bold text-star mb-4">
              Challenge & Bottlenecks
            </h2>
            <p className="text-sm text-steel leading-relaxed">
              {project.problem || 'Legacy manual workflows and disjointed tools were causing operational friction and slow turnarounds.'}
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 border border-line-bright">
            <div className="font-mono text-xs uppercase tracking-wider text-accent-emerald font-semibold mb-3">
              The Architectural Solution
            </div>
            <h2 className="font-display text-2xl font-bold text-star mb-4">
              Engineered Implementation
            </h2>
            <p className="text-sm text-steel leading-relaxed">
              {project.solution || 'We architected a streamlined, event-driven software platform tailored to automate the end-to-end data lifecycle.'}
            </p>
          </div>
        </div>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-16">
            <SectionHeader
              badge="Capabilities"
              title="Key Features Implemented"
              description="Functional components and subsystems included in this build."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feat) => (
                <div key={feat} className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-line">
                  <div className="w-8 h-8 rounded-lg bg-signal/10 text-signal flex items-center justify-center shrink-0 mt-0.5">
                    <CheckIcon className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base text-star font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technology Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-line-bright mb-16">
            <div className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-2">
              Technology Matrix
            </div>
            <h2 className="font-display text-2xl font-bold text-star mb-6">
              Technologies & Infrastructure
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-xl bg-ink border border-line-bright font-mono text-sm text-star"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Results or Architectural Takeaways */}
        {project.results && (
          <div className="rounded-3xl border border-line bg-panel p-8 sm:p-10 mb-16">
            <div className="font-mono text-xs uppercase tracking-wider text-accent-cyan font-semibold mb-2">
              Architecture Takeaways
            </div>
            <h3 className="font-display text-xl font-bold text-star mb-3">
              Performance & Reliability Standards
            </h3>
            <p className="text-sm text-steel leading-relaxed">
              {project.results}
            </p>
          </div>
        )}

        {/* Scoping CTA */}
        <div className="rounded-3xl border border-line-bright bg-gradient-to-b from-panel to-ink p-10 sm:p-14 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-star mb-4">
            Need a custom system like this built for your business?
          </h2>
          <p className="max-w-xl mx-auto text-steel text-sm sm:text-base mb-8">
            Tell us about your team&apos;s specific requirements, integration needs, and timeline.
          </p>
          <Link
            href="/request-a-solution"
            className="inline-flex items-center gap-2 rounded-lg bg-signal px-8 py-4 font-mono text-sm font-semibold text-white shadow-lg shadow-signal/20 transition hover:bg-signal-hover"
          >
            <span>Request a Project Proposal</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
