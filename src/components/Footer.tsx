import Link from 'next/link';
import TechKnoxLogo from './TechKnoxLogo';
import { CompanyProfile } from '@/lib/types';

export default function Footer({ profile }: { profile: CompanyProfile }) {
  const currentYear = new Date().getFullYear();
  const brand = profile.brand_name || 'TechKnox';

  const hasLegalDisclosures = Boolean(
    profile.legal_entity_name ||
    profile.registration_number ||
    profile.tax_id ||
    profile.registered_address
  );

  return (
    <footer className="border-t border-line/60 bg-ink-900/80 relative overflow-hidden">
      {/* Mesh background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-signal/20 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Column 1 & 2: Brand + Contact */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-8">
            <div>
              <Link href="/" className="inline-block mb-5">
                <TechKnoxLogo brandName={brand} />
              </Link>
              <p className="max-w-sm text-sm text-steel leading-relaxed">
                {profile.footer_description ||
                  profile.short_description ||
                  'Engineering custom digital solutions, intelligent automations, and resilient software systems for businesses worldwide.'}
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-2.5 text-xs font-mono text-steeldim">
              {profile.email && (
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-signal/10 text-signal flex items-center justify-center text-[10px] font-bold">@</span>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-steel hover:text-star transition-colors duration-150"
                    title={`Send email to ${profile.email}`}
                  >
                    {profile.email}
                  </a>
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-signal/10 text-signal flex items-center justify-center text-[9px]">☎</span>
                  <a href={`tel:${profile.phone}`} className="text-steel hover:text-star transition-colors duration-150">
                    {profile.phone}
                  </a>
                </div>
              )}
              {(profile.location || profile.address || profile.city) && (
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-signal/10 text-signal flex items-center justify-center text-[9px]">◎</span>
                  <span className="text-steel">
                    {profile.location || profile.address || [profile.city, profile.country].filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Services */}
          <div>
            <div className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-steeldim">
              Services
            </div>
            <ul className="space-y-3 text-sm text-steel">
              {[
                { href: '/services/web-app-development', label: 'Web & App Development' },
                { href: '/services/ai-automation', label: 'AI & Automation' },
                { href: '/services/api-integration', label: 'API Integration' },
                { href: '/services/custom-software', label: 'Custom Software' },
                { href: '/services/business-dashboards', label: 'Business Dashboards' },
                { href: '/services/crm-workflow-systems', label: 'CRM & Workflow Systems' }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1.5 hover:text-star transition-colors duration-150"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-signal transition-all duration-200 rounded-full overflow-hidden" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Navigate */}
          <div>
            <div className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-steeldim">
              Navigate
            </div>
            <ul className="space-y-3 text-sm text-steel">
              {[
                { href: '/solutions', label: 'Solutions & Outcomes' },
                { href: '/projects', label: 'Selected Projects' },
                { href: '/about', label: 'About Our Approach' },
                { href: '/contact', label: 'Contact Us' }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1.5 hover:text-star transition-colors duration-150"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-signal transition-all duration-200 rounded-full overflow-hidden" />
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/request-a-solution"
                  className="inline-flex items-center gap-1.5 text-signal hover:text-signal2 transition-colors duration-150 font-medium"
                >
                  Start a Project
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Social & Legal */}
          <div>
            <div className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-steeldim">
              Connect & Legal
            </div>
            <ul className="space-y-3 text-sm text-steel mb-6">
              {profile.linkedin_url && (
                <li>
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
                    className="hover:text-star transition-colors duration-150">
                    LinkedIn
                  </a>
                </li>
              )}
              {profile.github_url && (
                <li>
                  <a href={profile.github_url} target="_blank" rel="noopener noreferrer"
                    className="hover:text-star transition-colors duration-150">
                    GitHub
                  </a>
                </li>
              )}
              {profile.instagram_url && (
                <li>
                  <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer"
                    className="hover:text-star transition-colors duration-150">
                    Instagram
                  </a>
                </li>
              )}
              {profile.twitter_url && (
                <li>
                  <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer"
                    className="hover:text-star transition-colors duration-150">
                    X (Twitter)
                  </a>
                </li>
              )}
              <li>
                <Link href="/privacy-policy" className="hover:text-star transition-colors duration-150">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-star transition-colors duration-150">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal disclosures */}
        {hasLegalDisclosures && (
          <div className="mt-12 pt-6 border-t border-line/40 text-xs text-steeldim space-y-1">
            {profile.legal_entity_name && (
              <div>Legal Entity: <span className="text-steel">{profile.legal_entity_name}</span></div>
            )}
            {profile.registration_number && (
              <div>Registration No: <span className="text-steel">{profile.registration_number}</span></div>
            )}
            {profile.tax_id && (
              <div>Tax / GST ID: <span className="text-steel">{profile.tax_id}</span></div>
            )}
            {profile.registered_address && (
              <div>Registered Office: <span className="text-steel">{profile.registered_address}</span></div>
            )}
          </div>
        )}

        {/* Bottom bar */}
        <div className="mt-12 border-t border-line/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steeldim">
          <p>
            © {currentYear} {brand}. All rights reserved. Custom digital solutions.
          </p>
          <div className="flex items-center gap-6 font-mono">
            <Link href="/privacy-policy" className="hover:text-steel transition-colors duration-150">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-steel transition-colors duration-150">
              Terms
            </Link>
            <Link href="/admin" className="text-steeldim/50 hover:text-steeldim transition-colors duration-150">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
