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
      container: {
        center: true,
        padding: {
          DEFAULT: "0rem",
          sm: "2rem",
          md: "6rem",
          lg: "10rem",
          xl: "12rem",
        },
      },
      fontFamily: {
        "patrick-hand": "'Patrick Hand', cursive",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/typography")],
};
