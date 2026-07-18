import React, { useState, useEffect } from 'react';
import { 
  IndianRupee, Users, Car, UserCheck, Calendar, FileText, Plus, ShieldCheck, 
  MapPin, Clock, Phone, AlertCircle, Sparkles, TrendingUp, Grid, ListFilter, Trash2, CheckCircle2, RotateCw
} from 'lucide-react';
import { UserRole, Booking, VendorVehicle, DriverTrip } from '../types';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

interface DashboardPreviewProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  vendorVehicles: VendorVehicle[];
  setVendorVehicles: React.Dispatch<React.SetStateAction<VendorVehicle[]>>;
  driverTrips: DriverTrip[];
  setDriverTrips: React.Dispatch<React.SetStateAction<DriverTrip[]>>;
  onViewInvoice: (booking: Booking) => void;
}

export default function DashboardPreview({
  currentRole,
  setRole,
  bookings,
  setBookings,
  vendorVehicles,
  setVendorVehicles,
  driverTrips,
  setDriverTrips,
  onViewInvoice
}: DashboardPreviewProps) {
  // Live customers from Firebase Firestore
  const [liveCustomers, setLiveCustomers] = useState<any[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [customerError, setCustomerError] = useState('');

  // Live bookings & invoices from Firebase Firestore
  const [liveBookings, setLiveBookings] = useState<any[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Fetch customers from Firebase Firestore
  const fetchLiveCustomers = async () => {
    setIsLoadingCustomers(true);
    setCustomerError('');
    try {
      const q = query(collection(db, 'customers'), orderBy('registeredAt', 'desc'), limit(25));
      const querySnapshot = await getDocs(q);
      const list: any[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setLiveCustomers(list);
    } catch (err: any) {
      console.error("Error retrieving Firestore registrations:", err);
      setCustomerError(`Failed to load: ${err.message || err.toString()}`);
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  // Fetch bookings & invoices from Firebase Firestore
  const fetchLiveBookings = async () => {
    setIsLoadingBookings(true);
    setBookingError('');
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdTimestamp', 'desc'), limit(25));
      const querySnapshot = await getDocs(q);
      const list: any[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setLiveBookings(list);
    } catch (err: any) {
      console.error("Error retrieving Firestore bookings:", err);
      setBookingError(`Failed to load bookings: ${err.message || err.toString()}`);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchLiveCustomers();
    fetchLiveBookings();
  }, []);

  // Vendor Form state
  const [newCarName, setNewCarName] = useState('');
  const [newCarBrand, setNewCarBrand] = useState('');
  const [newCarPlate, setNewCarPlate] = useState('');
  const [newCarPrice, setNewCarPrice] = useState('9900');
  const [vendorSuccess, setVendorSuccess] = useState('');

  // Employee Incident resolution mockup
  const [queries, setQueries] = useState([
    { id: 'q-1', customer: 'Sarah Jenkins', type: 'Delay', desc: 'Wants to postpone drop-off by 2 hours on July 25th.', status: 'Pending' },
    { id: 'q-2', customer: 'Michael Chang', type: 'Tire Pressure', desc: 'Low tire pressure light is on. Requesting nearby service info.', status: 'Pending' },
  ]);

  // Handle Vendor Adding Vehicle
  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCarName || !newCarBrand || !newCarPlate) return;

    const newVehicle: VendorVehicle = {
      id: `vv-${Date.now()}`,
      name: newCarName,
      brand: newCarBrand,
      plateNumber: newCarPlate.toUpperCase(),
      status: 'Pending Approval',
      earnings: 0,
      bookingsCount: 0,
      pricePerDay: Number(newCarPrice) || 9900,
    };

    setVendorVehicles([newVehicle, ...vendorVehicles]);
    setNewCarName('');
    setNewCarBrand('');
    setNewCarPlate('');
    setVendorSuccess('Vehicle registered successfully! Awaiting Owner/Staff approval.');
    setTimeout(() => setVendorSuccess(''), 4000);
  };

  // Owner Actions: Confirm booking
  const updateBookingStatus = (id: string, newStatus: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  // Driver Actions: Update Trip status
  const updateTripStatus = (id: string, newStatus: DriverTrip['status']) => {
    setDriverTrips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  // Employee actions: Resolve queries
  const resolveQuery = (id: string) => {
    setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, status: 'Resolved' } : q)));
  };

  return (
    <section id="dashboard" className="py-20 bg-slate-100 text-slate-800 scroll-mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Banner with instructions */}
        <div className="bg-blue-900 border border-blue-800 text-white rounded-xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono flex items-center gap-1">
              <Sparkles className="h-4 w-4 animate-spin-slow text-amber-400" />
              <span>State-Driven Simulation Sandbox</span>
            </span>
            <h3 className="text-2xl font-bold font-display text-white">
              Experience the Unified Business Portal
            </h3>
            <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
              We have integrated all 5 business actors. Switch tabs below to preview the exact dashboard view, active logs, and custom administrative tools tailored for each role.
            </p>
          </div>

          {/* Quick Role switcher tabs */}
          <div className="flex flex-wrap gap-1.5 bg-blue-955 p-1.5 rounded-lg border border-blue-950 shrink-0">
            {(['owner', 'employee', 'vendor', 'customer', 'driver'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setRole(role)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  currentRole === role
                    ? 'bg-amber-500 text-blue-950 shadow'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {role.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ==================================== */}
        {/* VIEW 1: OWNER DASHBOARD */}
        {/* ==================================== */}
        {currentRole === 'owner' && (
          <div className="space-y-10 animate-fadeIn text-left">
            {/* Header */}
            <div className="text-left border-b border-slate-200 pb-5">
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900">Owner Command Center</h2>
              <p className="text-slate-500 text-xs mt-1">Real-time overview of consolidated company logistics, payouts, and customer books.</p>
            </div>

            {/* Owner Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="space-y-1 text-left">
                  <span className="text-slate-400 text-[10px] font-bold uppercase font-mono block">Consolidated Revenue</span>
                  <span className="text-2xl font-bold text-emerald-600 font-mono">₹36,45,360</span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-emerald-600" /> +12% vs last month
                  </span>
                </div>
                <div className="h-12 w-12 rounded bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                  <IndianRupee className="h-6 w-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="space-y-1 text-left">
                  <span className="text-slate-400 text-[10px] font-bold uppercase font-mono block">Active Fleet Size</span>
                  <span className="text-2xl font-bold text-blue-900 font-mono">14 Vehicles</span>
                  <span className="text-[10px] text-slate-500">6 owned, 8 partner-registered</span>
                </div>
                <div className="h-12 w-12 rounded bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center">
                  <Car className="h-6 w-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="space-y-1 text-left">
                  <span className="text-slate-400 text-[10px] font-bold uppercase font-mono block">Registered Users</span>
                  <span className="text-2xl font-bold text-blue-900 font-mono">152 Clients</span>
                  <span className="text-[10px] text-slate-500">+8 signups today</span>
                </div>
                <div className="h-12 w-12 rounded bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="space-y-1 text-left">
                  <span className="text-slate-400 text-[10px] font-bold uppercase font-mono block">Approved Drivers</span>
                  <span className="text-2xl font-bold text-purple-600 font-mono">8 Drivers</span>
                  <span className="text-[10px] text-slate-500">All certificates current</span>
                </div>
                <div className="h-12 w-12 rounded bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center">
                  <UserCheck className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Central Bookings Ledger */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h3 className="text-lg font-bold font-display flex items-center gap-2 text-slate-900">
                  <Calendar className="h-5 w-5 text-blue-900" />
                  <span>Central Bookings Ledger</span>
                </h3>
                <span className="text-xs bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded">
                  Total Active Rows: {bookings.length}
                </span>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] font-mono border-b border-slate-200">
                    <tr>
                      <th className="p-4">BKG ID</th>
                      <th className="p-4">Car Selected</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Date Range</th>
                      <th className="p-4 text-right">Deposited</th>
                      <th className="p-4 text-center">Receipt</th>
                      <th className="p-4 text-center">Trip Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50 transition-colors text-slate-700">
                        <td className="p-4 font-mono font-bold text-blue-900">{booking.id}</td>
                        <td className="p-4 font-semibold text-slate-900">{booking.carName}</td>
                        <td className="p-4">
                          <span className="font-semibold block text-slate-900">{booking.customerName}</span>
                          <span className="text-slate-500 text-[10px]">{booking.customerPhone}</span>
                        </td>
                        <td className="p-4 text-slate-600 leading-normal">
                          <span>{booking.startDate} to {booking.endDate}</span>
                          <span className="text-slate-400 text-[10px] block font-mono">({booking.totalDays} Days)</span>
                        </td>
                        <td className="p-4 text-right font-bold text-emerald-600 font-mono">₹{booking.totalAmount.toLocaleString('en-IN')}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => onViewInvoice(booking)}
                            className="px-2 py-1 bg-white text-blue-900 border border-slate-200 hover:border-blue-900/40 rounded transition-colors inline-flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>Invoice</span>
                          </button>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            booking.status === 'Pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            booking.status === 'Active' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1.5">
                            {booking.status === 'Pending' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-[10px] transition-colors"
                              >
                                Approve
                              </button>
                            )}
                            {booking.status !== 'Cancelled' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                                className="px-2 py-1 bg-red-950/40 text-red-400 border border-red-900/40 hover:bg-red-900/40 rounded text-[10px] transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Firestore Customers Directory */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="text-left">
                  <h3 className="text-lg font-bold font-display flex items-center gap-2 text-slate-900">
                    <Users className="h-5 w-5 text-blue-900" />
                    <span>Live Customer Directory (Firebase Firestore)</span>
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Real-time entries loaded directly from the database collection. Survives page reloads!
                  </p>
                </div>
                <button
                  onClick={fetchLiveCustomers}
                  disabled={isLoadingCustomers}
                  className="self-start sm:self-auto px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCw className={`h-3.5 w-3.5 ${isLoadingCustomers ? 'animate-spin' : ''}`} />
                  <span>Refresh DB</span>
                </button>
              </div>

              {customerError && (
                <div className="space-y-3 text-left">
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg font-medium">
                    {customerError}
                  </div>
                  
                  {/* Educational Helper Box for Firestore Security Rules */}
                  {(customerError.toLowerCase().includes('permission') || customerError.toLowerCase().includes('insufficient')) && (
                    <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl space-y-3 text-slate-800 text-xs">
                      <div className="flex items-center gap-2 text-amber-900 font-bold">
                        <span className="p-1 bg-amber-100 rounded text-base">🔒</span>
                        <span>Firestore Security Rules Configuration Required</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        By default, new Google Cloud & Firebase databases are fully locked to protect your data. To read and write customer registrations from this app, you need to allow access to the <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono">customers</code> collection.
                      </p>
                      
                      <div className="space-y-2 mt-2 bg-white/70 p-4 rounded-lg border border-amber-100">
                        <p className="font-semibold text-slate-900">How to solve this in 3 easy steps:</p>
                        <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                          <li>Open your <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold hover:text-blue-800">Firebase Console</a>.</li>
                          <li>Navigate to <strong className="text-slate-900">Build &gt; Firestore Database</strong> in the left menu, and click the <strong className="text-slate-900">Rules</strong> tab at the top.</li>
                          <li>Replace the existing rules code block with the configuration below and click <strong className="text-slate-900">Publish</strong>:</li>
                        </ol>
                        
                        <pre className="p-3 bg-slate-900 text-slate-100 font-mono text-[11px] rounded overflow-x-auto mt-2 select-all leading-normal">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /customers/{document} {
      allow read, write: if true;
    }
  }
}`}
                        </pre>
                        
                        <p className="text-[11px] text-amber-800 mt-2 italic font-medium">
                          Note: You can also find this saved in the <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono">firestore.rules</code> file in your workspace root! Once published, click the "Refresh DB" button above.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isLoadingCustomers && liveCustomers.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs">
                  <span className="inline-block animate-pulse">Loading live records from Firestore...</span>
                </div>
              ) : liveCustomers.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs border border-dashed border-slate-200 rounded-lg bg-slate-50">
                  <p className="font-medium text-slate-700 mb-1">No live Firestore registrations found</p>
                  <p className="text-slate-400">Be the first to submit the Registration Form to populate this live list!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] font-mono border-b border-slate-200">
                      <tr>
                        <th className="p-3">Doc ID</th>
                        <th className="p-3">Client Name</th>
                        <th className="p-3">Phone Number</th>
                        <th className="p-3">Car Details</th>
                        <th className="p-3">Rental Dates</th>
                        <th className="p-3 text-center">Active Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {liveCustomers.map((cust) => (
                        <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-mono text-[10px] text-slate-400 truncate max-w-[100px]" title={cust.id}>
                            {cust.id}
                          </td>
                          <td className="p-3 font-semibold text-slate-900">{cust.name}</td>
                          <td className="p-3 font-mono">{cust.phone || 'N/A'}</td>
                          <td className="p-3">
                            {cust.carModel ? (
                              <span className="font-semibold text-slate-900">{cust.carModel} <span className="text-slate-500 font-normal font-mono text-[10px]">({cust.carPrice || 'N/A'})</span></span>
                            ) : (
                              <span className="text-slate-400 italic">No assigned car</span>
                            )}
                          </td>
                          <td className="p-3 text-slate-600 font-mono text-[11px]">
                            {cust.rentalDate || 'No active dates'}
                          </td>
                          <td className="p-3 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              cust.active !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {cust.active !== false ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Live Firestore Invoices & Bookings Directory */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="text-left">
                  <h3 className="text-lg font-bold font-display flex items-center gap-2 text-slate-900">
                    <FileText className="h-5 w-5 text-amber-500" />
                    <span>Live Booking & Invoice Ledger (Firebase Firestore)</span>
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                    </span>
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Real-time invoice records saved to Firestore on checkout. Fully persistent on reload!
                  </p>
                </div>
                <button
                  onClick={fetchLiveBookings}
                  disabled={isLoadingBookings}
                  className="self-start sm:self-auto px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCw className={`h-3.5 w-3.5 ${isLoadingBookings ? 'animate-spin' : ''}`} />
                  <span>Refresh Invoices</span>
                </button>
              </div>

              {bookingError && (
                <div className="space-y-3 text-left">
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg font-medium">
                    {bookingError}
                  </div>
                  
                  {/* Educational Helper Box for Firestore Security Rules */}
                  {(bookingError.toLowerCase().includes('permission') || bookingError.toLowerCase().includes('insufficient')) && (
                    <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl space-y-3 text-slate-800 text-xs">
                      <div className="flex items-center gap-2 text-amber-900 font-bold">
                        <span className="p-1 bg-amber-100 rounded text-base">🔒</span>
                        <span>Firestore Security Rules Configuration Required</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        By default, new Google Cloud & Firebase databases are fully locked. To allow reading and writing your reservations/bookings from this app, please add the <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono">bookings</code> collection configuration.
                      </p>
                      
                      <div className="space-y-2 mt-2 bg-white/70 p-4 rounded-lg border border-amber-100">
                        <p className="font-semibold text-slate-900">How to solve this in 3 easy steps:</p>
                        <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                          <li>Open your <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold hover:text-blue-800">Firebase Console</a>.</li>
                          <li>Navigate to <strong className="text-slate-900">Build &gt; Firestore Database</strong> in the left menu, and click the <strong className="text-slate-900">Rules</strong> tab at the top.</li>
                          <li>Replace the existing rules code block with this unified configuration (covering both customers and bookings) and click <strong className="text-slate-900">Publish</strong>:</li>
                        </ol>
                        
                        <pre className="p-3 bg-slate-900 text-slate-100 font-mono text-[11px] rounded overflow-x-auto mt-2 select-all leading-normal">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /customers/{document} {
      allow read, write: if true;
    }
    match /bookings/{document} {
      allow read, write: if true;
    }
  }
}`}
                        </pre>
                        
                        <p className="text-[11px] text-amber-800 mt-2 italic font-medium">
                          Once published, click the "Refresh Invoices" button above to pull the live bookings database!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isLoadingBookings && liveBookings.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs">
                  <span className="inline-block animate-pulse">Loading live invoice receipts from Firestore...</span>
                </div>
              ) : liveBookings.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs border border-dashed border-slate-200 rounded-lg bg-slate-50">
                  <p className="font-medium text-slate-700 mb-1">No live Firestore invoice records found</p>
                  <p className="text-slate-400">Reserve a vehicle to generate your first live Firestore invoice receipt!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] font-mono border-b border-slate-200">
                      <tr>
                        <th className="p-3">Doc ID / Booking ID</th>
                        <th className="p-3">Passenger</th>
                        <th className="p-3">Car Model</th>
                        <th className="p-3">Rental Dates</th>
                        <th className="p-3 text-right">Total Price</th>
                        <th className="p-3 text-center">Payment Method</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {liveBookings.map((bk) => (
                        <tr key={bk.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-mono text-[10px] text-slate-400" title={bk.id}>
                            <span className="text-slate-900 font-bold block">{bk.bookingId || 'N/A'}</span>
                            <span className="truncate max-w-[80px] block">{bk.id}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-slate-900 block">{bk.customerName}</span>
                            <span className="text-slate-500 text-[10px] block font-mono">{bk.customerPhone || bk.customerEmail}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-slate-900 block">{bk.carModel || bk.carName}</span>
                            <span className="text-slate-400 text-[10px] italic">Category Rental</span>
                          </td>
                          <td className="p-3 text-slate-600 font-mono text-[11px]">
                            <div>{bk.startDate} to {bk.endDate}</div>
                            <div className="text-[10px] text-slate-400 font-sans">({bk.totalDays || 1} Days)</div>
                          </td>
                          <td className="p-3 text-right font-black text-emerald-600 font-mono text-[13px]">
                            ₹{bk.totalAmount ? bk.totalAmount.toLocaleString('en-IN') : '0'}
                          </td>
                          <td className="p-3 text-center">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              {bk.paymentMethod || 'Visa'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================== */}
        {/* VIEW 2: EMPLOYEE DASHBOARD */}
        {/* ==================================== */}
        {currentRole === 'employee' && (
          <div className="space-y-10 animate-fadeIn text-left">
            {/* Header */}
            <div className="text-left border-b border-slate-200 pb-5">
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900">Staff Operations Center</h2>
              <p className="text-slate-500 text-xs mt-1">Manage unassigned dispatches, process incoming requests, and resolve customer support queries.</p>
            </div>

            {/* Quick staff alert banner */}
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-800 gap-4">
              <span className="flex items-center gap-2">
                <AlertCircle className="h-4.5 w-4.5 text-amber-600" />
                <span>Notice: Automated server checks resolved 2 potential scheduling overlaps successfully at 10:00 AM UTC.</span>
              </span>
              <span className="font-mono text-[10px] bg-amber-200/50 px-2 py-0.5 rounded text-amber-900 shrink-0">System Normal</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Daily Support & Logistics Queries */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold font-display flex items-center gap-2 pb-2 border-b border-slate-200 text-slate-900">
                  <AlertCircle className="h-4.5 w-4.5 text-rose-500" />
                  <span>Logistics Queries & Urgent Check-Ins</span>
                </h3>
                <div className="space-y-3">
                  {queries.map((q) => (
                    <div key={q.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{q.customer}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          q.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {q.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-900 font-bold block">{q.type}</span>
                      <p className="text-xs text-slate-600">{q.desc}</p>
                      
                      {q.status === 'Pending' && (
                        <button
                          onClick={() => resolveQuery(q.id)}
                          className="mt-2 text-[10px] px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded font-bold transition-all cursor-pointer"
                        >
                          Mark as Resolved
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Driver-Dispatch Quick View */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold font-display flex items-center gap-2 pb-2 border-b border-slate-200 text-slate-900">
                  <UserCheck className="h-4.5 w-4.5 text-blue-600" />
                  <span>Driver Operations & Assignments</span>
                </h3>
                
                <div className="space-y-3">
                  {driverTrips.map((trip) => (
                    <div key={trip.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-left space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{trip.carName}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          trip.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                          trip.status === 'Upcoming' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-200 text-slate-700'
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                      <div className="text-slate-600 space-y-1 text-[11px]">
                        <div><strong className="text-slate-700">Driver Assignment:</strong> Professional Staff Transit</div>
                        <div><strong className="text-slate-700">Client:</strong> {trip.customerName} ({trip.customerPhone})</div>
                        <div><strong className="text-slate-700">Dest:</strong> {trip.dropoffLocation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================================== */}
        {/* VIEW 3: VENDOR DASHBOARD */}
        {/* ==================================== */}
        {currentRole === 'vendor' && (
          <div className="space-y-10 animate-fadeIn text-left">
            {/* Header */}
            <div className="text-left border-b border-slate-200 pb-5">
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900">Vendor Partner Portal</h2>
              <p className="text-slate-500 text-xs mt-1">Register private vehicles to earn static dividends. Track approved booking allocations and total accumulated earnings.</p>
            </div>

            {/* Vendor Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="space-y-1 text-left">
                  <span className="text-slate-400 text-[10px] font-bold uppercase font-mono block">Accumulated Earnings</span>
                  <span className="text-2xl font-bold text-emerald-600 font-mono">₹4,68,950</span>
                  <span className="text-[10px] text-slate-500">Subject to standard 10% platform fee</span>
                </div>
                <div className="h-11 w-11 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <IndianRupee className="h-5.5 w-5.5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="space-y-1 text-left">
                  <span className="text-slate-400 text-[10px] font-bold uppercase font-mono block">My Registered Fleet</span>
                  <span className="text-2xl font-bold text-blue-900 font-mono">{vendorVehicles.length} Vehicles</span>
                  <span className="text-[10px] text-slate-500">Awaiting approval: {vendorVehicles.filter(v => v.status === 'Pending Approval').length}</span>
                </div>
                <div className="h-11 w-11 rounded bg-blue-50 text-blue-900 flex items-center justify-center">
                  <Car className="h-5.5 w-5.5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="space-y-1 text-left">
                  <span className="text-slate-400 text-[10px] font-bold uppercase font-mono block">Total Bookings Completed</span>
                  <span className="text-2xl font-bold text-blue-900 font-mono">20 bookings</span>
                  <span className="text-[10px] text-slate-500">Average rental period: 3.5 days</span>
                </div>
                <div className="h-11 w-11 rounded bg-blue-50 text-blue-900 flex items-center justify-center">
                  <Calendar className="h-5.5 w-5.5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form to register new car */}
              <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-slate-800 text-left">
                <h3 className="text-base font-bold font-display flex items-center gap-2 pb-2 border-b border-slate-200 text-slate-900">
                  <Plus className="h-5 w-5 text-blue-900" />
                  <span>Register Private Vehicle (UI-Only)</span>
                </h3>

                {vendorSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg">
                    {vendorSuccess}
                  </div>
                )}

                <form onSubmit={handleAddVehicle} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1.5 font-semibold">Vehicle Brand</label>
                    <input
                      type="text"
                      required
                      value={newCarBrand}
                      onChange={(e) => setNewCarBrand(e.target.value)}
                      placeholder="e.g. Ford, Toyota, BMW"
                      className="w-full bg-white border border-slate-300 rounded p-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1.5 font-semibold">Model Name</label>
                    <input
                      type="text"
                      required
                      value={newCarName}
                      onChange={(e) => setNewCarName(e.target.value)}
                      placeholder="e.g. Mustang GT, Supra"
                      className="w-full bg-white border border-slate-300 rounded p-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1.5 font-semibold">License Plate</label>
                      <input
                        type="text"
                        required
                        value={newCarPlate}
                        onChange={(e) => setNewCarPlate(e.target.value)}
                        placeholder="e.g. TX-992-B"
                        className="w-full bg-white border border-slate-300 rounded p-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1.5 font-semibold">Rent Per Day (₹)</label>
                      <input
                        type="number"
                        required
                        value={newCarPrice}
                        onChange={(e) => setNewCarPrice(e.target.value)}
                        placeholder="120"
                        className="w-full bg-white border border-slate-300 rounded p-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase tracking-wider rounded transition-colors cursor-pointer text-xs font-sans"
                  >
                    Register and List Vehicle
                  </button>
                </form>
              </div>

              {/* Registered Cars Table */}
              <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-slate-800 text-left">
                <h3 className="text-base font-bold font-display flex items-center gap-2 pb-2 border-b border-slate-200 text-slate-900">
                  <Car className="h-5 w-5 text-blue-900" />
                  <span>My Fleet & List State</span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-200">
                      <tr>
                        <th className="p-3">Vehicle Details</th>
                        <th className="p-3">Plate</th>
                        <th className="p-3 text-right">Rent/Day</th>
                        <th className="p-3 text-right">Total Earnings</th>
                        <th className="p-3 text-center">Approved State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {vendorVehicles.map((car) => (
                        <tr key={car.id}>
                          <td className="p-3">
                            <span className="font-bold block text-slate-900">{car.brand} {car.name}</span>
                            <span className="text-slate-400 text-[10px]">{car.bookingsCount} bookings handled</span>
                          </td>
                          <td className="p-3 font-mono text-blue-900 font-bold">{car.plateNumber}</td>
                          <td className="p-3 text-right font-mono font-semibold">₹{car.pricePerDay.toLocaleString('en-IN')}</td>
                          <td className="p-3 text-right text-emerald-600 font-mono font-bold">₹{car.earnings.toLocaleString('en-IN')}</td>
                          <td className="p-3 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              car.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                              car.status === 'Pending Approval' ? 'bg-amber-100 text-amber-800' :
                              'bg-rose-100 text-rose-800'
                            }`}>
                              {car.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================================== */}
        {/* VIEW 4: CUSTOMER DASHBOARD */}
        {/* ==================================== */}
        {currentRole === 'customer' && (
          <div className="space-y-10 animate-fadeIn text-left">
            {/* Header */}
            <div className="text-left border-b border-slate-200 pb-5">
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900">My Client Account</h2>
              <p className="text-slate-500 text-xs mt-1">Manage active rental periods, review booking confirmations, and retrieve invoice slips instantly.</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="space-y-1 text-left">
                  <span className="text-slate-400 text-[10px] font-bold uppercase font-mono block">Registered Account Name</span>
                  <span className="text-xl font-bold text-slate-900 block">Alexander Wright</span>
                  <span className="text-[10px] text-amber-600 font-semibold uppercase font-mono">Premium Club status</span>
                </div>
                <div className="h-11 w-11 rounded bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center">
                  <Users className="h-5.5 w-5.5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="space-y-1 text-left">
                  <span className="text-slate-400 text-[10px] font-bold uppercase font-mono block">Active Rentals today</span>
                  <span className="text-xl font-bold text-blue-900">1 active vehicle</span>
                  <span className="text-[10px] text-slate-500 block">Tesla Model S Plaid</span>
                </div>
                <div className="h-11 w-11 rounded bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center">
                  <Car className="h-5.5 w-5.5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="space-y-1 text-left">
                  <span className="text-slate-400 text-[10px] font-bold uppercase font-mono block">Total Invested in Transit</span>
                  <span className="text-xl font-bold text-emerald-600 font-mono">₹1,63,676</span>
                  <span className="text-[10px] text-slate-500">Across 4 completed listings</span>
                </div>
                <div className="h-11 w-11 rounded bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                  <IndianRupee className="h-5.5 w-5.5" />
                </div>
              </div>
            </div>

            {/* Customer Bookings & Invoice trigger list */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm text-left">
              <h3 className="text-base font-bold font-display border-b border-slate-200 pb-3 flex items-center gap-2 text-slate-900">
                <Calendar className="h-5 w-5 text-blue-900" />
                <span>My Active & Historic Booking Slips</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row shadow-sm"
                  >
                    {/* Small Image */}
                    <div className="md:w-36 bg-slate-200 relative h-32 md:h-auto">
                      <img
                        src={booking.carImage}
                        alt={booking.carName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between text-xs space-y-2">
                      <div className="space-y-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-blue-900 font-bold">{booking.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            booking.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                            booking.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                            'bg-slate-200 text-slate-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{booking.carName}</h4>
                        <div className="text-slate-600 text-[11px] leading-relaxed">
                          <div>Rental: {booking.startDate} to {booking.endDate}</div>
                          <div>Total Amount: <strong className="text-emerald-600 font-mono">₹{booking.totalAmount.toLocaleString('en-IN')}</strong></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-[10px]">
                        <span className="text-slate-500">Invoice: <strong className="text-slate-600 uppercase font-mono">{booking.invoiceStatus}</strong></span>
                        <button
                          onClick={() => onViewInvoice(booking)}
                          className="px-2.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded transition-colors flex items-center gap-1 cursor-pointer text-[10px]"
                        >
                          <FileText className="h-3 w-3" />
                          <span>View Invoice Slip</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================== */}
        {/* VIEW 5: DRIVER DASHBOARD */}
        {/* ==================================== */}
        {currentRole === 'driver' && (
          <div className="space-y-10 animate-fadeIn text-left">
            {/* Header */}
            <div className="text-left border-b border-slate-200 pb-5">
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900">Driver Assignment Portal</h2>
              <p className="text-slate-500 text-xs mt-1">Review assigned transit orders, access client cellular numbers, and coordinate dispatch schedules.</p>
            </div>

            {/* Trips timeline list */}
            <div className="space-y-6">
              <h3 className="text-base font-bold font-display flex items-center gap-2 text-slate-900">
                <MapPin className="h-5 w-5 text-blue-900" />
                <span>My Assigned Logistics Transit Operations</span>
              </h3>

              <div className="grid grid-cols-1 gap-6">
                {driverTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-white rounded-xl border border-slate-200 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-sm text-slate-800"
                  >
                    {/* Trip Id & Car Info */}
                    <div className="lg:col-span-3 text-left space-y-1">
                      <span className="text-xs font-mono font-bold text-blue-900 uppercase block">{trip.id}</span>
                      <h4 className="text-lg font-bold text-slate-900">{trip.carName}</h4>
                      <span className="inline-flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded text-xs text-slate-600 font-mono">
                        <span>Plate:</span>
                        <strong className="text-slate-900">{trip.plateNumber}</strong>
                      </span>
                    </div>

                    {/* Pickup / Dropoff details */}
                    <div className="lg:col-span-5 text-xs text-left space-y-2.5">
                      <div className="flex items-start space-x-2.5">
                        <MapPin className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[10px] font-mono uppercase font-semibold">Pickup Address</span>
                          <p className="text-slate-700 font-medium">{trip.pickupLocation}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2.5">
                        <MapPin className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[10px] font-mono uppercase font-semibold">Dropoff Address</span>
                          <p className="text-slate-700 font-medium">{trip.dropoffLocation}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2.5">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-500">Duration: </span>
                        <span className="text-slate-700 font-semibold">{trip.startDate} to {trip.endDate}</span>
                      </div>
                    </div>

                    {/* Client cell coordination */}
                    <div className="lg:col-span-2 text-left text-xs space-y-1 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold">Contact Passenger</span>
                      <strong className="text-slate-900 block">{trip.customerName}</strong>
                      <a href={`tel:${trip.customerPhone}`} className="text-blue-900 flex items-center space-x-1 hover:underline font-mono mt-1 font-bold">
                        <Phone className="h-3 w-3" />
                        <span>{trip.customerPhone}</span>
                      </a>
                    </div>

                    {/* Live driver status control */}
                    <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-3">
                      <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">State Dispatch</span>
                      
                      <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200 w-full text-center">
                        {(['Upcoming', 'Ongoing', 'Completed'] as DriverTrip['status'][]).map((st) => (
                          <button
                            key={st}
                            onClick={() => updateTripStatus(trip.id, st)}
                            className={`flex-1 py-1.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                              trip.status === st
                                ? st === 'Ongoing' ? 'bg-blue-900 text-white font-black' :
                                  st === 'Completed' ? 'bg-emerald-600 text-white font-black' :
                                  'bg-amber-500 text-blue-950 font-black'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
