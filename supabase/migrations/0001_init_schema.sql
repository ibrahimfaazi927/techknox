-- ============================================================================
-- TechKnox — Complete Production Schema
-- Run this in the Supabase SQL editor or via `supabase db push`.
-- ============================================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- company_profile: single-row table holding editable business info & optional legal fields
-- ---------------------------------------------------------------------------
create table if not exists company_profile (
  id uuid primary key default uuid_generate_v4(),
  brand_name text not null default 'TechKnox',
  tagline text default 'We build the technology your business needs.',
  short_description text,
  full_description text,
  logo_url text,
  favicon_url text,
  email text default 'techknoxin@gmail.com',
  phone text,
  whatsapp text,
  address text,
  location text,
  city text,
  country text,
  website text default 'https://techknox.dev',
  linkedin_url text,
  instagram_url text,
  github_url text,
  twitter_url text,
  other_social_url text,
  business_hours text,
  contact_cta text default 'Start a Project',
  footer_description text,
  site_title text default 'TechKnox — We build the technology your business needs',
  meta_description text,
  og_image_url text,
  theme_default text default 'dark',
  -- Optional legal/registration disclosures (displayed publicly ONLY when configured)
  legal_entity_name text,
  registration_number text,
  tax_id text,
  registered_address text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- services: dynamic service catalog
-- ---------------------------------------------------------------------------
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  short_description text,
  description text,
  icon text,
  image_url text,
  features text[],
  technologies text[],
  benefits text[],
  process jsonb,
  faq jsonb,
  cta_label text default 'Start a Project',
  is_enabled boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- solutions: outcome-oriented business solutions
-- ---------------------------------------------------------------------------
create table if not exists solutions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text,
  icon text,
  features text[],
  benefits text[],
  use_cases text[],
  is_enabled boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- projects: dynamic portfolio with transparent demo / concept labeling
-- ---------------------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  short_description text,
  detailed_description text,
  problem text,
  solution text,
  features text[],
  technologies text[],
  industry text,
  project_type text,
  live_url text,
  github_url text,
  is_demo boolean not null default true,
  results text,
  status text not null default 'completed' check (status in ('planned','in_progress','completed','archived')),
  is_featured boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- process_steps: "How We Work"
-- ---------------------------------------------------------------------------
create table if not exists process_steps (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  display_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- legal_pages: rich text keyed by slug
-- ---------------------------------------------------------------------------
create table if not exists legal_pages (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  content text not null default '',
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- site_settings: generic key/value for SEO, feature flags, etc.
-- ---------------------------------------------------------------------------
create table if not exists site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- contact_submissions: general contact inquiries
-- ---------------------------------------------------------------------------
create table if not exists contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  company text,
  email text not null,
  phone text,
  whatsapp text,
  service_interested text,
  project_description text not null,
  budget_range text,
  contact_method text,
  status text not null default 'new' check (status in ('new','contacted','archived')),
  internal_notes text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- solution_requests: detailed project scoping intake
-- ---------------------------------------------------------------------------
create table if not exists solution_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  company text,
  email text not null,
  phone text,
  whatsapp text,
  country text,
  solution_type text,
  project_description text not null,
  existing_system text,
  required_integrations text,
  automation_requirements text,
  preferred_technology text,
  budget_currency text default 'INR',
  currency text default 'INR',
  budget_range text,
  timeline text,
  additional_requirements text,
  status text not null default 'new'
    check (status in ('new','contacted','qualified','proposal_sent','in_progress','won','lost','archived')),
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes for performance
-- ---------------------------------------------------------------------------
create index if not exists idx_services_slug on services(slug);
create index if not exists idx_solutions_slug on solutions(slug);
create index if not exists idx_projects_slug on projects(slug);
create index if not exists idx_legal_pages_slug on legal_pages(slug);
create index if not exists idx_contact_submissions_created on contact_submissions(created_at desc);
create index if not exists idx_solution_requests_created on solution_requests(created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security (RLS)
-- ---------------------------------------------------------------------------
alter table company_profile enable row level security;
alter table services enable row level security;
alter table solutions enable row level security;
alter table projects enable row level security;
alter table process_steps enable row level security;
alter table legal_pages enable row level security;
alter table site_settings enable row level security;
alter table contact_submissions enable row level security;
alter table solution_requests enable row level security;

-- Public read policies
create policy "public read company_profile" on company_profile for select using (true);
create policy "public read enabled services" on services for select using (is_enabled = true);
create policy "public read enabled solutions" on solutions for select using (is_enabled = true);
create policy "public read projects" on projects for select using (true);
create policy "public read process_steps" on process_steps for select using (true);
create policy "public read legal_pages" on legal_pages for select using (true);
create policy "public read site_settings" on site_settings for select using (true);

-- Public submission policies (anon can insert, but cannot read back)
create policy "public insert contact_submissions" on contact_submissions for insert with check (true);
create policy "public insert solution_requests" on solution_requests for insert with check (true);

-- Admin read/write policies (authenticated role)
create policy "admin all company_profile" on company_profile for all using (auth.role() = 'authenticated');
create policy "admin all services" on services for all using (auth.role() = 'authenticated');
create policy "admin all solutions" on solutions for all using (auth.role() = 'authenticated');
create policy "admin all projects" on projects for all using (auth.role() = 'authenticated');
create policy "admin all process_steps" on process_steps for all using (auth.role() = 'authenticated');
create policy "admin all legal_pages" on legal_pages for all using (auth.role() = 'authenticated');
create policy "admin all site_settings" on site_settings for all using (auth.role() = 'authenticated');
create policy "admin all contact_submissions" on contact_submissions for all using (auth.role() = 'authenticated');
create policy "admin all solution_requests" on solution_requests for all using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Seed initial records
-- ---------------------------------------------------------------------------
insert into company_profile (brand_name, tagline, short_description, full_description, email)
values (
  'TechKnox',
  'We build the technology your business needs.',
  'TechKnox is a technology agency that engineers custom web applications, AI automation, API integrations, software systems, and internal business tools.',
  'TechKnox helps forward-thinking companies solve operational friction and build modern digital capabilities through custom engineering.',
  'techknoxin@gmail.com'
)
on conflict do nothing;
