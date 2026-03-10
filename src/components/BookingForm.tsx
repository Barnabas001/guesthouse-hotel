import { useState } from "react";
import { ROOMS } from "../data/rooms";
import type { BookingForm as BookingFormType, Room } from "../types";

interface Props {
  selectedRoom: Room | null;
  onClear: () => void;
}

export default function BookingForm({ selectedRoom, onClear }: Props) {
  // 🎓 One useState holds ALL form fields as a single object.
  // This is cleaner than having a separate useState for each field.
  // We use the BookingForm type we defined in types/index.ts
  // so TypeScript knows exactly what shape this object must be.
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

  // 🎓 One handler for ALL inputs — we use the input's `name`
  // attribute to know which field to update. This way we don't
  // need a separate onChange for every single input.
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as soon as the user starts typing
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

    // Check checkout is after checkin
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
    window.open(`https://wa.me/234801***?text=${message}`, "_blank");
    setSubmitted(true);
  };

  // ── Reusable style strings ──
  const inputClass = `
    w-full bg-white/5 border rounded-xl px-4 py-3 text-white
    placeholder-white/30 text-sm focus:outline-none
    focus:bg-white/8 transition-all duration-200
  `;
  const labelClass =
    "block text-white/50 text-xs font-bold tracking-widest mb-2 uppercase";

  // ── Success screen ──
  if (submitted) {
    return (
      <div
        className="text-center py-20 border border-white/10 rounded-3xl"
        style={{ background: "rgba(201,168,76,0.05)" }}
      >
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-white font-black text-2xl mb-2">Request Sent!</h3>
        <p className="text-white/50 max-w-sm mx-auto">
          Check your WhatsApp — we've received your reservation request and will
          confirm within 2 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 px-6 py-2 rounded-full border border-white/20 text-white/60 text-sm hover:text-white transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl border border-white/10 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(201,168,76,0.05), rgba(255,255,255,0.02))",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
      }}
    >
      <div className="p-8 md:p-10">
        {/* ── Selected room banner ── */}

        {selectedRoom && (
          <div
            className="flex items-center gap-3 mb-8 p-4 rounded-xl border border-yellow-600/20"
            style={{ backgroundColor: "rgba(201,168,76,0.08)" }}
          >
            <span className="text-2xl">{selectedRoom.emoji}</span>
            <div>
              <p className="text-white font-bold">{selectedRoom.name}</p>
              <p className="text-yellow-600/70 text-sm">
                ${selectedRoom.price}/night · {selectedRoom.size}
              </p>
            </div>
            {/* Clear the selected room */}
            <button
              onClick={onClear}
              className="ml-auto text-white/30 hover:text-white text-lg transition-colors"
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
            <label className={labelClass}>Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`${inputClass} ${
                errors.name ? "border-red-500/60" : "border-white/10"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`${inputClass} ${
                errors.email ? "border-red-500/60" : "border-white/10"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>Phone / WhatsApp *</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+234 800 000 0000"
              className={`${inputClass} ${
                errors.phone ? "border-red-500/60" : "border-white/10"
              }`}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Room select */}
          <div>
            <label className={labelClass}>Room *</label>
            <select
              name="room"
              value={form.room}
              onChange={handleChange}
              className={`${inputClass} ${
                errors.room ? "border-red-500/60" : "border-white/10"
              }`}
            >
              <option value="" style={{ background: "#111" }}>
                Select a room...
              </option>
              {ROOMS.map((r) => (
                <option
                  key={r.id}
                  value={r.name}
                  style={{ background: "#111" }}
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
            <label className={labelClass}>Check-in Date *</label>
            <input
              name="checkin"
              type="date"
              value={form.checkin}
              onChange={handleChange}
              // 🎓 min prevents selecting dates in the past
              min={new Date().toISOString().split("T")[0]}
              className={`${inputClass} ${
                errors.checkin ? "border-red-500/60" : "border-white/10"
              }`}
            />
            {errors.checkin && (
              <p className="text-red-400 text-xs mt-1">{errors.checkin}</p>
            )}
          </div>

          {/* Check-out */}
          <div>
            <label className={labelClass}>Check-out Date *</label>
            <input
              name="checkout"
              type="date"
              value={form.checkout}
              onChange={handleChange}
              min={form.checkin || new Date().toISOString().split("T")[0]}
              className={`${inputClass} ${
                errors.checkout ? "border-red-500/60" : "border-white/10"
              }`}
            />
            {errors.checkout && (
              <p className="text-red-400 text-xs mt-1">{errors.checkout}</p>
            )}
          </div>

          {/* Guests */}
          <div>
            <label className={labelClass}>Number of Guests</label>
            <select
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className={`${inputClass} border-white/10`}
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} style={{ background: "#111" }}>
                  {n} guest{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Special requests */}
          <div>
            <label className={labelClass}>Special Requests</label>
            <input
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Early check-in, dietary needs..."
              className={`${inputClass} border-white/10`}
            />
          </div>
        </div>

        {/* ── Submit button ── */}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full py-4 rounded-xl font-black text-black text-base tracking-wide transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #C9A84C, #FFE08C)",
            boxShadow: "0 8px 32px rgba(201,168,76,0.3)",
          }}
        >
          Send Reservation Request via WhatsApp →
        </button>

        <p className="text-center text-white/20 text-xs mt-4">
          No payment required now. We'll confirm availability within 2 hours.
        </p>
      </div>
    </div>
  );
}
