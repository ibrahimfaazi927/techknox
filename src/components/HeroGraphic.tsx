import React from 'react';

export default function HeroGraphic() {
  return (
    <div className="relative w-full max-w-full flex items-center justify-center p-1 sm:p-2 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-cyan-500/10 rounded-2xl filter blur-2xl pointer-events-none" />

      {/* Main Enterprise Startup UI Mockup Window */}
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200/90 dark:border-line bg-white dark:bg-panel shadow-[0_16px_40px_-12px_rgba(15,23,42,0.08)] dark:shadow-xl overflow-hidden text-left transition-transform duration-300 hover:scale-[1.01]">
        {/* Window Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-slate-100 dark:border-line bg-slate-50/80 dark:bg-ink-800/80 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="ml-1.5 font-mono text-[10px] sm:text-[11px] text-slate-500 dark:text-steeldim truncate font-medium">
              teknox.dev/console
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-md shrink-0 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Operational</span>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 text-xs">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-ink-800 border border-slate-100 dark:border-line">
              <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-steeldim uppercase font-mono font-medium">Uptime SLA</p>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-star font-display mt-0.5">99.98%</p>
              <p className="text-[8px] sm:text-[9px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 truncate font-medium">Enterprise Tier</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-ink-800 border border-slate-100 dark:border-line">
              <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-steeldim uppercase font-mono font-medium">Edge Latency</p>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-star font-display mt-0.5">18 ms</p>
              <p className="text-[8px] sm:text-[9px] text-indigo-600 dark:text-signal font-mono mt-0.5 truncate font-medium">Global Cache</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-ink-800 border border-slate-100 dark:border-line">
              <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-steeldim uppercase font-mono font-medium">Workflows</p>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-star font-display mt-0.5">Active</p>
              <p className="text-[8px] sm:text-[9px] text-purple-600 dark:text-purple-400 font-mono mt-0.5 truncate font-medium">Event-Driven</p>
            </div>
          </div>

          {/* Workflow Pipeline Architecture Box */}
          <div className="rounded-xl border border-slate-200/80 dark:border-line p-3 sm:p-3.5 bg-white dark:bg-panel space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
              <span className="font-semibold text-slate-800 dark:text-star">Live Execution Stream</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-slate-500 dark:text-steeldim font-medium">2,840 events / min</span>
            </div>

            {/* Pipeline Stage Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center font-mono text-[9px] sm:text-[10px]">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-ink-800 border border-slate-200/70 dark:border-line text-slate-700 dark:text-steel">
                <span className="block font-bold text-slate-900 dark:text-star">1. Intake</span>
                <span className="text-[8px] text-slate-500 dark:text-steeldim">API / Webhook</span>
              </div>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-signal/10 border border-indigo-200 dark:border-signal/30 text-indigo-700 dark:text-signal">
                <span className="block font-bold">2. AI Logic</span>
                <span className="text-[8px]">Enrichment</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-ink-800 border border-slate-200/70 dark:border-line text-slate-700 dark:text-steel">
                <span className="block font-bold text-slate-900 dark:text-star">3. Database</span>
                <span className="text-[8px] text-slate-500 dark:text-steeldim">PostgreSQL</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                <span className="block font-bold">4. Action</span>
                <span className="text-[8px]">Team Alert</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-ink-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-600 dark:bg-signal h-full rounded-full w-4/5 animate-pulse" />
            </div>
          </div>

          {/* Activity Log List */}
          <div className="space-y-1.5 font-mono text-[9px] sm:text-[10px]">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-ink-800 border border-slate-150 dark:border-line text-slate-700 dark:text-steel gap-2">
              <span className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">Automated Invoice OCR &amp; CRM Sync Completed</span>
              </span>
              <span className="text-slate-400 dark:text-steeldim shrink-0 text-[8px] sm:text-[9px]">Just now</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-ink-800 border border-slate-150 dark:border-line text-slate-700 dark:text-steel gap-2">
              <span className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                <span className="truncate">Client Portal Realtime WebSocket Connected</span>
              </span>
              <span className="text-slate-400 dark:text-steeldim shrink-0 text-[8px] sm:text-[9px]">3s ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
