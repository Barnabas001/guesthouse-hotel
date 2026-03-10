import { useState } from "react";
import { useScrolled } from "../hooks";
import { useTheme } from "../context";
import { themes } from "../styles/theme";
import ThemeToggle from "../components/ThemeToggle";

export default function Navbar() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const t = themes[theme];
  const isDark = theme === "dark";

  const links = ["Rooms", "Amenities", "Location", "Contact"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)" }}
          >
            <span className="text-black text-xs font-black">LG</span>
          </div>
          <div>
            <span
              className="font-black text-lg tracking-tight"
              style={{ color: t.textPrimary }}
            >
              LUMIÈRE
            </span>
            <span
              className="text-xs block -mt-1 tracking-[0.15em]"
              style={{ color: t.textMuted }}
            >
              GUEST HOUSE
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium tracking-wide transition-colors duration-200"
              style={{ color: t.textSecondary }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = t.textPrimary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = t.textSecondary)
              }
            >
              {link}
            </a>
          ))}

          {/* Theme toggle */}
          <ThemeToggle />

          <a
            href="#booking"
            className="px-5 py-2 rounded-full text-sm font-bold text-black transition-all duration-200 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)" }}
          >
            Book Now
          </a>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div
              className={`w-5 h-0.5 mb-1 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
              style={{ backgroundColor: t.textPrimary }}
            />
            <div
              className={`w-5 h-0.5 mb-1 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
              style={{ backgroundColor: t.textPrimary }}
            />
            <div
              className={`w-5 h-0.5 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
              style={{ backgroundColor: t.textPrimary }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2"
          style={{
            backgroundColor: isDark
              ? "rgba(10,10,10,0.98)"
              : "rgba(248,246,240,0.98)",
          }}
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium transition-colors"
              style={{
                color: t.textSecondary,
                borderBottom: `1px solid ${t.border}`,
              }}
            >
              {link}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="block mt-4 text-center py-3 rounded-full font-bold text-black"
            style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)" }}
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}
