'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/supabase/server';

export async function updateLegalPage(formData: FormData) {
  const supabase = await requireAdmin();

  const slug = String(formData.get('slug') ?? '').trim();
  const title = String(formData.get('title') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();

  if (!slug || !title) return;

  try {
    const { data: existing } = await supabase.from('legal_pages').select('id').eq('slug', slug).maybeSingle();

    if (existing?.id) {
      await supabase.from('legal_pages').update({
        title,
        content,
        updated_at: new Date().toISOString()
      }).eq('id', existing.id);
    } else {
      await supabase.from('legal_pages').insert({
        slug,
        title,
        content
      });
    }
  } catch (err) {
    console.error('Failed to update legal page in DB:', err);
  }

  revalidatePath('/admin/legal-pages');
  revalidatePath(`/${slug}`);
  revalidatePath('/');
}
