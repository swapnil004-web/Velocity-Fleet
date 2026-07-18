import React from 'react';
import { UserCheck, Shield, PhoneCall, Sparkles, LucideIcon } from 'lucide-react';
import { EMPLOYEE_HIGHLIGHTS } from '../data';

const iconMap: Record<string, LucideIcon> = {
  UserCheck: UserCheck,
  ShieldAlert: Shield,
  PhoneCall: PhoneCall,
  Sparkles: Sparkles
};

export default function EmployeeHighlights() {
  return (
    <section id="highlights" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-mono block">
            Velocity Business Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            High-Touch Transit Architecture
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            How we maintain stellar customer retention rates and completely eliminate administrative friction across our regional operations.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {EMPLOYEE_HIGHLIGHTS.map((hl, index) => {
            const IconComponent = iconMap[hl.iconName] || Sparkles;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded bg-blue-50 text-blue-900 border border-blue-100">
                    <IconComponent className="h-6 w-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {hl.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {hl.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 mt-6 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  <span>Standard Tier</span>
                  <span className="text-emerald-600 font-bold">Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Class Stat Cards */}
        <div className="mt-16 bg-blue-900 text-white rounded-xl p-8 border border-blue-800 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center relative overflow-hidden shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600"></div>
          
          <div className="space-y-1">
            <span className="text-blue-200 text-[10px] font-mono uppercase tracking-widest">Average Driver Rating</span>
            <span className="text-3xl font-black text-amber-400 block font-mono">4.92 / 5.0</span>
            <span className="text-xs text-blue-200">Calculated across 1,200+ passenger reviews</span>
          </div>

          <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-blue-800 py-6 sm:py-0">
            <span className="text-blue-200 text-[10px] font-mono uppercase tracking-widest">Dispatch Punctuality</span>
            <span className="text-3xl font-black text-white block font-mono">99.8% On-Time</span>
            <span className="text-xs text-blue-200">Monitored via unified driver app integrations</span>
          </div>

          <div className="space-y-1">
            <span className="text-blue-200 text-[10px] font-mono uppercase tracking-widest">Client Retention</span>
            <span className="text-3xl font-black text-emerald-300 block font-mono">91% Loyal</span>
            <span className="text-xs text-blue-200">Moving from phone call booking models</span>
          </div>
        </div>

      </div>
    </section>
  );
}
