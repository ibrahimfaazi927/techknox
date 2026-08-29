import Link from 'next/link';
import TechKnoxLogo from './TechKnoxLogo';
import { CompanyProfile } from '@/lib/types';
import { WhatsAppOutlineIcon, LinkedInIcon, XTwitterIcon, InstagramIcon, GitHubIcon, FacebookIcon } from './Icons';

export default function Footer({ profile }: { profile: CompanyProfile }) {
  const currentYear = new Date().getFullYear();
  const brand = profile.brand_name || 'TechKnox';

  const whatsappClean = profile.whatsapp?.replace(/[^0-9]/g, '') || (profile.phone ? profile.phone.replace(/[^0-9]/g, '') : '918310179301');
  const whatsappUrl = profile.whatsapp?.startsWith('http')
    ? profile.whatsapp
    : `https://wa.me/${whatsappClean}?text=Hi%20techknox%2C%20I%27d%20like%20to%20discuss%20a%20project.`;

  const hasLegalDisclosures = Boolean(
    profile.legal_entity_name ||
    profile.registration_number ||
    profile.tax_id ||
    profile.registered_address
  );

  return (
    <footer className="border-t border-line bg-panel relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Column 1 & 2: Brand + Position */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" className="inline-block">
              <TechKnoxLogo size="md" />
            </Link>
            <p className="max-w-sm text-xs sm:text-sm text-steel leading-relaxed">
              {profile.footer_description ||
                profile.short_description ||
                'TechKnox transforms ambitious ideas into intelligent digital experiences, automation systems and scalable technology solutions.'}
            </p>
            <p className="font-mono text-[10px] sm:text-xs text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wider">
              Software Solutions · AI · Business Automation · API Integration
            </p>

            {/* Quick Contact Line */}
            <div className="space-y-1.5 pt-1 text-xs text-steel max-w-full overflow-hidden">
              {profile.email && (
                <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                  <span className="font-mono text-steeldim text-[11px]">Email:</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors truncate max-w-full"
                  >
                    {profile.email}
                  </a>
                </div>
              )}
              {profile.phone && (
                <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                  <span className="font-mono text-steeldim text-[11px]">Phone:</span>
                  <a href={`tel:${profile.phone}`} className="hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
                    {profile.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Services */}
          <div>
            <div className="mb-3.5 font-mono text-[11px] font-bold uppercase tracking-wider text-star">
              Services
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-steel">
              {[
                { href: '/services/web-app-development', label: 'Web & App Development' },
                { href: '/services/ai-automation', label: 'AI & Automation' },
                { href: '/services/api-integration', label: 'API Integration' },
                { href: '/services/custom-software', label: 'Custom Software' },
                { href: '/services/business-dashboards', label: 'Business Dashboards' },
                { href: '/services/crm-workflow-systems', label: 'CRM & Workflow Systems' }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Navigation */}
          <div>
            <div className="mb-3.5 font-mono text-[11px] font-bold uppercase tracking-wider text-star">
              Company
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-steel">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'All Services' },
                { href: '/solutions', label: 'Solutions by Outcome' },
                { href: '/projects', label: 'Selected Work' },
                { href: '/contact', label: 'Contact & Inquiries' }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/request-a-solution"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  <span>Start a Project</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Reach & Social */}
          <div>
            <div className="mb-3.5 font-mono text-[11px] font-bold uppercase tracking-wider text-star">
              Connect
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-line bg-ink-800 flex items-center justify-center text-emerald-600 hover:border-emerald-500 hover:bg-emerald-500/10 transition-colors"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <WhatsAppOutlineIcon className="w-4 h-4" />
                </a>
              )}
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-line bg-ink-800 flex items-center justify-center text-steel hover:text-purple-600 hover:border-purple-500 transition-colors"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              )}
              {profile.twitter_url && (
                <a
                  href={profile.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-line bg-ink-800 flex items-center justify-center text-steel hover:text-star hover:border-line-bright transition-colors"
                  title="X (Twitter)"
                  aria-label="Twitter"
                >
                  <XTwitterIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.instagram_url && (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-line bg-ink-800 flex items-center justify-center text-steel hover:text-pink-600 hover:border-pink-500 transition-colors"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {profile.other_social_url && (
                <a
                  href={profile.other_social_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-line bg-ink-800 flex items-center justify-center text-steel hover:text-blue-600 hover:border-blue-500 transition-colors"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-line bg-ink-800 flex items-center justify-center text-steel hover:text-star hover:border-line-bright transition-colors"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="space-y-1.5 text-xs text-steel">
              <div>
                <Link href="/privacy-policy" className="hover:text-star transition-colors">
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link href="/terms-and-conditions" className="hover:text-star transition-colors">
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal disclosures */}
        {hasLegalDisclosures && (
          <div className="mt-8 pt-5 border-t border-line text-[11px] text-steeldim space-y-1 font-mono">
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
              <div>Registered Address: <span className="text-steel">{profile.registered_address}</span></div>
            )}
          </div>
        )}

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-line pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-steeldim">
          <p>
            &copy; {currentYear} {brand}. All rights reserved. Software &amp; Technology Solutions.
          </p>
          <div className="flex items-center gap-5 text-xs">
            <Link href="/privacy-policy" className="hover:text-steel transition-colors">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-steel transition-colors">
              Terms
            </Link>
            <Link href="/admin" className="text-steeldim/40 hover:text-steeldim transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

