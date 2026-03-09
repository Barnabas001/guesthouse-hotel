import { useEffect, useState } from "react";
import AnimatedNumber from "../components/AnimatedNumber";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #0a0a0a 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7CB9E8, transparent)" }}
      />

      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-yellow-600/20 pointer-events-none"
          style={{
            width: `${80 + i * 60}px`,
            height: `${80 + i * 60}px`,
            top: `${15 + i * 10}%`,
            left: `${5 + i * 15}%`,
            animation: `spin ${20 + i * 5}s linear infinite ${
              i % 2 === 0 ? "" : "reverse"
            }`,
            opacity: Math.max(0, 0.15 - i * 0.02),
          }}
        />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-600/30 mb-8"
          style={{
            backgroundColor: "rgba(201,168,76,0.08)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
          <span className="text-yellow-500/80 text-xs font-bold tracking-[0.25em]">
            LUXURY URBAN GUEST HOUSE
          </span>
        </div>

        <h1
          className="text-6xl md:text-8xl font-black text-white leading-none mb-6"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
          }}
        >
          <span className="block">Where City</span>
          <span
            className="block"
            style={{
              WebkitTextStroke: "1px rgba(201,168,76,0.6)",
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
          className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          style={{
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
              boxShadow: "0 8px 32px rgba(201,168,76,0.4)",
            }}
          >
            Explore Rooms
          </a>
          <a
            href="#booking"
            className="px-8 py-4 rounded-full font-bold text-white/80 text-base border border-white/20 hover:border-white/50 hover:text-white transition-all duration-300"
          >
            Make a Reservation
          </a>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap justify-center gap-8 md:gap-16"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "all 0.8s ease 1s",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-white">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/40 text-xs tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-xs tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent animate-pulse" />
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
