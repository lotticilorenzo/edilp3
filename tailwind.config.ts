import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        'bg-alt': '#F5F4F0',
        surface: '#FAFAF8',
        border: '#E8E5DE',
        'border-hover': '#C8C4BA',
        accent: '#C0392B',
        'accent-dark': '#962D22',
        'accent-glow': 'rgba(192, 57, 43, 0.10)',
        green: '#1C2B1A',
        'green-mid': '#4A7C3F',
        'green-light': '#E8F5E4',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',
        terracotta: '#8B7355',
        gold: '#B8962E',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        inter: ['var(--font-inter)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};
export default config;
