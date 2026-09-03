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
    <div className="relative overflow-hidden bg-black text-white selection:bg-zinc-800 selection:text-white">
      {/* ================================================================== */}
      {/* 1. HERO                                                             */}
      {/* ================================================================== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 px-6 md:px-12 border-b border-zinc-900 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 text-xs font-mono uppercase tracking-widest text-violet-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            <span>Contact &amp; Inquiries</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Start a conversation about{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              your project.
            </span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Use the form below or reach us directly by email, phone, or WhatsApp. We typically respond within one business day.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. CONTACT LAYOUT                                                   */}
      {/* ================================================================== */}
      <section className="py-20 sm:py-28 px-6 md:px-12 border-b border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Channels */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Direct contact
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
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
                    className="flex items-center gap-3 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4 text-sm hover:border-violet-500/40 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-violet-400 font-bold text-xs shrink-0">
                      @
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">Email</span>
                      <span className="font-medium text-white">{profile.email}</span>
                    </div>
                  </a>
                )}

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-3 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4 text-sm hover:border-violet-500/40 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-violet-400 text-xs shrink-0">
                      ☎
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">Phone</span>
                      <span className="font-medium text-white">{profile.phone}</span>
                    </div>
                  </a>
                )}

                <a
                  href="https://wa.me/918310179301?text=Hi%20teknox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm hover:bg-emerald-500/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <WhatsAppOutlineIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-emerald-400 mb-0.5 font-semibold">WhatsApp</span>
                    <span className="font-medium text-white">Chat with us directly</span>
                  </div>
                </a>

                {(profile.location || profile.address || profile.city) && (
                  <div className="flex items-center gap-3 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4 text-sm">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-violet-400 text-xs shrink-0">
                      ◎
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">Location</span>
                      <span className="font-medium text-white">
                        {[profile.city, profile.country].filter(Boolean).join(', ') || profile.location || profile.address}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Business Hours */}
              {profile.business_hours && (
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 text-xs text-zinc-400 space-y-1">
                  <span className="font-mono font-bold uppercase tracking-wider text-white block">Business Hours</span>
                  <p>{profile.business_hours}</p>
                </div>
              )}

              {/* Scoping CTA Link */}
              <div className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-6 space-y-3">
                <span className="font-bold text-sm text-white block">
                  Need a full architectural proposal?
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  Use our structured solution scoping form to specify features, timeline, and budget.
                </p>
                <div className="pt-1">
                  <Link
                    href="/request-a-solution"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-violet-400 hover:text-white transition-colors"
                  >
                    <span>Go to Solution Scoping Form</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-8 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 sm:p-12 hover:border-zinc-800 transition-all">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Send a project enquiry
              </h2>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed font-normal">
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
