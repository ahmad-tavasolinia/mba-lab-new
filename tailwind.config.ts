import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F2F6F8',
          dim: '#E4EBF0',
        },
        ink: {
          DEFAULT: '#17232D',
          soft: '#485A68',
          faint: '#7E909C',
        },
        gold: {
          DEFAULT: '#AEC6D8',
          bright: '#E0EBF2',
        },
        forest: {
          DEFAULT: '#29485F',
          bright: '#6288A2',
        },
        camel: {
          DEFAULT: '#355B74',
          bright: '#80A2B8',
        },
        caramel: {
          DEFAULT: '#41647B',
          bright: '#91AFBF',
        },
        cognac: {
          DEFAULT: '#304F68',
          bright: '#7699B2',
        },
        coffee: {
          DEFAULT: '#294354',
          bright: '#65869B',
        },
        chocolate: {
          DEFAULT: '#1D3343',
          bright: '#54748A',
        },
        rule: '#D5E0E7',
        dark: {
          bg: '#081521',
          paper: '#122330',
          ink: '#EDF2F6',
          soft: '#B4C2CC',
          rule: '#293D4D',
        },
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '42rem',
        content: '82.8rem',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      }),
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease-out both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
