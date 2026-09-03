'use client';

import React, { useState, useCallback } from 'react';
import { ArrowRightIcon } from '@/components/Icons';
import { submitSolutionRequest } from './actions';
import { isValidEmail, isValidPhone } from '@/lib/validation';
import PhoneInputField from '@/components/PhoneInputField';

const inputStyles =
  'w-full rounded-lg border border-line bg-ink-800 px-4 py-3 text-sm text-star outline-none placeholder:text-steeldim transition focus:border-signal focus:ring-2 focus:ring-signal/20';
const inputErrorStyles =
  'w-full rounded-lg border border-red-400 bg-ink-800 px-4 py-3 text-sm text-star outline-none placeholder:text-steeldim transition focus:border-red-400 focus:ring-2 focus:ring-red-400/20';
const labelStyles =
  'mb-1.5 block font-mono text-xs uppercase tracking-wider text-steeldim font-semibold';
const fieldErrorStyles = 'mt-1 text-xs text-red-500 font-mono';

interface SolutionRequestFormProps {
  defaultSolutionType?: string;
}

export default function SolutionRequestForm({ defaultSolutionType = '' }: SolutionRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Inline field errors
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [whatsappError, setWhatsappError] = useState<string | null>(null);

  // Tracked E.164 values from PhoneInputField
  const [phoneValue, setPhoneValue] = useState('');
  const [whatsappValue, setWhatsappValue] = useState('');

  // ── Email handlers ────────────────────────────────────────────────────
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (emailError && isValidEmail(e.target.value)) setEmailError(null);
  }, [emailError]);

  const handleEmailBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val && !isValidEmail(val)) {
      setEmailError('Enter a valid email address (e.g. you@company.com).');
    } else {
      setEmailError(null);
    }
  }, []);

  // ── Phone / WhatsApp value tracking ──────────────────────────────────
  const handlePhoneValueChange = useCallback((e164: string) => {
    setPhoneValue(e164);
    if (phoneError && (!e164 || isValidPhone(e164))) setPhoneError(null);
  }, [phoneError]);

  const handleWhatsappValueChange = useCallback((e164: string) => {
    setWhatsappValue(e164);
    if (whatsappError && (!e164 || isValidPhone(e164))) setWhatsappError(null);
  }, [whatsappError]);

  // ── Submit handler ────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;

    const form = e.currentTarget;
    const emailVal = String((form.elements.namedItem('email') as HTMLInputElement)?.value ?? '').trim();

    let hasError = false;
    if (!isValidEmail(emailVal)) {
      setEmailError('Enter a valid email address (e.g. you@company.com).');
      hasError = true;
    }
    if (phoneValue && !isValidPhone(phoneValue)) {
      setPhoneError('Enter a valid phone number.');
      hasError = true;
    }
    if (whatsappValue && !isValidPhone(whatsappValue)) {
      setWhatsappError('Enter a valid phone number.');
      hasError = true;
    }
    if (hasError) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData(form);
      const result = await submitSolutionRequest(formData);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        if (result.error === 'missing_fields') {
          setErrorMessage('Please complete the required fields: Your Name, Email Address, and Project Description.');
        } else if (result.error === 'invalid_email') {
          setEmailError('Please enter a valid email address.');
          setErrorMessage(null);
        } else if (result.error === 'invalid_phone') {
          setPhoneError('Please enter a valid phone number.');
          setErrorMessage(null);
        } else {
          setErrorMessage('Something went wrong submitting your request. Please try again or email us directly.');
        }
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-8 sm:p-12 border border-line-bright">
      {errorMessage && (
        <div className="mb-8 rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-sm text-star animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              {errorMessage}{' '}
              {errorMessage.includes('directly') && (
                <a
                  href="mailto:contact@teknox.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-signal transition font-medium"
                >
                  contact@teknox.dev
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-steel hover:text-star text-xs font-mono"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Honeypot anti-spam */}
        <input
          type="text"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        {/* Section 1: Contact Information */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-4 pb-2 border-b border-line">
            01. Your Details
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className={labelStyles}>
                Full Name <span className="text-signal">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={isSubmitted}
                placeholder="e.g. Alex Morgan"
                className={inputStyles}
              />
            </div>

            <div>
              <label htmlFor="company" className={labelStyles}>
                Company / Organization
              </label>
              <input
                id="company"
                name="company"
                type="text"
                disabled={isSubmitted}
                placeholder="Company or organization name"
                className={inputStyles}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelStyles}>
                Business Email <span className="text-signal">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                required
                autoComplete="email"
                disabled={isSubmitted}
                placeholder="you@company.com"
                className={emailError ? inputErrorStyles : inputStyles}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                aria-invalid={emailError ? 'true' : 'false'}
                aria-describedby={emailError ? 'srf-email-error' : undefined}
              />
              {emailError && (
                <p id="srf-email-error" className={fieldErrorStyles} role="alert">
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="country" className={labelStyles}>
                Country / Timezone
              </label>
              <input
                id="country"
                name="country"
                type="text"
                disabled={isSubmitted}
                placeholder="e.g. United States (EST) / UK (GMT) / India (IST)"
                className={inputStyles}
              />
            </div>

            {/* Phone — international selector */}
            <div>
              <label htmlFor="srf-phone" className={labelStyles}>
                Phone Number <span className="text-steeldim font-normal">(Optional)</span>
              </label>
              <PhoneInputField
                id="srf-phone"
                name="phone"
                defaultCountry="IN"
                placeholder="98765 43210"
                disabled={isSubmitted}
                error={phoneError}
                ariaDescribedById={phoneError ? 'srf-phone-error' : undefined}
                onValueChange={handlePhoneValueChange}
              />
              {phoneError && (
                <p id="srf-phone-error" className={fieldErrorStyles} role="alert">
                  {phoneError}
                </p>
              )}
            </div>

            {/* WhatsApp — international selector */}
            <div>
              <label htmlFor="srf-whatsapp" className={labelStyles}>
                WhatsApp <span className="text-steeldim font-normal">(Optional)</span>
              </label>
              <PhoneInputField
                id="srf-whatsapp"
                name="whatsapp"
                defaultCountry="IN"
                placeholder="98765 43210"
                disabled={isSubmitted}
                error={whatsappError}
                ariaDescribedById={whatsappError ? 'srf-whatsapp-error' : undefined}
                onValueChange={handleWhatsappValueChange}
              />
              {whatsappError && (
                <p id="srf-whatsapp-error" className={fieldErrorStyles} role="alert">
                  {whatsappError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Project Specifications */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-4 pb-2 border-b border-line">
            02. Project &amp; System Requirements
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="solution_type" className={labelStyles}>
                Discipline / Solution Type
              </label>
              <input
                id="solution_type"
                name="solution_type"
                defaultValue={defaultSolutionType}
                disabled={isSubmitted}
                placeholder="e.g. Web App, AI Automation, API Integration, CRM, Business Dashboard"
                className={inputStyles}
              />
            </div>

            <div>
              <label htmlFor="project_description" className={labelStyles}>
                Project Overview &amp; Problem Statement <span className="text-signal">*</span>
              </label>
              <textarea
                id="project_description"
                name="project_description"
                required
                rows={5}
                disabled={isSubmitted}
                placeholder="Describe the business problem, current manual steps, desired software capabilities, and key deliverables..."
                className={inputStyles}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="existing_system" className={labelStyles}>
                  Existing System / Database (If Any)
                </label>
                <input
                  id="existing_system"
                  name="existing_system"
                  disabled={isSubmitted}
                  placeholder="e.g. PostgreSQL, Google Sheets, Legacy PHP, None"
                  className={inputStyles}
                />
              </div>

              <div>
                <label htmlFor="required_integrations" className={labelStyles}>
                  Required Integrations / APIs
                </label>
                <input
                  id="required_integrations"
                  name="required_integrations"
                  disabled={isSubmitted}
                  placeholder="e.g. Stripe, HubSpot, WhatsApp API, QuickBooks"
                  className={inputStyles}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="automation_requirements" className={labelStyles}>
                  Automation / AI Needs (If Any)
                </label>
                <input
                  id="automation_requirements"
                  name="automation_requirements"
                  disabled={isSubmitted}
                  placeholder="e.g. Auto-parsing invoices, AI support bot, email triggers"
                  className={inputStyles}
                />
              </div>

              <div>
                <label htmlFor="preferred_technology" className={labelStyles}>
                  Preferred Tech Stack (Optional)
                </label>
                <input
                  id="preferred_technology"
                  name="preferred_technology"
                  disabled={isSubmitted}
                  placeholder="e.g. Next.js, Python, Supabase, No preference"
                  className={inputStyles}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Timeline & Notes */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-4 pb-2 border-b border-line">
            03. Timeline &amp; Notes
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="timeline" className={labelStyles}>
                Target Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                disabled={isSubmitted}
                className={inputStyles}
                defaultValue=""
              >
                <option value="" className="bg-ink text-steeldim">Select timeline...</option>
                <option value="Urgent (< 2 weeks)" className="bg-ink text-star">Urgent (&lt; 2 weeks)</option>
                <option value="1 month" className="bg-ink text-star">Within 1 month</option>
                <option value="1-3 months" className="bg-ink text-star">1 – 3 months</option>
                <option value="Flexible" className="bg-ink text-star">Flexible</option>
              </select>
            </div>

            <div>
              <label htmlFor="additional_requirements" className={labelStyles}>
                Additional Notes / Special Instructions
              </label>
              <textarea
                id="additional_requirements"
                name="additional_requirements"
                rows={3}
                disabled={isSubmitted}
                placeholder="Security requirements, NDA requests, deployment environments, or other questions..."
                className={inputStyles}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted || !!emailError || !!phoneError || !!whatsappError}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-mono text-sm font-semibold transition ${
              isSubmitted
                ? 'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/40 cursor-not-allowed'
                : isSubmitting
                ? 'bg-signal/70 text-white cursor-wait opacity-80'
                : 'btn-primary bg-signal text-white shadow-signal-md hover:bg-signal-hover active:scale-[0.99]'
            }`}
          >
            {isSubmitted ? (
              <span>Request Submitted ✓</span>
            ) : isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <span>Submitting Request...</span>
              </span>
            ) : (
              <>
                <span>Submit Solution Request</span>
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Success Confirmation */}
        {isSubmitted && (
          <div
            role="status"
            className="rounded-2xl border border-accent-emerald/40 bg-accent-emerald/10 p-6 sm:p-8 text-star animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="font-display text-xl sm:text-2xl font-bold mb-2 text-accent-emerald flex items-center gap-2">
              <span>Solution Request Submitted!</span>
            </div>
            <p className="text-sm sm:text-base text-steel leading-relaxed">
              Thank you for sharing your project requirements. Our engineering team will review
              your request and prepare a tailored response.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
