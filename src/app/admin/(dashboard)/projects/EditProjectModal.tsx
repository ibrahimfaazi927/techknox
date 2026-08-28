'use client';

import { useState } from 'react';
import { Project } from '@/lib/types';
import { updateProject } from './actions';

export default function EditProjectModal({ project }: { project: Project }) {
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
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-6 sm:p-8 border border-line-bright shadow-2xl bg-panel">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-line">
              <h3 className="font-display font-bold text-star text-lg">
                Edit Project: <span className="text-signal">{project.name}</span>
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
                await updateProject(formData);
                setIsPending(false);
                setIsOpen(false);
              }}
              className="space-y-4 text-left"
            >
              <input type="hidden" name="id" value={project.id} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Project Name *
                  </label>
                  <input
                    name="name"
                    required
                    defaultValue={project.name}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Slug
                  </label>
                  <input
                    name="slug"
                    defaultValue={project.slug}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Project Type / Category
                  </label>
                  <input
                    name="project_type"
                    defaultValue={project.project_type || ''}
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
                  defaultValue={project.short_description || ''}
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
                    defaultValue={project.problem || ''}
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
                    defaultValue={project.solution || ''}
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
                    defaultValue={project.technologies?.join(', ') || ''}
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
                    defaultValue={project.features?.join('\n') || ''}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Live URL
                  </label>
                  <input
                    name="live_url"
                    type="url"
                    defaultValue={project.live_url || ''}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal text-xs"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    GitHub URL
                  </label>
                  <input
                    name="github_url"
                    type="url"
                    defaultValue={project.github_url || ''}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal text-xs"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-steeldim">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={project.status || 'completed'}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-star outline-none focus:border-signal"
                  >
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="planned">Planned</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-2 gap-4 border-t border-line">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_demo"
                      defaultChecked={project.is_demo}
                      className="rounded border-line bg-ink text-signal focus:ring-signal"
                    />
                    <span className="font-mono text-xs text-star">Mark as Concept / Demo Project</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_featured"
                      defaultChecked={project.is_featured}
                      className="rounded border-line bg-ink text-signal focus:ring-signal"
                    />
                    <span className="font-mono text-xs text-star">Feature on Homepage</span>
                  </label>
                </div>

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
