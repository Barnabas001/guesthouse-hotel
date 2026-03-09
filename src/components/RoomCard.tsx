import { useState } from "react";
import { useInView } from "../hooks";
import type { Room } from "../types";

interface Props {
  room: Room;
  index: number;
  onBook: (room: Room) => void;
}

export default function RoomCard({ room, index, onBook }: Props) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
        boxShadow: hovered
          ? `0 20px 60px ${room.accent}30`
          : "0 4px 20px rgba(0,0,0,0.4)",
      }}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
    >
      <div
        className={`bg-linear-to-br ${room.gradient} p-6 h-full border border-white/5`}
        style={{ transition: "box-shadow 0.4s ease" }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <span
              className="text-xs font-bold tracking-[0.2em] px-2 py-1 rounded-full border"
              style={{
                color: room.accent,
                borderColor: `${room.accent}40`,
                backgroundColor: `${room.accent}10`,
              }}
            >
              {room.category}
            </span>
            <h3 className="text-white font-bold text-xl mt-2 leading-tight">
              {room.name}
            </h3>
          </div>
          <span className="text-4xl">{room.emoji}</span>
        </div>

        {/* ── Price ── */}
        <div className="mb-4">
          <span className="text-4xl font-black text-white">${room.price}</span>
          <span className="text-white/40 text-sm ml-1">/night</span>
        </div>

        <p className="text-white/60 text-sm leading-relaxed mb-4">
          {room.description}
        </p>

        <div className="flex gap-4 mb-4 text-xs text-white/50">
          <span>📐 {room.size}</span>
          <span>👤 {room.guests} guests</span>
          <span>🛏️ {room.bed}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {room.features.map((feature) => (
            <span
              key={feature}
              className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60 border border-white/10"
            >
              {feature}
            </span>
          ))}
        </div>

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
