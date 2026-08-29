import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices, getCompanyProfile } from '@/lib/data';
import ContactForm from './ContactForm';
import { WhatsAppOutlineIcon, ArrowRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Contact TechKnox — Start a Project or Request a Quote',
  description:
    'Get in touch with TechKnox to discuss your software project, AI automation, or API integration. Direct contact via email, phone, and WhatsApp.'
};

export const revalidate = 3600;

export default async function ContactPage({
  searchParams
}: {
  searchParams: { submitted?: string; error?: string };
}) {
  const [services, profile] = await Promise.all([getServices(), getCompanyProfile()]);

  const submittedFromUrl = searchParams.submitted === '1';
  const errorFromUrl = searchParams.error || null;

  const serviceItems = services.map((s) => ({ id: s.id, title: s.title }));

  return (
    <div className="relative overflow-hidden">
      {/* ================================================================== */}
      {/* 1. HERO                                                             */}
      {/* ================================================================== */}
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-line bg-panel text-[10px] sm:text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>Contact &amp; Project Inquiries</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-star leading-[1.15] mb-4">
              Start a conversation about your project.
            </h1>
            <p className="text-sm sm:text-base text-steel leading-relaxed max-w-2xl">
              Use the form below or reach us directly by email, phone, or WhatsApp. We typically respond within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. CONTACT LAYOUT                                                   */}
      {/* ================================================================== */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-ink-800/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Channels */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-star mb-2">
                  Direct contact
                </h2>
                <p className="text-sm text-steel leading-relaxed">
                  Prefer a direct conversation? Reach us via any of the channels below.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-3">
                {profile.email && (
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-line bg-panel p-4 text-sm hover:border-line-bright hover:shadow-sm transition"
                  >
                    <div className="w-9 h-9 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xs shrink-0">
                      @
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-steeldim mb-0.5">Email</span>
                      <span className="font-medium text-star">{profile.email}</span>
                    </div>
                  </a>
                )}

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-3 rounded-xl border border-line bg-panel p-4 text-sm hover:border-line-bright hover:shadow-sm transition"
                  >
                    <div className="w-9 h-9 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-purple-600 dark:text-purple-400 text-xs shrink-0">
                      ☎
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-steeldim mb-0.5">Phone</span>
                      <span className="font-medium text-star">{profile.phone}</span>
                    </div>
                  </a>
                )}

                <a
                  href="https://wa.me/918310179301?text=Hi%20techknox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm hover:bg-emerald-500/10 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                    <WhatsAppOutlineIcon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-emerald-600/80 mb-0.5">WhatsApp</span>
                    <span className="font-medium text-emerald-700 dark:text-emerald-400">Chat with us now</span>
                  </div>
                </a>

                {(profile.location || profile.address || profile.city) && (
                  <div className="flex items-center gap-3 rounded-xl border border-line bg-panel p-4 text-sm">
                    <div className="w-9 h-9 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-purple-600 dark:text-purple-400 text-xs shrink-0">
                      ◎
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-steeldim mb-0.5">Location</span>
                      <span className="font-medium text-star">
                        {profile.location || profile.address || [profile.city, profile.country].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Office Hours */}
              {profile.business_hours && (
                <div className="rounded-xl border border-line bg-panel p-5 text-xs">
                  <p className="font-mono uppercase tracking-wider text-steeldim font-semibold mb-2">Business Hours</p>
                  <p className="text-steel leading-relaxed">{profile.business_hours}</p>
                </div>
              )}

              {/* Start a Project shortcut */}
              <div className="rounded-xl border border-line bg-panel p-5">
                <p className="text-xs font-semibold text-star mb-2">Prefer a structured intake form?</p>
                <p className="text-xs text-steel mb-4 leading-relaxed">
                  Our solution scoping form helps us understand your requirements in detail for an accurate proposal.
                </p>
                <Link
                  href="/request-a-solution"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  <span>Go to Project Intake Form</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-line bg-panel p-8 sm:p-10 shadow-sm">
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-bold text-star mb-2">
                    Send us a message
                  </h2>
                  <p className="text-sm text-steel">
                    Tell us about your project and we will get back to you within one business day.
                  </p>
                </div>

                <ContactForm
                  services={serviceItems}
                  submittedFromUrl={submittedFromUrl}
                  errorFromUrl={errorFromUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
