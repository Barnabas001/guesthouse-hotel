import { useInView } from "../hooks";
import { useTheme } from "../context";
import { themes } from "../styles/theme";
import { RoomCard } from "../components";
import { ROOMS } from "../data/rooms";
import type { Room } from "../types";

interface Props {
  onBook: (room: Room) => void;
}

export default function Rooms({ onBook }: Props) {
  const [ref, inView] = useInView();
  const { theme } = useTheme();
  const t = themes[theme];

  return (
    <section
      id="rooms"
      className="py-24 transition-colors duration-500"
      style={{ backgroundColor: t.pageBg }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="mb-14 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <p
            className="text-xs tracking-[0.3em] font-bold mb-3"
            style={{ color: t.gold }}
          >
            ACCOMMODATIONS
          </p>
          <h2
            className="text-5xl md:text-6xl font-black transition-colors duration-500"
            style={{ color: t.textPrimary }}
          >
            Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C9A84C, #FFE08C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Rooms
            </span>
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto transition-colors duration-500"
            style={{ color: t.textSecondary }}
          >
            Every room is a sanctuary. Every detail is intentional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROOMS.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  );
}
