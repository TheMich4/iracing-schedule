/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit"],
      },
    },
  },
  plugins: [],
};

module.exports = config;
