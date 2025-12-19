import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0071e3',
          dark: '#005bb5',
          light: '#5ba4f5',
        },
        secondary: {
          DEFAULT: '#27ae60',
          dark: '#229954',
        },
      },
    },
  },
  plugins: [],
};
export default config;
