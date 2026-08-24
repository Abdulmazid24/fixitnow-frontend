export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  serviceCount: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: string;
  technicianName: string;
  technicianId: string;
  location: string;
  imageUrl: string;
}

export interface TechnicianItem {
  id: string;
  userId: string;
  name: string;
  location: string;
  hourlyRate: number;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  skills: string[];
  bio: string;
  isAvailable: boolean;
  avatarUrl?: string;
}

export const FEATURED_CATEGORIES: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Electrical Services",
    description: "Wiring, circuit repairs, lighting installation, and breaker panel upgrades.",
    iconName: "Zap",
    serviceCount: 42,
  },
  {
    id: "cat-2",
    name: "Plumbing & Piping",
    description: "Leak fixes, pipe replacements, drain unblocking, and water heater service.",
    iconName: "Droplet",
    serviceCount: 38,
  },
  {
    id: "cat-3",
    name: "AC & Appliances",
    description: "Air conditioner servicing, refrigerator repair, washer & oven maintenance.",
    iconName: "Wind",
    serviceCount: 29,
  },
  {
    id: "cat-4",
    name: "Carpentry & Furniture",
    description: "Custom shelving, door repairs, furniture assembly, and wooden fixture work.",
    iconName: "Hammer",
    serviceCount: 25,
  },
  {
    id: "cat-5",
    name: "Home Painting",
    description: "Interior and exterior wall painting, waterproof coating, and touch-ups.",
    iconName: "Paintbrush",
    serviceCount: 19,
  },
];

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: "srv-101",
    title: "Complete Home Electrical Inspection & Repair",
    description: "Comprehensive diagnostics of short circuits, outlet replacements, and safety testing.",
    price: 65,
    rating: 4.9,
    reviewCount: 128,
    category: "Electrical Services",
    technicianName: "Alex Rivera",
    technicianId: "tech-1",
    location: "New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "srv-102",
    title: "Emergency Pipe Leak Repair & Unclogging",
    description: "Fast response pipe sealing, high-pressure line unclogging, and drain restoration.",
    price: 80,
    rating: 4.8,
    reviewCount: 94,
    category: "Plumbing & Piping",
    technicianName: "David Miller",
    technicianId: "tech-2",
    location: "Brooklyn, NY",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "srv-103",
    title: "Split AC Servicing & Gas Refill",
    description: "Deep filter cleaning, coil washing, refrigerant gas check, and cooling optimization.",
    price: 75,
    rating: 4.9,
    reviewCount: 156,
    category: "AC & Appliances",
    technicianName: "Michael Chen",
    technicianId: "tech-3",
    location: "Queens, NY",
    imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "srv-104",
    title: "Custom Furniture Assembly & Wooden Fixtures",
    description: "Professional assembly of cabinets, bed frames, tables, and wall-mounted shelving.",
    price: 55,
    rating: 4.7,
    reviewCount: 82,
    category: "Carpentry & Furniture",
    technicianName: "Robert Taylor",
    technicianId: "tech-4",
    location: "Manhattan, NY",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
  },
];

export const MOCK_TECHNICIANS: TechnicianItem[] = [
  {
    id: "tech-1",
    userId: "usr-tech-1",
    name: "Alex Rivera",
    location: "New York, NY",
    hourlyRate: 50,
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 128,
    skills: ["Master Electrician", "Circuit Diagnostics", "Smart Lighting", "Generator Setup"],
    bio: "Certified master electrician with over 8 years of residential and commercial troubleshooting experience. Dedicated to safety and prompt service.",
    isAvailable: true,
  },
  {
    id: "tech-2",
    userId: "usr-tech-2",
    name: "David Miller",
    location: "Brooklyn, NY",
    hourlyRate: 60,
    experienceYears: 10,
    rating: 4.8,
    reviewCount: 94,
    skills: ["Plumbing Specialist", "Pipe Leak Repair", "Sewer Line Flushing", "Water Heater Installation"],
    bio: "Experienced plumber specializing in emergency leak repair, bathroom upgrades, and water filtration systems.",
    isAvailable: true,
  },
  {
    id: "tech-3",
    userId: "usr-tech-3",
    name: "Michael Chen",
    location: "Queens, NY",
    hourlyRate: 55,
    experienceYears: 6,
    rating: 4.9,
    reviewCount: 156,
    skills: ["HVAC Technician", "AC Gas Refill", "Refrigerator Maintenance", "Washing Machine Repair"],
    bio: "HVAC certified expert specializing in split air conditioners, central heating, and major kitchen appliance diagnostics.",
    isAvailable: true,
  },
  {
    id: "tech-4",
    userId: "usr-tech-4",
    name: "Robert Taylor",
    location: "Manhattan, NY",
    hourlyRate: 45,
    experienceYears: 7,
    rating: 4.7,
    reviewCount: 82,
    skills: ["Custom Carpentry", "Door Fitting", "IKEA Furniture Assembly", "Wooden Deck Repair"],
    bio: "Precision carpenter focused on clean finish, wall mounting, cabinet repair, and custom wooden installations.",
    isAvailable: false,
  },
];
