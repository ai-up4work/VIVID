'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/contexts/BookingContext';
import { useToast } from '@/contexts/ToastContext';
import { AppLayout } from '@/components/AppLayout';

export default function SeatSelectionPage() {
  const router = useRouter();
  const { trips, selectedTripId, selectedSeats, setSelectedSeats } = useBooking();
  const { addToast } = useToast();
  
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    if (!selectedTripId) {
      addToast('Please select a trip first.', 'error');
      router.push('/search');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          addToast('Session expired. Please select your seats again.', 'error');
          setSelectedSeats([]);
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedTripId, router, addToast, setSelectedSeats]);

  const trip = trips.find(t => t.id === selectedTripId);
  
  const seatPrice = trip ? trip.price : 42.00;
  const platformFee = 2.50;
  
  // Use mock booked data for now, ideally this would come from the trip object
  const bookedSeats = ['2B', '2C', '5A', '6A', '8A', '8B', '1C', '4D', '9A'];
  const pendingSeats = ['3A', '4B', '7C', '10D'];

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= 4) {
        addToast("Maximum 4 seats can be booked at once.", "error");
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatClass = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return 'seat-btn seat-booked';
    if (pendingSeats.includes(seatId)) return 'seat-btn seat-pending';
    if (selectedSeats.includes(seatId)) return 'seat-btn seat-selected';
    return 'seat-btn seat-available';
  };

  const renderSeat = (row: number, col: string) => {
    const seatId = `${row}${col}`;
    const isBooked = bookedSeats.includes(seatId);
    const isPending = pendingSeats.includes(seatId);
    
    if (isBooked || isPending) {
      return (
        <div key={seatId} className={getSeatClass(seatId)}>
          {seatId}
        </div>
      );
    }
    
    return (
      <button 
        key={seatId}
        className={getSeatClass(seatId)} 
        onClick={() => toggleSeat(seatId)}
      >
        {seatId}
      </button>
    );
  };

  const basePrice = selectedSeats.length * seatPrice;
  const discount = promoApplied ? basePrice * 0.1 : 0;
  const totalPrice = selectedSeats.length > 0 ? basePrice - discount + platformFee : 0;

  const applyPromo = () => {
    if (promoApplied) {
      setPromoApplied(false);
      addToast('Promo code removed', 'info');
    } else {
      setPromoApplied(true);
      addToast('VIVIDFIRST promo applied! 10% off.', 'success');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!trip) return null;

  return (
    <AppLayout>
      <main className="max-w-[1440px] mx-auto px-4 md:px-[64px] py-[32px]">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center space-x-2 text-[12px] font-medium mb-[24px] text-[#46464f]">
          <div className="flex items-center">
            <span className="hover:text-[#000000] cursor-pointer transition-colors" onClick={() => router.push('/search')}>Search Results</span>
            <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
          </div>
          <div className="flex items-center text-[#000000] font-bold">
            <span>Select Seat</span>
            <span className="material-symbols-outlined text-[16px] mx-1 text-[#46464f]">chevron_right</span>
          </div>
          <div className="flex items-center">
            <span className="opacity-50">Passenger Details</span>
            <span className="material-symbols-outlined text-[16px] mx-1 opacity-50">chevron_right</span>
          </div>
          <div className="flex items-center">
            <span className="opacity-50">Payment</span>
          </div>
        </nav>

        {/* Booking Path Header */}
        <div className="mb-[32px] flex items-center justify-between">
          <div>
            <button onClick={() => router.push('/search')} className="flex items-center text-[#000000] font-bold mb-[4px] group">
              <span className="material-symbols-outlined mr-[4px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
              <span className="text-[14px]">Modify Search</span>
            </button>
            <div className="flex flex-wrap items-center space-x-[8px] mt-2">
              <h1 className="text-[20px] font-semibold">{trip.originCity.split(',')[0]} to {trip.destinationCity.split(',')[0]}</h1>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c7c5d1]"></span>
              <p className="text-[#46464f] font-medium text-[14px]">{trip.operator} ({trip.type})</p>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c7c5d1]"></span>
              <p className="text-[#46464f] font-medium text-[14px]">Sun, 03 Sep 2026</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-[16px]">
            <div className="flex flex-col items-end">
              <span className="text-[12px] font-medium text-[#46464f]">Departure</span>
              <span className="text-[14px] font-bold">{trip.departureTime}</span>
            </div>
            <span className="material-symbols-outlined text-[#777680]">chevron_right</span>
            <div className="flex flex-col items-start">
              <span className="text-[12px] font-medium text-[#46464f]">Arrival</span>
              <span className="text-[14px] font-bold">{trip.arrivalTime}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          {/* Left: Seat Map Section */}
          <div className="lg:col-span-7 bg-[#ffffff] rounded-xl p-[32px] shadow-sm border border-[#c7c5d1]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[32px] gap-4">
              <h2 className="text-[20px] font-semibold">Select Your Seats</h2>
              <div className="flex flex-wrap gap-y-2 space-x-[16px]">
                <div className="flex items-center space-x-[4px]">
                  <div className="w-4 h-4 rounded-sm border border-[#c7c5d1] bg-transparent"></div>
                  <span className="text-[12px] font-medium text-[#46464f]">Available</span>
                </div>
                <div className="flex items-center space-x-[4px]">
                  <div className="w-4 h-4 rounded-sm bg-[#ff5263]"></div>
                  <span className="text-[12px] font-medium text-[#46464f]">Selected</span>
                </div>
                <div className="flex items-center space-x-[4px]">
                  <div className="w-4 h-4 rounded-sm bg-[#ffba20]"></div>
                  <span className="text-[12px] font-medium text-[#46464f]">Pending</span>
                </div>
                <div className="flex items-center space-x-[4px]">
                  <div className="w-4 h-4 rounded-sm bg-[#e1e2e4]"></div>
                  <span className="text-[12px] font-medium text-[#46464f]">Booked</span>
                </div>
              </div>
            </div>

            <div className="max-w-[420px] mx-auto py-[24px] px-[32px] border-4 border-[#050a44]/10 rounded-[48px] bg-[#f2f4f6]">
              {/* Column Headers */}
              <div className="seat-grid-new mb-8">
                <div></div>
                <div className="text-center text-[#46464f] text-[11px] font-bold">A</div>
                <div className="text-center text-[#46464f] text-[11px] font-bold">B</div>
                <div></div>
                <div className="text-center text-[#46464f] text-[11px] font-bold">C</div>
                <div className="text-center text-[#46464f] text-[11px] font-bold">D</div>
              </div>

              {/* Right-Hand Drive & Entrance Layout */}
              <div className="flex justify-between items-center mb-10 px-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-10 flex items-center justify-center text-[#050a44]/40">
                    <span className="material-symbols-outlined text-3xl">meeting_room</span>
                  </div>
                </div>
                <div className="flex-1 mx-8 h-1 bg-[#c7c5d1] rounded-full"></div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-[#050a44]/30 flex items-center justify-center text-[#050a44] shadow-sm bg-white">
                    <span className="material-symbols-outlined text-3xl">steering</span>
                  </div>
                </div>
              </div>

              {/* Seats Map */}
              <div className="flex flex-col space-y-6">
                <div className="seat-grid-new gap-y-6">
                  {Array.from({ length: 9 }, (_, i) => i + 1).map(row => (
                    <React.Fragment key={row}>
                      <div className="text-[11px] font-bold text-[#46464f] text-center opacity-40">{row}</div>
                      {renderSeat(row, 'A')}
                      {renderSeat(row, 'B')}
                      <div></div>
                      {renderSeat(row, 'C')}
                      {renderSeat(row, 'D')}
                    </React.Fragment>
                  ))}
                </div>

                {/* Separate row 10 for the 5-seat layout */}
                <div className="flex items-center">
                  <div className="text-[11px] font-bold text-[#46464f] text-center opacity-40 w-[24px]">10</div>
                  <div className="flex gap-[12px] ml-[12px]">
                    {renderSeat(10, 'A')}
                    {renderSeat(10, 'B')}
                    {renderSeat(10, 'C')}
                    {renderSeat(10, 'D')}
                    {renderSeat(10, 'E')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Summary Section */}
          <div className="lg:col-span-5">
            <div className="bg-[#ffffff] rounded-xl p-[32px] shadow-lg border border-[#c7c5d1] sticky top-24">
              <h2 className="text-[20px] font-semibold mb-[32px]">Booking Summary</h2>
              
              <div className="space-y-[24px] mb-[32px]">
                <div className="flex justify-between items-center text-[#46464f]">
                  <span className="text-[14px]">Selected Seats</span>
                  <span className="text-[14px] font-bold text-[#000000]">{selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''}</span>
                </div>
                
                <div className="flex flex-wrap gap-[8px] min-h-[40px]">
                  {selectedSeats.length === 0 ? (
                    <p className="text-[#46464f] italic text-sm py-2">Please select seats from the map to proceed.</p>
                  ) : (
                    selectedSeats.map(seat => (
                      <div key={seat} className="px-3 py-1.5 bg-[#000000] text-[#ffffff] rounded-lg font-bold text-xs flex items-center shadow-sm">
                        {seat}
                        <span onClick={() => toggleSeat(seat)} className="material-symbols-outlined text-xs ml-1 cursor-pointer hover:opacity-70" style={{ fontSize: '14px' }}>close</span>
                      </div>
                    ))
                  )}
                </div>

                <div className="h-px bg-[#c7c5d1] w-full"></div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#46464f] font-medium text-[14px]">Price per Seat</span>
                  <span className="text-[14px] font-bold">${seatPrice.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between items-center text-[#006e1c]">
                    <span className="font-medium text-[14px]">Discount (10%)</span>
                    <span className="text-[14px] font-bold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-[#46464f] font-medium text-[14px]">Platform Fee</span>
                  <span className="text-[14px] font-bold">${platformFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-[#f2f4f6] rounded-xl p-[24px] mb-[32px]">
                <div className="flex justify-between items-center">
                  <span className="text-[20px] font-semibold">Total Amount</span>
                  <span className="text-[20px] font-semibold text-[#000000]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-[16px]">
                <div className={`flex items-center p-[16px] border rounded-xl ${timeLeft < 60 ? 'bg-[#ffdad6]/50 border-[#ba1a1a]/20' : 'bg-[#feb700]/10 border-[#feb700]/20'}`}>
                  <span className={`material-symbols-outlined mr-[8px] ${timeLeft < 60 ? 'text-[#93000a]' : 'text-[#7c5800]'}`}>timer</span>
                  <p className={`text-[12px] font-medium ${timeLeft < 60 ? 'text-[#93000a]' : 'text-[#6b4b00]'}`}>
                    Seats are held for {formatTime(timeLeft)}
                  </p>
                </div>
                
                <button 
                  onClick={() => router.push('/confirmation')}
                  disabled={selectedSeats.length === 0}
                  className={`w-full h-14 bg-[#000000] text-[#ffffff] rounded-xl font-bold flex items-center justify-center space-x-[16px] transition-all ${selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[0.98]'}`}
                >
                  <span>Proceed to Payment</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                
                <p className="text-center text-[12px] font-medium text-[#46464f] mt-[16px]">
                  By proceeding, you agree to our <a className="text-[#000000] underline" href="#">Terms of Service</a>
                </p>
              </div>
            </div>

            {/* Offers/Promo Card */}
            <div className="mt-[24px] bg-[#e1e2e4] rounded-xl p-[24px] border border-[#c7c5d1] flex items-center justify-between">
              <div className="flex items-center space-x-[16px]">
                <div className="w-10 h-10 bg-[#0f144c] rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#7a7fbb]">sell</span>
                </div>
                <div>
                  <p className="font-bold text-[14px]">VIVIDFIRST</p>
                  <p className="text-[12px] font-medium text-[#46464f]">Get 10% off on your first trip</p>
                </div>
              </div>
              <button onClick={applyPromo} className="text-[#000000] font-bold text-[14px] hover:underline transition-all">
                {promoApplied ? 'Remove' : 'Apply'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
