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

export async function createProject(formData: FormData) {
  const supabase = await requireAdmin();

  const name = String(formData.get('name') ?? '').trim();
  if (!name) return;

  const slug = String(formData.get('slug') ?? '').trim() || slugify(name);
  const short_description = String(formData.get('short_description') ?? '').trim() || null;
  const detailed_description = String(formData.get('detailed_description') ?? '').trim() || null;
  const problem = String(formData.get('problem') ?? '').trim() || null;
  const solution = String(formData.get('solution') ?? '').trim() || null;
  const industry = String(formData.get('industry') ?? '').trim() || null;
  const project_type = String(formData.get('project_type') ?? '').trim() || null;
  const live_url = String(formData.get('live_url') ?? '').trim() || null;
  const github_url = String(formData.get('github_url') ?? '').trim() || null;
  const is_demo = formData.get('is_demo') === 'on' || formData.get('is_demo') === 'true';
  const is_featured = formData.get('is_featured') === 'on' || formData.get('is_featured') === 'true';
  const status = (String(formData.get('status') ?? 'completed') as 'planned' | 'in_progress' | 'completed' | 'archived');
  const display_order = Number(formData.get('display_order') ?? 0);

  const rawFeatures = String(formData.get('features') ?? '').trim();
  const features = rawFeatures ? rawFeatures.split('\n').map((f) => f.trim()).filter(Boolean) : null;

  const rawTech = String(formData.get('technologies') ?? '').trim();
  const technologies = rawTech ? rawTech.split(',').map((t) => t.trim()).filter(Boolean) : null;

  try {
    await supabase.from('projects').insert({
      name,
      slug,
      short_description,
      detailed_description,
      problem,
      solution,
      industry,
      project_type,
      live_url,
      github_url,
      is_demo,
      is_featured,
      status,
      display_order,
      features,
      technologies
    });
  } catch (err) {
    console.error('Failed to create project:', err);
  }

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath(`/projects/${slug}`);
  revalidatePath('/');
}

export async function toggleProjectFeatured(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get('id'));
  const nextFeatured = formData.get('is_featured') === 'true';

  try {
    await supabase.from('projects').update({ is_featured: nextFeatured }).eq('id', id);
  } catch (err) {
    console.error('Failed to toggle project featured:', err);
  }

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath('/');
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get('id'));

  try {
    await supabase.from('projects').delete().eq('id', id);
  } catch (err) {
    console.error('Failed to delete project:', err);
  }

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath('/');
}
