'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/supabase/server';

export async function createProcessStep(formData: FormData) {
  const supabase = await requireAdmin();

  const title = String(formData.get('title') ?? '').trim();
  if (!title) return;

  const description = String(formData.get('description') ?? '').trim() || null;
  const display_order = Number(formData.get('display_order') ?? 0);

  try {
    await supabase.from('process_steps').insert({
      title,
      description,
      display_order
    });
  } catch (err) {
    console.error('Failed to create process step:', err);
  }

  revalidatePath('/admin/process-steps');
  revalidatePath('/about');
  revalidatePath('/');
}

export async function updateProcessStep(formData: FormData) {
  const supabase = await requireAdmin();

  const id = String(formData.get('id') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  if (!id || !title) return;

  const description = String(formData.get('description') ?? '').trim() || null;
  const display_order = Number(formData.get('display_order') ?? 0);

  try {
    await supabase.from('process_steps').update({
      title,
      description,
      display_order
    }).eq('id', id);
  } catch (err) {
    console.error('Failed to update process step:', err);
  }

  revalidatePath('/admin/process-steps');
  revalidatePath('/about');
  revalidatePath('/');
}

export async function deleteProcessStep(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get('id'));

  try {
    await supabase.from('process_steps').delete().eq('id', id);
  } catch (err) {
    console.error('Failed to delete process step:', err);
  }

  revalidatePath('/admin/process-steps');
  revalidatePath('/about');
  revalidatePath('/');
}
