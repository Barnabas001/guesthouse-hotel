import { useInView } from "../hooks";
import BookingForm from "../components/BookingForm";
import type { Room } from "../types";

interface Props {
  selectedRoom: Room | null;
  onClear: () => void;
}

export default function Booking({ selectedRoom, onClear }: Props) {
  const [ref, inView] = useInView();

  return (
    <section
      id="booking"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #111008 100%)",
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
          <p className="text-yellow-600/70 text-xs tracking-[0.3em] font-bold mb-3">
            RESERVATIONS
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white">
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
          <p className="text-white/40 mt-4">
            Fill the form below. We'll confirm your reservation within 2 hours.
          </p>
        </div>

        <BookingForm selectedRoom={selectedRoom} onClear={onClear} />
      </div>
    </section>
  );
}
