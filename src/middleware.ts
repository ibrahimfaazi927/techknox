import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  try {
    const supabase = createServerClient(
      url,
      anonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          }
        }
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isLoginRoute = request.nextUrl.pathname.startsWith('/admin/login');

    if (isAdminRoute && !isLoginRoute && !user) {
      // If supabase is not configured with real keys, allow local dev access to inspect admin UI
      const isPlaceholder = url.includes('placeholder.supabase.co');
      if (!isPlaceholder) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/admin/login';
        return NextResponse.redirect(redirectUrl);
      }
    }
  } catch (err) {
    console.warn('Middleware auth check notice:', err);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*']
};
