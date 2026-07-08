import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12213B",
        slate: "#4A5A70",
        paper: "#EEF1F5",
        "paper-raised": "#FFFFFF",
        "signal-teal": "#0E7C7B",
        "verified-green": "#2F8558",
        "flag-amber": "#C97A2B",
        "breach-red": "#B3432B",
        hairline: "#D7DCE3",
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        body: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "lineage-pulse": {
          "0%": { transform: "translateX(0%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        "lineage-pulse": "lineage-pulse 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
