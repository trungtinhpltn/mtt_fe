module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    screens: {
        xs: "410px",
        // => @media (min-width: 410px) { ... }

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }
      },
    extend: {
      colors: {
        colorcs: {
          "6de9c4": "#6de9c4",
          "d02028": "#d02028",
          "f6f6f6": "#f6f6f6",
          "FF5656": "#FF5656",
          "ffc107": "#ffc107",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/line-clamp")],
};
