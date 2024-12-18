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
        lg: '0 0 6px rgba(0, 0, 0, 0.7)' // Большая тень
      }
    }
  },
  plugins: [
    require('tailwindcss-textshadow')
  ]
}
