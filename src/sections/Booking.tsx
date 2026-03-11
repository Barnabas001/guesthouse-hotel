import { useInView } from "../hooks";
import { useTheme } from "../context";
import { themes } from "../styles/theme";
import BookingForm from "../components/BookingForm";
import type { Room } from "../types";

interface Props {
  selectedRoom: Room | null;
  onClear: () => void;
}

export default function Booking({ selectedRoom, onClear }: Props) {
  const [ref, inView] = useInView();
  const { theme } = useTheme();
  const t = themes[theme];

  return (
    <section
      id="booking"
      className="py-24 transition-colors duration-500"
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(180deg, #0a0a0a 0%, #111008 100%)"
            : "linear-gradient(180deg, #f8f6f0 0%, #fdf9f0 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* ── Section header ── */}
        <div
          ref={ref}
          className="text-center mb-14"
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
            RESERVATIONS
          </p>
          <h2
            className="text-5xl md:text-6xl font-black transition-colors duration-500"
            style={{ color: t.textPrimary }}
          >
            Book Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C9A84C, #FFE08C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Stay
            </span>
          </h2>
          <p
            className="mt-4 transition-colors duration-500"
            style={{ color: t.textSecondary }}
          >
            Fill the form below. We'll confirm your reservation within 2 hours.
          </p>
        </div>

        {/* ── Form ── */}
        <BookingForm selectedRoom={selectedRoom} onClear={onClear} />
      </div>
    </section>
  );
}
