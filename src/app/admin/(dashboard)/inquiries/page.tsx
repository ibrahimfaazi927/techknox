import { unstable_noStore as noStore } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/server';
import { updateContactStatus, updateSolutionRequestStatus } from './actions';
import { ContactSubmission, SolutionRequestRecord } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getInquiries() {
  noStore(); // Ensure fresh data on every request — no Data Cache
  try {
    // Always use the service-role admin client so RLS is bypassed on this
    // server-only admin page.  The previous conditional check on
    // process.env.SUPABASE_SERVICE_ROLE_KEY was evaluated as undefined in
    // the Next.js server-component bundle (non-NEXT_PUBLIC_ vars are not
    // inlined the same way), causing the anon client to be used instead,
    // which returns 0 rows for both tables due to RLS policies.
    const supabase = createAdminClient();
    const [contactsResult, requestsResult] = await Promise.all([
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('solution_requests').select('*').order('created_at', { ascending: false })
    ]);

    if (contactsResult.error) {
      console.error('Error fetching contact_submissions:', contactsResult.error.message);
    }
    if (requestsResult.error) {
      console.error('Error fetching solution_requests:', requestsResult.error.message);
    }

    return {
      contacts: (contactsResult.data as ContactSubmission[]) ?? [],
      requests: (requestsResult.data as SolutionRequestRecord[]) ?? []
    };
  } catch (err) {
    console.error('Failed to fetch inquiries:', err);
    return { contacts: [], requests: [] };
  }
}

export default async function AdminInquiriesPage() {
  const { contacts, requests } = await getInquiries();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-3xl font-bold text-star">Leads & Inquiries Inbox</h1>
        <p className="text-sm text-steel mt-1">
          Review incoming direct contact messages and comprehensive solution scoping requests.
        </p>
      </div>

      {/* Section 1: Solution Requests */}
      <div className="glass-card rounded-3xl border border-line-bright overflow-hidden">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <h2 className="font-display font-bold text-star text-lg">
            Solution Scoping Requests ({requests.length})
          </h2>
          <span className="font-mono text-xs text-signal bg-signal/10 px-2.5 py-1 rounded-full">
            Detailed Intakes
          </span>
        </div>

        {requests.length === 0 ? (
          <div className="p-12 text-center text-sm font-mono text-steeldim">
            No solution requests received yet.
          </div>
        ) : (
          <div className="divide-y divide-line">
            {requests.map((req) => (
              <div key={req.id} className="p-6 sm:p-8 space-y-4 hover:bg-panel/40 transition">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-bold text-star">{req.name}</span>
                      {req.company && (
                        <span className="px-2.5 py-0.5 rounded-full bg-panel border border-line font-mono text-xs text-steel">
                          {req.company}
                        </span>
                      )}
                      <span className="font-mono text-xs text-steeldim">
                        {new Date(req.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-steeldim mt-1">
                      <span>📧 {req.email}</span>
                      {req.phone && <span>📞 {req.phone}</span>}
                      {req.whatsapp && <span>💬 {req.whatsapp}</span>}
                      {req.country && <span>📍 {req.country}</span>}
                    </div>
                  </div>

                  {/* Status update form */}
                  <form action={updateSolutionRequestStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={req.id} />
                    <select
                      name="status"
                      defaultValue={req.status}
                      className="rounded-lg border border-line bg-ink px-3 py-1.5 font-mono text-xs text-star outline-none focus:border-signal"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="in_progress">In Progress</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button
                      type="submit"
                      className="rounded-lg bg-panel border border-line-bright px-3 py-1.5 font-mono text-xs text-steel hover:text-star"
                    >
                      Save
                    </button>
                  </form>
                </div>

                <div className="rounded-xl bg-ink/80 border border-line/60 p-4 space-y-2 text-xs">
                  {req.solution_type && (
                    <div>
                      <span className="font-mono uppercase text-signal font-semibold">Solution Type:</span>{' '}
                      <span className="text-star">{req.solution_type}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-mono uppercase text-steeldim">Description:</span>
                    <p className="text-steel mt-0.5 whitespace-pre-wrap">{req.project_description}</p>
                  </div>
                  {req.required_integrations && (
                    <div>
                      <span className="font-mono uppercase text-steeldim">Integrations:</span>{' '}
                      <span className="text-steel">{req.required_integrations}</span>
                    </div>
                  )}
                  <div className="flex gap-6 pt-2 border-t border-line/40 text-[11px] font-mono text-steeldim">
                    {req.budget_range && (
                      <span>
                        Budget:{' '}
                        <strong className="text-star">
                          {req.budget_currency ? `[${req.budget_currency}] ` : ''}
                          {req.budget_range}
                        </strong>
                      </span>
                    )}
                    {req.timeline && <span>Timeline: <strong className="text-star">{req.timeline}</strong></span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Contact Form Submissions */}
      <div className="glass-card rounded-3xl border border-line-bright overflow-hidden">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <h2 className="font-display font-bold text-star text-lg">
            Direct Contact Inquiries ({contacts.length})
          </h2>
          <span className="font-mono text-xs text-steeldim bg-panel px-2.5 py-1 rounded-full">
            General Inquiries
          </span>
        </div>

        {contacts.length === 0 ? (
          <div className="p-12 text-center text-sm font-mono text-steeldim">
            No direct contact inquiries received yet.
          </div>
        ) : (
          <div className="divide-y divide-line">
            {contacts.map((msg) => (
              <div key={msg.id} className="p-6 sm:p-8 space-y-3 hover:bg-panel/40 transition">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-base font-bold text-star">{msg.name}</span>
                      {msg.company && (
                        <span className="px-2 py-0.5 rounded-full bg-panel border border-line font-mono text-[11px] text-steel">
                          {msg.company}
                        </span>
                      )}
                      <span className="font-mono text-xs text-steeldim">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-steeldim mt-1">
                      <span>📧 {msg.email}</span>
                      {msg.phone && <span>📞 {msg.phone}</span>}
                      {msg.service_interested && (
                        <span className="text-signal">Service: {msg.service_interested}</span>
                      )}
                    </div>
                  </div>

                  <form action={updateContactStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={msg.id} />
                    <select
                      name="status"
                      defaultValue={msg.status}
                      className="rounded-lg border border-line bg-ink px-3 py-1.5 font-mono text-xs text-star outline-none focus:border-signal"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button
                      type="submit"
                      className="rounded-lg bg-panel border border-line-bright px-3 py-1.5 font-mono text-xs text-steel hover:text-star"
                    >
                      Save
                    </button>
                  </form>
                </div>

                <div className="rounded-xl bg-ink/80 border border-line/60 p-4 text-xs text-steel whitespace-pre-wrap">
                  {msg.project_description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
