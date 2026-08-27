'use client';

import { createBrowserClient } from '@supabase/ssr';

// Browser-side Supabase client. Uses the public anon key only — safe to
// ship to the client. All privileged writes go through server actions
// using src/lib/supabase/server.ts instead.
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  return createBrowserClient(url, anonKey);
}
