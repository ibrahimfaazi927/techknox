import { login } from './actions';
import TechKnoxLogo from '@/components/TechKnoxLogo';

export const metadata = { title: 'Admin Login — Teknox' };

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: { error?: string };
}) {
  const getErrorMessage = (errorKey?: string) => {
    if (!errorKey) return null;
    if (errorKey === 'missing_fields') return 'Please enter both your email address and password.';
    if (errorKey === 'unconfigured_supabase') {
      return 'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing in Vercel. Please add them in your Vercel Project Settings.';
    }
    if (errorKey === 'invalid_credentials') return 'Invalid email address or password.';
    try {
      return decodeURIComponent(errorKey);
    } catch {
      return errorKey;
    }
  };

  const errorMessage = getErrorMessage(searchParams?.error);

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md glass-card rounded-3xl p-8 sm:p-10 border border-line-bright shadow-2xl">
        <div className="flex justify-center mb-6">
          <TechKnoxLogo brandName="Teknox" size="md" variant="stacked" />
        </div>

        <h1 className="font-display text-2xl font-bold text-center text-star mb-1">
          Admin Sign In
        </h1>
        <p className="text-center text-xs text-steeldim mb-8">
          Sign in with your authorized admin credentials to manage content and inquiries.
        </p>

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-star font-medium leading-relaxed">
            {errorMessage}
          </div>
        )}

        <form action={login} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steel"
            >
              Admin Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="email"
              spellCheck={false}
              placeholder="contact@teknox.dev"
              className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-star outline-none focus:border-signal font-sans"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steel"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-star outline-none focus:border-signal font-sans"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-signal px-6 py-3.5 font-mono text-sm font-semibold text-white shadow-lg shadow-signal/25 transition hover:bg-signal-hover active:scale-[0.98]"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
