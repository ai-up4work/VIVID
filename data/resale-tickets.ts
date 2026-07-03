// data/resale-tickets.ts

export interface ResaleTicket {
  id: string;
  operator: string;
  operatorInitials: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  seats: string;
  busType: string;
  originalPrice: number;
  listedPrice: number;
  sellerHandle: string;
  tag?: 'Save' | 'Featured' | 'Limited';
  featured?: boolean;
}

export const FLEET_PARTNERS = [
  { id: 'nl', name: 'National Lanka' },
  { id: 'slb', name: 'SLTB' },
  { id: 'ntc', name: 'NTC' },
  { id: 'cht', name: 'Ceylon Holidays Travels' },
  { id: 'exp', name: 'Expo Lanka' },
];

// Generate a unique resale reference number
export function genResaleRef(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RS-${result}`;
}

export function findResaleTicket(id: string): ResaleTicket | undefined {
  return RESALE_TICKETS.find((t) => t.id === id);
}

// Demo data — these tickets come from real bookings that were resold
export const RESALE_TICKETS: ResaleTicket[] = [
  {
    id: 't1',
    operator: 'National Lanka',
    operatorInitials: 'NL',
    from: 'Colombo',
    to: 'Galle',
    date: '2026-07-15',
    departureTime: '08:30',
    arrivalTime: '12:45',
    seats: 'A12',
    busType: 'Luxury AC',
    originalPrice: 850.00,
    listedPrice: 650.00,
    sellerHandle: '@amith201',
    tag: 'Save',
    featured: false,
  },
  {
    id: 't2',
    operator: 'SLTB',
    operatorInitials: 'SL',
    from: 'Kandy',
    to: 'Nuwara Eliya',
    date: '2026-07-16',
    departureTime: '07:15',
    arrivalTime: '10:30',
    seats: 'B04',
    busType: 'Standard AC',
    originalPrice: 420.00,
    listedPrice: 350.00,
    sellerHandle: '@nuwanthika',
    tag: 'Save',
    featured: false,
  },
  {
    id: 't3',
    operator: 'NTC',
    operatorInitials: 'NT',
    from: 'Colombo',
    to: 'Jaffna',
    date: '2026-07-18',
    departureTime: '21:00',
    arrivalTime: '06:15',
    seats: 'C07',
    busType: 'Luxury Sleeper',
    originalPrice: 2200.00,
    listedPrice: 1800.00,
    sellerHandle: '@praba87',
    tag: 'Limited',
    featured: false,
  },
  {
    id: 't4',
    operator: 'Ceylon Holidays Travels',
    operatorInitials: 'CH',
    from: 'Colombo',
    to: 'Trincomalee',
    date: '2026-07-19',
    departureTime: '06:00',
    arrivalTime: '11:30',
    seats: 'A03',
    busType: 'Luxury AC',
    originalPrice: 1200.00,
    listedPrice: 950.00,
    sellerHandle: '@dilshanm',
    tag: 'Featured',
    featured: true,
  },
  {
    id: 't5',
    operator: 'Expo Lanka',
    operatorInitials: 'EL',
    from: 'Negombo',
    to: 'Bentota',
    date: '2026-07-20',
    departureTime: '09:45',
    arrivalTime: '12:00',
    seats: 'B11',
    busType: 'Standard AC',
    originalPrice: 550.00,
    listedPrice: 450.00,
    sellerHandle: '@shehanl',
    tag: 'Save',
    featured: false,
  },
  {
    id: 't6',
    operator: 'National Lanka',
    operatorInitials: 'NL',
    from: 'Colombo',
    to: 'Anuradhapura',
    date: '2026-07-21',
    departureTime: '14:00',
    arrivalTime: '18:30',
    seats: 'C02',
    busType: 'Luxury AC',
    originalPrice: 900.00,
    listedPrice: 720.00,
    sellerHandle: '@chathurika',
    tag: 'Save',
    featured: false,
  },
  {
    id: 't7',
    operator: 'SLTB',
    operatorInitials: 'SL',
    from: 'Kandy',
    to: 'Colombo',
    date: '2026-07-22',
    departureTime: '16:30',
    arrivalTime: '20:15',
    seats: 'A09',
    busType: 'Standard AC',
    originalPrice: 380.00,
    listedPrice: 300.00,
    sellerHandle: '@ruwani',
    tag: 'Limited',
    featured: false,
  },
  {
    id: 't8',
    operator: 'NTC',
    operatorInitials: 'NT',
    from: 'Galle',
    to: 'Colombo',
    date: '2026-07-23',
    departureTime: '18:00',
    arrivalTime: '21:45',
    seats: 'B15',
    busType: 'Luxury AC',
    originalPrice: 850.00,
    listedPrice: 680.00,
    sellerHandle: '@isuranga',
    tag: 'Save',
    featured: false,
  },
];