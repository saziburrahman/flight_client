/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          500: "#ff4d4f",
          600: "#d43d3f",
        },
      },
    },
  },
  plugins: [],
};
