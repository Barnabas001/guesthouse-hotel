# 🏨 Hotel / Guest House — Website

A modern, fully responsive luxury hotel /guest house website built with **React**, **TypeScript**, and **Tailwind CSS**. Features a room showcase, direct WhatsApp booking system, Google Maps integration, scroll animations, and a clean dark luxury aesthetic — all with zero UI libraries.

---

## ✨ Features

- **Room Showcase** — 6 room types with pricing, features, size, and unique accent colors
- **Booking System** — Validated reservation form that submits directly to WhatsApp
- **WhatsApp Integration** — Floating chat button + pre-filled booking messages
- **Google Maps** — Dark-themed embedded map with contact details
- **Scroll Animations** — Smooth fade/slide-in effects powered by IntersectionObserver
- **Glassmorphism Navbar** — Transparent on load, frosted glass on scroll
- **Animated Stats** — Number counters that trigger when scrolled into view
- **Fully Responsive** — Mobile-first layout with hamburger menu
- **SEO Ready** — Page title set, structured for meta tag expansion
- **Zero Animation Libraries** — All motion built with CSS transitions + custom hooks

---

## 🛠️ Tech Stack

| Tool         | Purpose                 |
| ------------ | ----------------------- |
| React 18     | UI framework            |
| TypeScript   | Type safety             |
| Tailwind CSS | Utility-first styling   |
| Vite         | Dev server & build tool |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js 18+** installed. Check with:

```bash
node --version
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Barnabas001/guesthouse-hotel

# 2. Move into the project folder
cd guesthouse-hotel

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output goes into the `dist/` folder, ready for deployment.

---

## 📁 Project Structure

```
lumiere-guest-house/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/             # Small reusable UI pieces
│   │   ├── AnimatedNumber.tsx  # Counting animation on scroll
│   │   ├── BookingForm.tsx     # Reservation form with validation
│   │   ├── RoomCard.tsx        # Individual room display card
│   │   ├── WhatsAppButton.tsx  # Fixed floating WhatsApp CTA
│   │   └── index.ts            # Barrel export
│   │
│   ├── sections/               # Full-width page sections
│   │   ├── Navbar.tsx          # Fixed glassmorphism navigation
│   │   ├── Hero.tsx            # Landing hero with animated headline
│   │   ├── Amenities.tsx       # Amenities icon strip
│   │   ├── Rooms.tsx           # Room cards grid
│   │   ├── Booking.tsx         # Reservation section
│   │   ├── Location.tsx        # Google Maps + contact info
│   │   ├── Footer.tsx          # Site footer with links
│   │   └── index.ts            # Barrel export
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useInView.ts        # IntersectionObserver scroll detection
│   │   ├── useScrolled.ts      # Page scroll position detection
│   │   └── index.ts            # Barrel export
│   │
│   ├── data/                   # Static content & data
│   │   ├── rooms.ts            # Room definitions with pricing
│   │   ├── amenities.ts        # Amenity list
│   │   └── index.ts            # Barrel export
│   │
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces (Room, Amenity, BookingForm)
│   │
│   ├── App.tsx                 # Root component — assembles all sections
│   ├── main.tsx                # React entry point
│   └── index.css               # Tailwind directives
│
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## ⚙️ Configuration

### 1. WhatsApp Number

Find every instance of `234***` and replace with your number (include country code, no `+` sign):

```
src/components/WhatsAppButton.tsx  → line 7
src/components/BookingForm.tsx     → line 67
```

### 2. Google Maps Embed

To use your real address:

1. Go to [google.com/maps](https://maps.google.com)
2. Search your address
3. Click **Share** → **Embed a map**
4. Copy the `src` value from the iframe snippet
5. Paste it into `src/sections/Location.tsx` → `mapSrc` variable

### 3. Room Data

All room information lives in `src/data/rooms.ts`. Each room follows this shape:

```ts
{
  id: 'unique-id',
  name: 'Room Name',
  category: 'SUITE',        // displayed as badge
  price: 450,               // per night in USD
  size: '120 m²',
  guests: 4,
  bed: '2 King Beds',
  description: 'Short description...',
  features: ['Feature 1', 'Feature 2'],
  gradient: 'from-slate-900 via-zinc-800 to-stone-900',  // Tailwind gradient
  accent: '#C9A84C',        // hex color for card accents
  emoji: '🏙️',
}
```

### 4. Contact Details

Update the address, phone, email, and transit info in `src/sections/Location.tsx` and `src/sections/Footer.tsx`.

### 5. Branding

Replace `LUMIÈRE` and `LG` (the logo initials) by searching across all files in `src/sections/`.

---

## 🧠 Key Concepts Used

### Lifting State Up

`selectedRoom` state lives in `App.tsx` because both `Rooms` (sets it) and `Booking` (reads it) need access to it. When two sibling components share state, move it to their closest common parent.

### Barrel Exports

Each folder has an `index.ts` that re-exports everything inside it. This keeps imports clean:

### Custom Hooks

`useInView` uses the browser's native `IntersectionObserver` API to detect when elements enter the viewport — no animation library needed. `useScrolled` tracks scroll position for the navbar effect.

### Staggered Animations

Each `RoomCard` receives its `index` as a prop and uses it to calculate a CSS `transition-delay`. Card 0 animates immediately, card 1 waits 100ms, card 2 waits 200ms — creating a cascade effect with zero JavaScript animation logic.

### Single Form Handler

The booking form uses one `handleChange` function for all inputs using computed property names:

```ts
setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
```

---

## 📦 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start dev server at localhost:5173   |
| `npm run build`   | Build for production into `dist/`    |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint checks                    |

---

## 🌍 Deployment

This site builds to a static `dist/` folder and can be deployed anywhere:

### Vercel (Recommended — free tier)

### Vercel

```bash
npm install -g vercel
vercel
```

### Manual Upload

Run `npm run build`, then upload the contents of `dist/` to any static hosting provider.

---

## 🔮 Possible Next Steps

- [ ] Add `react-helmet-async` for full SEO meta tags (description, og:image, og:title)
- [ ] Connect a real backend (Supabase, Firebase) to store booking requests
- [ ] Add room image galleries with a lightbox
- [ ] Integrate a real payment system (Paystack, Stripe)
- [ ] Add a reviews/testimonials section
- [ ] Set up email notifications with EmailJS or Resend

---

## 📄 License

This project is for personal/commercial use. Feel free to adapt it for your own guest house or hospitality project.

---

> Built step by step — one file at a time. 🏗️
