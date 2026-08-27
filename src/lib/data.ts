import { cache } from 'react';
import { createPublicClient } from '@/lib/supabase/server';
import {
  CompanyProfile,
  Service,
  Solution,
  Project,
  ProcessStep,
  LegalPage
} from './types';
import {
  defaultCompanyProfile,
  sampleServices,
  sampleSolutions,
  sampleProjects,
  sampleProcessSteps,
  sampleLegalPages
} from './sample-data';

// Helper to prevent database timeouts from blocking server response
async function withTimeout<T>(promise: Promise<T>, ms = 1500, fallback: T): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => resolve(fallback), ms);
  });

  return Promise.race([
    promise.then((res) => {
      clearTimeout(timeoutId);
      return res;
    }),
    timeoutPromise
  ]);
}

// Request-memoized data fetchers using React cache() to prevent duplicate database calls
export const getCompanyProfile = cache(async (): Promise<CompanyProfile> => {
  return withTimeout(
    (async () => {
      try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
          .from('company_profile')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (error || !data) {
          return defaultCompanyProfile;
        }

        return {
          ...defaultCompanyProfile,
          ...data,
          brand_name: data.brand_name || defaultCompanyProfile.brand_name
        };
      } catch {
        return defaultCompanyProfile;
      }
    })(),
    1500,
    defaultCompanyProfile
  );
});

export const getServices = cache(async (): Promise<Service[]> => {
  return withTimeout(
    (async () => {
      try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_enabled', true)
          .order('display_order');

        if (error || !data || data.length === 0) {
          return sampleServices;
        }

        return data.map((item) => {
          const match = sampleServices.find((s) => s.slug === item.slug);
          return {
            ...match,
            ...item,
            features: item.features ?? match?.features ?? null,
            technologies: item.technologies ?? match?.technologies ?? null,
            benefits: item.benefits ?? match?.benefits ?? null,
            process: item.process ?? match?.process ?? null,
            faq: item.faq ?? match?.faq ?? null
          };
        });
      } catch {
        return sampleServices;
      }
    })(),
    1500,
    sampleServices
  );
});

export const getServiceBySlug = cache(async (slug: string): Promise<Service | null> => {
  const sampleMatch = sampleServices.find((s) => s.slug === slug) || null;
  return withTimeout(
    (async () => {
      try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .eq('is_enabled', true)
          .maybeSingle();

        if (error || !data) {
          return sampleMatch;
        }

        return {
          ...sampleMatch,
          ...data,
          features: data.features ?? sampleMatch?.features ?? null,
          technologies: data.technologies ?? sampleMatch?.technologies ?? null,
          benefits: data.benefits ?? sampleMatch?.benefits ?? null,
          process: data.process ?? sampleMatch?.process ?? null,
          faq: data.faq ?? sampleMatch?.faq ?? null
        };
      } catch {
        return sampleMatch;
      }
    })(),
    1500,
    sampleMatch
  );
});

export const getSolutions = cache(async (): Promise<Solution[]> => {
  return withTimeout(
    (async () => {
      try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
          .from('solutions')
          .select('*')
          .eq('is_enabled', true)
          .order('display_order');

        if (error || !data || data.length === 0) {
          return sampleSolutions;
        }

        return data.map((item) => {
          const match = sampleSolutions.find((s) => s.slug === item.slug);
          return {
            ...match,
            ...item,
            features: item.features ?? match?.features ?? null,
            benefits: item.benefits ?? match?.benefits ?? null,
            use_cases: item.use_cases ?? match?.use_cases ?? null
          };
        });
      } catch {
        return sampleSolutions;
      }
    })(),
    1500,
    sampleSolutions
  );
});

export const getProjects = cache(async (): Promise<Project[]> => {
  return withTimeout(
    (async () => {
      try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order');

        if (error || !data || data.length === 0) {
          return sampleProjects;
        }

        return data.map((item) => {
          const match = sampleProjects.find((p) => p.slug === item.slug);
          return {
            ...match,
            ...item,
            is_demo: item.is_demo ?? match?.is_demo ?? true
          };
        });
      } catch {
        return sampleProjects;
      }
    })(),
    1500,
    sampleProjects
  );
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const sampleMatch = sampleProjects.find((p) => p.slug === slug) || null;
  return withTimeout(
    (async () => {
      try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error || !data) {
          return sampleMatch;
        }

        return {
          ...sampleMatch,
          ...data,
          is_demo: data.is_demo ?? sampleMatch?.is_demo ?? true
        };
      } catch {
        return sampleMatch;
      }
    })(),
    1500,
    sampleMatch
  );
});

export const getProcessSteps = cache(async (): Promise<ProcessStep[]> => {
  return withTimeout(
    (async () => {
      try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
          .from('process_steps')
          .select('*')
          .order('display_order');

        if (error || !data || data.length === 0) {
          return sampleProcessSteps;
        }

        return data as ProcessStep[];
      } catch {
        return sampleProcessSteps;
      }
    })(),
    1500,
    sampleProcessSteps
  );
});

export const getLegalPage = cache(async (slug: string): Promise<LegalPage> => {
  const fallback = sampleLegalPages[slug] || {
    slug,
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    content: `# ${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}\n\nContent is being updated. Please contact us for details.`
  };

  return withTimeout(
    (async () => {
      try {
        const supabase = createPublicClient();
        const { data, error } = await supabase
          .from('legal_pages')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error || !data || !data.content || data.content.trim() === '') {
          return fallback;
        }

        return data as LegalPage;
      } catch {
        return fallback;
      }
    })(),
    1500,
    fallback
  );
});

