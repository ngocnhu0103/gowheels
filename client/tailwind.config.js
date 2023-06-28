/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#D9534F"
      },
      fontFamily: {
        'banner': ['Coiny', 'cursive']
      }
    },
  },
  plugins: [],
}

