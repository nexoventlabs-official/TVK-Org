/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Merriweather', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Match the parent marketing site's dark + brand palette
        ink: {
          0: '#0D0D0D',
          50: '#161616',
          100: '#1F1F1F',
          200: '#262626',
        },
        cream: '#F5F0E8',
        brand: {
          maroon: '#8B0000',
          maroonDark: '#722F37',
          gold: '#FFCC00',
          blue: '#1D4ED8',
          blueSoft: '#93C5FD',
          green: '#15803D',
          greenSoft: '#86EFAC',
        },
      },
    },
  },
  plugins: [],
};
