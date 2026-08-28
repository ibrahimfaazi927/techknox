'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    redirect('/admin/login?error=missing_fields');
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!url || !anonKey || url.includes('placeholder.supabase.co')) {
    console.error('Supabase environment variables are missing in production runtime.');
    redirect('/admin/login?error=unconfigured_supabase');
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Supabase auth sign-in error:', error.message, error.status);
      if (error.message.toLowerCase().includes('invalid login credentials')) {
        redirect('/admin/login?error=invalid_credentials');
      } else if (error.message.toLowerCase().includes('email not confirmed')) {
        redirect('/admin/login?error=' + encodeURIComponent('Email is not confirmed in Supabase.'));
      } else {
        redirect('/admin/login?error=' + encodeURIComponent(error.message));
      }
    }

    if (!data?.session) {
      redirect('/admin/login?error=invalid_credentials');
    }
  } catch (err) {
    // If it's a redirect, re-throw it (Next.js redirect mechanism)
    if (
      err &&
      typeof err === 'object' &&
      'digest' in err &&
      typeof (err as { digest?: string }).digest === 'string' &&
      (err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT')
    ) {
      throw err;
    }
    console.error('Login exception:', err);
    const msg = err instanceof Error ? err.message : 'Authentication system error';
    redirect('/admin/login?error=' + encodeURIComponent(msg));
  }

  redirect('/admin');
}
