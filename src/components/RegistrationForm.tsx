import React, { useState } from 'react';
import { UserPlus, Sparkles, CheckCircle2, Lock, ShieldAlert } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface RegistrationFormProps {
  onRegisterSuccess: (userData: { name: string; email: string }) => void;
  currentUser: { name: string; email: string } | null;
}

export default function RegistrationForm({ onRegisterSuccess, currentUser }: RegistrationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Basic Validations
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify entries.');
      return;
    }

    if (password.length < 5) {
      setErrorMsg('Password should be at least 5 characters for standard portal security.');
      return;
    }

    setIsSubmitting(true);

    try {
      // BEGINNER EXPLANATION:
      // Firestore stores data in "collections" (like tables) and "documents" (like rows).
      // We use `addDoc` to insert a new document with our fields into the 'customers' collection.
      // Firebase will automatically assign a unique "Doc ID" (Document Identifier) for each document.
      await addDoc(collection(db, 'customers'), {
        name: name,                             // Customer's full name
        email: email,                           // Email address
        phone: mobile,                          // Mobile phone number
        address: address,                       // Location address
        active: true,                           // Status field (active by default)
        carModel: "",                           // Rented car model (blank on initial sign up)
        carPrice: "",                           // Rented car price per day (blank on initial sign up)
        rentalDate: "",                         // Rental dates (blank on initial sign up)
        registeredAt: new Date().toISOString()  // Date and time of registration for sorting
      });

      // Success message
      setSuccessMsg(`Welcome, ${name}! Your account has been registered successfully to the live database (Firebase Firestore) and session loaded.`);
      
      // Auto-login callback
      onRegisterSuccess({ name, email });

      // Clear form
      setName('');
      setEmail('');
      setMobile('');
      setAddress('');
      setPassword('');
      setConfirmPassword('');

      // Scroll to available cars after 2 seconds
      setTimeout(() => {
        const element = document.getElementById('cars');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 2000);
    } catch (err: any) {
      console.error("Firestore registration error: ", err);
      const isPerm = err.message?.toLowerCase().includes('permission') || err.toString().toLowerCase().includes('permission') || err.message?.toLowerCase().includes('insufficient');
      if (isPerm) {
        setErrorMsg(`Firestore Database rules are blocking writes. Please navigate to Firestore Database -> "Rules" tab in your Firebase Console and set permissions to allow writes, or look at the "firestore.rules" file in the project root.`);
      } else {
        setErrorMsg(`Failed to save to database: ${err.message || err.toString()}. Please check your connection.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-20 bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header block */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900 font-mono block">
            Customer Self-Service Registry
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Register Customer Credentials
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Create your secure client profile to browse real-time rental schedules and request instant vehicle bookings.
          </p>
        </div>

        {currentUser ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-md space-y-4 max-w-xl mx-auto">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Active Session Loaded</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are currently logged in as <strong className="text-slate-900">{currentUser.name}</strong> ({currentUser.email}). You can now scroll up to browse our premium collection and click "Book Now" to trigger a booking!
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('cars');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded text-xs font-bold transition-colors cursor-pointer"
            >
              Browse and Book Fleet
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12">
            
            {/* Visual Column */}
            <div className="md:col-span-5 bg-blue-950 text-white p-8 flex flex-col justify-between relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full filter blur-2xl"></div>
              
              <div className="space-y-4 relative z-10">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-mono font-bold block">
                  Velocity Privileges
                </span>
                <h3 className="text-xl font-bold font-display leading-tight">
                  Why Register with us?
                </h3>
                
                <ul className="space-y-3.5 text-xs text-blue-100">
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold shrink-0">✓</span>
                    <span>No deposit required for verified platform accounts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold shrink-0">✓</span>
                    <span>Direct access to automated invoices</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold shrink-0">✓</span>
                    <span>Free professional driver allocation options</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-blue-900 pt-6 mt-12 relative z-10">
                <span className="text-[10px] text-blue-300 font-mono uppercase block">Live Student Sandbox</span>
                <p className="text-[10px] text-blue-200 leading-normal mt-1">
                  Day 2 form processes are strictly client-side. Values are retained in component memory to simulate login flows without server databases.
                </p>
              </div>
            </div>

            {/* Registration Form Column */}
            <div className="md:col-span-7 p-8">
              {successMsg && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start space-x-2.5 animate-fadeIn">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <p className="font-medium text-left">{successMsg}</p>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-start space-x-2.5">
                  <ShieldAlert className="h-5 w-5 text-red-600 shrink-0" />
                  <p className="font-medium text-left">{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Michael Chang"
                      className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. m.chang@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mobile Contact</label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. +1 (555) 777-8899"
                      className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Physical Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 404 Luxury Avenue, TX"
                      className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded font-bold uppercase tracking-wider mt-4 transition-colors cursor-pointer flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="flex h-2 w-2 relative mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                      <span>Saving Credentials...</span>
                    </>
                  ) : (
                    <span>Create Account & Login</span>
                  )}
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
