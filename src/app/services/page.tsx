import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ServiceIconMapper, ArrowRightIcon, CheckIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Services — Custom Engineering & Technology Solutions',
  description:
    'Explore TechKnox services: Custom Web & Mobile Apps, AI & Automation, API Integrations, Custom Software, Business Dashboards, and CRM Systems.'
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Services Catalog"
          title="Technology engineered for your specific business requirements"
          description="Every engagement starts with scoping the actual problem. Explore our core engineering services below or consult with us to build a cross-discipline solution."
        />

        <div className="grid grid-cols-1 gap-10">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.slug}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-line-bright relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Title & Overview */}
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-panel-light border border-line-bright flex items-center justify-center text-signal shadow-inner">
                      <ServiceIconMapper icon={service.icon} className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-steeldim uppercase tracking-wider block">
                        Service 0{index + 1}
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-star">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-steel leading-relaxed mb-6">
                    {service.description || service.short_description}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3 font-mono text-xs font-semibold text-white shadow-md shadow-signal/20 transition hover:bg-signal-hover"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/request-a-solution?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-line-bright bg-panel px-5 py-3 font-mono text-xs font-medium text-star transition hover:border-signal/50 hover:text-white"
                    >
                      Request Scope →
                    </Link>
                  </div>
                </div>

                {/* Right Column: Key Features & Tech Matrix */}
                <div className="lg:col-span-6 rounded-2xl bg-ink/80 border border-line/80 p-6 sm:p-8">
                  {service.features && service.features.length > 0 && (
                    <div className="mb-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-3">
                        Key Capabilities & Deliverables
                      </div>
                      <ul className="space-y-2.5">
                        {service.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5 text-sm text-steel">
                            <CheckIcon className="w-4 h-4 text-signal shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.technologies && service.technologies.length > 0 && (
                    <div className="pt-4 border-t border-line/60">
                      <div className="font-mono text-xs uppercase tracking-wider text-steeldim mb-2">
                        Supported Technologies
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md bg-panel border border-line-bright font-mono text-xs text-star"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
