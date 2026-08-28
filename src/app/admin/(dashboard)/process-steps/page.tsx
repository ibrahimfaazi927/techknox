import { getProcessSteps } from '@/lib/data';
import { createProcessStep, deleteProcessStep } from './actions';
import EditProcessStepModal from './EditProcessStepModal';

export default async function AdminProcessStepsPage() {
  const steps = await getProcessSteps();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-star">Manage Process Steps</h1>
        <p className="text-sm text-steel mt-1">
          Configure the &quot;How We Work&quot; methodology steps displayed on the homepage and about page.
        </p>
      </div>

      {/* Add Step Form */}
      <div className="glass-card rounded-3xl p-8 border border-line-bright">
        <h2 className="font-display text-xl font-bold text-star mb-6">Add New Process Step</h2>

        <form action={createProcessStep} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Step Title *
              </label>
              <input
                name="title"
                required
                placeholder="e.g. 01. Discovery & Technical Architecture"
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                Order
              </label>
              <input
                name="display_order"
                type="number"
                defaultValue={steps.length + 1}
                className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
              Step Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Explain what happens during this phase of the engineering process..."
              className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal text-xs"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-xl bg-signal px-6 py-2.5 font-mono text-xs font-semibold text-white transition hover:bg-signal-hover"
            >
              + Create Process Step
            </button>
          </div>
        </form>
      </div>

      {/* Steps Table */}
      <div className="glass-card rounded-3xl border border-line-bright overflow-hidden">
        <div className="px-6 py-4 border-b border-line">
          <h3 className="font-display font-bold text-star text-base">Current Process Steps ({steps.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-ink-900 font-mono text-xs uppercase tracking-wider text-steeldim border-b border-line">
              <tr>
                <th className="px-6 py-3.5">Order</th>
                <th className="px-6 py-3.5">Title</th>
                <th className="px-6 py-3.5">Description</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {steps.map((step) => (
                <tr key={step.id} className="hover:bg-panel/50 transition">
                  <td className="px-6 py-4 font-mono text-xs text-steeldim">{step.display_order}</td>
                  <td className="px-6 py-4 font-semibold text-star">{step.title}</td>
                  <td className="px-6 py-4 text-xs text-steel max-w-md">{step.description}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 font-mono text-xs">
                      <EditProcessStepModal step={step} />
                      <form action={deleteProcessStep}>
                        <input type="hidden" name="id" value={step.id} />
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
