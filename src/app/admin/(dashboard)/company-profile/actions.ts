'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/supabase/server';

export async function updateCompanyProfile(formData: FormData) {
  const supabase = await requireAdmin();

  // General
  const brand_name = String(formData.get('brand_name') ?? 'Teknox').trim();
  const tagline = String(formData.get('tagline') ?? '').trim() || null;
  const short_description = String(formData.get('short_description') ?? '').trim() || null;
  const full_description = String(formData.get('full_description') ?? '').trim() || null;
  const logo_url = String(formData.get('logo_url') ?? '').trim() || null;
  const favicon_url = String(formData.get('favicon_url') ?? '').trim() || null;

  // Contact
  const email = String(formData.get('email') ?? '').trim() || null;
  const phone = String(formData.get('phone') ?? '').trim() || null;
  const whatsapp = String(formData.get('whatsapp') ?? '').trim() || null;
  const address = String(formData.get('address') ?? '').trim() || null;
  const location = String(formData.get('location') ?? '').trim() || null;
  const city = String(formData.get('city') ?? '').trim() || null;
  const country = String(formData.get('country') ?? '').trim() || null;
  const business_hours = String(formData.get('business_hours') ?? '').trim() || null;
  const contact_cta = String(formData.get('contact_cta') ?? '').trim() || null;
  const footer_description = String(formData.get('footer_description') ?? '').trim() || null;

  // Social
  const website = String(formData.get('website') ?? '').trim() || null;
  const linkedin_url = String(formData.get('linkedin_url') ?? '').trim() || null;
  const github_url = String(formData.get('github_url') ?? '').trim() || null;
  const instagram_url = String(formData.get('instagram_url') ?? '').trim() || null;
  const twitter_url = String(formData.get('twitter_url') ?? '').trim() || null;
  const other_social_url = String(formData.get('other_social_url') ?? '').trim() || null;

  // SEO & Appearance
  const site_title = String(formData.get('site_title') ?? '').trim() || null;
  const meta_description = String(formData.get('meta_description') ?? '').trim() || null;
  const og_image_url = String(formData.get('og_image_url') ?? '').trim() || null;
  const theme_default = String(formData.get('theme_default') ?? 'dark').trim() as 'dark' | 'light' | 'system';

  // Optional legal disclosures
  const legal_entity_name = String(formData.get('legal_entity_name') ?? '').trim() || null;
  const registration_number = String(formData.get('registration_number') ?? '').trim() || null;
  const tax_id = String(formData.get('tax_id') ?? '').trim() || null;
  const registered_address = String(formData.get('registered_address') ?? '').trim() || null;

  try {
    const { data: existing } = await supabase.from('company_profile').select('id').limit(1).maybeSingle();

    if (existing?.id) {
      await supabase.from('company_profile').update({
        brand_name,
        tagline,
        short_description,
        full_description,
        logo_url,
        favicon_url,
        email,
        phone,
        whatsapp,
        address,
        location,
        city,
        country,
        website,
        linkedin_url,
        github_url,
        instagram_url,
        twitter_url,
        other_social_url,
        business_hours,
        contact_cta,
        footer_description,
        site_title,
        meta_description,
        og_image_url,
        theme_default,
        legal_entity_name,
        registration_number,
        tax_id,
        registered_address,
        updated_at: new Date().toISOString()
      }).eq('id', existing.id);
    } else {
      await supabase.from('company_profile').insert({
        brand_name,
        tagline,
        short_description,
        full_description,
        logo_url,
        favicon_url,
        email,
        phone,
        whatsapp,
        address,
        location,
        city,
        country,
        website,
        linkedin_url,
        github_url,
        instagram_url,
        twitter_url,
        other_social_url,
        business_hours,
        contact_cta,
        footer_description,
        site_title,
        meta_description,
        og_image_url,
        theme_default,
        legal_entity_name,
        registration_number,
        tax_id,
        registered_address
      });
    }
  } catch (err) {
    console.error('Failed to update settings/company profile:', err);
  }

  // Revalidate all public pages — Navbar and Footer display brand_name/contact from profile
  revalidatePath('/admin/company-profile');
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/contact');
  revalidatePath('/services');
  revalidatePath('/solutions');
  revalidatePath('/projects');
  revalidatePath('/privacy-policy');
  revalidatePath('/terms-and-conditions');
}
