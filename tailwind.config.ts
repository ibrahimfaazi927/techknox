import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--bg-ink)',
          900: 'var(--bg-ink-900)',
          800: 'var(--bg-ink-800)'
        },
        panel: {
          DEFAULT: 'var(--bg-panel)',
          light: 'var(--bg-panel-light)',
          card: 'var(--bg-panel-card)'
        },
        line: {
          DEFAULT: 'var(--border-line)',
          bright: 'var(--border-line-bright)',
          subtle: 'var(--border-line-subtle)'
        },
        signal: {
          DEFAULT: 'var(--signal)',
          hover: 'var(--signal-hover)',
          glow: 'var(--signal-glow)'
        },
        signal2: {
          DEFAULT: 'var(--signal2)',
          hover: 'var(--signal2-hover)'
        },
        accent: {
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          purple: '#8B5CF6'
        },
        star: 'var(--text-star)',
        steel: 'var(--text-steel)',
        steeldim: 'var(--text-steeldim)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace']
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, var(--grid-dot) 1px, transparent 1px)',
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, var(--hero-glow), transparent 70%)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #3B82F6 0deg, #6366F1 120deg, #06B6D4 240deg, #3B82F6 360deg)',
        'mesh-gradient': 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.10) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.08) 0%, transparent 45%), radial-gradient(ellipse at 60% 80%, rgba(6,182,212,0.06) 0%, transparent 40%)'
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'floatY 6s ease-in-out infinite',
        'orbit': 'orbitSpin 20s linear infinite',
        'orbit-reverse': 'orbitSpin 28s linear infinite reverse',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer': 'shimmerSlide 3s ease infinite',
        'gradient-shift': 'gradientShift 6s ease infinite',
        'path-draw': 'pathDraw 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) both',
        'pulse-dot': 'pulseDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        orbitSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        shimmerSlide: {
          '0%': { left: '-60%' },
          '100%': { left: '120%' }
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        pathDraw: {
          from: { strokeDashoffset: '300' },
          to: { strokeDashoffset: '0' }
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.75' },
          '50%': { transform: 'scale(2.2)', opacity: '0' }
        }
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      },
      boxShadow: {
        'signal-sm': '0 2px 8px -1px rgba(59,130,246,0.2)',
        'signal-md': '0 8px 24px -4px rgba(59,130,246,0.28)',
        'signal-lg': '0 16px 48px -8px rgba(59,130,246,0.35)',
        'card-dark': '0 4px 24px -4px rgba(0,0,0,0.4)'
      }
    }
  },
  plugins: []
};

export default config;
