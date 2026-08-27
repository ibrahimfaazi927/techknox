import { getLegalPage } from '@/lib/data';
import { updateLegalPage } from './actions';

export default async function AdminLegalPagesPage({
  searchParams
}: {
  searchParams: { slug?: string };
}) {
  const currentSlug = searchParams?.slug || 'privacy-policy';
  const page = await getLegalPage(currentSlug);

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-bold text-star">Legal Pages Editor</h1>
        <p className="text-sm text-steel mt-1">
          Edit policy terms and legal documentation in Markdown format.
        </p>
      </div>

      {/* Page Tabs */}
      <div className="flex gap-3">
        <a
          href="/admin/legal-pages?slug=privacy-policy"
          className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition ${
            currentSlug === 'privacy-policy'
              ? 'bg-signal text-white'
              : 'bg-panel text-steel hover:text-star border border-line'
          }`}
        >
          Privacy Policy
        </a>
        <a
          href="/admin/legal-pages?slug=terms-and-conditions"
          className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition ${
            currentSlug === 'terms-and-conditions'
              ? 'bg-signal text-white'
              : 'bg-panel text-steel hover:text-star border border-line'
          }`}
        >
          Terms & Conditions
        </a>
      </div>

      {/* Editor Form */}
      <div className="glass-card rounded-3xl p-8 border border-line-bright">
        <form action={updateLegalPage} className="space-y-6">
          <input type="hidden" name="slug" value={page.slug} />

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-steeldim font-medium">
              Page Title
            </label>
            <input
              name="title"
              defaultValue={page.title}
              required
              className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-star outline-none focus:border-signal"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-xs uppercase tracking-wider text-steeldim font-medium">
                Page Content (Markdown Supported)
              </label>
              <a
                href={`/${page.slug}`}
                target="_blank"
                className="font-mono text-xs text-signal hover:underline"
              >
                Preview Live Page ↗
              </a>
            </div>
            <textarea
              name="content"
              rows={18}
              defaultValue={page.content}
              className="w-full rounded-xl border border-line bg-ink px-4 py-3 font-mono text-xs text-star outline-none focus:border-signal leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-signal px-8 py-3.5 font-mono text-sm font-semibold text-white shadow-lg shadow-signal/20 transition hover:bg-signal-hover"
          >
            Save {page.title} Updates
          </button>
        </form>
      </div>
    </div>
  );
}
