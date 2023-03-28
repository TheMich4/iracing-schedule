/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("tailwind-scrollbar")],
  safelist: [
    // For class backgrounds
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit"],
      },
    },
  },
  variants: {
    scrollbar: ["rounded"],
  },
};

module.exports = config;
