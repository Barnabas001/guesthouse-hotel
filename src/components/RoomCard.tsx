import { useState } from "react";
import { useInView } from "../hooks";
import { useTheme } from "../context";
import { themes } from "../styles/theme";
import type { Room } from "../types";

interface Props {
  room: Room;
  index: number;
  onBook: (room: Room) => void;
}

export default function RoomCard({ room, index, onBook }: Props) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const t = themes[theme];
  const isDark = theme === "dark";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
        boxShadow: hovered
          ? `0 20px 60px ${room.accent}30`
          : isDark
            ? "0 4px 20px rgba(0,0,0,0.4)"
            : "0 4px 24px rgba(0,0,0,0.08)",
      }}
      className="relative rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300"
    >
      <div
        className="p-6 h-full transition-colors duration-500"
        style={{
          // In dark mode: use the room's dark gradient
          // In light mode: use a clean white card
          background: isDark
            ? `linear-gradient(135deg, var(--tw-gradient-stops))`
            : t.cardBg,
          border: `1px solid ${isDark ? t.cardBorder : room.accent + "30"}`,
        }}
      >
        {/* Apply dark gradient classes only in dark mode */}
        {isDark && (
          <div
            className={`absolute inset-0 bg-linear-to-br ${room.gradient} -z-10`}
          />
        )}

        {/* Top row */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span
              className="text-xs font-bold tracking-[0.2em] px-2 py-1 rounded-full border"
              style={{
                color: room.accent,
                borderColor: `${room.accent}40`,
                backgroundColor: `${room.accent}15`,
              }}
            >
              {room.category}
            </span>
            <h3
              className="font-bold text-xl mt-2 leading-tight transition-colors duration-500"
              style={{ color: t.textPrimary }}
            >
              {room.name}
            </h3>
          </div>
          <span className="text-4xl">{room.emoji}</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span
            className="text-4xl font-black transition-colors duration-500"
            style={{ color: t.textPrimary }}
          >
            ${room.price}
          </span>
          <span
            className="text-sm ml-1 transition-colors duration-500"
            style={{ color: t.textMuted }}
          >
            /night
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-4 transition-colors duration-500"
          style={{ color: t.textSecondary }}
        >
          {room.description}
        </p>

        {/* Quick specs */}
        <div
          className="flex gap-4 mb-4 text-xs transition-colors duration-500"
          style={{ color: t.textMuted }}
        >
          <span>📐 {room.size}</span>
          <span>👤 {room.guests} guests</span>
          <span>🛏️ {room.bed}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-5">
          {room.features.map((feature) => (
            <span
              key={feature}
              className="text-xs px-2 py-1 rounded-full transition-colors duration-500"
              style={{
                color: t.textSecondary,
                backgroundColor: t.inputBg,
                border: `1px solid ${t.borderMid}`,
              }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => onBook(room)}
          className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300"
          style={{
            backgroundColor: hovered ? room.accent : "transparent",
            color: hovered ? "#000" : room.accent,
            border: `1.5px solid ${room.accent}`,
          }}
        >
          Reserve This Room →
        </button>
      </div>
    </div>
  );
}
