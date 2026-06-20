import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
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
        pixel: ['"Pixelify Sans"', 'monospace'],
        press: ['"Press Start 2P"', 'monospace'],
        vt: ['"VT323"', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#5D8A3A',
          foreground: '#FFFFFF',
          50:  '#EBF5E0',
          100: '#D2EAB8',
          200: '#A7D375',
          300: '#7DB84A',
          400: '#5D8A3A',
          500: '#4A6E2E',
          600: '#3A5524',
          700: '#2B3F1A',
          800: '#1D2A11',
          900: '#0E1509',
        },
        secondary: {
          DEFAULT: '#9C6B30',
          foreground: '#FFFFFF',
          50:  '#F5EBD8',
          100: '#E8D0A8',
          200: '#D4AC70',
          300: '#B88840',
          400: '#9C6B30',
          500: '#7D5226',
          600: '#5E3B1C',
          700: '#3E2712',
          800: '#1F1309',
          900: '#0A0603',
        },
        accent: {
          DEFAULT: '#3DCC4A',
          foreground: '#0A1E0D',
          50:  '#E8FBEA',
          100: '#C8F5CC',
          200: '#93EC9C',
          300: '#5EE36B',
          400: '#3DCC4A',
          500: '#2EA838',
          600: '#22832B',
          700: '#175F1E',
          800: '#0C3A11',
          900: '#051508',
        },
        destructive: {
          DEFAULT: '#B02E26',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        /* Minecraft named palette — use as mc-stone, mc-gold, etc. */
        mc: {
          stone:        '#7A7A7A',
          'stone-light':'#9A9A9A',
          'stone-dark': '#4A4A4A',
          grass:        '#5D8A3A',
          dirt:         '#6B4226',
          wood:         '#9C6B30',
          sky:          '#7EC0EE',
          emerald:      '#3DCC4A',
          redstone:     '#B02E26',
          gold:         '#FCEE4B',
          diamond:      '#5DEFEA',
          obsidian:     '#15101E',
        },
      },
      /* All border-radius values → 0 — Minecraft has no curves */
      borderRadius: {
        DEFAULT: '0px',
        none:    '0px',
        sm:      '0px',
        md:      '0px',
        lg:      '0px',
        xl:      '0px',
        '2xl':   '0px',
        '3xl':   '0px',
        full:    '0px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.1s steps(4, end)',
        'accordion-up':   'accordion-up 0.1s steps(4, end)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
