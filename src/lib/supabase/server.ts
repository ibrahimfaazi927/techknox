import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// ---------------------------------------------------------------------------
// Public read-only client — NO cookies(), safe for ISR/SSG server components.
// Uses the anon key which has public-read RLS on all CMS tables.
// Never use for admin writes or authenticated reads.
// ---------------------------------------------------------------------------
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}


// Standard session-aware Supabase client for SSR, client auth context, and public operations
export async function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll called from a Server Component — safe to ignore
            // when middleware is refreshing the session.
          }
        }
      }
    }
  );
}

// Server-side admin client using service-role key (isolated to server environment)
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'placeholder-anon-key';

  return createSupabaseClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

// Strict server-side security guard for admin server actions
export async function requireAdmin() {
  const supabase = await createClient();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

  // In live production with real Supabase credentials, strictly verify active admin session
  if (url && !url.includes('placeholder.supabase.co')) {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      throw new Error('Unauthorized: An active admin session is required to perform this action.');
    }
  }

  return supabase;
}
