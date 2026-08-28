import type { Metadata } from 'next';
import SolutionRequestForm from './SolutionRequestForm';
import { ArrowRightIcon } from '@/components/Icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Start a Project — Request a Solution · TechKnox',
  description:
    'Submit your project requirements to TechKnox. Custom software, AI automation, or API integration — we will assess your needs and respond within one business day.'
};

export default function RequestASolutionPage({
  searchParams
}: {
  searchParams: { service?: string; solution?: string };
}) {
  const defaultSolutionType = searchParams.service || searchParams.solution || '';

  return (
    <div className="relative overflow-hidden">
      {/* ================================================================== */}
      {/* 1. HERO                                                             */}
      {/* ================================================================== */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-20 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-line bg-ink-800 text-xs font-mono font-semibold text-signal mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-signal" />
              <span>Project Intake</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-star leading-[1.15] mb-5">
              Tell us what you want to build.
            </h1>
            <p className="text-base sm:text-lg text-steel leading-relaxed">
              Describe your project requirements below. We will review your submission and respond with an honest technical evaluation and scoping proposal within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. FORM                                                             */}
      {/* ================================================================== */}
      <section className="py-16 px-4 sm:px-6 bg-ink-800/30">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Context Panel */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-xl border border-line bg-panel p-6 text-xs space-y-4">
                <p className="font-mono uppercase tracking-wider text-steeldim font-semibold">
                  What to expect
                </p>
                <ul className="space-y-3 text-steel">
                  {[
                    'We review your submission within 1 business day',
                    'We provide an honest technical assessment — no sales pressure',
                    'We propose a scoped architecture or ask clarifying questions',
                    'You receive a transparent estimate with milestone breakdowns'
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-line bg-panel p-5 text-xs">
                <p className="font-mono uppercase tracking-wider text-steeldim font-semibold mb-3">
                  Prefer direct contact?
                </p>
                <div className="space-y-2 text-steel">
                  <Link
                    href="/contact"
                    className="flex items-center gap-1.5 text-star font-medium hover:text-signal transition"
                  >
                    <span>Contact page →</span>
                  </Link>
                  <a
                    href="https://wa.me/918310179301?text=Hi%20TechKnox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-emerald-600 font-medium hover:underline"
                  >
                    <span>WhatsApp us →</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-line bg-panel p-8 sm:p-10 shadow-sm">
                <SolutionRequestForm defaultSolutionType={defaultSolutionType} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
