module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "sans": ['Hind', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors:{
        tickergreen: "#62D783",
        subtext: "#BCBCBC"
      },
      height:{
        "nav": '10vh',
        "content": '90vh'
      },
      backgroundColor:{
        "ticker-gray": "#2f3136"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
