/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      container: {
        center: true,
      },

      screens: {
        mn: '400px',
        sm: '642px',
        md: '770px' ,
        lg: '1026px' ,
        xl: '1282px' ,
        '2xl': '1537px' ,
      },

      colors: {
        "N-green": "#00DC82",
        "N-light": "#fff",
        "N-dark": "#0B0B0C",
      },
    },
  },
  plugins: [],
};
