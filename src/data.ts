import { Car, Booking, VendorVehicle, DriverTrip } from './types';

export const INITIAL_CARS: Car[] = [
  {
    id: 'car-1',
    name: 'Model S Plaid',
    brand: 'Tesla',
    category: 'Electric',
    fuelType: 'Electric',
    seats: 5,
    transmission: 'Automatic',
    pricePerDay: 12500,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    available: true,
    specs: ['Autopilot', 'Dual Motor AWD', '0-60 mph in 1.99s', '396 mi Range']
  },
  {
    id: 'car-2',
    name: '911 Carrera',
    brand: 'Porsche',
    category: 'Sports',
    fuelType: 'Petrol',
    seats: 4,
    transmission: 'Automatic',
    pricePerDay: 18000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    available: true,
    specs: ['Twin-Turbo Flat-6', 'PDK Transmission', 'Chrono Package', 'Sport Exhaust']
  },
  {
    id: 'car-3',
    name: 'Range Rover Sport',
    brand: 'Land Rover',
    category: 'SUV',
    fuelType: 'Diesel',
    seats: 7,
    transmission: 'Automatic',
    pricePerDay: 14500,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    available: true,
    specs: ['All-Wheel Drive', 'Panoramic Sunroof', 'Meridian Sound System', 'Air Suspension']
  },
  {
    id: 'car-4',
    name: 'A6 Limousine',
    brand: 'Audi',
    category: 'Sedan',
    fuelType: 'Hybrid',
    seats: 5,
    transmission: 'Automatic',
    pricePerDay: 7900,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    available: true,
    specs: ['Virtual Cockpit', 'Leather Seats', 'Matrix LED Headlights', 'Mild Hybrid']
  },
  {
    id: 'car-5',
    name: 'C-Class AMG Line',
    brand: 'Mercedes-Benz',
    category: 'Luxury',
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'Automatic',
    pricePerDay: 9500,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    available: false,
    specs: ['AMG Bodystyling', 'Ambient Lighting', 'MBUX Navigation', 'Heated Seats']
  },
  {
    id: 'car-6',
    name: 'Land Cruiser Prado',
    brand: 'Toyota',
    category: 'SUV',
    fuelType: 'Diesel',
    seats: 7,
    transmission: 'Automatic',
    pricePerDay: 10800,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    available: true,
    specs: ['Multi-Terrain Select', '4WD Active Traction Control', 'Cooler Box', 'Roof Rails']
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BKG-4829',
    carId: 'car-1',
    carName: 'Tesla Model S Plaid',
    carImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
    customerName: 'C.Mukherjee',
    customerEmail: 'c.mukherjee@example.com',
    customerPhone: '+1 (555) 019-2834',
    startDate: '2026-07-15',
    endDate: '2026-07-18',
    totalDays: 3,
    totalAmount: 37500,
    status: 'Confirmed',
    invoiceStatus: 'Paid',
    driverName: 'Robert Vance',
    driverPhone: '+1 (555) 432-8765',
    paymentMethod: 'Credit Card (Visa)'
  },
  {
    id: 'BKG-9210',
    carId: 'car-3',
    carName: 'Range Rover Sport',
    carImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 (555) 048-1122',
    startDate: '2026-07-20',
    endDate: '2026-07-25',
    totalDays: 5,
    totalAmount: 72500,
    status: 'Pending',
    invoiceStatus: 'Unpaid',
    paymentMethod: 'PayPal'
  },
  {
    id: 'BKG-1124',
    carId: 'car-4',
    carName: 'Audi A6 Limousine',
    carImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800',
    customerName: 'Michael Chang',
    customerEmail: 'm.chang@example.com',
    customerPhone: '+1 (555) 777-8899',
    startDate: '2026-07-12',
    endDate: '2026-07-14',
    totalDays: 2,
    totalAmount: 15800,
    status: 'Active',
    invoiceStatus: 'Paid',
    driverName: 'Marcus Miller',
    driverPhone: '+1 (555) 998-1234',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'BKG-5582',
    carId: 'car-5',
    carName: 'Mercedes-Benz C-Class',
    carImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
    customerName: 'Emily Peterson',
    customerEmail: 'emily.peterson@example.com',
    customerPhone: '+1 (555) 123-4567',
    startDate: '2026-07-01',
    endDate: '2026-07-05',
    totalDays: 4,
    totalAmount: 38000,
    status: 'Completed',
    invoiceStatus: 'Paid',
    paymentMethod: 'Credit Card (Mastercard)'
  }
];

export const INITIAL_VENDOR_VEHICLES: VendorVehicle[] = [
  {
    id: 'vv-1',
    name: 'Mustang GT',
    brand: 'Ford',
    plateNumber: 'VND-889-TX',
    status: 'Approved',
    earnings: 203350,
    bookingsCount: 12,
    pricePerDay: 12500
  },
  {
    id: 'vv-2',
    name: 'XC90 Excellence',
    brand: 'Volvo',
    plateNumber: 'VND-312-WA',
    status: 'Approved',
    earnings: 265600,
    bookingsCount: 8,
    pricePerDay: 15000
  },
  {
    id: 'vv-3',
    name: 'Civic Type R',
    brand: 'Honda',
    plateNumber: 'VND-777-FL',
    status: 'Pending Approval',
    earnings: 0,
    bookingsCount: 0,
    pricePerDay: 7500
  }
];

export const INITIAL_DRIVER_TRIPS: DriverTrip[] = [
  {
    id: 'TRP-101',
    customerName: 'C.Mukherjee',
    customerPhone: '+1 (555) 019-2834',
    carName: 'Tesla Model S Plaid',
    plateNumber: 'TX-ELECT-01',
    pickupLocation: 'Downtown Hyatt Regency, Lobby',
    dropoffLocation: 'DFW International Airport Terminal D',
    startDate: '2026-07-15 09:00',
    endDate: '2026-07-18 18:00',
    status: 'Upcoming'
  },
  {
    id: 'TRP-102',
    customerName: 'Michael Chang',
    customerPhone: '+1 (555) 777-8899',
    carName: 'Audi A6 Limousine',
    plateNumber: 'TX-AUDI-66',
    pickupLocation: 'Saddlebrook Luxury Apartments, Building C',
    dropoffLocation: 'Dallas Love Field Airport Lounge',
    startDate: '2026-07-12 10:30',
    endDate: '2026-07-14 10:30',
    status: 'Ongoing'
  },
  {
    id: 'TRP-103',
    customerName: 'David Miller',
    customerPhone: '+1 (555) 234-9900',
    carName: 'Toyota Land Cruiser',
    plateNumber: 'TX-PRADO-44',
    pickupLocation: 'The Ritz-Carlton Residences',
    dropoffLocation: 'The Ritz-Carlton Residences',
    startDate: '2026-07-08 08:00',
    endDate: '2026-07-10 20:00',
    status: 'Completed'
  }
];

export const EMPLOYEE_HIGHLIGHTS = [
  {
    title: 'Verified Drivers',
    desc: 'Every driver undergoes strict background verification, professional transit training, and periodic skill certification.',
    iconName: 'UserCheck'
  },
  {
    title: 'Premium Fleet',
    desc: 'From custom electric models to elite sports cars, our vehicles are strictly inspected, fully detailed, and guaranteed pristine.',
    iconName: 'ShieldAlert'
  },
  {
    title: '24/7 Concierge Support',
    desc: 'Speak directly with our helpful live staff at any hour. No robotic voice menus, just direct professional support.',
    iconName: 'PhoneCall'
  },
  {
    title: '中央 Operations (Professional)',
    desc: 'Unified software connects drivers, vendors, and clients dynamically to guarantee punctuality and eliminate booking overlaps.',
    iconName: 'Sparkles'
  }
];
