// app/(public)/(passenger)/my-bookings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SeatSelectionDrawer, { type Gender } from '@/components/SeatSelectionDrawer';

type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

interface FleetPartner {
  id: string;
  name: string;
  logo: string;
  initials: string;
}

const FLEET_PARTNERS: FleetPartner[] = [
  { id: 'green-line', name: 'Green Line', logo: '/brands/green-line.png', initials: 'GL' },
  { id: 'sakura', name: 'Sakura', logo: '/brands/sakura.png', initials: 'SK' },
  { id: 'hanif', name: 'Hanif', logo: '/brands/hanif.png', initials: 'HF' },
  { id: 'shohagh', name: 'Shohagh', logo: '/brands/shohagh.png', initials: 'SH' },
  { id: 'euro-coach', name: 'Euro Coach', logo: '/brands/euro-coach.png', initials: 'EC' },
];

function findFleetPartner(operatorName: string): FleetPartner | undefined {
  const normalized = operatorName.toLowerCase();
  return FLEET_PARTNERS.find((partner) => normalized.includes(partner.name.toLowerCase()));
}

const CITY_CODES: Record<string, string> = {
  Colombo: 'CMB',
  Kandy: 'KDY',
  'Nuwara Eliya': 'NUE',
  Galle: 'GAL',
  Jaffna: 'JAF',
  Trincomalee: 'TRR',
  Negombo: 'NEG',
  Bangalore: 'BLR',
  Chennai: 'MAA',
};

function cityCode(city: string) {
  return CITY_CODES[city] ?? city.slice(0, 3).toUpperCase();
}

// Refund reference generator — mirrors genBookingRef() on /payment, but with
// a distinct RF- prefix so refund IDs are never confused with booking refs.
function genRefundId() {
  return 'RF-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

interface Booking {
  id: string;
  bookingRef: string;
  operator: string;
  travelClass: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  busNumber: string;
  totalPrice: number;
  status: BookingStatus;
  seats: string[];
  seatPrice: number;
  // Windows around each action, in real life these come from the operator's policy.
  reschedulable: boolean;
  seatsChangeable: boolean;
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk-1',
    bookingRef: 'VVD-7K2Q1P',
    operator: 'Green Line',
    travelClass: 'AC Sleeper (Gold)',
    from: 'Colombo',
    to: 'Kandy',
    date: 'Sat, 12 Jul 2026',
    departureTime: '08:30 AM',
    arrivalTime: '12:15 PM',
    busNumber: 'Bus #8821',
    totalPrice: 86.5,
    status: 'confirmed',
    seats: ['3B'],
    seatPrice: 42,
    reschedulable: true,
    seatsChangeable: true,
  },
  {
    id: 'bk-2',
    bookingRef: 'VVD-XM40QZ',
    operator: 'Sakura Paribahan',
    travelClass: 'AC Sleeper (Platinum)',
    from: 'Colombo',
    to: 'Nuwara Eliya',
    date: 'Thu, 20 Jul 2026',
    departureTime: '02:00 PM',
    arrivalTime: '04:45 PM',
    busNumber: 'Bus #3381',
    totalPrice: 42.5,
    status: 'pending',
    seats: ['5C'],
    seatPrice: 40,
    reschedulable: false,
    seatsChangeable: false,
  },
  {
    id: 'bk-3',
    bookingRef: 'VVD-9H3D7L',
    operator: 'Hanif Paribahan',
    travelClass: 'Non-AC',
    from: 'Negombo',
    to: 'Galle',
    date: 'Mon, 02 Jun 2026',
    departureTime: '07:00 AM',
    arrivalTime: '12:00 PM',
    busNumber: 'Bus #1029',
    totalPrice: 47.5,
    status: 'completed',
    seats: ['6A'],
    seatPrice: 45,
    reschedulable: false,
    seatsChangeable: false,
  },
  {
    id: 'bk-4',
    bookingRef: 'VVD-1QF82R',
    operator: 'Euro Coach',
    travelClass: 'AC Sleeper (Gold)',
    from: 'Colombo',
    to: 'Jaffna',
    date: 'Sun, 25 May 2026',
    departureTime: '11:00 AM',
    arrivalTime: '06:30 PM',
    busNumber: 'Bus #4410',
    totalPrice: 122.5,
    status: 'cancelled',
    seats: ['1C'],
    seatPrice: 60,
    reschedulable: false,
    seatsChangeable: false,
  },
  {
    id: 'bk-5',
    bookingRef: 'VVD-4T9L2W',
    operator: 'Shohagh Paribahan',
    travelClass: 'AC Sleeper (Gold)',
    from: 'Colombo',
    to: 'Trincomalee',
    date: 'Fri, 07 Aug 2026',
    departureTime: '08:30 AM',
    arrivalTime: '03:00 PM',
    busNumber: 'Bus #2207',
    totalPrice: 52.5,
    status: 'completed',
    seats: ['7D'],
    seatPrice: 50,
    reschedulable: false,
    seatsChangeable: false,
  },
];

const STATUS_BADGE: Record<BookingStatus, { label: string; className: string }> = {
  confirmed: { label: 'Confirmed', className: 'bg-[#006e1c]/10 text-[#006e1c]' },
  pending: { label: 'Pending Approval', className: 'bg-[#feb700]/15 text-[#7c5800]' },
  completed: { label: 'Completed', className: 'bg-[#006e1c]/10 text-[#006e1c]' },
  cancelled: { label: 'Cancelled', className: 'bg-[#ba1a1a]/10 text-[#ba1a1a]' },
};

// Reschedule windows on offer — in production this comes from live inventory,
// priced by demand on that departure (a fuller bus costs more to move to).
const RESCHEDULE_OPTIONS = [
  { date: 'Mon, 14 Jul 2026', departureTime: '08:30 AM', priceDelta: 0 },
  { date: 'Wed, 16 Jul 2026', departureTime: '08:30 AM', priceDelta: 8 },
  { date: 'Sat, 19 Jul 2026', departureTime: '10:00 AM', priceDelta: -5 },
];

function OperatorBadge({ operator }: { operator: string }) {
  const partner = findFleetPartner(operator);
  const [imgFailed, setImgFailed] = useState(false);

  const initials =
    partner?.initials ??
    operator
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  if (!partner || imgFailed) {
    return (
      <div className="w-7 h-7 rounded-md bg-[#050a44] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
        {initials}
      </div>
    );
  }

  return (
    <div className="w-7 h-7 rounded-md bg-white border border-[#c7c5d1] flex items-center justify-center flex-shrink-0 overflow-hidden">
      <img
        src={partner.logo}
        alt={`${partner.name} logo`}
        className="w-full h-full object-contain p-0.5"
        onError={() => setImgFailed(true)}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Action bar — cancel/reschedule/change-seats sit in the open, right on the
// ticket stub. Nothing to discover, nothing to click twice to reveal.
// ---------------------------------------------------------------------------
function TicketActionBar({
  booking,
  onChangeSeats,
  onReschedule,
  onCancel,
}: {
  booking: Booking;
  onChangeSeats: () => void;
  onReschedule: () => void;
  onCancel: () => void;
}) {
  if (booking.status !== 'confirmed') return null;

  const actionClass =
    'flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-bold uppercase tracking-wide transition-colors disabled:opacity-30 disabled:cursor-not-allowed';

  return (
    <div className="flex divide-x divide-[#e1e2e4] border-t border-[#e1e2e4] rounded-b-2xl overflow-hidden">
      <button
        onClick={onChangeSeats}
        disabled={!booking.seatsChangeable}
        className={`${actionClass} text-[#050a44] hover:bg-[#f2f4f6]`}
      >
        <span className="material-symbols-outlined text-[18px]">event_seat</span>
        Seats
      </button>
      <button
        onClick={onReschedule}
        disabled={!booking.reschedulable}
        className={`${actionClass} text-[#050a44] hover:bg-[#f2f4f6]`}
      >
        <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
        Reschedule
      </button>
      <button onClick={onCancel} className={`${actionClass} text-[#ba1a1a] hover:bg-[#ba1a1a]/5`}>
        <span className="material-symbols-outlined text-[18px]">cancel</span>
        Cancel
      </button>
    </div>
  );
}

function CancelModal({
  booking,
  isCancelling,
  onConfirm,
  onClose,
}: {
  booking: Booking;
  isCancelling: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-[24px] space-y-[16px]">
        <div className="w-11 h-11 rounded-full bg-[#ba1a1a]/10 flex items-center justify-center text-[#ba1a1a]">
          <span className="material-symbols-outlined text-[22px]">cancel</span>
        </div>
        <div>
          <h3 className="text-[16px] font-bold text-[#050a44]">Cancel this trip?</h3>
          <p className="text-[13px] text-[#46464f] mt-1.5 leading-relaxed">
            {booking.from} → {booking.to} on {booking.date}, seat{booking.seats.length > 1 ? 's' : ''}{' '}
            {booking.seats.join(', ')}. This can't be undone, and refund eligibility depends on the operator's policy.
          </p>
        </div>
        <div className="flex gap-[10px] pt-[4px]">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-[#c7c5d1] font-bold text-[13px] text-[#46464f] hover:bg-[#f2f4f6] transition-colors"
          >
            Keep Booking
          </button>
          <button
            onClick={onConfirm}
            disabled={isCancelling}
            className="flex-1 h-11 rounded-xl bg-[#ba1a1a] text-white font-bold text-[13px] hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {isCancelling ? 'Cancelling…' : 'Cancel Trip'}
          </button>
        </div>
      </div>
    </div>
  );
}

function RescheduleModal({
  booking,
  onConfirm,
  onClose,
}: {
  booking: Booking;
  onConfirm: (option: { date: string; departureTime: string; priceDelta: number }) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedOption = selected !== null ? RESCHEDULE_OPTIONS[selected] : null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-[24px] space-y-[16px]">
        <div>
          <h3 className="text-[16px] font-bold text-[#050a44]">Reschedule your trip</h3>
          <p className="text-[13px] text-[#46464f] mt-1">
            {booking.from} → {booking.to} · {booking.operator}
          </p>
        </div>

        <div className="space-y-[8px]">
          {RESCHEDULE_OPTIONS.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${
                selected === i
                  ? 'border-[#050a44] bg-[#050a44]/5'
                  : 'border-[#e1e2e4] hover:bg-[#f2f4f6]'
              }`}
            >
              <div>
                <p className="text-[13px] font-bold text-[#050a44]">{opt.date}</p>
                <p className="text-[12px] font-semibold text-[#46464f]">{opt.departureTime}</p>
              </div>
              <span
                className={`text-[12px] font-extrabold px-2 py-1 rounded-md ${
                  opt.priceDelta > 0
                    ? 'bg-[#ba1a1a]/10 text-[#ba1a1a]'
                    : opt.priceDelta < 0
                    ? 'bg-[#006e1c]/10 text-[#006e1c]'
                    : 'bg-[#e1e2e4] text-[#46464f]'
                }`}
              >
                {opt.priceDelta === 0 ? 'No change' : `${opt.priceDelta > 0 ? '+' : '-'}$${Math.abs(opt.priceDelta).toFixed(2)}`}
              </span>
            </button>
          ))}
        </div>

        {selectedOption && selectedOption.priceDelta !== 0 && (
          <div
            className={`rounded-xl px-4 py-3 text-[12px] font-semibold ${
              selectedOption.priceDelta > 0
                ? 'bg-[#ba1a1a]/5 text-[#93000a]'
                : 'bg-[#006e1c]/5 text-[#005313]'
            }`}
          >
            {selectedOption.priceDelta > 0
              ? `This slot costs $${selectedOption.priceDelta.toFixed(2)} more — you'll be charged the difference.`
              : `This slot is cheaper — a $${Math.abs(selectedOption.priceDelta).toFixed(2)} refund will be issued.`}
          </div>
        )}

        <div className="flex gap-[10px] pt-[4px]">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-[#c7c5d1] font-bold text-[13px] text-[#46464f] hover:bg-[#f2f4f6] transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => selectedOption && onConfirm(selectedOption)}
            disabled={!selectedOption}
            className="flex-1 h-11 rounded-xl bg-[#050a44] text-white font-bold text-[13px] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {selectedOption && selectedOption.priceDelta > 0
              ? `Pay $${selectedOption.priceDelta.toFixed(2)} & Confirm`
              : 'Confirm New Date'}
          </button>
        </div>
      </div>
    </div>
  );
}

function TicketModal({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 print:relative print:inset-auto print:p-0 print:block">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] print:hidden"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden print:shadow-none print:rounded-none print:max-w-none">
        <div className="bg-gradient-to-br from-[#050a44] to-[#0a146b] p-[24px] text-white flex items-center justify-between print:hidden">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#ffd54a] font-bold">E-Ticket</p>
            <h3 className="text-[18px] font-bold">{booking.bookingRef}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10"
            aria-label="Close ticket"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-[24px] space-y-[20px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#9a9ba5] uppercase">{booking.from}</p>
              <p className="text-[24px] font-extrabold text-[#050a44]">{cityCode(booking.from)}</p>
              <p className="text-[12px] font-medium text-[#46464f]">{booking.departureTime}</p>
            </div>
            <span className="material-symbols-outlined text-[#050a44] text-[22px]">arrow_forward</span>
            <div className="text-right">
              <p className="text-[10px] font-bold text-[#9a9ba5] uppercase">{booking.to}</p>
              <p className="text-[24px] font-extrabold text-[#050a44]">{cityCode(booking.to)}</p>
              <p className="text-[12px] font-medium text-[#46464f]">{booking.arrivalTime}</p>
            </div>
          </div>

          <div className="border-t border-dashed border-[#c7c5d1]" />

          <div className="grid grid-cols-2 gap-[16px] text-[13px]">
            <div>
              <p className="text-[10px] font-bold text-[#9a9ba5] uppercase mb-0.5">Date</p>
              <p className="font-bold text-[#050a44]">{booking.date}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#9a9ba5] uppercase mb-0.5">Operator</p>
              <p className="font-bold text-[#050a44]">{booking.operator}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#9a9ba5] uppercase mb-0.5">Seat{booking.seats.length > 1 ? 's' : ''}</p>
              <p className="font-bold text-[#050a44]">{booking.seats.join(', ')}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#9a9ba5] uppercase mb-0.5">Class</p>
              <p className="font-bold text-[#050a44]">{booking.travelClass}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#9a9ba5] uppercase mb-0.5">Bus</p>
              <p className="font-bold text-[#050a44]">{booking.busNumber}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#9a9ba5] uppercase mb-0.5">Fare Paid</p>
              <p className="font-bold text-[#050a44]">${booking.totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <div className="border-t border-dashed border-[#c7c5d1]" />

          <div className="flex items-center justify-center gap-[3px] py-[8px]">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#050a44]"
                style={{ width: 2, height: (i * 37) % 5 === 0 ? 34 : 20 + ((i * 13) % 14) }}
              />
            ))}
          </div>
          <p className="text-center text-[11px] font-bold text-[#46464f] tracking-widest">{booking.bookingRef}</p>
        </div>

        <div className="px-[24px] pb-[24px] print:hidden">
          <button
            onClick={() => window.print()}
            className="w-full h-12 bg-[#050a44] text-white rounded-xl font-bold text-[13px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print / Save Ticket
          </button>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:relative,
          .print\\:relative * {
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card/wallet helpers — same formatting rules as /payment/page.tsx, so the
// settlement modal below feels identical to the original checkout.
// ---------------------------------------------------------------------------
function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

type PaySettleMethod = 'card' | 'wallet';

// ---------------------------------------------------------------------------
// Settlement modal — any time managing a booking creates money owed (a
// pricier reschedule slot, extra seats), it gets collected here before the
// change takes effect. Refunds don't need this; only charges do — those are
// routed to /refund instead (see confirmCancel / confirmReschedule / confirmSeatChange).
// ---------------------------------------------------------------------------
function PaymentSettleModal({
  amount,
  reason,
  contactPhone,
  onSuccess,
  onClose,
}: {
  amount: number;
  reason: string;
  contactPhone?: string;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [method, setMethod] = useState<PaySettleMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [wallet, setWallet] = useState<'ezcash' | 'mcash' | 'frimi' | ''>('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const cardValid =
    cardNumber.replace(/\s/g, '').length === 16 &&
    cardName.trim().length > 1 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    cvv.length === 3;
  const walletValid = wallet !== '';
  const canPay = method === 'card' ? cardValid : walletValid;

  const handlePay = () => {
    setError('');
    if (!canPay) {
      setError(method === 'card' ? 'Fill in all card details correctly.' : 'Select a wallet provider to continue.');
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => !processing && onClose()} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
        <div className="px-[24px] pt-[24px] pb-[16px] border-b border-[#e1e2e4]">
          <p className="text-[11px] font-bold text-[#46464f] uppercase tracking-wide">{reason}</p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-[16px] font-bold text-[#050a44]">Additional fare due</h3>
            <span className="text-[22px] font-extrabold text-[#050a44]">${amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="px-[24px] py-[20px] space-y-[16px]">
          <div className="flex p-1 bg-[#f2f4f6] rounded-xl border border-[#e1e2e4]/60">
            <button
              onClick={() => setMethod('card')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                method === 'card' ? 'bg-white shadow-sm text-[#050a44] border border-[#e1e2e4]' : 'text-[#46464f]'
              }`}
            >
              Card
            </button>
            <button
              onClick={() => setMethod('wallet')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                method === 'wallet' ? 'bg-white shadow-sm text-[#050a44] border border-[#e1e2e4]' : 'text-[#46464f]'
              }`}
            >
              Mobile Wallet
            </button>
          </div>

          {method === 'card' ? (
            <div className="space-y-[12px]">
              <div>
                <label className="text-[11px] font-bold text-[#46464f] px-1">Card number</label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  inputMode="numeric"
                  className="w-full mt-1 px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44] placeholder:text-[#9a9ba5] placeholder:font-normal"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#46464f] px-1">Name on card</label>
                <input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="As printed on card"
                  className="w-full mt-1 px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44] placeholder:text-[#9a9ba5] placeholder:font-normal"
                />
              </div>
              <div className="grid grid-cols-2 gap-[12px]">
                <div>
                  <label className="text-[11px] font-bold text-[#46464f] px-1">Expiry</label>
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    inputMode="numeric"
                    className="w-full mt-1 px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44] placeholder:text-[#9a9ba5] placeholder:font-normal"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#46464f] px-1">CVV</label>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="123"
                    inputMode="numeric"
                    type="password"
                    className="w-full mt-1 px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44] placeholder:text-[#9a9ba5] placeholder:font-normal"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-[8px]">
              {(
                [
                  { id: 'ezcash', label: 'eZ Cash' },
                  { id: 'mcash', label: 'mCash' },
                  { id: 'frimi', label: 'FriMi' },
                ] as const
              ).map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWallet(w.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-colors ${
                    wallet === w.id ? 'border-[#050a44] bg-[#050a44]/5' : 'border-[#e1e2e4] hover:bg-[#f2f4f6]'
                  }`}
                >
                  <span className="text-sm font-bold">{w.label}</span>
                  <span
                    className={`w-4 h-4 rounded-full border-2 ${
                      wallet === w.id ? 'border-[#050a44] bg-[#050a44]' : 'border-[#c7c5d1]'
                    }`}
                  />
                </button>
              ))}
              {wallet && (
                <p className="text-[11px] text-[#9a9ba5] mt-[8px] px-1">
                  You'll receive a payment prompt on {contactPhone || 'your registered number'} to confirm.
                </p>
              )}
            </div>
          )}

          {error && <p className="text-[11px] font-medium text-[#ba1a1a] text-center">{error}</p>}
        </div>

        <div className="px-[24px] pb-[24px] flex gap-[10px]">
          <button
            onClick={onClose}
            disabled={processing}
            className="flex-1 h-11 rounded-xl border border-[#c7c5d1] font-bold text-[13px] text-[#46464f] hover:bg-[#f2f4f6] disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePay}
            disabled={processing}
            className={`flex-1 h-11 rounded-xl bg-black text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-all ${
              processing ? 'opacity-70 cursor-wait' : 'hover:opacity-90'
            }`}
          >
            {processing ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                Processing…
              </>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<Booking | null>(null);
  const [seatChangeTarget, setSeatChangeTarget] = useState<Booking | null>(null);
  const [ticketTarget, setTicketTarget] = useState<Booking | null>(null);
  const [draftSeats, setDraftSeats] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Any change that costs the passenger more money is held here until it's
  // actually paid — nothing gets applied to the booking until settlement
  // succeeds. Refunds (cancellation, a cheaper reschedule, dropping a seat)
  // skip this and instead hand off to /refund once applied, so the passenger
  // gets the same confirmation surface every time money comes back to them.
  const [settlement, setSettlement] = useState<{
    amount: number;
    reason: string;
    commit: () => void;
  } | null>(null);

  const upcoming = bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending');
  const past = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');
  const rewardsPoints = 4200;
  const pointsToNextReward = 300;
  const rewardsProgress = 85;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Sends the passenger to the shared refund confirmation page. Every refund
  // path (cancel, cheaper reschedule, fewer seats) funnels through here so
  // the amount, reference, and status tracker always look the same.
  const goToRefund = (
    booking: Booking,
    amount: number,
    reason: 'cancelled' | 'rescheduled' | 'seats-changed',
    extra?: { newDate?: string; newSeats?: string }
  ) => {
    const qs = new URLSearchParams({
      ref: booking.bookingRef,
      from: booking.from,
      to: booking.to,
      date: booking.date,
      operator: booking.operator,
      amount: amount.toFixed(2),
      reason,
      refundId: genRefundId(),
      ...(extra?.newDate ? { newDate: extra.newDate } : {}),
      ...(extra?.newSeats ? { newSeats: extra.newSeats } : {}),
    });
    router.push(`/refund?${qs.toString()}`);
  };

  const confirmCancel = () => {
    if (!cancelTarget) return;
    const booking = cancelTarget;
    const id = booking.id;
    setCancellingId(id);
    setTimeout(() => {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)));
      setCancellingId(null);
      setCancelTarget(null);
      // Full fare is refunded on cancellation.
      goToRefund(booking, booking.totalPrice, 'cancelled');
    }, 900);
  };

  const confirmReschedule = (option: { date: string; departureTime: string; priceDelta: number }) => {
    if (!rescheduleTarget) return;
    const booking = rescheduleTarget;
    const id = booking.id;
    const newDate = option.date;
    const newDeparture = option.departureTime;
    const delta = option.priceDelta;

    const applyChange = () => {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, date: newDate, departureTime: newDeparture, totalPrice: b.totalPrice + delta } : b
        )
      );
    };

    setRescheduleTarget(null);

    if (delta > 0) {
      setSettlement({
        amount: delta,
        reason: `Reschedule to ${newDate}`,
        commit: () => {
          applyChange();
          setToast(`Rescheduled to ${newDate} — $${delta.toFixed(2)} charged.`);
        },
      });
    } else if (delta < 0) {
      applyChange();
      goToRefund(booking, Math.abs(delta), 'rescheduled', { newDate });
    } else {
      applyChange();
      setToast(`Rescheduled to ${newDate}.`);
    }
  };

  const openSeatChange = (booking: Booking) => {
    setSeatChangeTarget(booking);
    setDraftSeats(booking.seats);
  };

  const confirmSeatChange = () => {
    if (!seatChangeTarget) return;
    if (draftSeats.length === 0) return; // never leave a booking with no seats

    const booking = seatChangeTarget;
    const id = booking.id;
    const newSeats = draftSeats;
    const delta = (draftSeats.length - booking.seats.length) * booking.seatPrice;

    const applyChange = () => {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, seats: newSeats, totalPrice: b.totalPrice + delta } : b)));
    };

    setSeatChangeTarget(null);

    if (delta > 0) {
      setSettlement({
        amount: delta,
        reason: `Seat change (${newSeats.join(', ')})`,
        commit: () => {
          applyChange();
          setToast(`Seats updated — $${delta.toFixed(2)} charged.`);
        },
      });
    } else if (delta < 0) {
      applyChange();
      goToRefund(booking, Math.abs(delta), 'seats-changed', { newSeats: newSeats.join(',') });
    } else {
      applyChange();
      setToast('Seats updated.');
    }
  };

  const toggleDraftSeat = (seatId: string) => {
    setDraftSeats((prev) => (prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]));
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-[64px] py-[32px]">
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#050a44] text-white px-4 py-3 rounded-xl shadow-lg text-sm font-semibold animate-[fadeIn_0.2s_ease-out]">
          {toast}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-[32px]">
        {/* Main content */}
        <div className="flex-1 space-y-[40px] min-w-0">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#050a44] to-[#0a146b] p-[32px] md:p-[40px] text-white shadow-lg">
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)',
                backgroundSize: '18px 18px',
              }}
            />
            <div className="relative flex flex-col md:flex-row justify-between items-center gap-[24px]">
              <div className="space-y-[12px] max-w-md text-center md:text-left">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffd54a]">
                  VIVID Travel
                </span>
                <h1 className="text-[28px] md:text-[32px] font-extrabold tracking-tight leading-tight">Your Journeys</h1>
                <p className="text-white/70 text-[14px] md:text-[15px]">
                  Manage upcoming travel and review your history with VIVID's premium fleet.
                </p>
                <div className="flex gap-[12px] pt-[8px] justify-center md:justify-start">
                  <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/15">
                    <span className="block text-[10px] uppercase tracking-widest text-[#ffd54a] font-bold">Upcoming</span>
                    <span className="text-[18px] font-bold">{upcoming.length} Trips</span>
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/15">
                    <span className="block text-[10px] uppercase tracking-widest text-[#ffd54a] font-bold">Rewards</span>
                    <span className="text-[18px] font-bold">{(rewardsPoints / 1000).toFixed(1)}k pts</span>
                  </div>
                </div>
              </div>
              <div className="relative w-full md:w-80 h-40 md:h-48 rounded-xl overflow-hidden shadow-xl border-4 border-white/10 flex-shrink-0">
                <img
                  alt="VIVID bus interior"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"
                />
              </div>
            </div>
          </section>

          {/* Upcoming journeys */}
          <section>
            <div className="flex items-center justify-between mb-[16px]">
              <h2 className="text-[18px] font-bold text-[#050a44] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#feb700]">event_upcoming</span>
                Upcoming Journeys
              </h2>
              {upcoming.length > 0 && (
                <button className="text-[#050a44] font-bold text-[12px] hover:underline">View All</button>
              )}
            </div>

            {upcoming.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-[32px] text-center">
                <p className="text-[13px] text-[#46464f]">No upcoming journeys. Time to plan your next trip!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[28px]">
                {upcoming.map((booking) => {
                  const isPending = booking.status === 'pending';
                  const isCancelling = cancellingId === booking.id;

                  return (
                    <div
                      key={booking.id}
                      className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-[#c7c5d1] transition-shadow"
                    >
                      <div className="p-[20px] pb-[16px]">
                        <div className="flex justify-between items-start mb-[16px]">
                          <span
                            className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${STATUS_BADGE[booking.status].className}`}
                          >
                            {STATUS_BADGE[booking.status].label}
                          </span>
                          <span className="text-[#9a9ba5] text-[11px] font-mono tracking-wide">{booking.bookingRef}</span>
                        </div>

                        <div className="flex justify-between items-center relative py-[8px]">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-[#9a9ba5] font-bold uppercase">{booking.from}</span>
                            <span className="text-[22px] font-extrabold text-[#050a44]">{cityCode(booking.from)}</span>
                            <span className="text-[12px] font-medium text-[#46464f]">{booking.departureTime}</span>
                          </div>

                          <div className="flex-1 flex items-center justify-center px-4 relative">
                            <div className="w-full h-px border-t border-dashed border-[#c7c5d1] absolute" />
                            <span
                              className={`material-symbols-outlined bg-white z-10 scale-125 ${
                                isPending ? 'text-[#7c5800]' : 'text-[#050a44]'
                              }`}
                            >
                              {isPending ? 'hourglass_empty' : 'directions_bus'}
                            </span>
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="text-[10px] text-[#9a9ba5] font-bold uppercase">{booking.to}</span>
                            <span className="text-[22px] font-extrabold text-[#050a44]">{cityCode(booking.to)}</span>
                            <span className="text-[12px] font-medium text-[#46464f]">{booking.arrivalTime}</span>
                          </div>
                        </div>

                        <div className="mt-[16px] flex justify-between items-center gap-[12px]">
                          <div className="flex items-center gap-2 min-w-0">
                            <OperatorBadge operator={booking.operator} />
                            <div className="min-w-0">
                              <p className="text-[12px] text-[#46464f] font-medium">
                                {booking.date} · Seat{booking.seats.length > 1 ? 's' : ''} {booking.seats.join(', ')}
                              </p>
                              <p className="text-[12px] text-[#050a44] font-bold truncate">{booking.travelClass}</p>
                            </div>
                          </div>

                          {isPending ? (
                            <button
                              disabled
                              className="bg-[#f2f4f6] text-[#9a9ba5] px-4 py-2.5 rounded-xl font-bold text-[12px] cursor-not-allowed whitespace-nowrap"
                            >
                              Ticket Pending
                            </button>
                          ) : isCancelling ? (
                            <button
                              disabled
                              className="bg-[#e1e2e4] text-[#9a9ba5] px-4 py-2.5 rounded-xl font-bold text-[12px] cursor-not-allowed whitespace-nowrap"
                            >
                              Cancelling…
                            </button>
                          ) : (
                            <button
                              onClick={() => setTicketTarget(booking)}
                              className="bg-[#050a44] text-white px-4 py-2.5 rounded-xl font-bold text-[12px] hover:opacity-90 transition-all flex items-center gap-1.5 whitespace-nowrap"
                            >
                              View Ticket
                              <span className="material-symbols-outlined text-[14px]">confirmation_number</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {booking.status === 'confirmed' && (
                        <>
                          {/* Perforation: this is a ticket stub, not a generic card */}
                          <div className="relative">
                            <div className="absolute -left-[9px] top-0 -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-[#f7f8fa] border border-[#c7c5d1]" />
                            <div className="absolute -right-[9px] top-0 -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-[#f7f8fa] border border-[#c7c5d1]" />
                            <div className="mx-[18px] border-t border-dashed border-[#c7c5d1]" />
                          </div>
                          <TicketActionBar
                            booking={booking}
                            onChangeSeats={() => openSeatChange(booking)}
                            onReschedule={() => setRescheduleTarget(booking)}
                            onCancel={() => setCancelTarget(booking)}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Past bookings */}
          <section>
            <div className="flex items-center justify-between mb-[16px]">
              <h2 className="text-[18px] font-bold text-[#050a44] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#46464f]">history</span>
                Past Bookings
              </h2>
            </div>

            {past.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-[32px] text-center">
                <p className="text-[13px] text-[#46464f]">No past bookings yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-[#c7c5d1]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f2f4f6] border-b border-[#e1e2e4]">
                      <th className="px-6 py-3 font-bold text-[11px] text-[#050a44] uppercase tracking-wider">Route</th>
                      <th className="px-6 py-3 font-bold text-[11px] text-[#050a44] uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 font-bold text-[11px] text-[#050a44] uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 font-bold text-[11px] text-[#050a44] uppercase tracking-wider text-right">Fare</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e1e2e4]">
                    {past.map((booking) => (
                      <tr key={booking.id} className="hover:bg-[#f2f4f6] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            <OperatorBadge operator={booking.operator} />
                            <div className="flex flex-col">
                              <span className="font-bold text-[#050a44] text-[13px]">
                                {booking.from} → {booking.to}
                              </span>
                              <span className="text-[11px] text-[#46464f]">{booking.busNumber}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#46464f] text-[13px] font-medium">{booking.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded uppercase tracking-wider ${STATUS_BADGE[booking.status].className}`}
                          >
                            {STATUS_BADGE[booking.status].label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-[#050a44] text-[13px]">
                          ${booking.totalPrice.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar — informational only now; actions live on the booking they affect */}
        <aside className="w-full lg:w-[300px] flex-shrink-0 space-y-[20px]">
          <div className="bg-white rounded-2xl p-[20px] shadow-sm border border-[#c7c5d1] space-y-[12px] relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-[#feb700] to-[#ffe08a]" />
            <h4 className="font-bold text-[#050a44] text-[14px]">VIVID Rewards</h4>
            <p className="text-[12px] text-[#46464f]">
              You're only <span className="font-bold text-[#050a44]">{pointsToNextReward} pts</span> away from a free Gold-class upgrade!
            </p>
            <div className="w-full bg-[#f2f4f6] h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#feb700] to-[#ffe08a]"
                style={{ width: `${rewardsProgress}%` }}
              />
            </div>
            <button className="text-[#7c5800] text-[11px] font-extrabold uppercase tracking-widest hover:underline">
              Explore Perks →
            </button>
          </div>


          <div className="bg-[#f2f4f6] rounded-2xl p-[20px] border border-[#e1e2e4] space-y-[8px]">
            <h4 className="font-bold text-[#050a44] text-[14px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              Need Help?
            </h4>
            <p className="text-[11px] text-[#46464f] leading-relaxed">
              Our concierge is available 24/7 for booking assistance.
            </p>
            <div className="pt-[4px] space-y-1">
              <a className="text-[#050a44] font-bold text-[13px] block" href="tel:1800VIVID">1-800-VIVID-GO</a>
              <a className="text-[#46464f] text-[11px] underline block" href="mailto:support@vivid.travel">
                support@vivid.travel
              </a>
            </div>
          </div>
        </aside>
      </div>

      {cancelTarget && (
        <CancelModal
          booking={cancelTarget}
          isCancelling={cancellingId === cancelTarget.id}
          onConfirm={confirmCancel}
          onClose={() => setCancelTarget(null)}
        />
      )}

      {rescheduleTarget && (
        <RescheduleModal
          booking={rescheduleTarget}
          onConfirm={confirmReschedule}
          onClose={() => setRescheduleTarget(null)}
        />
      )}

      {seatChangeTarget && (
        <SeatSelectionDrawer
          isOpen={true}
          onClose={confirmSeatChange}
          selectedSeats={draftSeats}
          onToggleSeat={toggleDraftSeat}
          timeLeft={600}
          seatPrice={seatChangeTarget.seatPrice}
          passengerGender={'' as Gender}
          maxSeatsPerBooking={Math.max(seatChangeTarget.seats.length, 1) + 3}
          originalSeatCount={seatChangeTarget.seats.length}
        />
      )}

      {ticketTarget && <TicketModal booking={ticketTarget} onClose={() => setTicketTarget(null)} />}

      {settlement && (
        <PaymentSettleModal
          amount={settlement.amount}
          reason={settlement.reason}
          onSuccess={() => {
            settlement.commit();
            setSettlement(null);
          }}
          onClose={() => setSettlement(null)}
        />
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}