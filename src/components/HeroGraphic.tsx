/**
 * HeroGraphic — Pure SVG/CSS abstract technology visual.
 * No image assets. No external libraries.
 * Animations respect prefers-reduced-motion via CSS @media.
 */
export default function HeroGraphic() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* Outer floating container — will-change promotes to compositor layer */}
      <div className="animate-float relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px]" style={{ willChange: 'transform' }}>

        {/* Ambient glow behind graphic */}
        <div className="absolute inset-0 rounded-full bg-signal/5 blur-3xl" />

        <svg
          viewBox="0 0 420 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            {/* Blue gradient */}
            <linearGradient id="hg-blue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.7" />
            </linearGradient>

            {/* Cyan accent */}
            <linearGradient id="hg-cyan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.5" />
            </linearGradient>

            {/* Purple accent */}
            <linearGradient id="hg-purple" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.4" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="hg-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Node glow filter */}
            <filter id="node-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Dash pattern */}
            <linearGradient id="hg-edge-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="hg-edge-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="hg-edge-3" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* ── Orbital ring 1 (slow rotation) — will-change isolates from float */}
          <g style={{ transformOrigin: '210px 210px', willChange: 'transform' }} className="animate-orbit">
            <ellipse
              cx="210" cy="210"
              rx="170" ry="60"
              stroke="rgba(59,130,246,0.12)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="6 10"
            />
          </g>

          {/* ── Orbital ring 2 (reverse, angled) */}
          <g style={{ transformOrigin: '210px 210px', transform: 'rotate(60deg)', willChange: 'transform' }} className="animate-orbit-reverse">
            <ellipse
              cx="210" cy="210"
              rx="155" ry="55"
              stroke="rgba(99,102,241,0.10)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 12"
            />
          </g>

          {/* ── Background grid dots */}
          {[0,1,2,3,4,5].map(row =>
            [0,1,2,3,4,5].map(col => (
              <circle
                key={`d-${row}-${col}`}
                cx={80 + col * 52}
                cy={80 + row * 52}
                r="1"
                fill="rgba(59,130,246,0.15)"
              />
            ))
          )}

          {/* ── Connection lines (drawn paths) */}
          {/* Center → Top-right node */}
          <path
            d="M210 210 L310 130"
            stroke="url(#hg-edge-1)"
            strokeWidth="1.5"
            strokeDasharray="300"
            className="animate-path-draw"
            strokeLinecap="round"
          />
          {/* Center → Bottom-left node */}
          <path
            d="M210 210 L110 290"
            stroke="url(#hg-edge-2)"
            strokeWidth="1.5"
            strokeDasharray="300"
            className="animate-path-draw delay-150"
            strokeLinecap="round"
          />
          {/* Center → Bottom-right node */}
          <path
            d="M210 210 L310 295"
            stroke="url(#hg-edge-3)"
            strokeWidth="1.5"
            strokeDasharray="300"
            className="animate-path-draw delay-300"
            strokeLinecap="round"
          />
          {/* Center → Top-left node */}
          <path
            d="M210 210 L100 130"
            stroke="url(#hg-edge-1)"
            strokeWidth="1.2"
            strokeDasharray="300"
            strokeOpacity="0.5"
            className="animate-path-draw delay-225"
            strokeLinecap="round"
          />
          {/* Node to node cross-links */}
          <path
            d="M310 130 L310 295"
            stroke="rgba(99,102,241,0.20)"
            strokeWidth="1"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
          <path
            d="M100 130 L110 290"
            stroke="rgba(6,182,212,0.15)"
            strokeWidth="1"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
          <path
            d="M100 130 L310 130"
            stroke="rgba(59,130,246,0.12)"
            strokeWidth="1"
            strokeDasharray="5 10"
            strokeLinecap="round"
          />

          {/* ── Network Nodes */}

          {/* CENTER HUB */}
          <circle cx="210" cy="210" r="22" fill="rgba(59,130,246,0.08)" filter="url(#hg-glow)" />
          <circle cx="210" cy="210" r="15" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" filter="url(#node-glow)" />
          <circle cx="210" cy="210" r="6" fill="url(#hg-blue)" />
          {/* TK cross mark inside hub */}
          <path d="M206 210 H214M210 206 V214" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

          {/* TOP-RIGHT NODE — AI */}
          <circle cx="310" cy="130" r="18" fill="rgba(99,102,241,0.08)" filter="url(#hg-glow)" />
          <circle cx="310" cy="130" r="11" fill="rgba(99,102,241,0.18)" stroke="rgba(99,102,241,0.55)" strokeWidth="1.5" filter="url(#node-glow)" />
          <circle cx="310" cy="130" r="4" fill="url(#hg-purple)" />

          {/* TOP-LEFT NODE — Web */}
          <circle cx="100" cy="130" r="15" fill="rgba(6,182,212,0.08)" />
          <circle cx="100" cy="130" r="9" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.45)" strokeWidth="1.5" />
          <circle cx="100" cy="130" r="3.5" fill="url(#hg-cyan)" />

          {/* BOTTOM-LEFT NODE — Data */}
          <circle cx="110" cy="290" r="14" fill="rgba(16,185,129,0.08)" />
          <circle cx="110" cy="290" r="8.5" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
          <circle cx="110" cy="290" r="3" fill="#10B981" fillOpacity="0.8" />

          {/* BOTTOM-RIGHT NODE — API */}
          <circle cx="310" cy="295" r="14" fill="rgba(245,158,11,0.08)" />
          <circle cx="310" cy="295" r="8.5" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.40)" strokeWidth="1.5" />
          <circle cx="310" cy="295" r="3" fill="#F59E0B" fillOpacity="0.8" />

          {/* ── Small satellite nodes */}
          <circle cx="175" cy="145" r="4" fill="rgba(59,130,246,0.4)" />
          <circle cx="258" cy="280" r="3.5" fill="rgba(99,102,241,0.45)" />
          <circle cx="155" cy="275" r="3" fill="rgba(6,182,212,0.4)" />
          <circle cx="270" cy="160" r="3.5" fill="rgba(8,145,178,0.4)" />

          {/* ── Node labels */}
          <text x="310" y="115" textAnchor="middle" fontSize="8" fill="rgba(139,92,246,0.7)" fontFamily="monospace">AI</text>
          <text x="100" y="115" textAnchor="middle" fontSize="7" fill="rgba(6,182,212,0.65)" fontFamily="monospace">WEB</text>
          <text x="110" y="308" textAnchor="middle" fontSize="7" fill="rgba(16,185,129,0.65)" fontFamily="monospace">DATA</text>
          <text x="310" y="313" textAnchor="middle" fontSize="7" fill="rgba(245,158,11,0.65)" fontFamily="monospace">API</text>
          <text x="210" y="232" textAnchor="middle" fontSize="7.5" fill="rgba(59,130,246,0.6)" fontFamily="monospace">CORE</text>

          {/* ── Geometric frame (subtle outer hexagon) */}
          <polygon
            points="210,45 365,127.5 365,292.5 210,375 55,292.5 55,127.5"
            stroke="rgba(59,130,246,0.07)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8 14"
          />
        </svg>

        {/* Floating chip labels */}
        <div className="absolute top-4 right-6 px-2.5 py-1 rounded-lg bg-panel/80 border border-line-bright backdrop-blur-sm font-mono text-[10px] text-accent-purple animate-fade-in-up delay-450">
          AI Automation
        </div>
        <div className="absolute bottom-8 left-2 px-2.5 py-1 rounded-lg bg-panel/80 border border-line-bright backdrop-blur-sm font-mono text-[10px] text-accent-cyan animate-fade-in-up delay-600">
          API Integration
        </div>
        <div className="absolute top-1/2 -right-2 px-2.5 py-1 rounded-lg bg-panel/80 border border-line-bright backdrop-blur-sm font-mono text-[10px] text-accent-emerald animate-fade-in-up delay-375">
          Real-time Sync
        </div>
      </div>
    </div>
  );
}
