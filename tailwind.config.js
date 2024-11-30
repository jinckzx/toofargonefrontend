/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['HelveticaSchool', 'sans-serif'], // Add your custom font here with a fallback
      },
    },
  },
  plugins: [],
};
