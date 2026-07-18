import React, { useState } from 'react';
import { X, Lock, Mail, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';
import { UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: { name: string; email: string }, role: UserRole) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Preset accounts for live demonstration
  const presets: { label: string; email: string; name: string; role: UserRole; desc: string }[] = [
    { label: 'C.Mukherjee (Customer)', email: 'c.mukherjee@example.com', name: 'C.Mukherjee', role: 'customer', desc: 'Browse and check invoices' },
    { label: 'S.Mukherjee (Owner)', email: 'owner@velocitypremium.com', name: 'S.Mukherjee (Owner)', role: 'owner', desc: 'Review ledger & total revenue' },
    { label: 'Staff (Employee)', email: 'staff@velocitypremium.com', name: 'Employee Staff Coordinator', role: 'employee', desc: 'Schedules and resolution logs' },
    { label: 'Partner (Vendor)', email: 'vendor@velocitypremium.com', name: 'Elite Partner Vendor', role: 'vendor', desc: 'List assets & track earnings' },
    { label: 'Pilot Vance (Driver)', email: 'vance@professional.com', name: 'Robert Vance', role: 'driver', desc: 'Assigned route directions' },
  ];

  const handlePresetClick = (preset: typeof presets[0]) => {
    onLoginSuccess({ name: preset.name, email: preset.email }, preset.role);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    // Standard fallback simulation
    onLoginSuccess({ name: 'Guest Passenger', email }, 'customer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl text-slate-900 animate-scaleUp text-left">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-display">Log In • Sandbox Simulator</h3>
            <span className="text-[10px] text-amber-400 font-mono uppercase tracking-widest block">
              Access the Unified Business Dashboard
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer">
            <X className="h-5.5 w-5.5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Preset Buttons Grid */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Instant Instructor Credentials (One-Click Login)</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(preset)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all flex flex-col items-start text-left cursor-pointer"
                >
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <UserCheck className="h-3.5 w-3.5 text-amber-500" />
                    <span>{preset.label}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 leading-normal mt-0.5">{preset.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-y-1/2 left-0 right-0 border-t border-slate-200"></div>
            <span className="relative z-10 px-3 bg-white text-[10px] text-slate-400 font-bold uppercase font-mono">
              Or custom passenger sign-in
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center space-x-2">
              <ShieldAlert className="h-4.5 w-4.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex.wright@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Secure Sign In
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
