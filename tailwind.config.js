/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blood: "#dc0a0a",
        "blood-dark": "#7a0505",
        "blood-glow": "#ff1f1f",
        void: "#050505",
        "void-light": "#0d0a0f",
        ghost: "#e8e3e8",
        "purple-deep": "#1a0b1e",
        "purple-glow": "#4a1a5c",
      },
      fontFamily: {
        creep: ['"Creepster"', "cursive"],
        gothic: ['"Nosifer"', "cursive"],
        sans: ['"Inter"', "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "blood-drip": "bloodDrip 3s ease-in-out infinite",
        flicker: "flicker 4s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(220, 10, 10, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(220, 10, 10, 0.8)" },
        },
        bloodDrip: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(4px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.8" },
          "43%": { opacity: "1" },
          "45%": { opacity: "0.3" },
          "46%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
