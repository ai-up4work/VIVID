// components/TripResultCard.tsx
'use client';

// ---------------------------------------------------------------------------
// Restyled search-result / trip card to match the rest of the passenger app
// (dashboard, my-bookings, marketplace, seats): navy #050a44 primary color,
// rounded-xl white card with border-[#c7c5d1] + shadow-sm, the same
// OperatorBadge pattern used on dashboard/my-bookings, and the same badge +
// button treatments used everywhere else (bg-[#feb700]/15 class pill,
// bg-[#050a44] CTA button with hover:opacity-90 active:scale-95).
// ---------------------------------------------------------------------------

interface TripResultCardProps {
  operator: string;
  operatorInitials: string;
  busType: 'AC' | 'Non-AC';
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops?: string; // e.g. "Non-stop", "1 stop"
  seatsRemaining: number;
  price: number;
  onViewRoute?: () => void;
  onSelectSeats?: () => void;
}

function OperatorBadge({ initials }: { initials: string }) {
  return (
    <div className="w-11 h-11 rounded-lg bg-[#050a44] text-white flex items-center justify-center text-[13px] font-bold flex-shrink-0">
      {initials}
    </div>
  );
}

export default function TripResultCard({
  operator,
  operatorInitials,
  busType,
  from,
  fromCity,
  to,
  toCity,
  departureTime,
  arrivalTime,
  duration,
  stops = 'Non-stop',
  seatsRemaining,
  price,
  onViewRoute,
  onSelectSeats,
}: TripResultCardProps) {
  const lowSeats = seatsRemaining > 0 && seatsRemaining <= 5;

  return (
    <div className="bg-white rounded-xl border border-[#c7c5d1] shadow-sm p-[24px] hover:shadow-md transition-shadow">
      {/* Header: operator + bus type badge, same layout as marketplace ticket rows */}
      <div className="flex items-center justify-between mb-[20px]">
        <div className="flex items-center gap-[12px]">
          <OperatorBadge initials={operatorInitials} />
          <h4 className="text-[15px] font-bold text-[#050a44]">{operator}</h4>
        </div>
        <span className="inline-block bg-[#feb700]/15 text-[#7c5800] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
          {busType === 'AC' ? 'AC Bus' : 'Non-AC Bus'}
        </span>
      </div>

      {/* Route: city code + time each side, dashed line + bus icon in the
          middle, same bg-[#f2f4f6] rounded-xl treatment as boarding/drop-off
          on the seats page and the CMB/KDY blocks on dashboard + my-bookings */}
      <div className="flex items-center justify-between bg-[#f2f4f6] rounded-xl p-[16px] mb-[16px]">
        <div>
          <p className="text-[11px] font-bold text-[#46464f] uppercase tracking-wide mb-1">{from}</p>
          <p className="text-[20px] font-extrabold text-[#050a44]">{fromCity}</p>
          <p className="text-[12px] font-medium text-[#46464f] mt-0.5">{departureTime}</p>
        </div>

        <div className="flex-1 flex flex-col items-center px-[16px]">
          <p className="text-[11px] font-bold text-[#46464f] mb-1">{duration}</p>
          <div className="w-full border-t border-dashed border-[#c7c5d1] relative">
            <span className="material-symbols-outlined absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f2f4f6] px-1 text-[#050a44] text-[18px]">
              directions_bus
            </span>
          </div>
          <p className="text-[11px] font-bold text-[#46464f] mt-1">{stops}</p>
          {onViewRoute && (
            <button
              onClick={onViewRoute}
              className="text-[10px] font-bold text-[#050a44] hover:underline mt-0.5"
            >
              View Route
            </button>
          )}
        </div>

        <div className="text-right">
          <p className="text-[11px] font-bold text-[#46464f] uppercase tracking-wide mb-1">{to}</p>
          <p className="text-[20px] font-extrabold text-[#050a44]">{toCity}</p>
          <p className="text-[12px] font-medium text-[#46464f] mt-0.5">{arrivalTime}</p>
        </div>
      </div>

      {/* Footer: seats + price + CTA, same button treatment as Buy Now / Grab Now */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[6px] text-[#46464f]">
          <span className="material-symbols-outlined text-[18px]">event_seat</span>
          <span className={`text-[13px] font-bold ${lowSeats ? 'text-[#ba1a1a]' : 'text-[#46464f]'}`}>
            {seatsRemaining} Remaining
          </span>
        </div>

        <div className="flex items-center gap-[16px]">
          <p className="text-[22px] font-extrabold text-[#050a44]">${price.toFixed(2)}</p>
          <button
            onClick={onSelectSeats}
            className="bg-[#050a44] text-white rounded-xl px-6 py-2.5 text-[13px] font-bold hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
          >
            Select Seats
          </button>
        </div>
      </div>
    </div>
  );
}