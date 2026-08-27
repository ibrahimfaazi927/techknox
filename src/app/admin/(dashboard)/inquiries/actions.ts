'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient, createClient, requireAdmin } from '@/lib/supabase/server';

export async function updateContactStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id'));
  const status = String(formData.get('status'));

  try {
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY ? createAdminClient() : await createClient();
    await supabase.from('contact_submissions').update({ status }).eq('id', id);
  } catch (err) {
    console.error('Failed to update contact status:', err);
  }

  revalidatePath('/admin/inquiries');
  revalidatePath('/admin');
}

export async function updateSolutionRequestStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id'));
  const status = String(formData.get('status'));

  try {
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY ? createAdminClient() : await createClient();
    await supabase.from('solution_requests').update({ status }).eq('id', id);
  } catch (err) {
    console.error('Failed to update solution request status:', err);
  }

  revalidatePath('/admin/inquiries');
  revalidatePath('/admin');
}
