import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#000000',
          900: '#000000',
          800: '#09090b'
        },
        panel: {
          DEFAULT: '#0a0a0a',
          light: '#18181b',
          card: '#09090b'
        },
        line: {
          DEFAULT: '#18181b',
          bright: '#27272a',
          subtle: 'rgba(255, 255, 255, 0.04)'
        },
        signal: {
          DEFAULT: '#8b5cf6',
          hover: '#7c3aed',
          glow: 'rgba(139, 92, 246, 0.16)'
        },
        signal2: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5'
        },
        accent: {
          violet: '#8b5cf6',
          indigo: '#6366f1',
          cyan: '#06b6d4',
          emerald: '#10b981'
        },
        star: '#FFFFFF',
        steel: '#a1a1aa',
        steeldim: '#71717a'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        body: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace']
      },
      animation: {
        'word': 'wordReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'text-color': 'textColorShift 3s ease infinite',
        'marquee': 'marqueeScroll 40s linear infinite',
        'marquee-reverse': 'marqueeScrollReverse 40s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float': 'floatY 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-dot': 'pulseDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        wordReveal: {
          '0%': { transform: 'translate3d(0, 110%, 0)', opacity: '0' },
          '100%': { transform: 'translate3d(0, 0, 0)', opacity: '1' }
        },
        textColorShift: {
          '0%, 100%': { color: '#c4b5fd' },
          '50%': { color: '#818cf8' }
        },
        marqueeScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        marqueeScrollReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' }
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
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
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.08)',
        'glow-indigo': '0 0 30px rgba(99, 102, 241, 0.12)',
        'cta-glow': '0 20px 50px rgba(99, 102, 241, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
