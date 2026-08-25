import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-archivo)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['var(--font-archivo)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      colors: {
        // shadcn semantic keys — these read the CSS vars repointed in globals.css.
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // Syntaraa brand palette. One hue — indigo. No second accent.
        brand: {
          DEFAULT: '#5B2BD9',
          50: '#F2EEFC',
          100: '#E4DCF9',
          200: '#CDBEF3',
          300: '#AB93EC',
          400: '#835FE2',
          500: '#5B2BD9',
          600: '#4C21BA',
          700: '#3E1B97',
          800: '#311679',
          900: '#25105B',
        },
        ink: '#140C29',
        slate: '#6B6480',
        mist: '#F3F1F9',
        line: '#E6E2F0',
        success: { DEFAULT: '#0F7A55', bg: '#E6F4EE' },
        warning: { DEFAULT: '#A85C00', bg: '#FDF1E1' },
        error: { DEFAULT: '#B32741', bg: '#FCEAEE' },
      },
      borderRadius: {
        lg: 'var(--radius)', // 12px
        md: 'calc(var(--radius) - 4px)', // 8px
        sm: 'calc(var(--radius) - 6px)', // 6px
        xl: 'calc(var(--radius) + 4px)', // 16px, matches the logo tile
      },
      transitionDuration: {
        DEFAULT: '160ms',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
