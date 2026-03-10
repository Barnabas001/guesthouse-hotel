import { useInView } from "../hooks";
import { AMENITIES } from "../data/amenities";

export default function Amenities() {
  const [ref, inView] = useInView();

  return (
    <section
      id="amenities"
      className="py-16 border-y border-white/5"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Section label ── */}
        <p className="text-center text-white/30 text-xs tracking-[0.3em] font-bold mb-8">
          INCLUDED WITH EVERY STAY
        </p>

        {/* ── Amenities grid ── */}

        <div ref={ref} className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {AMENITIES.map((amenity, i) => (
            <div
              key={amenity.label}
              className="flex flex-col items-center gap-2 group cursor-default"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${i * 0.07}s`,
              }}
            >
              {/* Icon scales up on hover */}
              <span className="text-2xl transition-transform duration-300 group-hover:scale-125">
                {amenity.icon}
              </span>
              <span className="text-white/40 text-xs text-center group-hover:text-white/70 transition-colors duration-300">
                {amenity.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
