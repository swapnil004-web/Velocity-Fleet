import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AvailableCars from './components/AvailableCars';
import DashboardPreview from './components/DashboardPreview';
import RegistrationForm from './components/RegistrationForm';
import EmployeeHighlights from './components/EmployeeHighlights';
import Footer from './components/Footer';

// Modals
import BookingModal from './components/BookingModal';
import InvoiceModal from './components/InvoiceModal';
import LoginModal from './components/LoginModal';

// Static assets
import { 
  INITIAL_CARS, 
  INITIAL_BOOKINGS, 
  INITIAL_VENDOR_VEHICLES, 
  INITIAL_DRIVER_TRIPS 
} from './data';
import { UserRole, Car, Booking, VendorVehicle, DriverTrip } from './types';
import { Check } from 'lucide-react';
import { db } from './lib/firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function App() {
  // Roles & section navigation state
  const [currentRole, setRole] = useState<UserRole>('customer');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Shared application states (Simulates a server database in UI memory)
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [vendorVehicles, setVendorVehicles] = useState<VendorVehicle[]>(INITIAL_VENDOR_VEHICLES);
  const [driverTrips, setDriverTrips] = useState<DriverTrip[]>(INITIAL_DRIVER_TRIPS);

  // User state
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>({
    name: 'C.Mukherjee',
    email: 'c.mukherjee@example.com'
  });

  // Modal display states
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [selectedBookingForInvoice, setSelectedBookingForInvoice] = useState<Booking | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [actionNotice, setActionNotice] = useState<string>('');

  // Authentication callbacks
  const handleLoginSuccess = (userData: { name: string; email: string }, role: UserRole) => {
    setCurrentUser(userData);
    setRole(role);
    triggerNotice(`Logged in as ${userData.name} (${role.toUpperCase()})`);
    
    // Smooth scroll directly to the live portal section to see the user's view!
    setTimeout(() => {
      const element = document.getElementById('dashboard');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection('dashboard');
      }
    }, 500);
  };

  const handleRegisterSuccess = (userData: { name: string; email: string }) => {
    setCurrentUser(userData);
    setRole('customer'); // Default to customer on registration
    triggerNotice(`Account created successfully for ${userData.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setRole('customer');
    triggerNotice('Logged out of active sandbox session.');
  };

  // Helper to show transient notification banners in top bar
  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => {
      setActionNotice('');
    }, 4000);
  };

  // Booking handlers
  const handleOpenBooking = (car: Car) => {
    setSelectedCarForBooking(car);
  };

  const handleConfirmBooking = async (newBooking: Booking) => {
    // 1. Prepend booking to our virtual database
    setBookings((prev) => [newBooking, ...prev]);

    // 2. Add driver dispatch if they requested one
    if (newBooking.driverName) {
      const newTrip: DriverTrip = {
        id: `TRP-${Math.floor(100 + Math.random() * 900)}`,
        customerName: newBooking.customerName,
        customerPhone: newBooking.customerPhone,
        carName: newBooking.carName,
        plateNumber: 'TX-ELECT-01',
        pickupLocation: 'Downtown Hyatt Regency, Lobby',
        dropoffLocation: 'DFW International Airport Terminal D',
        startDate: newBooking.startDate + ' 09:00',
        endDate: newBooking.endDate + ' 18:00',
        status: 'Upcoming'
      };
      setDriverTrips((prev) => [newTrip, ...prev]);
    }

    // 3. Mark the specific car as rented in our virtual fleet
    setCars((prevCars) =>
      prevCars.map((c) => (c.id === newBooking.carId ? { ...c, available: false } : c))
    );

    // Close booking modal
    setSelectedCarForBooking(null);

    // Trigger success alert
    triggerNotice(`Booking ${newBooking.id} confirmed!`);

    // 4. Instantly open Invoice receipt for the client to preview
    setSelectedBookingForInvoice(newBooking);

    // BEGINNER EXPLANATION:
    // Whenever a customer books a vehicle (and gets an invoice generated),
    // we save/update two separate records inside our Firestore database:
    // 1. We create a brand new 'bookings' entry with all receipt specifics.
    // 2. We search and update the existing customer's account document in 'customers'
    //    with the new carModel, the car rent price (totalAmount), and the rental dates.
    try {
      // Data Store 1: Create a secure, permanent invoice log in the 'bookings' collection
      await addDoc(collection(db, 'bookings'), {
        bookingId: newBooking.id,                   // The custom booking/invoice identifier
        carId: newBooking.carId,                     // Associated vehicle ID
        carModel: newBooking.carName,                // Car Model (e.g. Tesla Model S Plaid)
        carImage: newBooking.carImage,               // Associated vehicle image URL
        customerName: newBooking.customerName,       // Customer's full name
        customerEmail: newBooking.customerEmail,     // Customer's email
        customerPhone: newBooking.customerPhone,     // Customer's phone number
        startDate: newBooking.startDate,             // Date when the car rental starts
        endDate: newBooking.endDate,                 // Date when the car rental ends
        totalDays: newBooking.totalDays,             // Number of rent days
        totalAmount: newBooking.totalAmount,         // Total rental price (amount due)
        status: newBooking.status,                   // Booking status (e.g. Confirmed)
        invoiceStatus: newBooking.invoiceStatus,     // Invoice payment status (e.g. Paid)
        paymentMethod: newBooking.paymentMethod,     // Chosen payment method
        driverName: newBooking.driverName || "",     // Assigned professional driver name if requested
        driverPhone: newBooking.driverPhone || "",   // Assigned driver phone number
        createdTimestamp: new Date().toISOString()   // Date of rental purchase
      });
      console.log(`Firestore Booking entry saved successfully for ID: ${newBooking.id}`);

      // Data Store 2: Find the matching Customer document and update their rented vehicle details
      const customersRef = collection(db, 'customers');
      
      // Try finding by Email first
      let customerQuery = query(customersRef, where('email', '==', newBooking.customerEmail));
      let querySnapshot = await getDocs(customerQuery);
      
      // If not found by email, try Phone number
      if (querySnapshot.empty && newBooking.customerPhone) {
        customerQuery = query(customersRef, where('phone', '==', newBooking.customerPhone));
        querySnapshot = await getDocs(customerQuery);
      }

      if (!querySnapshot.empty) {
        // Update all matched customer documents in Firestore
        for (const customerDoc of querySnapshot.docs) {
          const docRef = doc(db, 'customers', customerDoc.id);
          await updateDoc(docRef, {
            carModel: newBooking.carName,
            carPrice: `₹${newBooking.totalAmount.toLocaleString('en-IN')}`, // Printed invoice total price
            rentalDate: `${newBooking.startDate} to ${newBooking.endDate}`,  // Rented dates
            active: true
          });
          console.log(`Updated matching customer ${customerDoc.id} in Firestore with rented car details.`);
        }
      } else {
        console.log("No registered customer document matched for updating. Storing a new customer profile fallback.");
        // Fallback: If they booked directly without a matching registered customer account, create one!
        await addDoc(collection(db, 'customers'), {
          name: newBooking.customerName,
          email: newBooking.customerEmail,
          phone: newBooking.customerPhone,
          address: "Registered at checkout",
          active: true,
          carModel: newBooking.carName,
          carPrice: `₹${newBooking.totalAmount.toLocaleString('en-IN')}`,
          rentalDate: `${newBooking.startDate} to ${newBooking.endDate}`,
          registeredAt: new Date().toISOString()
        });
      }
      
      triggerNotice("Invoice receipt synced perfectly to Firestore cloud database!");
    } catch (err: any) {
      console.error("Failed to sync booking/customer in Firestore: ", err);
      triggerNotice(`Warning: Could not sync receipt to cloud DB. (${err.message || err.toString()})`);
    }
  };

  // Quick helper to auto-navigate from hero
  const handleBrowseFleet = () => {
    setActiveSection('cars');
    const element = document.getElementById('cars');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRegisterNavigate = () => {
    setActiveSection('register');
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      
      {/* Dynamic Notification Center */}
      {actionNotice && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-slate-950 text-white rounded-xl shadow-2xl border border-slate-800 text-xs flex items-center space-x-2 animate-slideDown">
          <Check className="h-4 w-4 text-emerald-400" />
          <span className="font-semibold">{actionNotice}</span>
        </div>
      )}


      {/* Primary Navigation */}
      <Navbar 
        currentRole={currentRole} 
        setRole={setRole}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenLogin={() => setIsLoginOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Structural Page Flow */}
      <main className="flex-1">
        
        {/* Section 1: Hero */}
        <Hero 
          onBrowseCars={handleBrowseFleet} 
          onRegister={handleRegisterNavigate} 
        />

        {/* Section 2: Cars list (Pricing & Availability specs) */}
        <AvailableCars 
          cars={cars} 
          onBookCar={handleOpenBooking} 
        />

        {/* Section 3: Company High-touch highlights */}
        <EmployeeHighlights />

        {/* Section 4: Live Portal Dashboard Simulation */}
        <DashboardPreview 
          currentRole={currentRole} 
          setRole={setRole}
          bookings={bookings}
          setBookings={setBookings}
          vendorVehicles={vendorVehicles}
          setVendorVehicles={setVendorVehicles}
          driverTrips={driverTrips}
          setDriverTrips={setDriverTrips}
          onViewInvoice={(b) => setSelectedBookingForInvoice(b)}
        />

        {/* Section 5: Registration form */}
        <RegistrationForm 
          onRegisterSuccess={handleRegisterSuccess}
          currentUser={currentUser}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Modal overlays */}
      <BookingModal 
        car={selectedCarForBooking!} 
        isOpen={selectedCarForBooking !== null} 
        onClose={() => setSelectedCarForBooking(null)}
        currentUser={currentUser}
        onConfirm={handleConfirmBooking}
      />

      <InvoiceModal 
        booking={selectedBookingForInvoice} 
        isOpen={selectedBookingForInvoice !== null} 
        onClose={() => setSelectedBookingForInvoice(null)}
      />

      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
