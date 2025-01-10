import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#4A4A59',
        valiant: '#727286',
        valiantDark: '#5E5E6F',
        secondary: '#33333D',
        accent: '#20B980',
      },
      flexBasis: {
        '1/7': '14.2857143%',
      },
      aspectRatio: {
        '2/1': '2 / 1',
        '3/2': '3 / 2',
      },
      fontFamily: {
        krona: ['Krona One'],
      },
    },
  },
  plugins: [],
} satisfies Config
