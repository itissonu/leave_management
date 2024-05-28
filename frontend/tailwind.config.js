/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'times': ['Times New Roman', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'Montserrat': ['Montserrat', 'sans-serif'],
        'Shadows': ['Shadows Into Light', 'sans-serif']

      },
    },
  },
  plugins: [],
}