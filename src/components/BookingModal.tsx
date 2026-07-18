import React, { useState, useEffect } from 'react';
import { X, Calendar, UserCheck, CreditCard, IndianRupee, AlertCircle } from 'lucide-react';
import { Car, Booking } from '../types';

interface BookingModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
  currentUser: { name: string; email: string } | null;
  onConfirm: (booking: Booking) => void;
}

export default function BookingModal({ car, isOpen, onClose, currentUser, onConfirm }: BookingModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  const [startDate, setStartDate] = useState('2026-07-15');
  const [endDate, setEndDate] = useState('2026-07-18');
  const [needDriver, setNeedDriver] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Visa)');

  // Pre-fill user details if logged in
  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
      setCustomerEmail(currentUser.email);
    } else {
      setCustomerName('');
      setCustomerEmail('');
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  // Calculate days between dates
  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) || diffDays < 1 ? 1 : diffDays;
  };

  const totalDays = calculateDays();
  const driverRate = 3300;
  const baseRate = car.pricePerDay;
  const dailyTotal = baseRate + (needDriver ? driverRate : 0);
  const totalAmount = totalDays * dailyTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) return;

    // Create Booking object
    const newBooking: Booking = {
      id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
      carId: car.id,
      carName: `${car.brand} ${car.name}`,
      carImage: car.image,
      customerName,
      customerEmail,
      customerPhone,
      startDate,
      endDate,
      totalDays,
      totalAmount,
      status: 'Confirmed', // Automatically approved in sandbox for easy testing
      invoiceStatus: 'Paid', // Pretend they completed the client deposit
      paymentMethod,
      driverName: needDriver ? 'Marcus Miller' : undefined,
      driverPhone: needDriver ? '+1 (555) 998-1234' : undefined,
    };

    onConfirm(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl text-slate-900 animate-scaleUp">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-display">Request Vehicle Booking</h3>
            <span className="text-[10px] text-amber-400 font-mono uppercase tracking-widest block">
              Selected: {car.brand} {car.name}
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5.5 w-5.5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs text-left">
          
          {/* Section 1: Customer Contact Info */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono border-b border-slate-100 pb-1">
              1. Passenger Contact Verification
            </h4>

            {!currentUser && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] rounded-lg flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <span>You are booking as a Guest. You can fill details manually, or close this and register first.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Passenger Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Michael Chang"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. m.chang@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Mobile Contact Number</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="e.g. +1 (555) 777-8899"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Section 2: Dates and Extras */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono border-b border-slate-100 pb-1">
              2. Rental Duration & Add-ons
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Pickup Date</span>
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Return Dropoff Date</span>
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Professional Driver selection */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="space-y-0.5 text-left pr-4">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <UserCheck className="h-4 w-4 text-amber-500" />
                  <span>Request Verified Professional Driver</span>
                </span>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Allocates a certified premium pilot for stress-free transit. Adds a flat rate of ₹3,300/day.
                </p>
              </div>
              <input
                type="checkbox"
                checked={needDriver}
                onChange={(e) => setNeedDriver(e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500/25 cursor-pointer"
              />
            </div>
          </div>

          {/* Section 3: Financial Settlement */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono border-b border-slate-100 pb-1">
              3. Payment & Live Pricing Summary
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Payment Method Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                  <span>Deposit Method</span>
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
                >
                  <option value="Credit Card (Visa)">Credit Card (Visa)</option>
                  <option value="Credit Card (Mastercard)">Credit Card (Mastercard)</option>
                  <option value="PayPal">PayPal Invoice Settlement</option>
                  <option value="Bank Wire">Direct Bank Transfer</option>
                </select>
              </div>

              {/* Dynamic Bill Box */}
              <div className="bg-slate-950 text-white rounded-xl p-4 space-y-2 border border-slate-800 font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-1.5 text-[10px]">
                  <span className="text-slate-400 uppercase">Calculation</span>
                  <span className="text-amber-400 font-bold">{totalDays} Days</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Daily Fleet Rate:</span>
                    <span>₹{baseRate.toLocaleString('en-IN')}</span>
                  </div>
                  {needDriver && (
                    <div className="flex justify-between text-amber-400">
                      <span>Professional Driver:</span>
                      <span>+₹{driverRate.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1.5">
                  <span className="text-xs font-bold font-sans">Total Due:</span>
                  <span className="text-base font-black text-emerald-400">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-lg flex items-center space-x-1.5"
            >
              <IndianRupee className="h-4 w-4 text-emerald-400" />
              <span>Confirm & View Receipt</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
