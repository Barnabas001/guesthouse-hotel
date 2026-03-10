import { useTheme } from "../context";
import { themes } from "../styles/theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = themes[theme];
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-12 h-6 rounded-full transition-all duration-500 focus:outline-none"
      style={{
        backgroundColor: isDark
          ? "rgba(201,168,76,0.15)"
          : "rgba(201,168,76,0.20)",
        border: `1.5px solid ${t.goldBorder}`,
      }}
    >
      {/* Track fill */}
      <span
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          background: isDark
            ? "transparent"
            : "linear-gradient(135deg, #C9A84C22, #FFE08C33)",
        }}
      />

      {/* Sliding knob */}
      <span
        className="absolute w-4 h-4 rounded-full transition-all duration-500 flex items-center justify-center text-[9px]"
        style={{
          left: isDark ? "3px" : "calc(100% - 19px)",
          background: "linear-gradient(135deg, #C9A84C, #8B6914)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
