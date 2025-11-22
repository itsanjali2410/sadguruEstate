/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#043871',
        'primary-dark': '#032a5a',
        'primary-light': '#1a5a9e',
      },
      fontFamily: {
        'sans': ['Source Serif 4', 'serif'],
        'serif': ['Source Serif 4', 'serif'],
        'display': ['Source Serif 4', 'serif'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      }
    },
  },
  plugins: [],
};
