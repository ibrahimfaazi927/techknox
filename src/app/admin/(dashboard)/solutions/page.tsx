import { getSolutions } from '@/lib/data';
import { createSolution, toggleSolution, deleteSolution } from './actions';
import { ServiceIconMapper } from '@/components/Icons';
import EditSolutionModal from './EditSolutionModal';

export default async function AdminSolutionsPage() {
  const solutions = await getSolutions();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-star">Manage Solutions</h1>
        <p className="text-sm text-steel mt-1">
          Configure business-outcome systems, feature sets, and target use cases.
        </p>
      </div>

      {/* Add Solution Form */}
      <div className="glass-card rounded-3xl p-8 border border-line-bright">
        <h2 className="font-display text-xl font-bold text-star mb-6">Add New Outcome Solution</h2>

        <form action={createSolution} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Solution Title *
              </label>
              <input
                name="title"
                required
                placeholder="e.g. Lead Management & Sales Automation"
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
                Icon
              </label>
              <select
                name="icon"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                defaultValue="funnel"
              >
                <option value="funnel">funnel (Sales / Lead)</option>
                <option value="chat">chat (Support / AI)</option>
                <option value="cpu">cpu (Automation / Ops)</option>
                <option value="globe">globe (Portals / Platforms)</option>
                <option value="chart">chart (Reporting / BI)</option>
                <option value="calendar">calendar (Booking / Schedule)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
              Solution Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Explain the business problem solved and outcome achieved..."
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
                placeholder="Instant WhatsApp/Email response&#10;Lead qualification scoring&#10;CRM synchronization"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal font-mono text-xs"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Target Industries / Use Cases (Comma-separated)
              </label>
              <textarea
                name="use_cases"
                rows={3}
                placeholder="Agencies, B2B Services, Consultancies, Real Estate"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <label className="font-mono text-xs uppercase tracking-wide text-steeldim">Order:</label>
              <input
                name="display_order"
                type="number"
                defaultValue={solutions.length + 1}
                className="w-20 rounded-xl border border-line bg-ink px-3 py-2 text-sm text-star outline-none focus:border-signal"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-signal px-6 py-2.5 font-mono text-xs font-semibold text-white transition hover:bg-signal-hover"
            >
              + Create Solution
            </button>
          </div>
        </form>
      </div>

      {/* Solutions Table */}
      <div className="glass-card rounded-3xl border border-line-bright overflow-hidden">
        <div className="px-6 py-4 border-b border-line">
          <h3 className="font-display font-bold text-star text-base">Active Business Solutions ({solutions.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-ink-900 font-mono text-xs uppercase tracking-wider text-steeldim border-b border-line">
              <tr>
                <th className="px-6 py-3.5">Order</th>
                <th className="px-6 py-3.5">Icon</th>
                <th className="px-6 py-3.5">Title</th>
                <th className="px-6 py-3.5">Description</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {solutions.map((sol) => (
                <tr key={sol.id} className="hover:bg-panel/50 transition">
                  <td className="px-6 py-4 font-mono text-xs text-steeldim">{sol.display_order}</td>
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 rounded-lg bg-panel border border-line flex items-center justify-center text-signal">
                      <ServiceIconMapper icon={sol.icon} className="w-4 h-4" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-star">{sol.title}</td>
                  <td className="px-6 py-4 text-xs text-steel max-w-xs truncate">{sol.description}</td>
                  <td className="px-6 py-4">
                    <form action={toggleSolution}>
                      <input type="hidden" name="id" value={sol.id} />
                      <input type="hidden" name="is_enabled" value={String(!sol.is_enabled)} />
                      <button
                        type="submit"
                        className={`rounded-full px-3 py-1 font-mono text-[11px] transition ${
                          sol.is_enabled
                            ? 'bg-signal/20 text-signal border border-signal/30'
                            : 'bg-panel text-steeldim border border-line'
                        }`}
                      >
                        {sol.is_enabled ? 'Active' : 'Disabled'}
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 font-mono text-xs">
                      <EditSolutionModal solution={sol} />
                      <form action={deleteSolution}>
                        <input type="hidden" name="id" value={sol.id} />
                        <button type="submit" className="font-mono text-xs text-steeldim hover:text-red-400 transition">
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
