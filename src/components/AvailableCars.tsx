import React, { useState } from 'react';
import { Search, SlidersHorizontal, Users, Fuel, Settings, Star, Check, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Car } from '../types';

interface AvailableCarsProps {
  cars: Car[];
  onBookCar: (car: Car) => void;
}

export default function AvailableCars({ cars, onBookCar }: AvailableCarsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Luxury', 'Sedan', 'SUV', 'Sports', 'Electric'];

  // Handle Specs toggle
  const toggleSpecs = (id: string) => {
    setExpandedSpecs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtering and Sorting
  const filteredCars = cars
    .filter((car) => {
      const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' or default
    });

  return (
    <section id="cars" className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900 font-mono block">
            Velocity Executive Fleet
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Select Your Premium Transit Experience
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Compare premium vehicle specifications, standard rental rates, and book instantly. No phone tag required.
          </p>
        </div>

        {/* Controls Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 mb-10 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Live Search */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand or model (e.g. Tesla, Audi)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/25 focus:border-blue-900 bg-slate-50/50"
              />
            </div>

            {/* Sorter */}
            <div className="flex items-center space-x-3 self-end md:self-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1 font-mono">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Sort:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900/25 bg-white text-slate-700"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating (Highest)</option>
              </select>
            </div>
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-blue-900 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => {
              const showSpecs = !!expandedSpecs[car.id];
              return (
                <div
                  key={car.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
                >
                  {/* Image & Category Overlay */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.name}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Floating Categories & Ratings */}
                    <div className="absolute top-4 left-4 bg-blue-900 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                      {car.category}
                    </div>

                    <div className="absolute bottom-4 right-4 bg-blue-950/90 backdrop-blur-sm text-white px-2 py-1 rounded flex items-center space-x-1 text-xs font-bold">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span>{car.rating.toFixed(1)}</span>
                    </div>

                    {/* Availability status badge */}
                    <div className="absolute top-4 right-4">
                      {car.available ? (
                        <span className="inline-flex items-center space-x-1 bg-green-100 text-green-800 border border-green-200 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping"></span>
                          <span>Available</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 bg-red-100 text-red-800 border border-red-200 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          <span>On Rent</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                          {car.brand}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 font-display text-left">
                        {car.name}
                      </h3>

                      {/* Technical Specs Strip */}
                      <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-slate-100 mb-4 text-center">
                        <div className="flex flex-col items-center">
                          <Users className="h-4 w-4 text-slate-400 mb-1" />
                          <span className="text-[10px] font-semibold text-slate-600">{car.seats} Seats</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Fuel className="h-4 w-4 text-slate-400 mb-1" />
                          <span className="text-[10px] font-semibold text-slate-600">{car.fuelType}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Settings className="h-4 w-4 text-slate-400 mb-1" />
                          <span className="text-[10px] font-semibold text-slate-600 leading-tight">{car.transmission}</span>
                        </div>
                      </div>

                      {/* Expanded Specs Checklist toggle */}
                      {showSpecs && (
                        <div className="mb-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100 animate-slideDown text-left">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 font-mono block mb-2">
                            Premium Equipment Included:
                          </span>
                          <ul className="space-y-1.5">
                            {car.specs.map((spec, index) => (
                              <li key={index} className="flex items-center space-x-2 text-xs text-slate-700">
                                <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Price and CTAs */}
                    <div className="space-y-3 pt-2 text-left">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-xs text-slate-400 block">Daily Rental Price</span>
                          <span className="text-2xl font-bold text-blue-900 font-mono">
                            ₹{car.pricePerDay.toLocaleString('en-IN')}
                            <span className="text-xs font-medium text-slate-500">/day</span>
                          </span>
                        </div>

                        <button
                          onClick={() => toggleSpecs(car.id)}
                          className="text-xs font-semibold text-blue-900 hover:text-blue-800 inline-flex items-center space-x-1 py-1 px-2 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        >
                          {showSpecs ? (
                            <>
                              <EyeOff className="h-3.5 w-3.5" />
                              <span>Hide Specs</span>
                            </>
                          ) : (
                            <>
                              <Eye className="h-3.5 w-3.5" />
                              <span>View Specs</span>
                            </>
                          )}
                        </button>
                      </div>

                      {car.available ? (
                        <button
                          onClick={() => onBookCar(car)}
                          className="w-full py-2.5 px-4 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition-colors cursor-pointer text-sm"
                        >
                          Book Now
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full py-2.5 px-4 bg-slate-100 text-slate-400 rounded-lg font-bold cursor-not-allowed text-sm flex items-center justify-center space-x-1.5"
                        >
                          <AlertTriangle className="h-4 w-4" />
                          <span>Currently On Rent</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <span className="text-slate-400 text-sm block">No vehicles fit your filter parameters.</span>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-amber-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
