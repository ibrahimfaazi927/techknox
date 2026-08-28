'use client';

import { useState } from 'react';
import { Service } from '@/lib/types';
import { updateService } from './actions';

export default function EditServiceModal({ service }: { service: Service }) {
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
                Edit Service: <span className="text-signal">{service.title}</span>
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
                await updateService(formData);
                setIsPending(false);
                setIsOpen(false);
              }}
              className="space-y-4 text-left"
            >
              <input type="hidden" name="id" value={service.id} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Service Title *
                  </label>
                  <input
                    name="title"
                    required
                    defaultValue={service.title}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Slug
                  </label>
                  <input
                    name="slug"
                    defaultValue={service.slug}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Icon Identifier
                  </label>
                  <select
                    name="icon"
                    defaultValue={service.icon || 'code'}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
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
                  Short Description
                </label>
                <input
                  name="short_description"
                  defaultValue={service.short_description || ''}
                  className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                  Full Detailed Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={service.description || ''}
                  className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal text-xs"
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
                    defaultValue={service.features?.join('\n') || ''}
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
                    defaultValue={service.technologies?.join(', ') || ''}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    CTA Button Label
                  </label>
                  <input
                    name="cta_label"
                    defaultValue={service.cta_label || 'Start a Project'}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal text-xs"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Display Order
                  </label>
                  <input
                    name="display_order"
                    type="number"
                    defaultValue={service.display_order}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-line">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_enabled"
                    defaultChecked={service.is_enabled}
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
