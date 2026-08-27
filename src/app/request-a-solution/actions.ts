'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { isValidEmail, isValidPhone } from '@/lib/validation';

export interface SubmitSolutionResult {
  success?: boolean;
  error?: 'missing_fields' | 'invalid_email' | 'invalid_phone' | 'submit_failed' | string | null;
}

export async function submitSolutionRequest(formData: FormData): Promise<SubmitSolutionResult> {
  // Honeypot spam protection
  const honeypot = String(formData.get('website_hp') ?? '').trim();
  if (honeypot) {
    return { success: true };
  }

  const name = String(formData.get('name') ?? '').trim();
  const company = String(formData.get('company') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const whatsapp = String(formData.get('whatsapp') ?? '').trim();
  const country = String(formData.get('country') ?? '').trim();
  const solution_type = String(formData.get('solution_type') ?? '').trim();
  const project_description = String(formData.get('project_description') ?? '').trim();
  const existing_system = String(formData.get('existing_system') ?? '').trim();
  const required_integrations = String(formData.get('required_integrations') ?? '').trim();
  const automation_requirements = String(formData.get('automation_requirements') ?? '').trim();
  const preferred_technology = String(formData.get('preferred_technology') ?? '').trim();
  const budget_currency = String(formData.get('budget_currency') ?? 'INR').trim();
  const budget_range = String(formData.get('budget_range') ?? '').trim();
  const timeline = String(formData.get('timeline') ?? '').trim();
  const additional_requirements = String(formData.get('additional_requirements') ?? '').trim();

  if (!name || !email || !project_description) {
    return { error: 'missing_fields' };
  }

  if (!isValidEmail(email)) {
    return { error: 'invalid_email' };
  }

  if (phone && !isValidPhone(phone)) {
    return { error: 'invalid_phone' };
  }

  if (whatsapp && !isValidPhone(whatsapp)) {
    return { error: 'invalid_phone' };
  }

  try {
    const supabase = await createClient();
    const payload: Record<string, unknown> = {
      name,
      company: company || null,
      email,
      phone: phone || null,
      whatsapp: whatsapp || null,
      country: country || null,
      solution_type: solution_type || null,
      project_description,
      existing_system: existing_system || null,
      required_integrations: required_integrations || null,
      automation_requirements: automation_requirements || null,
      preferred_technology: preferred_technology || null,
      budget_currency: budget_currency || 'INR',
      currency: budget_currency || 'INR',
      budget_range: budget_range || null,
      timeline: timeline || null,
      additional_requirements: additional_requirements || null,
      status: 'new'
    };

    let { error } = await supabase.from('solution_requests').insert(payload);

    // Fallback if migration hasn't been executed on remote Supabase instance
    if (error && (error.message?.includes('budget_currency') || error.message?.includes('currency'))) {
      delete payload.budget_currency;
      delete payload.currency;
      const retryResult = await supabase.from('solution_requests').insert(payload);
      error = retryResult.error;
    }

    if (error) {
      console.error('Supabase insert error in solution_requests:', error);
      return { error: 'submit_failed' };
    }

    // Flush the Next.js router cache so admin pages show the new submission immediately
    revalidatePath('/admin/inquiries');
    revalidatePath('/admin');
    return { success: true };
  } catch (err) {
    console.error('Solution request submission error:', err);
    return { error: 'submit_failed' };
  }
}
