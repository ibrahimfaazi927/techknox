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

export async function createSolution(formData: FormData) {
  const supabase = await requireAdmin();

  const title = String(formData.get('title') ?? '').trim();
  if (!title) return;

  const slug = String(formData.get('slug') ?? '').trim() || slugify(title);
  const description = String(formData.get('description') ?? '').trim() || null;
  const icon = String(formData.get('icon') ?? 'funnel').trim();
  const display_order = Number(formData.get('display_order') ?? 0);

  const rawFeatures = String(formData.get('features') ?? '').trim();
  const features = rawFeatures ? rawFeatures.split('\n').map((f) => f.trim()).filter(Boolean) : null;

  const rawUseCases = String(formData.get('use_cases') ?? '').trim();
  const use_cases = rawUseCases ? rawUseCases.split(',').map((u) => u.trim()).filter(Boolean) : null;

  try {
    await supabase.from('solutions').insert({
      title,
      slug,
      description,
      icon,
      features,
      use_cases,
      is_enabled: true,
      display_order
    });
  } catch (err) {
    console.error('Failed to insert solution:', err);
  }

  revalidatePath('/admin/solutions');
  revalidatePath('/solutions');
  revalidatePath('/');
}

export async function toggleSolution(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get('id'));
  const nextEnabled = formData.get('is_enabled') === 'true';

  try {
    await supabase.from('solutions').update({ is_enabled: nextEnabled }).eq('id', id);
  } catch (err) {
    console.error('Failed to toggle solution:', err);
  }

  revalidatePath('/admin/solutions');
  revalidatePath('/solutions');
  revalidatePath('/');
}

export async function deleteSolution(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get('id'));

  try {
    await supabase.from('solutions').delete().eq('id', id);
  } catch (err) {
    console.error('Failed to delete solution:', err);
  }

  revalidatePath('/admin/solutions');
  revalidatePath('/solutions');
  revalidatePath('/');
}
