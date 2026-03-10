import { useInView } from "../hooks";
import { useTheme } from "../context";
import { themes } from "../styles/theme";
import { AMENITIES } from "../data/amenities";

export default function Amenities() {
  const [ref, inView] = useInView();
  const { theme } = useTheme();
  const t = themes[theme];

  return (
    <section
      id="amenities"
      className="py-16 transition-colors duration-500"
      style={{
        backgroundColor: t.sectionBg,
        borderTop: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <p
          className="text-center text-xs tracking-[0.3em] font-bold mb-8 transition-colors duration-500"
          style={{ color: t.textMuted }}
        >
          INCLUDED WITH EVERY STAY
        </p>
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
              <span className="text-2xl transition-transform duration-300 group-hover:scale-125">
                {amenity.icon}
              </span>
              <span
                className="text-xs text-center transition-colors duration-200"
                style={{ color: t.textMuted }}
              >
                {amenity.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
