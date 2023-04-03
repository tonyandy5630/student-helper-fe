/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")
module.exports = {
  corePlugins: {
    preflight: false
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "leaf-green": "#a8fd85",
        dirt: "#322F1Dff",
        "sea-leaf": "#0E8388",
        "bright-teal": "#CBE4DE",
        "light-gray": "#D0CFD0ff",
        "fade-gray": "#C1C5C8ff"
      },
      width: {
        inherit: "inherit"
      },
      screens: {
        xs: "320px"
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".blur-bg": {
          position: "absolute",
          top: "0",
          bottom: "0",
          left: 0,
          right: 0,
          backdropFilter: "blur(24px)"
        },
        ".mobile-gray": {
          backgroundColor: "#888484a1"
        },
        "text-fill": {
          "-webkit-text-fill-color": "transparent"
        }
      })
    })
  ],
  important: "#__next"
}
