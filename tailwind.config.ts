import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        nb: {
          bg: "#050012",
          "bg-soft": "#0B021D",
          "bg-elevated": "#14032F",
          pink: "#FF39C9",
          "pink-soft": "#FF8BE5",
          purple: "#8B5CF6",
          cyan: "#22D3EE",
          text: "#F9FAFB",
          muted: "#9CA3AF",
          border: "#272448",
          danger: "#F97373",
        },
      },
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["Space Mono", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        "nb-soft": "0 0 35px rgba(255, 57, 201, 0.35)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
