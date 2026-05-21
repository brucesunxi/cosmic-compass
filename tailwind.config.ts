import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: "#f0eaff",
          100: "#d8c8ff",
          200: "#b894ff",
          300: "#9a5fff",
          400: "#7c3aed",
          500: "#6418e0",
          600: "#4f12b8",
          700: "#3d0d94",
          800: "#2c0970",
          900: "#1c054d",
          950: "#0f0229",
        },
        aurora: {
          50: "#e0f7fa",
          100: "#b2ebf2",
          200: "#80deea",
          300: "#4dd0e1",
          400: "#26c6da",
          500: "#00bcd4",
          600: "#00acc1",
          700: "#0097a7",
          800: "#00838f",
          900: "#006064",
        },
        fortune: {
          gold: "#FFD700",
          rose: "#FF6B9D",
          lavender: "#C084FC",
          peach: "#FFB38A",
          teal: "#2DD4BF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(124, 58, 237, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.8)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "cosmic-gradient": "linear-gradient(135deg, #0f0229 0%, #2c0970 50%, #1c054d 100%)",
        "aurora-gradient": "linear-gradient(135deg, #0f0229 0%, #1a0533 30%, #0a2e38 70%, #0f0229 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(124,58,237,0.1) 0%, rgba(15,2,41,0.8) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
