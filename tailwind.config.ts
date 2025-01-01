import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: '#f472b6',
      },
      flexBasis: {
        '1/7': '14.2857143%',
      },
      aspectRatio: {
        '2/1': '2 / 1',
        '3/2': '3 / 2'
      },
    },
  },
  plugins: [],
} satisfies Config;
