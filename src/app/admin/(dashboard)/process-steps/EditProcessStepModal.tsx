'use client';

import { useState } from 'react';
import { ProcessStep } from '@/lib/types';
import { updateProcessStep } from './actions';

export default function EditProcessStepModal({ step }: { step: ProcessStep }) {
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
          <div className="relative w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 border border-line-bright shadow-2xl bg-panel">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-line">
              <h3 className="font-display font-bold text-star text-lg">
                Edit Process Step: <span className="text-signal">{step.title}</span>
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
                await updateProcessStep(formData);
                setIsPending(false);
                setIsOpen(false);
              }}
              className="space-y-4 text-left"
            >
              <input type="hidden" name="id" value={step.id} />

              <div>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                  Step Title *
                </label>
                <input
                  name="title"
                  required
                  defaultValue={step.title}
                  className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                  Step Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={step.description || ''}
                  className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                  Display Order
                </label>
                <input
                  name="display_order"
                  type="number"
                  defaultValue={step.display_order}
                  className="w-32 rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-line">
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
            </form>
          </div>
        </div>
      )}
    </>
  );
}
