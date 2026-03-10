import { useInView } from "../hooks";

export default function Location() {
  const [ref, inView] = useInView();

  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.039779524532!2d3.8435414000000003!3d7.349430000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398c1648d0b0d9%3A0x694b53a49cc7a7eb!2sBold%20Place%20Bar%20%26%20Lounge!5e0!3m2!1sen!2sng!4v1773147338524!5m2!1sen!2sng";

  const details = [
    {
      icon: "📍",
      label: "Address",
      value: "Alao Akala Expressway, Ibadan, Nigeria",
    },
    {
      icon: "🚇",
      label: "Nearest Transit",
      value: "Taskan Bus Stop, 5 min walk away",
    },
    {
      icon: "✈️",
      label: "From Airport",
      value: "30 min drive from Ibadan Airport (IBA)",
    },
    {
      icon: "📞",
      label: "Phone",
      value: "+234 *** *** ****",
    },
    {
      icon: "🕐",
      label: "Check-in / Check-out",
      value: "From 2:00 PM  ·  Until 11:00 AM",
    },
    {
      icon: "📧",
      label: "Email",
      value: "***@example.com",
    },
  ];

  return (
    <section
      id="location"
      className="py-24"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* ── Left: contact details ── */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="text-yellow-600/70 text-xs tracking-[0.3em] font-bold mb-3">
              FIND US
            </p>
            <h2 className="text-5xl font-black text-white mb-6 leading-tight">
              Right at the{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #FFE08C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Heart
              </span>
              <br />
              of the City
            </h2>
            <p className="text-white/50 leading-relaxed mb-10">
              We're located minutes from the city's best dining, business
              districts, and cultural landmarks. Your perfect urban base awaits.
            </p>

            {/* Contact detail rows */}
            <div className="space-y-5">
              {details.map((item, i) => (
                <div
                  key={item.label}
                  className="flex gap-4 items-start"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-20px)",
                    transition: `all 0.6s ease ${0.2 + i * 0.08}s`,
                  }}
                >
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-white/30 text-xs tracking-widest font-bold uppercase">
                      {item.label}
                    </p>
                    <p className="text-white/80 text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direction CTA */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full border border-white/10 text-white/60 text-sm font-medium hover:text-white hover:border-white/30 transition-all duration-300"
            >
              <span>Get Directions</span>
              <span>→</span>
            </a>
          </div>

          {/* ── Right: map embed ── */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div
              className="rounded-2xl overflow-hidden border border-white/10"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
            >
              <iframe
                title="Lumière Guest House Location"
                src={mapSrc}
                width="100%"
                height="420"
                style={{
                  border: 0,
                  filter: "invert(90%) hue-rotate(180deg) saturate(0.8)",
                  display: "block",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Small note under map */}
            <p className="text-white/20 text-xs text-center mt-3">
              📍 Alao Akala Expressway, Ibadan, Nigeria
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
