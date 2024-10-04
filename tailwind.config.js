import daisyui from 'daisyui'

const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5c4b6c",
        secondary: "#aa9377",
        third: "#71a0a5",
        base: "#acc6aa",
        confirm: {
          100: "#60e64e99",
          200: "#5c49",
          300: "#439f3799"
        },
        alert: {
          100: "#d3655b",
          200: "#a15852",
          300: "#7e4540"
        },
      },
      fontFamily: {
        sunday: ["SUNDAY"],
        rowdies: ["ROWDIES"]
      },
    },
  },
  // plugins: [daisyui]
}

