import { useInView } from "../hooks";

export default function Footer() {
  const [ref, inView] = useInView();

  const quickLinks = ["Rooms", "Amenities", "Location", "Booking"];

  const contactDetails = [
    { icon: "📧", value: "hello@lumiereguest.com" },
    { icon: "📞", value: "+234 801 234 5678" },
    { icon: "🕐", value: "Check-in from 2:00 PM" },
    { icon: "🕐", value: "Check-out by 11:00 AM" },
  ];

  const socials = [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Twitter", href: "#" },
  ];

  return (
    <footer
      id="contact"
      className="border-t border-white/5"
      style={{ backgroundColor: "#080808" }}
    >
      {/* ── Main footer content ── */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          {/* ── Brand column ── */}
          <div className="md:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                }}
              >
                <span className="text-black font-black">LG</span>
              </div>
              <div>
                <span className="text-white font-black text-xl tracking-tight">
                  LUMIÈRE
                </span>
                <span className="text-white/40 text-xs block -mt-1 tracking-[0.15em]">
                  GUEST HOUSE
                </span>
              </div>
            </div>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Where every detail is curated for the discerning urban traveler.
              Luxury redefined in the heart of the city.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="px-4 py-1.5 rounded-full border border-white/10 text-white/40 text-xs hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick links column ── */}
          <div>
            <p className="text-white/30 text-xs tracking-widest font-bold mb-4 uppercase">
              Quick Links
            </p>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-white/50 hover:text-white text-sm py-1 transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* ── Contact column ── */}
          <div>
            <p className="text-white/30 text-xs tracking-widest font-bold mb-4 uppercase">
              Contact
            </p>
            <div className="space-y-3">
              {contactDetails.map((item) => (
                <p
                  key={item.value}
                  className="text-white/50 text-sm flex gap-2"
                >
                  <span>{item.icon}</span>
                  <span>{item.value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            opacity: inView ? 1 : 0,
            transition: "all 0.7s ease 0.3s",
          }}
        >
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Lumière Guest House. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
