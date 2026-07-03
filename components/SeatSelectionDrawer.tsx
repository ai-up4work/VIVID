// /components/SeatSelectionDrawer.tsx
'use client';
import React from 'react';

// ---------------------------------------------------------------------------
// Seat inventory - ideally these'd come from the trip/inventory record.
// Split booked seats by passenger gender so the legend can distinguish
// "Booked by Gents" vs "Booked by Ladies".
// ---------------------------------------------------------------------------
export const BOOKED_SEATS_MALE = ['2B', '5A', '6A', '1C', '4D'];
export const BOOKED_SEATS_FEMALE = ['2C', '8A', '8B', '9A'];
export const BOOKED_SEATS = [...BOOKED_SEATS_MALE, ...BOOKED_SEATS_FEMALE];
export const PENDING_SEATS = ['3A', '4B', '7C', '10D'];

// Seats reserved for female passengers only (unbooked, but off-limits to men).
export const FEMALE_ONLY_SEATS = ['1A', '1B', '2A'];

export type Gender = 'Male' | 'Female' | '';

export function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

interface SeatSelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeats: string[];
  onToggleSeat: (seatId: string) => void;
  timeLeft: number;
  seatPrice: number;
  passengerGender: Gender;
  maxSeatsPerBooking: number;
  /**
   * Only set by the "manage an existing booking" flow (changing seats after
   * purchase). When provided, the footer shows a fare adjustment (extra to
   * pay / refund due) against this original seat count instead of a flat
   * total. Leave unset for the normal new-booking flow — behavior there is
   * unchanged.
   */
  originalSeatCount?: number;
  /** Label for the footer button. Defaults to "Done". */
  confirmLabel?: string;
}

export default function SeatSelectionDrawer({
  isOpen,
  onClose,
  selectedSeats,
  onToggleSeat,
  timeLeft,
  seatPrice,
  passengerGender,
  maxSeatsPerBooking,
  originalSeatCount,
  confirmLabel,
}: SeatSelectionDrawerProps) {
  if (!isOpen) return null;

  const isEditingExisting = originalSeatCount !== undefined;
  const deltaCount = isEditingExisting ? selectedSeats.length - (originalSeatCount as number) : 0;
  const deltaAmount = deltaCount * seatPrice;

  const seatBaseClass =
    'h-11 w-11 rounded-lg text-[11px] font-bold flex items-center justify-center border-[1.5px] transition-all duration-150 select-none shrink-0';

  const getSeatClass = (seatId: string) => {
    if (BOOKED_SEATS_MALE.includes(seatId)) {
      return `${seatBaseClass} bg-[#e1e2e4] border-transparent text-[#777680] opacity-60 cursor-not-allowed`;
    }
    if (BOOKED_SEATS_FEMALE.includes(seatId)) {
      return `${seatBaseClass} bg-[#f4a6c6] border-transparent text-[#7a1d47] opacity-80 cursor-not-allowed`;
    }
    if (PENDING_SEATS.includes(seatId)) {
      return `${seatBaseClass} bg-[#feb700]/15 border-[#feb700] text-[#6b4b00] cursor-not-allowed`;
    }
    if (selectedSeats.includes(seatId)) {
      return `${seatBaseClass} bg-[#ff5263] border-[#ff5263] text-white shadow-[0_4px_12px_rgba(255,82,99,0.3)] cursor-pointer`;
    }
    if (FEMALE_ONLY_SEATS.includes(seatId)) {
      return `${seatBaseClass} bg-pink-50 border-pink-300 text-pink-600 cursor-pointer hover:border-pink-500 hover:bg-pink-100`;
    }
    return `${seatBaseClass} bg-transparent border-[#c7c5d1] text-[#46464f] cursor-pointer hover:border-[#ff5263] hover:bg-[#ff5263]/10`;
  };

  const renderSeat = (row: number, col: string) => {
    const seatId = `${row}${col}`;
    const isBookedMale = BOOKED_SEATS_MALE.includes(seatId);
    const isBookedFemale = BOOKED_SEATS_FEMALE.includes(seatId);
    const isPending = PENDING_SEATS.includes(seatId);

    if (isBookedMale || isBookedFemale || isPending) {
      return (
        <div
          key={seatId}
          className={getSeatClass(seatId)}
          title={isPending ? `${seatId} - held by another passenger` : `${seatId} - booked`}
        >
          {seatId}
        </div>
      );
    }

    return (
      <button
        key={seatId}
        type="button"
        className={getSeatClass(seatId)}
        onClick={() => onToggleSeat(seatId)}
        title={FEMALE_ONLY_SEATS.includes(seatId) ? 'Reserved for female passengers' : `${seatId} - available`}
      >
        {seatId}
      </button>
    );
  };

  const drawerPositionClass =
    'absolute inset-x-0 bottom-0 w-full rounded-t-3xl max-h-[88vh] sm:inset-x-auto sm:top-0 sm:right-0 sm:bottom-auto sm:h-full sm:max-h-none sm:rounded-none sm:w-[420px] bg-white shadow-2xl flex flex-col overflow-hidden animate-[slideUp_0.25s_ease-out] sm:animate-[slideIn_0.25s_ease-out]';

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Drawer: bottom sheet on mobile, right-side panel from sm: up.
          No fixed pixel width, sizes itself to content, never forces
          horizontal scrolling. */}
      <div className={drawerPositionClass}>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#c7c5d1]/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-[#0f144c]/10 flex items-center justify-center text-[#050a44]">
              <span className="material-symbols-outlined text-[20px]">event_seat</span>
            </div>
            <div>
              <h2 className="text-[20px] font-bold leading-tight">
                {isEditingExisting ? 'Change Your Seats' : 'Select Your Seats'}
              </h2>
              <p className="text-[12px] text-[#46464f] mt-0.5">Up to {maxSeatsPerBooking} seats per booking</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[#46464f] hover:bg-[#f2f4f6] transition-colors"
            aria-label="Close seat selection"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Live hold countdown */}
        {selectedSeats.length > 0 && !isEditingExisting && (
          <div
            className={`flex items-center gap-2 mx-6 mt-4 px-4 py-3 rounded-xl border text-[12px] font-bold shrink-0 ${
              timeLeft < 60
                ? 'bg-[#ffdad6]/50 border-[#ba1a1a]/20 text-[#93000a]'
                : 'bg-[#feb700]/10 border-[#feb700]/20 text-[#6b4b00]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">timer</span>
            Held for {formatTime(timeLeft)}
          </div>
        )}

        {/* Legend: color-coded seat categories */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 px-6 py-5 border-b border-[#c7c5d1]/30 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm border border-[#c7c5d1] bg-transparent"></div>
            <span className="text-[11px] font-medium text-[#46464f]">Available Seats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-[#ff5263]"></div>
            <span className="text-[11px] font-medium text-[#46464f]">Selected by You</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-[#e1e2e4]"></div>
            <span className="text-[11px] font-medium text-[#46464f]">Booked by Gents</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-[#f4a6c6]"></div>
            <span className="text-[11px] font-medium text-[#46464f]">Booked by Ladies</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm border border-pink-300 bg-pink-50"></div>
            <span className="text-[11px] font-medium text-[#46464f]">Reserved Seats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm border border-[#feb700] bg-[#feb700]/20"></div>
            <span className="text-[11px] font-medium text-[#46464f]">Unavailable Seats</span>
          </div>
        </div>

        {/* Seat map: vertical scroll only, never horizontal */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-6">
          <div className="w-full max-w-[400px] mx-auto py-6 px-6 border-4 border-[#050a44]/10 rounded-[40px] bg-[#f2f4f6]/40">
            {/* Column headers */}
            <div
              className="grid mb-7"
              style={{ gridTemplateColumns: '20px 44px 44px 28px 44px 44px', gap: '10px', alignItems: 'center' }}
            >
              <div></div>
              <div className="text-center text-[#46464f] text-[10px] font-bold">A</div>
              <div className="text-center text-[#46464f] text-[10px] font-bold">B</div>
              <div></div>
              <div className="text-center text-[#46464f] text-[10px] font-bold">C</div>
              <div className="text-center text-[#46464f] text-[10px] font-bold">D</div>
            </div>

            {/* Entrance & driver */}
            <div className="flex justify-between items-center mb-8 px-2">
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-xl bg-[#e7e8ea] flex flex-col items-center justify-center text-[#050a44]/40 border border-[#c7c5d1]/20">
                  <span className="material-symbols-outlined text-[18px]">sensor_door</span>
                </div>
                <span className="text-[8px] font-bold uppercase tracking-wider mt-1 text-[#46464f]/60">Entrance</span>
              </div>
              <div className="flex-1 mx-6 h-px bg-[#c7c5d1]/20 rounded-full"></div>
              <div className="w-11 h-11 shrink-0 rounded-full border-2 border-[#050a44]/30 flex items-center justify-center text-[#050a44] shadow-sm bg-white">
                <span className="material-symbols-outlined text-[22px] leading-none">steering</span>
              </div>
            </div>

            {/* Rows 1-9 */}
            <div
              className="grid"
              style={{ gridTemplateColumns: '20px 44px 44px 28px 44px 44px', columnGap: '10px', rowGap: '18px', alignItems: 'center' }}
            >
              {Array.from({ length: 9 }, (_, i) => i + 1).map((row) => (
                <React.Fragment key={row}>
                  <div className="text-[10px] font-bold text-[#46464f] text-center opacity-40">{row}</div>
                  {renderSeat(row, 'A')}
                  {renderSeat(row, 'B')}
                  <div />
                  {renderSeat(row, 'C')}
                  {renderSeat(row, 'D')}
                </React.Fragment>
              ))}
            </div>

            {/* Row 10: 5-across back row, same column rhythm as above */}
            <div className="flex items-center mt-6">
              <div className="text-[10px] font-bold text-[#46464f] text-center opacity-40 shrink-0" style={{ width: 20 }}>
                10
              </div>
              <div className="flex flex-wrap gap-[10px] ml-[10px]">
                {renderSeat(10, 'A')}
                {renderSeat(10, 'B')}
                {renderSeat(10, 'C')}
                {renderSeat(10, 'D')}
                {renderSeat(10, 'E')}
              </div>
            </div>
          </div>

          {passengerGender === 'Female' && (
            <p className="text-center text-[11px] font-medium text-pink-600 mt-4 px-2">
              Reserved seats are available to you.
            </p>
          )}
        </div>

        {/* Drawer footer */}
        <div className="px-6 py-5 border-t border-[#c7c5d1]/30 bg-white shrink-0">
          <div className="flex flex-wrap gap-2 min-h-[34px] mb-4">
            {selectedSeats.length === 0 ? (
              <p className="text-[#9a9ba5] italic text-sm self-center">No seats selected yet.</p>
            ) : (
              selectedSeats.map((seat) => (
                <div
                  key={seat}
                  className="pl-3 pr-2 py-1.5 bg-black text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-sm"
                >
                  {seat}
                  <span
                    onClick={() => onToggleSeat(seat)}
                    className="material-symbols-outlined cursor-pointer rounded-full hover:opacity-70 transition-opacity"
                    style={{ fontSize: '14px' }}
                  >
                    close
                  </span>
                </div>
              ))
            )}
          </div>

          {isEditingExisting ? (
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[#46464f]">
                {deltaCount === 0 ? 'No fare change' : deltaCount > 0 ? 'Additional fare' : 'Refund due'}
              </span>
              <span className={`text-base font-bold ${deltaCount > 0 ? 'text-[#ba1a1a]' : deltaCount < 0 ? 'text-[#006e1c]' : 'text-black'}`}>
                {deltaCount === 0 ? '$0.00' : `${deltaCount > 0 ? '+' : '-'}$${Math.abs(deltaAmount).toFixed(2)}`}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[#46464f]">
                {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''}
              </span>
              <span className="text-base font-bold text-black">
                ${(selectedSeats.length * seatPrice).toFixed(2)}
              </span>
            </div>
          )}

          <button
            onClick={onClose}
            disabled={selectedSeats.length === 0}
            className={`w-full h-12 bg-black text-white rounded-xl font-bold text-sm transition-all ${
              selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[0.98]'
            }`}
          >
            {confirmLabel ?? (isEditingExisting ? (deltaCount > 0 ? `Pay $${deltaAmount.toFixed(2)} & Confirm` : 'Confirm Change') : 'Done')}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}