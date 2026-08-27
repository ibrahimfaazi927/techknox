'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isValidEmail, isValidPhone } from '@/lib/validation';

export async function submitContact(formData: FormData) {
  // Honeypot spam check: if the hidden 'website_hp' field is filled, silently discard spam
  const honeypot = String(formData.get('website_hp') ?? '').trim();
  if (honeypot) {
    redirect('/contact?submitted=1');
  }

  const name = String(formData.get('name') ?? '').trim();
  const company = String(formData.get('company') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const whatsapp = String(formData.get('whatsapp') ?? '').trim();
  const service_interested = String(formData.get('service_interested') ?? '').trim();
  const project_description = String(formData.get('project_description') ?? '').trim();
  const budget_range = String(formData.get('budget_range') ?? '').trim();
  const contact_method = String(formData.get('contact_method') ?? '').trim();

  // Validate required fields
  if (!name || !email || !project_description) {
    redirect('/contact?error=missing_fields');
  }

  // Server-side email format validation (client also validates, but server is authoritative)
  if (!isValidEmail(email)) {
    redirect('/contact?error=invalid_email');
  }

  // Server-side phone validation — reject if provided but contains invalid characters
  if (phone && !isValidPhone(phone)) {
    redirect('/contact?error=invalid_phone');
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('contact_submissions').insert({
      name,
      company: company || null,
      email,
      phone: phone || null,
      whatsapp: whatsapp || null,
      service_interested: service_interested || null,
      project_description,
      budget_range: budget_range || null,
      contact_method: contact_method || null,
      status: 'new'
    });

    if (error) {
      console.error('Supabase insert error in contact_submissions:', error);
      redirect('/contact?error=submit_failed');
    }
  } catch (err) {
    if (err && typeof err === 'object' && 'digest' in err && typeof (err as { digest?: string }).digest === 'string' && (err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT')) {
      throw err;
    }
    console.error('Contact submission error:', err);
    redirect('/contact?error=submit_failed');
  }

  // Flush the Next.js router cache so admin pages show the new submission immediately
  revalidatePath('/admin/inquiries');
  revalidatePath('/admin');
  redirect('/contact?submitted=1');
}
