/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        darkTheme: {
          primary: "#1de9b6",

          secondary: "#7433E8",

          accent: "#5D7DB0",

          neutral: "#3D4451",

          "base-100": "#1B272E",

          info: "#3ABFF8",

          success: "#35ac80",

          warning: "#F87272",

          error: "#F87272",
        }, cupcake: {
          ...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
          primary : "#1de9b6",
          
      },
      }
    ],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};



