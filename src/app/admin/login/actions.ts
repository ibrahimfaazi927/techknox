'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    redirect('/admin/login?error=missing_fields');
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      redirect('/admin/login?error=invalid_credentials');
    }
  } catch (err) {
    // If it's a redirect, re-throw it (Next.js redirect mechanism)
    if (err && typeof err === 'object' && 'digest' in err && typeof (err as { digest?: string }).digest === 'string' && (err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT')) {
      throw err;
    }
    console.error('Login error:', err);
    redirect('/admin/login?error=invalid_credentials');
  }

  redirect('/admin');
}
