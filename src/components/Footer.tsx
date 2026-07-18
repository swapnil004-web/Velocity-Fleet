import React from 'react';
import { Car, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-blue-200 border-t border-blue-900 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-blue-900 text-left">
          
          {/* Company Brief */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-amber-500 text-blue-950">
                <Car className="h-5.5 w-5.5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-bold text-white uppercase font-display block leading-none">
                  Velocity
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-amber-400 font-bold">
                  Premium Fleet
                </span>
              </div>
            </div>
            <p className="text-xs text-blue-300 leading-relaxed max-w-sm">
              An elite logistics framework connecting registered vehicle vendors, certified drivers, and customers to experience state-of-the-art transit management.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
              System Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">Home Dashboard</a>
              </li>
              <li>
                <a href="#cars" className="hover:text-amber-400 transition-colors">Browse Available Cars</a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-amber-400 transition-colors">Company Highlights</a>
              </li>
              <li>
                <a href="#register" className="hover:text-amber-400 transition-colors">Client Registration</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
              Central Office
            </h4>
            <ul className="space-y-2.5 text-xs text-blue-100">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>4/1a Park Street Road , Kol - 700019</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <a href="tel:+15550192834" className="hover:text-amber-400">+1 (555) 019-2834</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <a href="mailto:ops@velocitypremium.com" className="hover:text-amber-400 font-sans">ops@velocitypremium.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Credit & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <p>© {currentYear} Velocity Premium Fleet Operations. All Rights Reserved.</p>
          </div>
          <div className="flex items-center space-x-1.5 text-blue-400 text-[11px]">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Interactive Day 2 Prototype • Crafted with React & Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
