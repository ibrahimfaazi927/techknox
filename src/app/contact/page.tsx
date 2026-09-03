import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices, getCompanyProfile } from '@/lib/data';
import ContactForm from './ContactForm';
import { WhatsAppOutlineIcon, ArrowRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Contact Teknox — Start a Project or Request a Quote',
  description:
    'Get in touch with Teknox to discuss your software project, AI automation, or API integration. Direct contact via email, phone, and WhatsApp.'
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
    <div className="relative overflow-hidden bg-white dark:bg-ink text-slate-900 dark:text-star">
      {/* ================================================================== */}
      {/* 1. HERO                                                             */}
      {/* ================================================================== */}
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 border-b border-slate-200/80 dark:border-line bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-ink-900 dark:via-ink dark:to-ink-800">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-200/80 dark:border-indigo-800/40 bg-indigo-50/80 dark:bg-indigo-950/50 text-[10px] sm:text-xs font-mono font-semibold text-indigo-700 dark:text-indigo-400 mb-5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Contact &amp; Project Inquiries</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-slate-950 dark:text-star leading-[1.15] mb-4">
              Start a conversation about your project.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-steel leading-relaxed max-w-2xl font-normal">
              Use the form below or reach us directly by email, phone, or WhatsApp. We typically respond within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. CONTACT LAYOUT                                                   */}
      {/* ================================================================== */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-slate-50/40 dark:bg-ink-800/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Channels */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-star mb-2">
                  Direct contact
                </h2>
                <p className="text-sm text-slate-600 dark:text-steel leading-relaxed font-normal">
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
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/80 dark:border-line bg-white dark:bg-panel p-4 text-sm hover:border-slate-300 hover:shadow-2xs transition"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-ink-800 border border-indigo-100 dark:border-line flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs shrink-0">
                      @
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-steeldim mb-0.5">Email</span>
                      <span className="font-medium text-slate-900 dark:text-star">{profile.email}</span>
                    </div>
                  </a>
                )}

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/80 dark:border-line bg-white dark:bg-panel p-4 text-sm hover:border-slate-300 hover:shadow-2xs transition"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-ink-800 border border-indigo-100 dark:border-line flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs shrink-0">
                      ☎
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-steeldim mb-0.5">Phone</span>
                      <span className="font-medium text-slate-900 dark:text-star">{profile.phone}</span>
                    </div>
                  </a>
                )}

                <a
                  href="https://wa.me/918310179301?text=Hi%20teknox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 p-4 text-sm hover:bg-emerald-100/70 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                    <WhatsAppOutlineIcon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-emerald-700/80 mb-0.5 font-semibold">WhatsApp</span>
                    <span className="font-medium text-emerald-800 dark:text-emerald-400">Chat with us directly</span>
                  </div>
                </a>

                {(profile.location || profile.address || profile.city) && (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 dark:border-line bg-white dark:bg-panel p-4 text-sm">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-ink-800 border border-indigo-100 dark:border-line flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs shrink-0">
                      ◎
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-steeldim mb-0.5">Location</span>
                      <span className="font-medium text-slate-900 dark:text-star">
                        {[profile.city, profile.country].filter(Boolean).join(', ') || profile.location || profile.address}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Business Hours */}
              {profile.business_hours && (
                <div className="rounded-2xl border border-slate-200/80 dark:border-line bg-white dark:bg-panel p-5 text-xs text-slate-600 dark:text-steel space-y-1">
                  <span className="font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-star block">Business Hours</span>
                  <p>{profile.business_hours}</p>
                </div>
              )}

              {/* Scoping CTA Link */}
              <div className="rounded-2xl border border-indigo-200 dark:border-signal/30 bg-indigo-50/70 dark:bg-signal/5 p-5 space-y-2">
                <span className="font-display font-bold text-sm text-indigo-950 dark:text-star block">
                  Need a full architectural proposal?
                </span>
                <p className="text-xs text-slate-600 dark:text-steel leading-relaxed font-normal">
                  Use our structured solution scoping form to specify features, timeline, and budget.
                </p>
                <div className="pt-2">
                  <Link
                    href="/request-a-solution"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-signal hover:underline"
                  >
                    <span>Go to Solution Scoping Form</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-8 rounded-2xl border border-slate-200/90 dark:border-line bg-white dark:bg-panel p-6 sm:p-10 shadow-xs">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-star mb-2">
                Send a project enquiry
              </h2>
              <p className="text-sm text-slate-600 dark:text-steel mb-8 leading-relaxed font-normal">
                Tell us about your system requirements, operational challenge, or new product idea.
              </p>

              <ContactForm
                services={serviceItems}
                submittedFromUrl={submittedFromUrl}
                errorFromUrl={errorFromUrl}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
