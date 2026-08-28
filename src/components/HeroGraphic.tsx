import React from 'react';

export default function HeroGraphic() {
  return (
    <div className="relative w-full max-w-full flex items-center justify-center p-1 sm:p-2 overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-signal/5 via-signal/10 to-transparent rounded-2xl filter blur-2xl pointer-events-none" />

      {/* Main Enterprise Product UI Mockup Window */}
      <div className="relative w-full max-w-lg rounded-xl border border-line bg-panel shadow-xl overflow-hidden text-left transition-transform duration-300 hover:scale-[1.01]">
        {/* Window Top Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-line bg-ink-800/80 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-400 shrink-0" />
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400 shrink-0" />
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="ml-1 font-mono text-[10px] sm:text-[11px] text-steeldim truncate">techknox.systems/console</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-emerald-600 bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 rounded shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Online</span>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="p-3 sm:p-5 space-y-3 sm:space-y-4 text-xs">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-lg bg-ink-800 border border-line">
              <p className="text-[9px] sm:text-[10px] text-steeldim uppercase font-mono font-medium">Uptime</p>
              <p className="text-sm sm:text-base font-bold text-star font-display mt-0.5">99.98%</p>
              <p className="text-[8px] sm:text-[9px] text-emerald-600 font-mono mt-0.5 truncate">SLA Target</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-ink-800 border border-line">
              <p className="text-[9px] sm:text-[10px] text-steeldim uppercase font-mono font-medium">Latency</p>
              <p className="text-sm sm:text-base font-bold text-star font-display mt-0.5">24 ms</p>
              <p className="text-[8px] sm:text-[9px] text-signal font-mono mt-0.5 truncate">Realtime</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-ink-800 border border-line">
              <p className="text-[9px] sm:text-[10px] text-steeldim uppercase font-mono font-medium">Pipeline</p>
              <p className="text-sm sm:text-base font-bold text-star font-display mt-0.5">Active</p>
              <p className="text-[8px] sm:text-[9px] text-purple-600 font-mono mt-0.5 truncate">Event-driven</p>
            </div>
          </div>

          {/* Workflow Pipeline Architecture Box */}
          <div className="rounded-lg border border-line p-2.5 sm:p-3.5 bg-panel space-y-2 sm:space-y-2.5">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
              <span className="font-semibold text-star">Live Stream</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-steeldim">2,410 ops/min</span>
            </div>

            {/* Pipeline Stage Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center font-mono text-[9px] sm:text-[10px]">
              <div className="p-1.5 sm:p-2 rounded bg-ink-800 border border-line text-steel">
                <span className="block font-bold text-star">1. Intake</span>
                <span className="text-[8px] text-steeldim">API / Form</span>
              </div>
              <div className="p-1.5 sm:p-2 rounded bg-signal/10 border border-signal/30 text-signal">
                <span className="block font-bold">2. AI Logic</span>
                <span className="text-[8px]">Enrichment</span>
              </div>
              <div className="p-1.5 sm:p-2 rounded bg-ink-800 border border-line text-steel">
                <span className="block font-bold text-star">3. Database</span>
                <span className="text-[8px] text-steeldim">PostgreSQL</span>
              </div>
              <div className="p-1.5 sm:p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-600">
                <span className="block font-bold">4. Action</span>
                <span className="text-[8px]">Team Alert</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-ink-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-signal h-full rounded-full w-4/5 animate-pulse" />
            </div>
          </div>

          {/* Activity Log List */}
          <div className="space-y-1.5 font-mono text-[9px] sm:text-[10px]">
            <div className="flex items-center justify-between p-1.5 sm:p-2 rounded bg-ink-800 border border-line text-steel gap-2">
              <span className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">Customer Lead Pipeline Triggered</span>
              </span>
              <span className="text-steeldim shrink-0 text-[8px] sm:text-[9px]">Just now</span>
            </div>
            <div className="flex items-center justify-between p-1.5 sm:p-2 rounded bg-ink-800 border border-line text-steel gap-2">
              <span className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                <span className="truncate">Invoice OCR &amp; CRM Sync Completed</span>
              </span>
              <span className="text-steeldim shrink-0 text-[8px] sm:text-[9px]">2s ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
