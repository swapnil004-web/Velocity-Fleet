import React, { useState } from 'react';
import { X, Printer, Download, Check, Sparkles, Receipt, FileText, Landmark } from 'lucide-react';
import { Booking } from '../types';

interface InvoiceModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceModal({ booking, isOpen, onClose }: InvoiceModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  if (!isOpen || !booking) return null;

  // Simple download simulation
  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4000);
    }, 1500);
  };

  const hasDriver = !!booking.driverName;
  const driverDaysFee = hasDriver ? booking.totalDays * 3300 : 0;
  const carRentalFee = booking.totalAmount - driverDaysFee;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden text-slate-900 text-left animate-scaleUp">
        
        {/* Floating Download Success Toast */}
        {successToast && (
          <div className="absolute top-4 right-4 z-50 p-3 bg-slate-950 text-white rounded-xl shadow-2xl border border-slate-800 text-xs flex items-center space-x-2.5 animate-fadeIn">
            <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
            <span className="font-semibold">PDF Invoice downloaded successfully! Check downloads.</span>
          </div>
        )}

        {/* Modal Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Receipt className="h-5 w-5 text-amber-400" />
            <span className="font-bold font-display text-sm">Centralized Invoice Receipt</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Download PDF"
            >
              <Download className={`h-4.5 w-4.5 ${downloading ? 'animate-bounce text-amber-400' : ''}`} />
            </button>
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Print Receipt"
            >
              <Printer className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="h-5.5 w-5.5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Area */}
        <div id="invoice-print-area" className="p-8 sm:p-10 space-y-8 bg-white select-none">
          
          {/* Paper Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-slate-900 text-amber-500 rounded flex items-center justify-center font-bold">V</div>
                <span className="font-bold text-lg uppercase tracking-tight font-display">Velocity Premium</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Velocity Premium Fleet Operations LLC <br />
                100 Executive Boulevard, Suite 500 <br />
                Austin, TX 78701
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1 font-mono">
              <span className="inline-flex items-center bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase mb-1">
                Receipt: Paid
              </span>
              <div className="text-xs font-bold text-slate-900">INVOICE #{booking.id}</div>
              <div className="text-[10px] text-slate-500">Date Generated: {new Date().toISOString().split('T')[0]}</div>
              <div className="text-[10px] text-slate-500">Deposit Method: {booking.paymentMethod}</div>
            </div>
          </div>

          {/* Parties involved */}
          <div className="grid grid-cols-2 gap-6 text-xs leading-relaxed">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-1">
                Prepared For:
              </span>
              <strong className="text-slate-900 block">{booking.customerName}</strong>
              <span className="text-slate-600 block">{booking.customerEmail}</span>
              <span className="text-slate-500 block">{booking.customerPhone}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-1">
                Assigned Logistics Pilot:
              </span>
              {hasDriver ? (
                <>
                  <strong className="text-slate-900 block">{booking.driverName}</strong>
                  <span className="text-slate-600 block">Verified Operator</span>
                  <span className="text-slate-500 block">{booking.driverPhone}</span>
                </>
              ) : (
                <>
                  <span className="text-slate-500 italic block">Self-Drive Arrangement</span>
                  <span className="text-[10px] text-slate-400">Owner-vendor insurance coverage standard active</span>
                </>
              )}
            </div>
          </div>

          {/* Itemized Billing Table */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-1">
              Billing Ledger Details
            </span>

            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 font-mono text-[9px] uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Unit Duration</th>
                    <th className="p-3 text-right">Daily Rate</th>
                    <th className="p-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3">
                      <span className="font-bold block text-slate-900">{booking.carName}</span>
                      <span className="text-[10px] text-slate-500">Premium Fleet Category Rental</span>
                    </td>
                    <td className="p-3 text-center text-slate-700 font-mono">{booking.totalDays} Days</td>
                    <td className="p-3 text-right text-slate-700 font-mono">₹{Math.round(carRentalFee / booking.totalDays).toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-bold text-slate-900 font-mono">₹{carRentalFee.toLocaleString('en-IN')}</td>
                  </tr>
                  {hasDriver && (
                    <tr>
                      <td className="p-3">
                        <span className="font-bold block text-slate-900">Professional Pilot Concierge</span>
                        <span className="text-[10px] text-slate-500">Assigned: {booking.driverName}</span>
                      </td>
                      <td className="p-3 text-center text-slate-700 font-mono">{booking.totalDays} Days</td>
                      <td className="p-3 text-right text-slate-700 font-mono">₹3,300</td>
                      <td className="p-3 text-right font-bold text-slate-900 font-mono">₹{driverDaysFee.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-700">Administrative Setup Fee</td>
                    <td className="p-3 text-center text-slate-400">Included</td>
                    <td className="p-3 text-right text-slate-400">₹0</td>
                    <td className="p-3 text-right text-slate-500 font-mono">₹0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 border-t border-slate-100 pt-6">
            <div className="text-left space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">System Ledger Verification</span>
              <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 w-fit">
                <Landmark className="h-4 w-4" />
                <span>Verified Escrow Deposit Success</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-right font-mono min-w-[200px] space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Items Subtotal:</span>
                <span>₹{booking.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500 border-b border-slate-200 pb-1.5">
                <span>GST Tax (Included):</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-sm pt-1.5">
                <span>Total Paid (INR):</span>
                <span className="text-emerald-600">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Signature and legal text */}
          <div className="border-t border-slate-100 pt-6 flex justify-between items-end text-[10px] text-slate-500 leading-normal">
            <div>
              <p>Thank you for choosing Velocity Premium.</p>
              <p className="text-[9px] text-slate-400">All bookings are subject to standard terms and cancellation clauses.</p>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Approved Operations Officer</div>
              <div className="h-10 w-24 border-b border-slate-300 flex items-center justify-center italic text-slate-400 text-xs">
                Marcus Aurelius
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom control bar */}
        <div className="bg-slate-50 px-6 py-4 flex justify-end space-x-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors text-xs cursor-pointer"
          >
            Close Receipt
          </button>
        </div>

      </div>
    </div>
  );
}
