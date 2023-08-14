/** @type {import('tailwindcss').Config} */

const colors = require('./tailwind.colors.cjs')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    colors,
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))'
      }
    }
  },
  plugins: []
}
