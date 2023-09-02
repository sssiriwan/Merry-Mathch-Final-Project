/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "bg-1": "url('./imgs/bg-1.jpeg')",
        "bg-2": "url('./imgs/bg-2.jpeg')",
      },
      borderRadius: {
        "4xl": "2.5rem",
      },
      boxShadow: {
        "3xl": " 2px 2px 12px 0px rgba(64, 50, 133, 0.12)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        pred: {
          100: "#FFE1EA",
          200: "#FFB1C8",
          300: "#FF6390",
          400: "#FF1659",
          500: "#C70039",
          600: "#95002B",
          700: "#64001D",
          800: "#32000E",
          900: "#200009",
        },
        ppurple: {
          100: "#F4EBF2",
          200: "#EFC4E2",
          300: "#DF89C6",
          400: "#CF4FA9",
          500: "#A62D82",
          600: "#7D2262",
          700: "#531741",
          800: "#411032",
          900: "#2A0B21",
        },
        pbeige: {
          100: "#FAF1ED",
          200: "#F3E4DD",
          300: "#E8CABB",
          400: "#DCAF99",
          500: "#D19477",
          600: "#B8653E",
          700: "#7B4429",
          800: "#612F16",
          900: "#3D2215",
        },
        pgray: {
          100: "#F6F7FC",
          200: "#F1F2F6",
          300: "#E4E6ED",
          400: "#D6D9E4",
          500: "#C8CCDB",
          600: "#9AA1B9",
          700: "#646D89",
          800: "#424C6B",
          900: "#2A2E3F",
        },
        pyellow: {
          100: "#FFF6D4",
          500: "#FFF6D4",
        },
        pgreen: {
          100: "#E7FFE7",
          500: "#197418",
        },
        putility: {
          100: "#FFF",
          200: "#000",
          300: "#AF2758",
          400: "#160404",
          500: "#FCFCFE",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
