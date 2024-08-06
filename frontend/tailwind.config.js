/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main": "#13B8A6",
        "muted": "#636363",
        "dark": "#121619",
        "dark2": "#0B0F12",
      },
    },
  },
  plugins: [],
};
