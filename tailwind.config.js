// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'karina-verde': '#2b6cb0', // Ajusta este hexadecimal al verde exacto que prefieras
        'karina-naranjo': '#c05621', // Naranjo oscuro
        'fondo': '#f9fafb',
      }
    },
  },
  plugins: [],
}