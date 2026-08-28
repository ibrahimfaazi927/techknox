import { getServices } from '@/lib/data';
import { createService, toggleService, deleteService } from './actions';
import { ServiceIconMapper } from '@/components/Icons';
import EditServiceModal from './EditServiceModal';

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-star">Manage Services</h1>
        <p className="text-sm text-steel mt-1">
          Configure dynamic service offerings, features, technologies, and public availability.
        </p>
      </div>

      {/* Add New Service Form */}
      <div className="glass-card rounded-3xl p-8 border border-line-bright">
        <h2 className="font-display text-xl font-bold text-star mb-6">Add New Service</h2>

        <form action={createService} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Service Title *
              </label>
              <input
                name="title"
                required
                placeholder="e.g. AI Automation & Agents"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Custom Slug (Optional)
              </label>
              <input
                name="slug"
                placeholder="auto-generated from title"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Icon Identifier
              </label>
              <select
                name="icon"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                defaultValue="code"
              >
                <option value="code">code (Code / Web)</option>
                <option value="sparkles">sparkles (AI / Automation)</option>
                <option value="plug">plug (API / Integration)</option>
                <option value="terminal">terminal (Custom Software)</option>
                <option value="chart">chart (Dashboards)</option>
                <option value="layers">layers (CRM / Workflows)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
              Short Description (Card Overview)
            </label>
            <input
              name="short_description"
              placeholder="1-2 sentences summarizing the value proposition..."
              className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
              Full Detailed Description (Service Detail Page)
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="In-depth explanation of how we execute this service..."
              className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Key Features (One per line)
              </label>
              <textarea
                name="features"
                rows={3}
                placeholder="Custom Full-Stack Next.js Applications&#10;Role-Based Permission Matrix&#10;Automated Testing Suite"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal font-mono text-xs"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Technologies (Comma-separated)
              </label>
              <textarea
                name="technologies"
                rows={3}
                placeholder="React, Next.js, TypeScript, PostgreSQL, Supabase, Tailwind CSS"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <label className="font-mono text-xs uppercase tracking-wide text-steeldim">
                Display Order:
              </label>
              <input
                name="display_order"
                type="number"
                defaultValue={services.length + 1}
                className="w-20 rounded-xl border border-line bg-ink px-3 py-2 text-sm text-star outline-none focus:border-signal"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-signal px-6 py-2.5 font-mono text-xs font-semibold text-white transition hover:bg-signal-hover"
            >
              + Create Service
            </button>
          </div>
        </form>
      </div>

      {/* Services Table */}
      <div className="glass-card rounded-3xl border border-line-bright overflow-hidden">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <h3 className="font-display font-bold text-star text-base">Active Services Catalog ({services.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-ink-900 font-mono text-xs uppercase tracking-wider text-steeldim border-b border-line">
              <tr>
                <th className="px-6 py-3.5">Order</th>
                <th className="px-6 py-3.5">Icon</th>
                <th className="px-6 py-3.5">Title & Slug</th>
                <th className="px-6 py-3.5">Short Description</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-panel/50 transition">
                  <td className="px-6 py-4 font-mono text-xs text-steeldim">{s.display_order}</td>
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 rounded-lg bg-panel border border-line flex items-center justify-center text-signal">
                      <ServiceIconMapper icon={s.icon} className="w-4 h-4" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-star">{s.title}</div>
                    <div className="font-mono text-xs text-steeldim">/services/{s.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-steel max-w-xs truncate">
                    {s.short_description}
                  </td>
                  <td className="px-6 py-4">
                    <form action={toggleService}>
                      <input type="hidden" name="id" value={s.id} />
                      <input type="hidden" name="is_enabled" value={String(!s.is_enabled)} />
                      <button
                        type="submit"
                        className={`rounded-full px-3 py-1 font-mono text-[11px] transition ${
                          s.is_enabled
                            ? 'bg-signal/20 text-signal border border-signal/30'
                            : 'bg-panel text-steeldim border border-line'
                        }`}
                      >
                        {s.is_enabled ? 'Active' : 'Disabled'}
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 font-mono text-xs">
                      <EditServiceModal service={s} />
                      <a
                        href={`/services/${s.slug}`}
                        target="_blank"
                        className="text-signal hover:underline"
                      >
                        View ↗
                      </a>
                      <form action={deleteService}>
                        <input type="hidden" name="id" value={s.id} />
                        <button
                          type="submit"
                          className="text-steeldim hover:text-red-400 transition"
                        >
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
