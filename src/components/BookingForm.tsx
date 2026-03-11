import { useState } from "react";
import { ROOMS } from "../data/rooms";
import { useTheme } from "../context";
import { themes } from "../styles/theme";
import type { BookingForm as BookingFormType, Room } from "../types";

interface Props {
  selectedRoom: Room | null;
  onClear: () => void;
}

export default function BookingForm({ selectedRoom, onClear }: Props) {
  const { theme } = useTheme();
  const t = themes[theme];

  const [form, setForm] = useState<BookingFormType>({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    guests: "1",
    room: selectedRoom?.name ?? "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<BookingFormType>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof BookingFormType]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<BookingFormType> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.checkin) newErrors.checkin = "Check-in date is required";
    if (!form.checkout) newErrors.checkout = "Check-out date is required";
    if (!form.room) newErrors.room = "Please select a room";

    if (form.checkin && form.checkout && form.checkout <= form.checkin) {
      newErrors.checkout = "Check-out must be after check-in";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const message = encodeURIComponent(
      `*New Booking Request — Lumière Guest House*\n\n` +
        `👤 *Name:* ${form.name}\n` +
        `📧 *Email:* ${form.email}\n` +
        `📱 *Phone:* ${form.phone}\n` +
        `🛏️ *Room:* ${form.room}\n` +
        `📅 *Check-in:* ${form.checkin}\n` +
        `📅 *Check-out:* ${form.checkout}\n` +
        `👥 *Guests:* ${form.guests}\n` +
        `💬 *Message:* ${form.message || "None"}`,
    );

    // 🎓 Replace with companies real WhatsApp number

    window.open(`https://wa.me/234*****?text=${message}`, "_blank");
    setSubmitted(true);
  };

  // ── Shared styles ──
  const inputStyle = {
    backgroundColor: t.inputBg,
    borderColor: t.inputBorder,
    color: t.textPrimary,
  };

  const labelStyle = { color: t.textMuted };

  const inputClass =
    "w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-200";

  const labelClass = "block text-xs font-bold tracking-widest mb-2 uppercase";

  // ── Success screen ──
  if (submitted) {
    return (
      <div
        className="text-center py-20 border rounded-3xl transition-colors duration-500"
        style={{
          backgroundColor: t.goldSubtle,
          borderColor: t.goldBorder,
        }}
      >
        <div className="text-6xl mb-4">✅</div>
        <h3
          className="font-black text-2xl mb-2 transition-colors duration-500"
          style={{ color: t.textPrimary }}
        >
          Request Sent!
        </h3>
        <p
          className="max-w-sm mx-auto transition-colors duration-500"
          style={{ color: t.textSecondary }}
        >
          Check your WhatsApp — we've received your reservation request and will
          confirm within 2 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 px-6 py-2 rounded-full text-sm transition-all duration-200"
          style={{
            border: `1px solid ${t.borderMid}`,
            color: t.textSecondary,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = t.textPrimary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = t.textSecondary)}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl border overflow-hidden transition-colors duration-500"
      style={{
        background: `linear-gradient(135deg, ${t.goldSubtle}, ${t.cardBg})`,
        borderColor: t.borderMid,
        boxShadow:
          theme === "dark"
            ? "0 40px 80px rgba(0,0,0,0.5)"
            : "0 20px 60px rgba(0,0,0,0.08)",
      }}
    >
      <div className="p-8 md:p-10">
        {/* ── Selected room banner ── */}
        {selectedRoom && (
          <div
            className="flex items-center gap-3 mb-8 p-4 rounded-xl border transition-colors duration-500"
            style={{
              backgroundColor: t.goldSubtle,
              borderColor: t.goldBorder,
            }}
          >
            <span className="text-2xl">{selectedRoom.emoji}</span>
            <div>
              <p
                className="font-bold transition-colors duration-500"
                style={{ color: t.textPrimary }}
              >
                {selectedRoom.name}
              </p>
              <p className="text-sm" style={{ color: t.gold }}>
                ${selectedRoom.price}/night · {selectedRoom.size}
              </p>
            </div>
            <button
              onClick={onClear}
              className="ml-auto text-lg transition-colors duration-200"
              style={{ color: t.textMuted }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = t.textPrimary)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = t.textMuted)}
              aria-label="Clear selected room"
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Form fields ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className={labelClass} style={labelStyle}>
              Full Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={inputClass}
              style={{
                ...inputStyle,
                borderColor: errors.name ? "#ef4444" : t.inputBorder,
              }}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={labelClass} style={labelStyle}>
              Email *
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={inputClass}
              style={{
                ...inputStyle,
                borderColor: errors.email ? "#ef4444" : t.inputBorder,
              }}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass} style={labelStyle}>
              Phone / WhatsApp *
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+234 800 000 0000"
              className={inputClass}
              style={{
                ...inputStyle,
                borderColor: errors.phone ? "#ef4444" : t.inputBorder,
              }}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Room select */}
          <div>
            <label className={labelClass} style={labelStyle}>
              Room *
            </label>
            <select
              name="room"
              value={form.room}
              onChange={handleChange}
              className={inputClass}
              style={{
                ...inputStyle,
                borderColor: errors.room ? "#ef4444" : t.inputBorder,
              }}
            >
              <option
                value=""
                style={{ background: theme === "dark" ? "#111" : "#fff" }}
              >
                Select a room...
              </option>
              {ROOMS.map((r) => (
                <option
                  key={r.id}
                  value={r.name}
                  style={{ background: theme === "dark" ? "#111" : "#fff" }}
                >
                  {r.name} — ${r.price}/night
                </option>
              ))}
            </select>
            {errors.room && (
              <p className="text-red-400 text-xs mt-1">{errors.room}</p>
            )}
          </div>

          {/* Check-in */}
          <div>
            <label className={labelClass} style={labelStyle}>
              Check-in Date *
            </label>
            <input
              name="checkin"
              type="date"
              value={form.checkin}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className={inputClass}
              style={{
                ...inputStyle,
                borderColor: errors.checkin ? "#ef4444" : t.inputBorder,
              }}
            />
            {errors.checkin && (
              <p className="text-red-400 text-xs mt-1">{errors.checkin}</p>
            )}
          </div>

          {/* Check-out */}
          <div>
            <label className={labelClass} style={labelStyle}>
              Check-out Date *
            </label>
            <input
              name="checkout"
              type="date"
              value={form.checkout}
              onChange={handleChange}
              min={form.checkin || new Date().toISOString().split("T")[0]}
              className={inputClass}
              style={{
                ...inputStyle,
                borderColor: errors.checkout ? "#ef4444" : t.inputBorder,
              }}
            />
            {errors.checkout && (
              <p className="text-red-400 text-xs mt-1">{errors.checkout}</p>
            )}
          </div>

          {/* Guests */}
          <div>
            <label className={labelClass} style={labelStyle}>
              Number of Guests
            </label>
            <select
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className={inputClass}
              style={inputStyle}
            >
              {[1, 2, 3, 4].map((n) => (
                <option
                  key={n}
                  value={n}
                  style={{ background: theme === "dark" ? "#111" : "#fff" }}
                >
                  {n} guest{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Special requests */}
          <div>
            <label className={labelClass} style={labelStyle}>
              Special Requests
            </label>
            <input
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Early check-in, dietary needs..."
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        {/* ── Submit button ── */}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full py-4 rounded-xl font-black text-black text-base tracking-wide transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #C9A84C, #FFE08C)",
            boxShadow: `0 8px 32px ${t.goldGlow}`,
          }}
        >
          Send Reservation Request via WhatsApp →
        </button>

        <p
          className="text-center text-xs mt-4 transition-colors duration-500"
          style={{ color: t.textFaint }}
        >
          No payment required now. We'll confirm availability within 2 hours.
        </p>
      </div>
    </div>
  );
}
