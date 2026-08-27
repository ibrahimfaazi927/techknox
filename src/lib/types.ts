export interface CompanyProfile {
  id?: string;
  brand_name: string;
  tagline?: string | null;
  short_description?: string | null;
  full_description?: string | null;
  logo_url?: string | null;
  favicon_url?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  location?: string | null;
  city?: string | null;
  country?: string | null;
  website?: string | null;
  linkedin_url?: string | null;
  instagram_url?: string | null;
  github_url?: string | null;
  twitter_url?: string | null;
  other_social_url?: string | null;
  business_hours?: string | null;
  contact_cta?: string | null;
  footer_description?: string | null;
  // SEO & Appearance
  site_title?: string | null;
  meta_description?: string | null;
  og_image_url?: string | null;
  theme_default?: 'dark' | 'light' | 'system' | null;
  // Optional legal/registration disclosures (only shown if configured)
  legal_entity_name?: string | null;
  registration_number?: string | null;
  tax_id?: string | null;
  registered_address?: string | null;
  updated_at?: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  icon: string | null;
  image_url?: string | null;
  features?: string[] | null;
  technologies?: string[] | null;
  benefits?: string[] | null;
  process?: ServiceProcessStep[] | null;
  faq?: ServiceFAQ[] | null;
  cta_label?: string | null;
  is_enabled: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Solution {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  icon: string | null;
  features?: string[] | null;
  benefits?: string[] | null;
  use_cases?: string[] | null;
  is_enabled: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  detailed_description: string | null;
  problem: string | null;
  solution: string | null;
  features: string[] | null;
  technologies: string[] | null;
  industry: string | null;
  project_type: string | null;
  live_url: string | null;
  github_url: string | null;
  is_demo: boolean;
  results?: string | null;
  status: 'planned' | 'in_progress' | 'completed' | 'archived';
  is_featured: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string | null;
  display_order: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  whatsapp?: string | null;
  service_interested?: string | null;
  project_description: string;
  budget_range?: string | null;
  contact_method?: string | null;
  status: 'new' | 'contacted' | 'archived';
  internal_notes?: string | null;
  created_at: string;
}

export interface SolutionRequestInput {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  country?: string;
  solution_type?: string;
  project_description: string;
  existing_system?: string;
  required_integrations?: string;
  automation_requirements?: string;
  preferred_technology?: string;
  budget_currency?: string;
  currency?: string;
  budget_range?: string;
  timeline?: string;
  additional_requirements?: string;
}

export interface SolutionRequestRecord extends SolutionRequestInput {
  id: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'in_progress' | 'won' | 'lost' | 'archived';
  internal_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LegalPage {
  id?: string;
  slug: 'privacy-policy' | 'terms-and-conditions' | 'cookie-policy' | 'service-terms' | string;
  title: string;
  content: string;
  updated_at?: string;
}

export interface SiteSettings {
  site_title: string;
  meta_description: string;
  og_image?: string;
  keywords?: string[];
  contact_email?: string;
  hero_headline?: string;
  hero_subheadline?: string;
}
