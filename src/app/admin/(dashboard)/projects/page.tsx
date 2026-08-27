import { getProjects } from '@/lib/data';
import { createProject, toggleProjectFeatured, deleteProject } from './actions';

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-star">Manage Portfolio & Projects</h1>
        <p className="text-sm text-steel mt-1">
          Publish and manage software builds, case studies, and transparent concept prototypes.
        </p>
      </div>

      {/* Add Project Form */}
      <div className="glass-card rounded-3xl p-8 border border-line-bright">
        <h2 className="font-display text-xl font-bold text-star mb-6">Add New Project</h2>

        <form action={createProject} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Project Name *
              </label>
              <input
                name="name"
                required
                placeholder="e.g. OmniPulse CRM Engine"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Slug (Optional)
              </label>
              <input
                name="slug"
                placeholder="auto-generated"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Project Type / Category
              </label>
              <input
                name="project_type"
                placeholder="e.g. Web Application & CRM"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
              Short Summary
            </label>
            <input
              name="short_description"
              placeholder="1-2 sentences summarizing the system..."
              className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Problem Addressed
              </label>
              <textarea
                name="problem"
                rows={3}
                placeholder="What operational bottleneck or limitation did this solve?"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal text-xs"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Solution Architecture
              </label>
              <textarea
                name="solution"
                rows={3}
                placeholder="How was the architecture designed to resolve the bottleneck?"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Technologies (Comma-separated)
              </label>
              <input
                name="technologies"
                placeholder="Next.js, TypeScript, PostgreSQL, Supabase, Tailwind CSS"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal font-mono text-xs"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Key Features (One per line)
              </label>
              <textarea
                name="features"
                rows={2}
                placeholder="Interactive Kanban pipeline&#10;Automated email webhook&#10;RBAC permissions"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Live URL (Optional)
              </label>
              <input
                name="live_url"
                type="url"
                placeholder="https://..."
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal text-xs"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                GitHub Repository URL
              </label>
              <input
                name="github_url"
                type="url"
                placeholder="https://github.com/..."
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal text-xs"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Status
              </label>
              <select
                name="status"
                defaultValue="completed"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
              >
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="planned">Planned</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between pt-2 gap-4 border-t border-line/60">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_demo"
                  defaultChecked
                  className="rounded border-line bg-ink text-signal focus:ring-signal"
                />
                <span className="font-mono text-xs text-star">Mark as Concept / Demo Project</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_featured"
                  className="rounded border-line bg-ink text-signal focus:ring-signal"
                />
                <span className="font-mono text-xs text-star">Feature on Homepage</span>
              </label>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-signal px-6 py-2.5 font-mono text-xs font-semibold text-white transition hover:bg-signal-hover"
            >
              + Create Project
            </button>
          </div>
        </form>
      </div>

      {/* Projects Table */}
      <div className="glass-card rounded-3xl border border-line-bright overflow-hidden">
        <div className="px-6 py-4 border-b border-line">
          <h3 className="font-display font-bold text-star text-base">Projects Catalog ({projects.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-ink-900 font-mono text-xs uppercase tracking-wider text-steeldim border-b border-line">
              <tr>
                <th className="px-6 py-3.5">Name</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Type Badge</th>
                <th className="px-6 py-3.5">Featured</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-panel/50 transition">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-star">{p.name}</div>
                    <div className="font-mono text-xs text-steeldim">/projects/{p.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-steel">
                    {p.industry || p.project_type || 'Software System'}
                  </td>
                  <td className="px-6 py-4">
                    {p.is_demo ? (
                      <span className="px-2.5 py-0.5 rounded-full border border-accent-amber/40 bg-accent-amber/10 font-mono text-[10px] text-accent-amber">
                        Concept Project
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full border border-line bg-panel font-mono text-[10px] text-steel">
                        Production Build
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <form action={toggleProjectFeatured}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="is_featured" value={String(!p.is_featured)} />
                      <button
                        type="submit"
                        className={`rounded-full px-3 py-1 font-mono text-[11px] transition ${
                          p.is_featured
                            ? 'bg-signal/20 text-signal border border-signal/30'
                            : 'bg-panel text-steeldim border border-line'
                        }`}
                      >
                        {p.is_featured ? '★ Featured' : 'Standard'}
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 font-mono text-xs">
                      <a href={`/projects/${p.slug}`} target="_blank" className="text-signal hover:underline">
                        View ↗
                      </a>
                      <form action={deleteProject}>
                        <input type="hidden" name="id" value={p.id} />
                        <button type="submit" className="text-steeldim hover:text-red-400 transition">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
