import Link from 'next/link';
import { createAdminClient, createClient } from '@/lib/supabase/server';
import { sampleServices, sampleSolutions, sampleProjects } from '@/lib/sample-data';

async function getDashboardMetrics() {
  try {
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY ? createAdminClient() : await createClient();
    const [services, solutions, projects, contactLeads, solutionRequests] = await Promise.all([
      supabase.from('services').select('*', { count: 'exact', head: true }),
      supabase.from('solutions').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('solution_requests').select('*', { count: 'exact', head: true }).eq('status', 'new')
    ]);

    return {
      services: services.count ?? sampleServices.length,
      solutions: solutions.count ?? sampleSolutions.length,
      projects: projects.count ?? sampleProjects.length,
      newLeads: (contactLeads.count ?? 0) + (solutionRequests.count ?? 0),
      isLiveDb: services.count !== null
    };
  } catch {
    return {
      services: sampleServices.length,
      solutions: sampleSolutions.length,
      projects: sampleProjects.length,
      newLeads: 0,
      isLiveDb: false
    };
  }
}

export default async function AdminOverviewPage() {
  const metrics = await getDashboardMetrics();

  const cards = [
    { label: 'New Inquiries & Leads', value: metrics.newLeads, href: '/admin/inquiries', color: 'text-signal' },
    { label: 'Active Services', value: metrics.services, href: '/admin/services', color: 'text-accent-emerald' },
    { label: 'Business Solutions', value: metrics.solutions, href: '/admin/solutions', color: 'text-accent-cyan' },
    { label: 'Projects & Concepts', value: metrics.projects, href: '/admin/projects', color: 'text-accent-purple' }
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-star">Dashboard Overview</h1>
        <p className="text-sm text-steel mt-1">
          Manage services, outcome solutions, portfolio projects, lead inquiries, and company settings.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="glass-card rounded-2xl p-6 border border-line-bright hover:border-signal/50 transition block group"
          >
            <div className={`font-display text-4xl font-bold ${c.color} group-hover:scale-105 transition-transform duration-200`}>
              {c.value}
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-wider text-steel group-hover:text-star transition">
              {c.label} →
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Action Hub */}
      <div className="glass-card rounded-3xl p-8 border border-line-bright">
        <h2 className="font-display text-xl font-bold text-star mb-6">
          Content & Profile Management Hub
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/services"
            className="p-5 rounded-xl bg-ink border border-line hover:border-line-bright hover:bg-panel transition"
          >
            <div className="font-display font-semibold text-star text-base mb-1">⚡ Manage Services</div>
            <p className="text-xs text-steel">Add, edit, or toggle active state on all engineering services.</p>
          </Link>

          <Link
            href="/admin/solutions"
            className="p-5 rounded-xl bg-ink border border-line hover:border-line-bright hover:bg-panel transition"
          >
            <div className="font-display font-semibold text-star text-base mb-1">🎯 Outcome Solutions</div>
            <p className="text-xs text-steel">Update business solutions, features, and target use cases.</p>
          </Link>

          <Link
            href="/admin/projects"
            className="p-5 rounded-xl bg-ink border border-line hover:border-line-bright hover:bg-panel transition"
          >
            <div className="font-display font-semibold text-star text-base mb-1">💼 Portfolio Projects</div>
            <p className="text-xs text-steel">Publish new concept builds, demos, tech stacks, and live links.</p>
          </Link>

          <Link
            href="/admin/inquiries"
            className="p-5 rounded-xl bg-ink border border-line hover:border-line-bright hover:bg-panel transition"
          >
            <div className="font-display font-semibold text-star text-base mb-1">📬 Lead Inbox</div>
            <p className="text-xs text-steel">Triage contact messages and scoping solution requests.</p>
          </Link>

          <Link
            href="/admin/company-profile"
            className="p-5 rounded-xl bg-ink border border-line hover:border-line-bright hover:bg-panel transition"
          >
            <div className="font-display font-semibold text-star text-base mb-1">🏢 Company Profile</div>
            <p className="text-xs text-steel">Edit brand name, tagline, email, phone, social links, and legal info.</p>
          </Link>

          <Link
            href="/admin/legal-pages"
            className="p-5 rounded-xl bg-ink border border-line hover:border-line-bright hover:bg-panel transition"
          >
            <div className="font-display font-semibold text-star text-base mb-1">⚖️ Legal Pages</div>
            <p className="text-xs text-steel">Edit Privacy Policy and Terms & Conditions markdown content.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
