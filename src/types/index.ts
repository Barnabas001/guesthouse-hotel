export interface Room {
  id: string;
  name: string;
  category: string;
  price: number;
  size: string;
  guests: number;
  bed: string;
  description: string;
  features: string[];
  gradient: string;
  accent: string;
  emoji: string;
}

export interface Amenity {
  icon: string;
  label: string;
}

export interface BookingForm {
  name: string;
  email: string;
  phone: string;
  checkin: string;
  checkout: string;
  guests: string;
  room: string;
  message: string;
}
