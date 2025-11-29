import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        nb: {
          // Light, premium base
          bg: "#F8FAFC", // slate-50-ish
          "bg-soft": "#FFFFFF",
          "bg-elevated": "#FFFFFF",
          border: "rgba(2, 6, 23, 0.10)",

          // Brand accents (ONLY)
          cyan: "#00F2FF",
          green: "#7AF63C",
          pink: "#CB2FFF", // keep key name for existing classes

          // Text
          text: "#020617",
          muted: "rgba(2, 6, 23, 0.62)",
          "muted-2": "rgba(2, 6, 23, 0.45)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      boxShadow: {
        "nb-soft":
          "0 16px 40px rgba(2, 6, 23, 0.10), 0 1px 0 rgba(2, 6, 23, 0.04)",
        "nb-hover":
          "0 18px 52px rgba(2, 6, 23, 0.14), 0 0 24px rgba(0, 242, 255, 0.10)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
