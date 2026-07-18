export type UserRole = 'owner' | 'employee' | 'vendor' | 'customer' | 'driver';

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: 'Luxury' | 'Sedan' | 'SUV' | 'Sports' | 'Electric';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  seats: number;
  transmission: 'Automatic' | 'Manual';
  pricePerDay: number;
  image: string;
  rating: number;
  available: boolean;
  specs: string[];
}

export interface Booking {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Active' | 'Completed' | 'Cancelled';
  invoiceStatus: 'Unpaid' | 'Paid';
  driverName?: string;
  driverPhone?: string;
  paymentMethod: string;
}

export interface VendorVehicle {
  id: string;
  name: string;
  brand: string;
  plateNumber: string;
  status: 'Approved' | 'Pending Approval' | 'Suspended';
  earnings: number;
  bookingsCount: number;
  pricePerDay: number;
}

export interface DriverTrip {
  id: string;
  customerName: string;
  customerPhone: string;
  carName: string;
  plateNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  startDate: string;
  endDate: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}
