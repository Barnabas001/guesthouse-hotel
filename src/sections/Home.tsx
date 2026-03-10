import { useEffect, useState } from "react";
import AnimatedNumber from "../components/AnimatedNumber";
import { useTheme } from "../context";
import { themes } from "../styles/theme";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();
  const t = themes[theme];
  const isDark = theme === "dark";

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: 6, suffix: "+", label: "Room Types" },
    { value: 98, suffix: "%", label: "Guest Satisfaction" },
    { value: 5, suffix: "★", label: "Star Rating" },
    { value: 24, suffix: "/7", label: "Concierge" },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #0a0a0a 100%)"
          : "linear-gradient(135deg, #f8f6f0 0%, #fdf3dc 50%, #f8f6f0 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(${t.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-500"
        style={{
          background: "radial-gradient(circle, #C9A84C, transparent)",
          opacity: isDark ? 0.2 : 0.15,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-500"
        style={{
          background: "radial-gradient(circle, #7CB9E8, transparent)",
          opacity: isDark ? 0.1 : 0.12,
        }}
      />

      {/* Spinning rings */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none transition-all duration-500"
          style={{
            width: `${80 + i * 60}px`,
            height: `${80 + i * 60}px`,
            top: `${15 + i * 10}%`,
            left: `${5 + i * 15}%`,
            border: `1px solid ${isDark ? "rgba(201,168,76,0.2)" : "rgba(201,168,76,0.25)"}`,
            animation: `spin ${20 + i * 5}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
            opacity: Math.max(0, 0.15 - i * 0.02),
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
          style={{
            backgroundColor: t.goldSubtle,
            borderColor: t.goldBorder,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
          <span
            className="text-xs font-bold tracking-[0.25em]"
            style={{ color: t.gold }}
          >
            LUXURY URBAN GUEST HOUSE
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-6xl md:text-8xl font-black leading-none mb-6 transition-colors duration-500"
          style={{
            color: t.textPrimary,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}
        >
          <span className="block">Where City</span>
          <span
            className="block"
            style={{
              WebkitTextStroke: isDark
                ? "1px rgba(201,168,76,0.6)"
                : "2px rgba(201,168,76,0.8)",
              color: "transparent",
            }}
          >
            Meets
          </span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #FFE08C, #8B6914)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Luxury
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed transition-colors duration-500"
          style={{
            color: t.textSecondary,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.6s",
          }}
        >
          Six meticulously designed rooms in the heart of the city.
          Uncompromising quality. Unforgettable stays.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.8s",
          }}
        >
          <a
            href="#rooms"
            className="px-8 py-4 rounded-full font-bold text-black text-base tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #FFE08C)",
              boxShadow: `0 8px 32px ${t.goldGlow}`,
            }}
          >
            Explore Rooms
          </a>
          <a
            href="#booking"
            className="px-8 py-4 rounded-full font-bold text-base transition-all duration-300"
            style={{
              color: t.textSecondary,
              border: `1px solid ${t.borderMid}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = t.textPrimary;
              e.currentTarget.style.borderColor = t.borderHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = t.textSecondary;
              e.currentTarget.style.borderColor = t.borderMid;
            }}
          >
            Make a Reservation
          </a>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap justify-center gap-8 md:gap-16"
          style={{ opacity: loaded ? 1 : 0, transition: "all 0.8s ease 1s" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl font-black transition-colors duration-500"
                style={{ color: t.textPrimary }}
              >
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div
                className="text-xs tracking-widest mt-1 transition-colors duration-500"
                style={{ color: t.textMuted }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.4 }}
      >
        <span
          className="text-xs tracking-[0.2em] transition-colors duration-500"
          style={{ color: t.textPrimary }}
        >
          SCROLL
        </span>
        <div
          className="w-px h-12 animate-pulse"
          style={{
            background: `linear-gradient(to bottom, ${t.textPrimary}, transparent)`,
          }}
        />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
