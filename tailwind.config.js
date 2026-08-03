/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-gold': '#C9A44C',
        'luxury-dark': '#1A1A1A',
        'luxury-cream': '#F5F1ED',
        'luxury-light': '#FFFFFF',
      },
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        poppins: ["'Poppins'", "sans-serif"],
      },
      fontSize: {
        "10xl": "9rem",
        "11xl": "10rem",
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "scale-in": "scaleIn 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        'luxury': "0 20px 60px rgba(0, 0, 0, 0.15)",
        'luxury-lg': "0 30px 100px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
}
