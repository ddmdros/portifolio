/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "1.875rem", // Ajusta o tamanho do H1
              lineHeight: "2.25rem",
            },
            // Garante que imagens não estourem a largura do container
            img: {
              borderRadius: "0.5rem",
              maxWidth: "100%",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
