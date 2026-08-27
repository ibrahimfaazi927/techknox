import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import SolutionRequestForm from './SolutionRequestForm';

export const metadata: Metadata = {
  title: 'Request a Solution — TechKnox',
  description:
    'Submit detailed project specifications, required integrations, and automation goals for a custom scoping proposal from TechKnox.'
};

export default async function RequestSolutionPage({
  searchParams
}: {
  searchParams: { service?: string; solution?: string };
}) {
  const defaultSolutionType =
    searchParams?.service || searchParams?.solution || '';

  return (
    <div className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          badge="Project Scoping Intake"
          title="Tell us what you need built"
          description="The more context you provide, the faster and more accurately we can scope a practical architecture, budget, and timeline."
        />

        <SolutionRequestForm defaultSolutionType={defaultSolutionType} />
      </div>
    </div>
  );
}
