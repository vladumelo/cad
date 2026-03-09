import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f6f7fb',
        panel: '#ffffff',
        border: '#dfe3ec',
        accent: '#3668ff',
      },
    },
  },
  plugins: [],
};

export default config;
