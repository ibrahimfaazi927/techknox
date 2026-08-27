'use client';

import React, { useState, useCallback } from 'react';
import { ArrowRightIcon } from '@/components/Icons';
import { submitContact } from './actions';
import { isValidEmail, isValidPhone } from '@/lib/validation';
import PhoneInputField from '@/components/PhoneInputField';

const inputStyles =
  'w-full rounded-xl border border-line-bright bg-panel px-4 py-3 text-sm text-star outline-none placeholder:text-steeldim/60 focus:border-signal focus:ring-1 focus:ring-signal transition';
const inputErrorStyles =
  'w-full rounded-xl border border-red-500/70 bg-panel px-4 py-3 text-sm text-star outline-none placeholder:text-steeldim/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition';
const labelStyles =
  'mb-2 block font-mono text-xs uppercase tracking-wider text-steel font-medium';
const fieldErrorStyles = 'mt-1.5 text-xs text-red-400 font-mono';

interface ContactFormProps {
  services: { id: string; title: string }[];
  submittedFromUrl?: boolean;
  errorFromUrl?: string | null;
}

export default function ContactForm({ services, submittedFromUrl, errorFromUrl }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(submittedFromUrl ?? false);

  // Field-level inline errors
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Tracked value from PhoneInputField (E.164 format)
  const [phoneValue, setPhoneValue] = useState('');

  const [serverError, setServerError] = useState<string | null>(
    errorFromUrl === 'missing_fields'
      ? 'Please fill in your name, email, and project description.'
      : errorFromUrl === 'invalid_email'
      ? 'Please enter a valid email address.'
      : errorFromUrl === 'invalid_phone'
      ? 'Please enter a valid phone number.'
      : errorFromUrl === 'submit_failed'
      ? 'Something went wrong submitting your message. Please try again or email us directly.'
      : null
  );

  // ── Email handlers ─────────────────────────────────────────────────────
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

  // ── Phone value tracking ───────────────────────────────────────────────
  const handlePhoneValueChange = useCallback((e164: string) => {
    setPhoneValue(e164);
    // Clear error when value becomes valid
    if (phoneError && (!e164 || isValidPhone(e164))) setPhoneError(null);
  }, [phoneError]);

  // ── Submit handler ─────────────────────────────────────────────────────
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
    if (hasError) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const formData = new FormData(form);
      await submitContact(formData);
      // submitContact redirects on success; React/Next.js handles navigation
    } catch (err: unknown) {
      // Re-throw Next.js redirect pseudo-errors so navigation works
      if (
        err &&
        typeof err === 'object' &&
        'digest' in err &&
        typeof (err as { digest?: string }).digest === 'string' &&
        (err as { digest: string }).digest.startsWith('NEXT_REDIRECT')
      ) {
        throw err;
      }
      console.error('Contact submission error:', err);
      setServerError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass-card rounded-3xl p-8 sm:p-10 border border-line-bright">
        <div
          role="status"
          className="rounded-2xl border border-accent-emerald/40 bg-accent-emerald/10 p-6 sm:p-8 text-star"
        >
          <div className="font-display text-xl sm:text-2xl font-bold mb-2 text-accent-emerald">
            Message Received!
          </div>
          <p className="text-sm text-steel leading-relaxed">
            Thank you for reaching out. We will review your inquiry and follow up directly with you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-8 sm:p-10 border border-line-bright">
      {serverError && (
        <div className="mb-8 rounded-2xl border border-red-500/40 bg-red-500/10 p-5 text-sm text-star" role="alert">
          <div className="flex items-start justify-between gap-4">
            <span>{serverError}</span>
            <button
              type="button"
              onClick={() => setServerError(null)}
              className="text-steel hover:text-star text-xs font-mono shrink-0"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Honeypot anti-spam */}
        <input
          type="text"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="cf-name" className={labelStyles}>
              Your Name <span className="text-signal">*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              placeholder="Your full name"
              className={inputStyles}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="cf-company" className={labelStyles}>
              Company / Organization
            </label>
            <input
              id="cf-company"
              name="company"
              type="text"
              placeholder="Company name"
              className={inputStyles}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Email */}
          <div>
            <label htmlFor="cf-email" className={labelStyles}>
              Email Address <span className="text-signal">*</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              inputMode="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={emailError ? inputErrorStyles : inputStyles}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              aria-invalid={emailError ? 'true' : 'false'}
              aria-describedby={emailError ? 'cf-email-error' : undefined}
              disabled={isSubmitting}
            />
            {emailError && (
              <p id="cf-email-error" className={fieldErrorStyles} role="alert">
                {emailError}
              </p>
            )}
          </div>

          {/* Phone — international selector */}
          <div>
            <label htmlFor="cf-phone" className={labelStyles}>
              Phone / WhatsApp <span className="text-steeldim font-normal">(Optional)</span>
            </label>
            <PhoneInputField
              id="cf-phone"
              name="phone"
              defaultCountry="IN"
              placeholder="98765 43210"
              disabled={isSubmitting}
              error={phoneError}
              ariaDescribedById={phoneError ? 'cf-phone-error' : undefined}
              onValueChange={handlePhoneValueChange}
            />
            {phoneError && (
              <p id="cf-phone-error" className={fieldErrorStyles} role="alert">
                {phoneError}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="cf-service" className={labelStyles}>
            Service Interested In
          </label>
          <select
            id="cf-service"
            name="service_interested"
            className={inputStyles}
            defaultValue=""
            disabled={isSubmitting}
          >
            <option value="" className="bg-ink text-steeldim">
              Select a discipline...
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.title} className="bg-ink text-star">
                {s.title}
              </option>
            ))}
            <option value="Other / Custom Technology" className="bg-ink text-star">
              Other / Custom Technology
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="cf-description" className={labelStyles}>
            Project Overview / Challenge <span className="text-signal">*</span>
          </label>
          <textarea
            id="cf-description"
            name="project_description"
            required
            rows={5}
            placeholder="Describe what you want to build, what problem you are trying to solve, or what systems you need integrated..."
            className={inputStyles}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="cf-contact-method" className={labelStyles}>
            Preferred Contact Method
          </label>
          <select
            id="cf-contact-method"
            name="contact_method"
            className={inputStyles}
            defaultValue="Email"
            disabled={isSubmitting}
          >
            <option value="Email" className="bg-ink text-star">Email</option>
            <option value="WhatsApp" className="bg-ink text-star">WhatsApp</option>
            <option value="Phone Call" className="bg-ink text-star">Phone Call</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !!emailError || !!phoneError}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-mono text-sm font-semibold transition ${
            isSubmitting
              ? 'bg-signal/70 text-white cursor-wait opacity-80'
              : 'btn-primary bg-signal text-white shadow-lg shadow-signal/25 hover:bg-signal-hover active:scale-[0.99]'
          }`}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span>Sending...</span>
            </span>
          ) : (
            <>
              <span>Send Inquiry</span>
              <ArrowRightIcon className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
