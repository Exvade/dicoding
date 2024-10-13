/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        limeGreen: "#a8ff53",
        purple: "#6e4ef2",
        grayText: "#8f8f92",
        dark: "#1f1f24",
      },
    },
  },
  plugins: [],
};
