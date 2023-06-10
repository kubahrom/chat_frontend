/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { 300: '#5dc895', DEFAULT: '#489b8e', 600: '#3c7f78' },
        secondary: { DEFAULT: '#4899ff' },
        backdrop: '#020513',
      },
      spacing: {
        1.5: '0.375rem',
      },
    },
  },
  plugins: [],
};
