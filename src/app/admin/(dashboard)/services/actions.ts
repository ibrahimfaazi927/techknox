'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/supabase/server';

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function createService(formData: FormData) {
  const supabase = await requireAdmin();

  const title = String(formData.get('title') ?? '').trim();
  if (!title) return;

  const slug = String(formData.get('slug') ?? '').trim() || slugify(title);
  const short_description = String(formData.get('short_description') ?? '').trim() || null;
  const description = String(formData.get('description') ?? '').trim() || null;
  const icon = String(formData.get('icon') ?? 'code').trim();
  const cta_label = String(formData.get('cta_label') ?? 'Start a Project').trim();
  const display_order = Number(formData.get('display_order') ?? 0);

  const rawFeatures = String(formData.get('features') ?? '').trim();
  const features = rawFeatures ? rawFeatures.split('\n').map((f) => f.trim()).filter(Boolean) : null;

  const rawTech = String(formData.get('technologies') ?? '').trim();
  const technologies = rawTech ? rawTech.split(',').map((t) => t.trim()).filter(Boolean) : null;

  try {
    await supabase.from('services').insert({
      title,
      slug,
      short_description,
      description,
      icon,
      cta_label,
      features,
      technologies,
      is_enabled: true,
      display_order
    });
  } catch (err) {
    console.error('Failed to create service in DB:', err);
  }

  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath(`/services/${slug}`);
  revalidatePath('/');
}

export async function toggleService(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get('id'));
  const nextEnabled = formData.get('is_enabled') === 'true';

  try {
    await supabase.from('services').update({ is_enabled: nextEnabled }).eq('id', id);
  } catch (err) {
    console.error('Failed to toggle service in DB:', err);
  }

  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/');
}

export async function deleteService(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get('id'));

  try {
    await supabase.from('services').delete().eq('id', id);
  } catch (err) {
    console.error('Failed to delete service in DB:', err);
  }

  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/');
}
