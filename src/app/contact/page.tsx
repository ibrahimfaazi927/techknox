import type { Metadata } from 'next';
import { getCompanyProfile, getServices } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { ArrowRightIcon } from '@/components/Icons';
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

                {profile.whatsapp && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent-emerald/10 text-accent-emerald flex items-center justify-center shrink-0 font-mono text-xs">
                      💬
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-steeldim block">WhatsApp</span>
                      <span className="text-star">{profile.whatsapp}</span>
                    </div>
                  </div>
                )}

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
