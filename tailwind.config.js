import daisyui from 'daisyui'

const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ed9848",
        secondary: "#f1c83a",
        third: "#a15852",
        base: "#6f6f4b",
        alert: "#4a2b30",
      },
      fontFamily: {
        sunday: ["SUNDAY"],
        rowdies: ["ROWDIES"]
      },
    },
  },
  // plugins: [daisyui]
}

