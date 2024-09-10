/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Josefin Sans', 'sans-serif'],   // Fuente principal para el texto
        title: ['Yeseva One', 'cursive'],      // Fuente para los títulos
      },
    },
    colors: {
      primary: '#6f2dbd',
      secondary: '#a663cc',
      complement1: '#b298dc',
      complement2: '#b8d0eb',
      complement3: '#b9faf8',
      bgMain: '#f0f4f8',
    },
  },
  plugins: [],
}

