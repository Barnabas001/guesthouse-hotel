export const themes = {
  dark: {
    // Backgrounds
    pageBg: "#0a0a0a",
    sectionBg: "#0d0d0d",
    sectionAltBg: "#111008",
    footerBg: "#080808",

    // Text
    textPrimary: "#ffffff",
    textSecondary: "rgba(255,255,255,0.5)",
    textMuted: "rgba(255,255,255,0.3)",
    textFaint: "rgba(255,255,255,0.2)",

    // Borders
    border: "rgba(255,255,255,0.05)",
    borderMid: "rgba(255,255,255,0.10)",
    borderHover: "rgba(255,255,255,0.30)",

    // Cards
    cardBg: "rgba(255,255,255,0.03)",
    cardBorder: "rgba(255,255,255,0.05)",

    // Navbar
    navBg: "rgba(10,10,10,0.95)",

    // Inputs
    inputBg: "rgba(255,255,255,0.05)",
    inputBorder: "rgba(255,255,255,0.10)",
    inputFocus: "rgba(255,255,255,0.08)",

    // Gold accent
    gold: "#C9A84C",
    goldLight: "#FFE08C",
    goldDark: "#8B6914",
    goldGlow: "rgba(201,168,76,0.4)",
    goldSubtle: "rgba(201,168,76,0.08)",
    goldBorder: "rgba(201,168,76,0.30)",

    // Grid overlay
    gridLine: "rgba(201,168,76,0.3)",
  },

  light: {
    // Backgrounds
    pageBg: "#f8f6f0",
    sectionBg: "#ffffff",
    sectionAltBg: "#fdf9f0",
    footerBg: "#1a1510",

    // Text
    textPrimary: "#1a1510",
    textSecondary: "rgba(26,21,16,0.6)",
    textMuted: "rgba(26,21,16,0.4)",
    textFaint: "rgba(26,21,16,0.25)",

    // Borders
    border: "rgba(26,21,16,0.06)",
    borderMid: "rgba(26,21,16,0.12)",
    borderHover: "rgba(26,21,16,0.30)",

    // Cards
    cardBg: "#ffffff",
    cardBorder: "rgba(26,21,16,0.08)",

    // Navbar
    navBg: "rgba(248,246,240,0.95)",

    // Inputs
    inputBg: "rgba(26,21,16,0.04)",
    inputBorder: "rgba(26,21,16,0.12)",
    inputFocus: "rgba(26,21,16,0.07)",

    // Gold accent
    gold: "#C9A84C",
    goldLight: "#FFE08C",
    goldDark: "#8B6914",
    goldGlow: "rgba(201,168,76,0.35)",
    goldSubtle: "rgba(201,168,76,0.10)",
    goldBorder: "rgba(201,168,76,0.35)",

    // Grid overlay
    gridLine: "rgba(201,168,76,0.15)",
  },
} as const;

export type ThemeTokens = typeof themes.dark;
