/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-paper': "url('/paper.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#0368fe',
        'secondary': '#002566',
        'page': '#eef3f6',
        'offwhite': '#f9faf9',
      },
      screens: {
        'phone': '425px',
        'mobileS': '320px', 
        'max': {'max': '768px'},
        'phoneMax': {'max': '480px'},
        '500Max': {'max': '500px'},
        '400max': {'max': '400px'},
        '320Max': {'max': '320px'},
      },
    },
  },
  daisyui: {
    darkTheme: 'light',
  },
  plugins: [
    require('daisyui')
  ],
};
