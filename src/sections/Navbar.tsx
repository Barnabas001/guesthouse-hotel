import { useState } from "react";
import { useScrolled } from "../hooks";

export default function Navbar() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["Rooms", "Amenities", "Location", "Contact"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ── Logo ── */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)" }}
          >
            <span className="text-black text-xs font-black">BP</span>
          </div>
          <div>
            <span className="text-white font-black text-lg tracking-tight">
              Bold Place
            </span>
            <span className="text-white/40 text-xs block -mt-1 tracking-[0.15em]">
              HOTEL
            </span>
          </div>
        </div>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link}
            </a>
          ))}
          <a
            href="#booking"
            className="px-5 py-2 rounded-full text-sm font-bold text-black transition-all duration-200 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)" }}
          >
            Book Now
          </a>
        </div>

        {/* ── Mobile Hamburger ── */}

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div
            className={`w-5 h-0.5 bg-white mb-1 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <div
            className={`w-5 h-0.5 bg-white mb-1 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <div
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* ── Mobile Menu (dropdown) ── */}

      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2"
          style={{ backgroundColor: "rgba(10,10,10,0.98)" }}
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block text-white/70 py-3 border-b border-white/10 text-sm font-medium"
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
