# TechKnox — starter codebase

This is a real Next.js 14 (App Router) + TypeScript + Tailwind + Supabase
codebase, generated from the TechKnox build spec. Read this file before you
do anything else — it tells you exactly what's built, what's a working
pattern to copy, and what's still a stub.

## Honest status (read this first)

This was written in a sandbox with **no internet access**, so it has not
been through `npm install`, `npm run build`, or a real Supabase project.
Nothing here has been executed or verified end-to-end. Treat it as a strong,
consistent starting point — not a finished, tested product.

**What's fully built and wired to Supabase:**
- Public site: Home, Services, Solutions, Projects, About, Contact, Request a Solution
- Full database schema + Row Level Security policies (`supabase/migrations/0001_init_schema.sql`)
- Contact form and Request-a-Solution form (write to `contact_submissions` / `solution_requests`)
- Admin auth (Supabase Auth email/password), protected by `src/middleware.ts`
- Admin dashboard shell (sidebar, sign out, live overview counts — zero when empty, never fake)
- **One complete admin CRUD example: `/admin/services`** (list, add, enable/disable, delete)

**What's a stub / not yet built** — copy the pattern in
`src/app/admin/(dashboard)/services/` for each of these:
- `/admin/solutions`, `/admin/projects`, `/admin/inquiries`, `/admin/company-profile`, `/admin/legal-pages`
- File uploads (logo, favicon, project images) via Supabase Storage
- SEO extras: sitemap.xml, robots.txt, per-page Open Graph images
- Legal page public routes (`/legal/[slug]`) — the schema and footer links already assume this path

No fake testimonials, client logos, stats, or claims are seeded anywhere,
per the spec's "no fake data" rule. Empty states are real empty states.

## Setup

1. **Create a Supabase project** at supabase.com (free tier is enough to start).
2. In the SQL editor, run `supabase/migrations/0001_init_schema.sql`.
3. In Authentication → Users, manually create your first admin user (email + password) — there's no public sign-up screen, by design.
4. Copy `.env.example` to `.env.local` and fill in your project's URL and anon key (Project Settings → API).
5. Install and run:
   ```
   npm install
   npm run dev
   ```
6. Visit `/admin/login` and sign in with the user you created in step 3.

## Where to go from here

This is exactly the kind of project — install, build, connect a real
database, iterate on errors — that's much better finished in an environment
with real network access, like **Claude Code**, rather than one-shot in
chat. It can install the dependencies, run the actual build, connect to
your live Supabase project, and fix errors as they come up, which this
sandbox can't do.

## Deployment (once it builds locally)

- **Vercel** (recommended, free tier): connect the repo, add the three env vars from `.env.local`, deploy.
- Add your Supabase URL/keys as environment variables in Vercel's project settings — never commit `.env.local`.
