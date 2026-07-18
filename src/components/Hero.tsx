import React, { useState } from 'react';
import { ShieldCheck, Calendar, RefreshCw, FileSpreadsheet, MessageSquare, Check, Flame } from 'lucide-react';

interface HeroProps {
  onBrowseCars: () => void;
  onRegister: () => void;
}

export default function Hero({ onBrowseCars, onRegister }: HeroProps) {
  const [toggleComparison, setToggleComparison] = useState<'before' | 'after'>('after');

  return (
    <section id="hero" className="relative bg-blue-900 text-white overflow-hidden py-20 lg:py-24">
      {/* Background Decorative Gradients & Slanted Strip */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-blue-800 transform -skew-x-12 translate-x-20 opacity-30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl -ml-32 -mb-32"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text content Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white font-display">
              Premium Car Rental <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent font-extrabold">
                Elite Fleet Operations
              </span>
            </h1>

            <p className="text-blue-100 opacity-90 text-base sm:text-lg max-w-xl leading-relaxed">
              Digitally manage your fleet, bookings, and customers in one centralized platform. Transition from manual chaos and WhatsApp threads to a unified, elite portal.
            </p>

            {/* Quick value badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-md bg-white/10 border border-white/10 text-amber-400">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <span className="text-sm font-semibold text-slate-100">Centralized Records</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-md bg-white/10 border border-white/10 text-amber-400">
                  <Calendar className="h-4.5 w-4.5" />
                </div>
                <span className="text-sm font-semibold text-slate-100">Zero-Overbooking</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-md bg-white/10 border border-white/10 text-amber-400">
                  <RefreshCw className="h-4.5 w-4.5" />
                </div>
                <span className="text-sm font-semibold text-slate-100">Real-time Roles</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={onBrowseCars}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold rounded shadow-lg transition-all text-center cursor-pointer text-sm"
              >
                Browse Cars
              </button>
              <button
                onClick={onRegister}
                className="px-6 py-3.5 border border-blue-300 text-white font-semibold rounded hover:bg-blue-800/40 transition-all text-center cursor-pointer text-sm"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Business Transformation Interactive Showcase Column */}
          <div className="lg:col-span-5 relative group">
            {/* Ambient Background Glows */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-35 transition duration-1000"></div>
            
            <div className="rounded-2xl bg-slate-950/90 backdrop-blur-md border border-blue-900/80 p-6 shadow-2xl relative overflow-hidden transition-all duration-300">
              
              {/* Decorative Tech Grid Lines & Dots */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient from-blue-500/10 to-transparent pointer-events-none"></div>
              
              {/* Card top bar */}
              <div className="flex items-center justify-between border-b border-blue-900/60 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-300 font-mono">
                    Operations Engine
                  </span>
                </div>
                
                {/* Before vs After selector */}
                <div className="flex bg-slate-900/95 rounded p-1 border border-blue-900/60 text-[10px]">
                  <button
                    onClick={() => setToggleComparison('before')}
                    className={`px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      toggleComparison === 'before'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-black'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    The Old Way
                  </button>
                  <button
                    onClick={() => setToggleComparison('after')}
                    className={`px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      toggleComparison === 'after'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Velocity Portal
                  </button>
                </div>
              </div>

              {toggleComparison === 'before' ? (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="p-3.5 bg-gradient-to-r from-red-950/20 to-transparent border-l-2 border-red-500 bg-red-950/10 rounded-r-lg text-left">
                    <span className="text-red-400 font-extrabold text-xs uppercase font-mono block mb-1">
                      01 / Fragmented Booking
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "Which car is Alexander riding today?" Staff queries WhatsApp back-and-forth trying to find driver schedules. Overlaps occur regularly.
                    </p>
                  </div>
                  
                  <div className="p-3.5 bg-gradient-to-r from-red-950/20 to-transparent border-l-2 border-red-500 bg-red-950/10 rounded-r-lg text-left">
                    <span className="text-red-400 font-extrabold text-xs uppercase font-mono block mb-1">
                      02 / Spreadsheet Panic
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-red-300 font-mono bg-red-950/30 border border-red-900/30 px-2 py-1 rounded inline-flex mb-1.5">
                      <FileSpreadsheet className="h-3.5 w-3.5 text-red-400" />
                      <span>Bookings_v3_Final_Copy(2).xlsx</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Owner has to manually check Excel rows, cross-reference bank receipts, and type out PDF invoice files one by one.
                    </p>
                  </div>
                  
                  <div className="p-3.5 bg-gradient-to-r from-red-950/20 to-transparent border-l-2 border-red-500 bg-red-950/10 rounded-r-lg text-left">
                    <span className="text-red-400 font-extrabold text-xs uppercase font-mono block mb-1">
                      03 / Driver Blindness
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Drivers don't know who is arriving or where. Pickup locations and customer contact details get lost in WhatsApp chats.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="p-3.5 bg-gradient-to-r from-emerald-950/20 to-transparent border-l-2 border-emerald-500 bg-emerald-950/10 rounded-r-lg text-left hover:bg-emerald-950/15 transition-colors">
                    <span className="text-emerald-400 font-extrabold text-xs uppercase font-mono flex items-center space-x-1.5 mb-1">
                      <Check className="h-3.5 w-3.5 text-emerald-400 stroke-[3]" />
                      <span>01 / Connected in Real-time</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Customers request a book. The owner instantly approves. The driver sees his assigned trip list update on-screen immediately.
                    </p>
                  </div>
                  
                  <div className="p-3.5 bg-gradient-to-r from-emerald-950/20 to-transparent border-l-2 border-emerald-500 bg-emerald-950/10 rounded-r-lg text-left hover:bg-emerald-950/15 transition-colors">
                    <span className="text-emerald-400 font-extrabold text-xs uppercase font-mono flex items-center space-x-1.5 mb-1">
                      <Check className="h-3.5 w-3.5 text-emerald-400 stroke-[3]" />
                      <span>02 / Automatic Ledger</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      No spreadsheets needed. System automatically aggregates customer deposits, vendor earnings, and generates clean downloadable digital PDF invoices.
                    </p>
                  </div>
                  
                  <div className="p-3.5 bg-gradient-to-r from-emerald-950/20 to-transparent border-l-2 border-emerald-500 bg-emerald-950/10 rounded-r-lg text-left hover:bg-emerald-950/15 transition-colors">
                    <span className="text-emerald-400 font-extrabold text-xs uppercase font-mono flex items-center space-x-1.5 mb-1">
                      <Check className="h-3.5 w-3.5 text-emerald-400 stroke-[3]" />
                      <span>03 / Unified Accountability</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Clear logins isolate actions. Drivers track destinations. Vendors register and oversee their own registered vehicles' approval state.
                    </p>
                  </div>
                </div>
              )}

              {/* Little stats strip */}
              <div className="mt-5 pt-4 border-t border-blue-900/60 grid grid-cols-2 gap-4 text-center font-mono">
                <div className="space-y-0.5">
                  <span className="text-blue-300/80 text-[9px] block uppercase font-bold tracking-wider">Manual Operations</span>
                  <span className="text-red-400 font-black text-sm">45% error rate</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-blue-300/80 text-[9px] block uppercase font-bold tracking-wider">Digital Centralization</span>
                  <span className="text-emerald-400 font-black text-sm">0% Overlaps</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
