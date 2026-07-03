'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useRealtimeSeats, useBookingSeat } from '@/hooks/useRealtimeSeats';
import { AlertCircle, Check, Lock } from 'lucide-react';

interface Seat {
  id: string;
  seat_number: string;
  status: 'available' | 'booked' | 'locked';
}

interface ScheduleInfo {
  id: string;
  departure_time: string;
  base_fare: number;
  bus: { total_seats: number; bus_type: string; registration_number: string };
  route: { from_city: string; to_city: string };
}

export default function SeatSelectionPage() {
  const params = useParams();
  const router = useRouter();
  const brandId = params.brandId as string;
  const scheduleId = params.scheduleId as string;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<ScheduleInfo | null>(null);
  const [branding, setBranding] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();
  const { seats } = useRealtimeSeats(scheduleId);
  const { lockSeats, releaseLock, confirmBooking, isLocking } = useBookingSeat(scheduleId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch branding
        const { data: brandingData } = await supabase
          .from('tenant_branding')
          .select('*')
          .eq('tenant_id', brandId)
          .single();
        setBranding(brandingData);

        // Fetch schedule info
        const { data: scheduleData, error: schedError } = await supabase
          .from('schedules')
          .select(
            `
            id,
            departure_time,
            base_fare,
            bus:buses(total_seats, bus_type, registration_number),
            route:routes(from_city, to_city)
          `
          )
          .eq('id', scheduleId)
          .single();

        if (schedError) throw schedError;
        setSchedule(scheduleData);
      } catch (err) {
        console.error('[v0] Error fetching schedule:', err);
        setError('Failed to load schedule details');
      } finally {
        setLoading(false);
      }
    };

    if (brandId && scheduleId) {
      fetchData();
    }
  }, [brandId, scheduleId, supabase]);

  const toggleSeatSelection = async (seatNumber: string, status: string) => {
    if (status === 'booked' || status === 'locked') return;

    const isSelected = selectedSeats.includes(seatNumber);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleProceedToBooking = async () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }

    try {
      setError(null);
      console.log('[v0] Attempting to lock seats:', selectedSeats);

      const result = await lockSeats(selectedSeats, 300); // 5 minute lock

      if (result.success) {
        console.log('[v0] Seats locked successfully, proceeding to booking');
        // Store selected seats in session
        sessionStorage.setItem(
          'booking_data',
          JSON.stringify({
            scheduleId,
            selectedSeats,
            lockToken: result.lockToken,
          })
        );

        router.push(`/${brandId}/booking-confirmation/${scheduleId}`);
      } else {
        setError('Some seats are no longer available. Please select different seats.');
        setSelectedSeats([]);
      }
    } catch (err) {
      console.error('[v0] Error locking seats:', err);
      setError('Failed to lock seats. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading seat map...</p>
        </div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Failed to load schedule</div>
      </div>
    );
  }

  const totalSeats = schedule.bus.total_seats;
  const seatsPerRow = 4;
  const rows = Math.ceil(totalSeats / seatsPerRow);
  const totalPrice = selectedSeats.length * schedule.base_fare;

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Trip Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-slate-600 text-sm">Route</p>
            <p className="font-semibold">
              {schedule.route.from_city} → {schedule.route.to_city}
            </p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">Time</p>
            <p className="font-semibold">
              {new Date(schedule.departure_time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">Bus</p>
            <p className="font-semibold">{schedule.bus.bus_type}</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">Price/Seat</p>
            <p className="font-semibold">₹{schedule.base_fare}</p>
          </div>
        </div>
      </div>

      {/* Seat Map */}
      <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold mb-6">Select Your Seats</h2>

        {/* Legend */}
        <div className="flex gap-6 mb-8 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 border-2 border-green-500 rounded"></div>
            <span className="text-sm text-slate-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 border-2 border-blue-500 rounded"></div>
            <span className="text-sm text-slate-600">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 border-2 border-gray-400 rounded"></div>
            <span className="text-sm text-slate-600">Booked/Locked</span>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: `repeat(${seatsPerRow}, minmax(50px, 1fr))` }}>
          {Array.from({ length: rows }).map((_, rowIdx) =>
            Array.from({ length: seatsPerRow }).map((_, colIdx) => {
              const seatIdx = rowIdx * seatsPerRow + colIdx;
              if (seatIdx >= totalSeats) return null;

              const seatNum = seatIdx + 1;
              const row = Math.ceil(seatNum / seatsPerRow);
              const col = String.fromCharCode(65 + ((seatNum - 1) % seatsPerRow));
              const seatNumber = `${row}${col}`;

              const seatData = seats.find((s) => s.seat_number === seatNumber);
              const isSelected = selectedSeats.includes(seatNumber);
              const status = seatData?.status || 'available';

              return (
                <button
                  key={seatNumber}
                  onClick={() => toggleSeatSelection(seatNumber, status)}
                  disabled={status === 'booked' || status === 'locked'}
                  className={`
                    h-12 rounded-lg font-semibold text-sm transition flex items-center justify-center
                    ${
                      status === 'booked' || status === 'locked'
                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                        : isSelected
                          ? 'bg-blue-500 text-white border-2 border-blue-600'
                          : 'bg-green-100 text-green-700 border-2 border-green-500 hover:bg-green-200'
                    }
                  `}
                  title={`${seatNumber} - ${status}`}
                >
                  {status === 'locked' ? (
                    <Lock className="w-4 h-4" />
                  ) : isSelected ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    seatNumber
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Summary & Booking */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Seats Selected:</span>
              <span className="font-semibold">{selectedSeats.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Price per Seat:</span>
              <span className="font-semibold">₹{schedule.base_fare}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">₹{totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <p className="text-slate-600 text-sm mb-2">Selected Seats</p>
            <p className="text-xl font-bold text-blue-600 mb-4">
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
            </p>
          </div>
          <button
            onClick={handleProceedToBooking}
            disabled={selectedSeats.length === 0 || isLocking}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {isLocking ? 'Locking Seats...' : 'Proceed to Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}
