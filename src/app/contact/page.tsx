import type { Metadata } from 'next';
import { getCompanyProfile, getServices } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ArrowRightIcon, WhatsAppIcon } from '@/components/Icons';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — TechKnox',
  description:
    'Get in touch with TechKnox for custom software, web apps, API integrations, and AI automation consulting.'
};

export default async function ContactPage({
  searchParams
}: {
  searchParams: { submitted?: string; error?: string };
}) {
  const [profile, services] = await Promise.all([
    getCompanyProfile(),
    getServices()
  ]);

  return (
    <div className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="Direct Inquiries"
          title="Let's talk through your project"
          description="Have a question or looking to scope a custom build? Send us a message and we'll reply directly with an honest assessment."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Communication Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-line-bright">
              <h3 className="font-display text-xl font-bold text-star mb-4">
                Direct Communication
              </h3>
              <p className="text-sm text-steel leading-relaxed mb-6">
                We prefer clear, direct conversations. No aggressive automated sales sequences or pushy upsells.
              </p>

              <div className="space-y-4 text-sm">
                {profile.email && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-signal/10 text-signal flex items-center justify-center shrink-0 font-mono text-xs">
                      @
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-steeldim block">Email</span>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-star hover:text-signal transition"
                        title={`Send email to ${profile.email}`}
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}

                {profile.phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-signal/10 text-signal flex items-center justify-center shrink-0 font-mono text-xs">
                      📞
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-steeldim block">Phone / Call</span>
                      <a href={`tel:${profile.phone}`} className="text-star hover:text-signal transition">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <a
                    href="https://wa.me/918310179301?text=Hi%20TechKnox%2C%20I%27d%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-mono font-medium text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/50 transition-all duration-150 group"
                    title="Direct WhatsApp Chat"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                    <span>Let&apos;s Talk</span>
                    <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform duration-150">↗</span>
                  </a>
                </div>

                {profile.business_hours && (
                  <div className="flex items-start gap-3 pt-2 border-t border-line/60">
                    <div className="w-8 h-8 rounded-lg bg-panel-light text-steel flex items-center justify-center shrink-0 font-mono text-xs">
                      🕒
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-steeldim block">Working Hours</span>
                      <span className="text-xs text-steel">{profile.business_hours}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-ink/70 p-6 text-xs text-steeldim font-mono space-y-2">
              <div className="text-star font-semibold">Need a detailed scoping intake?</div>
              <p>
                If you have detailed system requirements, existing tools, and specific timeline constraints, you can use our in-depth request form:
              </p>
              <a
                href="/request-a-solution"
                className="inline-flex items-center gap-1.5 text-signal hover:text-white transition pt-2 font-medium"
              >
                <span>Open Request-a-Solution Form</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form (client component with validation) */}
          <div className="lg:col-span-7">
            <ContactForm
              services={services.map((s) => ({ id: s.id, title: s.title }))}
              submittedFromUrl={!!searchParams?.submitted}
              errorFromUrl={searchParams?.error ?? null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
