/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        '500': '500px',
        '800' : '800px',
        '300' : '300px'
      }
    },
  },
  plugins: [],
}

