'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBooking } from '@/contexts/BookingContext';
import { useToast } from '@/contexts/ToastContext';
import { AppLayout } from '@/components/AppLayout';

export default function ConfirmationPage() {
  const router = useRouter();
  const { trips, selectedTripId, selectedSeats, clearBooking } = useBooking();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!selectedTripId || selectedSeats.length === 0) {
      addToast('No booking found in progress.', 'error');
      router.push('/search');
    }
  }, [selectedTripId, selectedSeats, router, addToast]);

  const trip = trips.find((t) => t.id === selectedTripId);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      addToast('Booking confirmed successfully!', 'success');
      clearBooking();
      router.push('/dashboard');
    }, 2000);
  };

  if (!trip || selectedSeats.length === 0) return null;

  const seatPrice = trip.price;
  const platformFee = 2.50;
  const total = (selectedSeats.length * seatPrice) + platformFee;

  return (
    <AppLayout>
      <main className="max-w-[1440px] mx-auto px-4 md:px-[64px] py-[48px]">
        <div className="max-w-3xl mx-auto bg-white rounded-[24px] shadow-lg border border-outline/30 overflow-hidden">
          <div className="bg-primary p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[48px] text-secondary-fixed mb-4">check_circle</span>
              <h1 className="text-3xl font-bold mb-2">Review Your Booking</h1>
              <p className="text-primary-fixed opacity-80 font-medium">Please review the details below before final confirmation.</p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-outline uppercase tracking-wider mb-2">Journey Details</h3>
                  <div className="bg-surface-variant/30 rounded-xl p-4 border border-outline-variant/30">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-2xl font-black text-primary">{trip.originCode}</div>
                        <div className="text-xs font-bold text-on-surface-variant">{trip.originCity}</div>
                        <div className="text-sm font-bold text-primary mt-1">{trip.departureTime}</div>
                      </div>
                      <div className="flex-1 px-4 flex flex-col items-center">
                        <span className="material-symbols-outlined text-outline-variant">directions_bus</span>
                        <div className="w-full h-px border-b-2 border-dashed border-outline-variant/50 my-1"></div>
                        <span className="text-xs font-bold text-on-surface-variant">{trip.duration}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-primary">{trip.destinationCode}</div>
                        <div className="text-xs font-bold text-on-surface-variant">{trip.destinationCity}</div>
                        <div className="text-sm font-bold text-primary mt-1">{trip.arrivalTime}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30 text-sm font-bold">
                      <span className="text-on-surface-variant">{trip.operator}</span>
                      <span className="text-primary">{trip.type}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-outline uppercase tracking-wider mb-2">Passenger Information</h3>
                  <div className="space-y-4">
                    <div className="bg-surface-variant/30 rounded-xl p-4 border border-outline-variant/30">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-outline mb-1 block">Full Name</label>
                          <input type="text" defaultValue="Alexander Doe" className="w-full bg-transparent border-b border-outline/30 pb-1 text-sm font-bold text-primary focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-outline mb-1 block">Phone Number</label>
                          <input type="text" defaultValue="+1 (555) 123-4567" className="w-full bg-transparent border-b border-outline/30 pb-1 text-sm font-bold text-primary focus:outline-none focus:border-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-72 bg-surface-variant/20 rounded-2xl p-6 border border-outline-variant/30 h-fit">
                <h3 className="text-sm font-bold text-primary mb-6">Payment Summary</h3>
                
                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between font-medium">
                    <span className="text-on-surface-variant">Seats ({selectedSeats.join(', ')})</span>
                    <span className="font-bold text-primary">${(selectedSeats.length * seatPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-on-surface-variant">Platform Fee</span>
                    <span className="font-bold text-primary">${platformFee.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-outline/20 pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">Total Amount</span>
                    <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all ${isProcessing ? 'bg-outline-variant text-white cursor-not-allowed' : 'bg-primary text-white hover:opacity-90 hover:shadow-lg active:scale-95'}`}
                >
                  {isProcessing ? (
                    <span className="material-symbols-outlined animate-spin">refresh</span>
                  ) : (
                    <>
                      <span>Confirm & Pay</span>
                      <span className="material-symbols-outlined ml-2">lock</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
