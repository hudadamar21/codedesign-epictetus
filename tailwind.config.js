/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./layouts/**/*.html", 
    "./static/**/*.js", 
    "./themes/epictetus/**/*.{html,js}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#374151",
        secondary: "#111827",
        dark: '#1F2937'
      },
      screens: {
        xl: '1080px'
      },
      fontFamily: {
        "patrick-hand": "'Patrick Hand', cursive",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/typography")],
};
