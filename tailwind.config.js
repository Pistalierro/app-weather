/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Маленькая тень
        DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Тень по умолчанию
        lg: `
      1px 1px 0 rgba(0, 0, 0, 0.4),
      -1px 1px 0 rgba(0, 0, 0, 0.4),
      1px -1px 0 rgba(0, 0, 0, 0.4),
      -1px -1px 0 rgba(0, 0, 0, 0.4),
      3px 3px 6px rgba(0, 0, 0, 0.9)` // Черный контур и мягкая тень
      },
      fontFamily: {
        exo: ['"Exo 2"', 'sans-serif']
      }
    }
  },
  plugins: [
    require('tailwindcss-textshadow')
  ]
}
