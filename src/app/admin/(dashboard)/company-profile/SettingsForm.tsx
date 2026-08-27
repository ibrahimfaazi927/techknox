'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CompanyProfile } from '@/lib/types';
import { updateCompanyProfile } from './actions';

type Tab = 'general' | 'contact' | 'social' | 'seo' | 'appearance' | 'legal';

export default function SettingsForm({ initialProfile }: { initialProfile: CompanyProfile }) {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const formData = new FormData(e.currentTarget);
      await updateCompanyProfile(formData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 4000);
    } catch {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'contact', label: 'Contact & CTA', icon: '📬' },
    { id: 'social', label: 'Social Profiles', icon: '🌐' },
    { id: 'seo', label: 'SEO & Metadata', icon: '🔍' },
    { id: 'appearance', label: 'Appearance & Theme', icon: '🎨' },
    { id: 'legal', label: 'Legal Disclosures', icon: '⚖️' }
  ];

  const labelClass = 'mb-1.5 block font-mono text-xs uppercase tracking-wider text-steeldim font-medium';
  const inputClass = 'w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-star outline-none focus:border-signal transition';
  const textareaClass = 'w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-star outline-none focus:border-signal transition';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-star">System & Brand Settings</h1>
          <p className="text-sm text-steel mt-1">
            Manage your centralized company profile, SEO metadata, contact coordinates, and legal disclosures.
          </p>
        </div>

        {saveStatus === 'success' && (
          <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-mono text-emerald-400">
            <span>✓</span> Settings saved successfully
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition ${
              activeTab === tab.id
                ? 'bg-signal text-white shadow-md shadow-signal/20'
                : 'bg-panel text-steel hover:text-star border border-line hover:border-line-bright'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ================================================================= */}
        {/* 1. GENERAL TAB */}
        {/* ================================================================= */}
        {activeTab === 'general' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
            <h2 className="font-display text-xl font-semibold text-star flex items-center gap-2">
              <span>⚙️</span> General Brand Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Brand / Organization Name *</label>
                <input
                  name="brand_name"
                  defaultValue={initialProfile.brand_name}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Tagline</label>
                <input
                  name="tagline"
                  defaultValue={initialProfile.tagline ?? ''}
                  placeholder="e.g. We build the technology your business needs."
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Short Description (Hero & Meta)</label>
              <textarea
                name="short_description"
                rows={3}
                defaultValue={initialProfile.short_description ?? ''}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>Full Mission Description (About Page)</label>
              <textarea
                name="full_description"
                rows={5}
                defaultValue={initialProfile.full_description ?? ''}
                className={textareaClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Logo URL (Optional Custom Asset)</label>
                <input
                  name="logo_url"
                  defaultValue={initialProfile.logo_url ?? ''}
                  placeholder="/assets/logo.svg or https://..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Favicon URL (Optional)</label>
                <input
                  name="favicon_url"
                  defaultValue={initialProfile.favicon_url ?? ''}
                  placeholder="/favicon.ico"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* 2. CONTACT TAB */}
        {/* ================================================================= */}
        {activeTab === 'contact' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
            <h2 className="font-display text-xl font-semibold text-star flex items-center gap-2">
              <span>📬</span> Contact Coordinates & CTA
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Public Contact Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={initialProfile.email ?? ''}
                  placeholder="techknoxin@gmail.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  name="phone"
                  defaultValue={initialProfile.phone ?? ''}
                  placeholder="+1 234 567 8900"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>WhatsApp Number / Link</label>
                <input
                  name="whatsapp"
                  defaultValue={initialProfile.whatsapp ?? ''}
                  placeholder="+1 234 567 8900"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Primary Contact CTA Label</label>
                <input
                  name="contact_cta"
                  defaultValue={initialProfile.contact_cta ?? 'Start a Project'}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>City / Region</label>
                <input
                  name="city"
                  defaultValue={initialProfile.city ?? ''}
                  placeholder="e.g. Remote / San Francisco"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Country</label>
                <input
                  name="country"
                  defaultValue={initialProfile.country ?? ''}
                  placeholder="e.g. Worldwide"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Address / Operations Hub</label>
                <input
                  name="address"
                  defaultValue={initialProfile.address ?? ''}
                  placeholder="e.g. Global Tech Center"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Business Hours</label>
              <input
                name="business_hours"
                defaultValue={initialProfile.business_hours ?? ''}
                placeholder="Monday – Friday: 9:00 AM – 6:00 PM"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Footer Tagline / Short Notice</label>
              <input
                name="footer_description"
                defaultValue={initialProfile.footer_description ?? ''}
                placeholder="Engineering custom digital solutions and software systems."
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* 3. SOCIAL TAB */}
        {/* ================================================================= */}
        {activeTab === 'social' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
            <h2 className="font-display text-xl font-semibold text-star flex items-center gap-2">
              <span>🌐</span> Official Social & Platform Links
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>LinkedIn URL</label>
                <input
                  name="linkedin_url"
                  defaultValue={initialProfile.linkedin_url ?? ''}
                  placeholder="https://linkedin.com/company/techknox"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>GitHub URL</label>
                <input
                  name="github_url"
                  defaultValue={initialProfile.github_url ?? ''}
                  placeholder="https://github.com/techknox"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Instagram URL</label>
                <input
                  name="instagram_url"
                  defaultValue={initialProfile.instagram_url ?? ''}
                  placeholder="https://instagram.com/techknox.dev"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Twitter / X URL</label>
                <input
                  name="twitter_url"
                  defaultValue={initialProfile.twitter_url ?? ''}
                  placeholder="https://x.com/techknoxdev"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Official Website URL</label>
                <input
                  name="website"
                  defaultValue={initialProfile.website ?? ''}
                  placeholder="https://techknox.dev"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Other Social / Portfolio Link</label>
                <input
                  name="other_social_url"
                  defaultValue={initialProfile.other_social_url ?? ''}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* 4. SEO TAB */}
        {/* ================================================================= */}
        {activeTab === 'seo' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
            <h2 className="font-display text-xl font-semibold text-star flex items-center gap-2">
              <span>🔍</span> SEO & Social Sharing Metadata
            </h2>

            <div>
              <label className={labelClass}>Site Default Title</label>
              <input
                name="site_title"
                defaultValue={initialProfile.site_title ?? 'TechKnox — We build the technology your business needs'}
                placeholder="TechKnox — We build the technology your business needs"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Meta Description (Search Snippet)</label>
              <textarea
                name="meta_description"
                rows={3}
                defaultValue={initialProfile.meta_description ?? initialProfile.short_description ?? ''}
                placeholder="Search engine meta description..."
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>Open Graph (OG) Image URL</label>
              <input
                name="og_image_url"
                defaultValue={initialProfile.og_image_url ?? ''}
                placeholder="https://techknox.dev/og-image.png"
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* 5. APPEARANCE TAB */}
        {/* ================================================================= */}
        {activeTab === 'appearance' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
            <h2 className="font-display text-xl font-semibold text-star flex items-center gap-2">
              <span>🎨</span> Theme & Appearance
            </h2>

            <div>
              <label className={labelClass}>Default Website Theme for New Visitors</label>
              <select
                name="theme_default"
                defaultValue={initialProfile.theme_default ?? 'dark'}
                className={inputClass}
              >
                <option value="dark">Dark Theme (Default Obsidian & Blue Signal)</option>
                <option value="light">Light Theme (Crisp Slate & Clean Canvas)</option>
                <option value="system">System Preference (Sync with Visitor Device)</option>
              </select>
              <p className="text-xs text-steel mt-2">
                Users can toggle between Light and Dark mode at any time using the Navbar theme switch.
              </p>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* 6. LEGAL TAB */}
        {/* ================================================================= */}
        {activeTab === 'legal' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-star flex items-center gap-2">
                <span>⚖️</span> Optional Legal & Registration Disclosures
              </h2>

              <Link
                href="/admin/legal-pages"
                className="font-mono text-xs text-signal hover:underline"
              >
                Open Markdown Policy Editor →
              </Link>
            </div>

            <div className="rounded-xl border border-line bg-ink/50 p-4 text-xs text-steel">
              <strong className="text-star font-medium">Note:</strong> As an early-stage agency, leave these fields empty if not yet registered. They will NOT appear publicly until explicitly filled out.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Legal Entity Name</label>
                <input
                  name="legal_entity_name"
                  defaultValue={initialProfile.legal_entity_name ?? ''}
                  placeholder="e.g. TechKnox Solutions LLC"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Company Registration Number</label>
                <input
                  name="registration_number"
                  defaultValue={initialProfile.registration_number ?? ''}
                  placeholder="e.g. REG-12345678"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>GST / VAT / Tax ID</label>
                <input
                  name="tax_id"
                  defaultValue={initialProfile.tax_id ?? ''}
                  placeholder="e.g. TAX-987654"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Registered Legal Address</label>
                <input
                  name="registered_address"
                  defaultValue={initialProfile.registered_address ?? ''}
                  placeholder="Full legal registered address"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Toolbar */}
        <div className="flex items-center justify-between pt-4 border-t border-line">
          <div className="text-xs text-steeldim">
            Changes will automatically update public pages and cached metadata.
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-signal px-8 py-3.5 font-mono text-sm font-semibold text-white shadow-lg shadow-signal/25 transition hover:bg-signal-hover active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? 'Saving Changes...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
