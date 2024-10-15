/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "prussian-blue": "#073b4c",
        "blue-green": "#118ab2",
        "caribbean-green": "#06d6a0",
        crayola: "#ffd166",
        "infra-red": "#ef476f",
      },
      aspectRatio: {
        "2/3": "2/3",
        "375/211":"375/211"
      },
    },
  },
  plugins: [],
};
