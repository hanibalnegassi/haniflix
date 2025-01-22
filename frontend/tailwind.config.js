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
        google: {
          blue: {
            DEFAULT: "#0b57d0",
            100: "rgb(245 248 253)",
          },
          error:{
            DEFAULT: "rgb(179 38 30)"
          }
        },
        yahoo:{
          primary:{
            DEFAULT: "#7d2eff",
            500: "#6001d2"
          }
        },
        outlook: {
          primary: {
            DEFAULT: "#0078d4",
            500: "rgb(0 108 190)"
          }
        },
        aol: {
          primary: {
            DEFAULT: "#39f",
            300: "#5cadff"
          }
        }
      },
    },
  },
  plugins: [],
};
