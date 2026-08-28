'use client';

import { useState } from 'react';
import { Solution } from '@/lib/types';
import { updateSolution } from './actions';

export default function EditSolutionModal({ solution }: { solution: Solution }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-signal hover:text-signal-hover transition font-medium"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-6 sm:p-8 border border-line-bright shadow-2xl bg-panel">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-line">
              <h3 className="font-display font-bold text-star text-lg">
                Edit Solution: <span className="text-signal">{solution.title}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-steel hover:text-star text-xl font-mono p-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form
              action={async (formData) => {
                setIsPending(true);
                await updateSolution(formData);
                setIsPending(false);
                setIsOpen(false);
              }}
              className="space-y-4 text-left"
            >
              <input type="hidden" name="id" value={solution.id} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Solution Title *
                  </label>
                  <input
                    name="title"
                    required
                    defaultValue={solution.title}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Slug
                  </label>
                  <input
                    name="slug"
                    defaultValue={solution.slug}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Icon Identifier
                  </label>
                  <select
                    name="icon"
                    defaultValue={solution.icon || 'funnel'}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
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
                  defaultValue={solution.description || ''}
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
                    defaultValue={solution.features?.join('\n') || ''}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Target Use Cases (Comma-separated)
                  </label>
                  <textarea
                    name="use_cases"
                    rows={3}
                    defaultValue={solution.use_cases?.join(', ') || ''}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                  Display Order
                </label>
                <input
                  name="display_order"
                  type="number"
                  defaultValue={solution.display_order}
                  className="w-32 rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-line">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_enabled"
                    defaultChecked={solution.is_enabled}
                    className="rounded border-line bg-ink text-signal focus:ring-signal"
                  />
                  <span className="font-mono text-xs text-star">Active / Enabled</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line bg-ink text-xs font-mono text-steel hover:text-star transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-xl bg-signal px-6 py-2 font-mono text-xs font-semibold text-white transition hover:bg-signal-hover disabled:opacity-50"
                  >
                    {isPending ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
