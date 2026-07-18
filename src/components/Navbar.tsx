import React, { useState } from 'react';
import { Car, Menu, X, User, ChevronDown, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenLogin: () => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
}

export default function Navbar({
  currentRole,
  setRole,
  activeSection,
  setActiveSection,
  onOpenLogin,
  currentUser,
  onLogout,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'cars', label: 'Browse Fleet' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'dashboard', label: 'Live Portal' },
    { id: 'register', label: 'Client Register' },
  ];

  const roles: { value: UserRole; label: string; description: string }[] = [
    { value: 'customer', label: 'Customer', description: 'Browse cars & book rentals' },
    { value: 'owner', label: 'Business Owner', description: 'Monitor revenue & manage fleet' },
    { value: 'employee', label: 'Employee Staff', description: 'Manage bookings & schedules' },
    { value: 'vendor', label: 'Vendor Partner', description: 'Register cars & earn money' },
    { value: 'driver', label: 'Professional Driver', description: 'Track assignments & routes' },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white text-slate-800 shadow-sm border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
            <div className="flex h-9 w-9 items-center justify-center rounded bg-blue-900 text-white font-bold">
              <Car className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="text-lg font-bold tracking-tight text-blue-900 block leading-none">
                Velocity<span className="text-slate-500 font-normal">Fleet</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mt-0.5">
                Premium Rentals
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'text-blue-900 bg-blue-50/60 font-bold'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Interactive Role Switcher & User Status */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Live Class Role Selector */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-blue-900 border border-slate-200 transition-all text-xs font-semibold"
                title="Simulate role views in the Live Portal"
              >
                <Sparkles className="h-3.5 w-3.5 animate-pulse text-blue-900" />
                <span>Role: {roles.find((r) => r.value === currentRole)?.label}</span>
                <ChevronDown className="h-3 w-3 text-slate-500" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl ring-1 ring-black ring-opacity-5 z-50 p-2 text-left">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                      Live Classroom Simulator
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Toggle Portal Roles
                    </span>
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => {
                        setRole(r.value);
                        setShowRoleDropdown(false);
                        // Automatically scroll to dashboard when role is changed
                        setTimeout(() => {
                          handleNavClick('dashboard');
                        }, 100);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex flex-col mb-1 last:mb-0 ${
                        currentRole === r.value
                          ? 'bg-blue-50 text-blue-900 border border-blue-100/50'
                          : 'hover:bg-slate-50 text-slate-600 hover:text-blue-900 border border-transparent'
                      }`}
                    >
                      <span className="font-bold">{r.label}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                        {r.description}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth / Account */}
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-900 text-white font-bold text-xs">
                  {currentUser.name[0]}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-800 truncate max-w-[100px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-none">
                    Client Access
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-red-600 text-xs pl-2 border-l border-slate-200 transition-colors"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center space-x-2 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                <span>Log In</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Live Role Badge */}
            <div className="text-[10px] bg-slate-50 text-blue-900 px-2 py-1 rounded border border-slate-200 font-bold">
              {roles.find((r) => r.value === currentRole)?.label.split(' ')[0]}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left block px-3 py-2.5 rounded-lg text-base font-semibold ${
                  activeSection === item.id
                    ? 'text-blue-900 bg-blue-50/60 border-l-4 border-blue-900'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-2 px-3">
              Switch Live Classroom Role
            </span>
            <div className="grid grid-cols-2 gap-2 px-3">
              {roles.map((r) => (
                <button
                  key={r.value}
                  onClick={() => {
                    setRole(r.value);
                    setIsOpen(false);
                    setTimeout(() => {
                      handleNavClick('dashboard');
                    }, 100);
                  }}
                  className={`text-left p-2 rounded-lg text-xs transition-all ${
                    currentRole === r.value
                      ? 'bg-blue-900 text-white font-bold'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {r.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 px-3 text-left">
            {currentUser ? (
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-white font-bold">
                    {currentUser.name[0]}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-800 block">
                      {currentUser.name}
                    </span>
                    <span className="text-xs text-slate-400">Logged in</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="text-red-600 text-xs font-semibold px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenLogin();
                  setIsOpen(false);
                }}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 rounded-lg bg-blue-900 text-white font-bold uppercase text-sm tracking-wider"
              >
                <User className="h-4 w-4" />
                <span>Log In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
