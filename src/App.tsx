import { useState } from "react";
import type { Room } from "./types";
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

document.title = "Bold Place Hotel | Luxury Urban Accommodation";

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleBook = (room: Room) => {
    setSelectedRoom(room);
    setTimeout(() => {
      document.getElementById("booking")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
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
