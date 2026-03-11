import { useState } from "react";
import type { Room } from "./types";
import { useTheme } from "./context";
import { themes } from "./styles/theme";
import {
  Navbar,
  Home,
  Amenities,
  Rooms,
  Booking,
  Location,
  Footer,
} from "./sections";
import { WhatsAppButton } from "./components";

document.title = "Lumière Guest House | Luxury Urban Accommodation";

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { theme } = useTheme();
  const t = themes[theme];

  const handleBook = (room: Room) => {
    setSelectedRoom(room);
    setTimeout(() => {
      document
        .getElementById("booking")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div
      className="transition-colors duration-500"
      style={{ backgroundColor: t.pageBg, minHeight: "100vh" }}
    >
      <Navbar />
      <Home />
      <Amenities />
      <Rooms onBook={handleBook} />
      <Booking
        selectedRoom={selectedRoom}
        onClear={() => setSelectedRoom(null)}
      />
      <Location />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
