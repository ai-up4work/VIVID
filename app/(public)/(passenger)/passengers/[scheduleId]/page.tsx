'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

// ---------------------------------------------------------------------------
// Same mock trip data as the seat page — swap for a real fetch later.
// ---------------------------------------------------------------------------
interface Trip {
  id: string;
  operator: string;
  operatorInitials: string;
  type: 'AC' | 'Non-AC';
  departureTime: string;
  arrivalTime: string;
  price: number;
  capacity: number;
}

const MOCK_TRIPS: Trip[] = [
  { id: 'sched-1', operator: 'Green Line', operatorInitials: 'GL', type: 'AC', departureTime: '08:00 AM', arrivalTime: '02:30 PM', price: 42, capacity: 4 },
  { id: 'sched-2', operator: 'Sakura Paribahan', operatorInitials: 'SP', type: 'AC', departureTime: '09:00 AM', arrivalTime: '04:10 PM', price: 40, capacity: 4 },
  { id: 'sched-3', operator: 'Hanif Paribahan', operatorInitials: 'HP', type: 'Non-AC', departureTime: '07:00 AM', arrivalTime: '12:00 PM', price: 45, capacity: 4 },
  { id: 'sched-4', operator: 'Shohagh Paribahan', operatorInitials: 'SH', type: 'AC', departureTime: '08:30 AM', arrivalTime: '03:00 PM', price: 50, capacity: 4 },
  { id: 'sched-5', operator: 'Euro Coach', operatorInitials: 'EC', type: 'AC', departureTime: '11:00 AM', arrivalTime: '06:30 PM', price: 60, capacity: 4 },
];

// TODO: wire to real auth/session. When true, skip OTP and show the
// "Verified via account" badge instead — phone/email are pulled from the
// account and locked (read-only) rather than typed + OTP'd.
const MOCK_IS_LOGGED_IN = false;
const MOCK_ACCOUNT_PHONE = '+94 77 123 4567';
const MOCK_ACCOUNT_EMAIL = 'sanduni@example.com';

type Gender = 'Male' | 'Female' | '';

interface Passenger {
  id: string;
  name: string;
  age: string;
  gender: Gender;
}

interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

function useLocalToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const addToast = (message: string, type: ToastItem['type'] = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };
  const ToastHost = () => (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 items-end">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white max-w-xs animate-[fadeIn_0.2s_ease-out] ${
            t.type === 'error' ? 'bg-[#ba1a1a]' : t.type === 'success' ? 'bg-[#006e1c]' : 'bg-[#050a44]'
          }`}
        >
          {t.message}
        </div>
      ))}
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
  return { addToast, ToastHost };
}

function formatDateLabel(iso: string | null) {
  if (!iso) return 'Sun, 03 Sep 2026';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
}

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

const COUNTRY_CODES = [
  { code: '+94', label: 'Sri Lanka' },
  { code: '+91', label: 'India' },
  { code: '+880', label: 'Bangladesh' },
  { code: '+971', label: 'UAE' },
  { code: '+44', label: 'UK' },
  { code: '+1', label: 'US/Canada' },
];

export default function PassengerDetailsPage() {
  const router = useRouter();
  const params = useParams<{ scheduleId: string }>();
  const searchParams = useSearchParams();
  const { addToast, ToastHost } = useLocalToast();

  const from = searchParams.get('from') || 'Bangalore';
  const to = searchParams.get('to') || 'Chennai';
  const date = searchParams.get('date');
  // Pickup / drop-off point were already chosen on the search page — this
  // page just confirms them, it doesn't let you re-pick from the full stop list.
  const pickupPoint = searchParams.get('pickup') || from;
  const pickupTime = searchParams.get('pickupTime') || '';
  const dropPoint = searchParams.get('drop') || to;
  const dropTime = searchParams.get('dropTime') || '';

  const trip = useMemo(() => MOCK_TRIPS.find((t) => t.id === params.scheduleId), [params.scheduleId]);

  const [passengers, setPassengers] = useState<Passenger[]>([
    { id: makeId(), name: '', age: '', gender: '' },
  ]);

  const [countryCode, setCountryCode] = useState('+94');
  const [phone, setPhone] = useState(MOCK_IS_LOGGED_IN ? MOCK_ACCOUNT_PHONE.replace('+94 ', '') : '');
  const [email, setEmail] = useState(MOCK_IS_LOGGED_IN ? MOCK_ACCOUNT_EMAIL : '');
  const [isVerified, setIsVerified] = useState(MOCK_IS_LOGGED_IN);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpCooldown, setOtpCooldown] = useState(0);

  useEffect(() => {
    if (!trip) {
      addToast('That trip is no longer available. Please pick a bus again.', 'error');
      router.push('/search');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip]);

  useEffect(() => {
    if (otpCooldown <= 0) return;
    const t = setTimeout(() => setOtpCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [otpCooldown]);

  const backToSearchHref = `/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}${
    date ? `&date=${encodeURIComponent(date)}` : ''
  }`;

  const capacity = trip?.capacity ?? 4;

  const addPassenger = () => {
    if (passengers.length >= capacity) {
      addToast(`Maximum ${capacity} passengers can be booked at once.`, 'error');
      return;
    }
    setPassengers((prev) => [...prev, { id: makeId(), name: '', age: '', gender: '' }]);
  };

  const removePassenger = (id: string) => {
    setPassengers((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== id)));
  };

  const updatePassenger = (id: string, field: keyof Passenger, value: string) => {
    setPassengers((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const sendOtp = () => {
    if (phone.trim().length < 6) {
      addToast('Enter a valid phone number first.', 'error');
      return;
    }
    setOtpSent(true);
    setOtpCooldown(30);
    addToast(`Verification code sent to ${countryCode} ${phone}`, 'info');
  };

  const confirmOtp = () => {
    if (otpValue.trim().length !== 4) {
      addToast('Enter the 4-digit code sent to your phone.', 'error');
      return;
    }
    // Mock: any 4-digit code passes.
    setIsVerified(true);
    addToast('Phone number verified.', 'success');
  };

  const allPassengersFilled = passengers.every(
    (p) => p.name.trim().length > 1 && p.age.trim().length > 0 && Number(p.age) > 0 && p.gender !== ''
  );
  const contactValid = MOCK_IS_LOGGED_IN
    ? true
    : phone.trim().length >= 6 && email.trim().includes('@') && isVerified;

  const canContinue = allPassengersFilled && contactValid;

  const handleContinue = () => {
    if (!canContinue || !trip) return;
    const payload = encodeURIComponent(
      JSON.stringify(passengers.map((p) => ({ name: p.name, age: p.age, gender: p.gender })))
    );
    const qs = new URLSearchParams({
      from,
      to,
      ...(date ? { date } : {}),
      scheduleId: trip.id,
      pickup: pickupPoint,
      drop: dropPoint,
      contactPhone: `${countryCode}${phone}`,
      contactEmail: email,
    });
    router.push(`/seats/${trip.id}?${qs.toString()}&passengers=${payload}`);
  };

  if (!trip) return null;

  return (
    <React.Fragment>
      <main className="max-w-[1440px] mx-auto px-4 md:px-[64px] py-[32px]">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center space-x-2 text-[12px] font-medium mb-[24px] text-[#46464f]">
          <div className="flex items-center">
            <span className="hover:text-[#000000] cursor-pointer transition-colors" onClick={() => router.push(backToSearchHref)}>
              Search Results
            </span>
            <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
          </div>
          <div className="flex items-center text-[#000000] font-bold">
            <span>Passenger Details</span>
            <span className="material-symbols-outlined text-[16px] mx-1 text-[#46464f]">chevron_right</span>
          </div>
          <div className="flex items-center">
            <span className="opacity-50">Select Seat</span>
            <span className="material-symbols-outlined text-[16px] mx-1 opacity-50">chevron_right</span>
          </div>
          <div className="flex items-center">
            <span className="opacity-50">Payment</span>
          </div>
        </nav>

        <div className="mb-[32px] flex items-center justify-between">
          <div>
            <button onClick={() => router.push(backToSearchHref)} className="flex items-center text-[#000000] font-bold mb-[4px] group">
              <span className="material-symbols-outlined mr-[4px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
              <span className="text-[14px]">Modify Search</span>
            </button>
            <div className="flex flex-wrap items-center space-x-[8px] mt-2">
              <h1 className="text-[20px] font-semibold">{from} to {to}</h1>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c7c5d1]"></span>
              <p className="text-[#46464f] font-medium text-[14px]">{trip.operator} ({trip.type})</p>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c7c5d1]"></span>
              <p className="text-[#46464f] font-medium text-[14px]">{formatDateLabel(date)}</p>
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
          {/* Left: form */}
          <div className="lg:col-span-7 space-y-[24px]">
            {/* Pickup / Drop-off confirmation — read-only, chosen on the search page */}
            <div className="bg-[#ffffff] rounded-xl p-[24px] shadow-sm border border-[#c7c5d1]">
              <div className="flex items-center justify-between mb-[16px]">
                <h2 className="text-[16px] font-semibold">Boarding &amp; Drop-off</h2>
                <button onClick={() => router.push(backToSearchHref)} className="text-[12px] font-bold text-[#050a44] hover:underline">
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between bg-[#f2f4f6] rounded-xl p-[16px]">
                <div>
                  <p className="text-[11px] font-bold text-[#46464f] uppercase tracking-wide mb-1">Pickup</p>
                  <p className="text-[14px] font-bold">{pickupPoint}</p>
                  {pickupTime && <p className="text-[12px] text-[#46464f]">{pickupTime}</p>}
                </div>
                <span className="material-symbols-outlined text-[#777680]">arrow_forward</span>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-[#46464f] uppercase tracking-wide mb-1">Drop-off</p>
                  <p className="text-[14px] font-bold">{dropPoint}</p>
                  {dropTime && <p className="text-[12px] text-[#46464f]">{dropTime}</p>}
                </div>
              </div>
            </div>

            {/* Passenger rows */}
            <div className="bg-[#ffffff] rounded-xl p-[24px] shadow-sm border border-[#c7c5d1]">
              <div className="flex items-center justify-between mb-[20px]">
                <h2 className="text-[16px] font-semibold">Passenger Information</h2>
                <span className="text-[12px] font-medium text-[#46464f]">{passengers.length} / {capacity}</span>
              </div>

              <div className="space-y-[16px]">
                {passengers.map((p, idx) => (
                  <div key={p.id} className="border border-[#e1e2e4] rounded-xl p-[16px]">
                    <div className="flex items-center justify-between mb-[12px]">
                      <span className="text-[12px] font-bold text-[#050a44]">Passenger {idx + 1}</span>
                      {passengers.length > 1 && (
                        <button onClick={() => removePassenger(p.id)} className="text-[#46464f] hover:text-[#ba1a1a] transition-colors">
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-[12px] mb-[12px]">
                      <div>
                        <label className="text-[11px] font-bold text-[#46464f] px-1">Full name</label>
                        <input
                          value={p.name}
                          onChange={(e) => updatePassenger(p.id, 'name', e.target.value)}
                          placeholder="As per ID"
                          className="w-full mt-1 px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44] placeholder:text-[#9a9ba5] placeholder:font-normal"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#46464f] px-1">Age</label>
                        <input
                          value={p.age}
                          onChange={(e) => updatePassenger(p.id, 'age', e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="Years"
                          className="w-full mt-1 px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44] placeholder:text-[#9a9ba5] placeholder:font-normal"
                          type="text"
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#46464f] px-1 mb-1 block">Gender</label>
                      <div className="flex gap-[8px]">
                        {(['Male', 'Female'] as Gender[]).map((g) => (
                          <button
                            key={g}
                            onClick={() => updatePassenger(p.id, 'gender', g)}
                            className={`px-4 py-2 rounded-lg text-[13px] font-bold border transition-colors ${
                              p.gender === g
                                ? 'border-[#050a44] bg-[#050a44] text-white'
                                : 'border-[#e1e2e4] bg-white text-[#46464f] hover:bg-[#f2f4f6]'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addPassenger}
                disabled={passengers.length >= capacity}
                className={`mt-[16px] flex items-center gap-2 text-[13px] font-bold ${
                  passengers.length >= capacity ? 'text-[#c7c5d1] cursor-not-allowed' : 'text-[#050a44] hover:underline'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add another passenger
              </button>
              <p className="mt-[8px] text-[11px] text-[#9a9ba5]">
                Gender is used to show female-only seats on the next step.
              </p>
            </div>

            {/* Contact + verification */}
            <div className="bg-[#ffffff] rounded-xl p-[24px] shadow-sm border border-[#c7c5d1]">
              <h2 className="text-[16px] font-semibold mb-[20px]">Contact &amp; Verification</h2>

              {MOCK_IS_LOGGED_IN ? (
                <div className="flex items-center justify-between bg-[#e8f6ea] border border-[#006e1c]/20 rounded-xl p-[16px]">
                  <div>
                    <p className="text-[14px] font-bold">{MOCK_ACCOUNT_PHONE}</p>
                    <p className="text-[12px] text-[#46464f]">{MOCK_ACCOUNT_EMAIL}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[#006e1c] font-bold text-[12px]">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    Verified via account
                  </div>
                </div>
              ) : (
                <div className="space-y-[16px]">
                  <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-[12px]">
                    <div>
                      <label className="text-[11px] font-bold text-[#46464f] px-1">Code</label>
                      <select
                        value={countryCode}
                        onChange={(e) => {
                          setCountryCode(e.target.value);
                          setIsVerified(false);
                          setOtpSent(false);
                        }}
                        className="w-full mt-1 px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44]"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>{c.code} {c.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#46464f] px-1">Phone number</label>
                      <div className="flex gap-[8px] mt-1">
                        <input
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value.replace(/[^0-9]/g, ''));
                            setIsVerified(false);
                            setOtpSent(false);
                          }}
                          placeholder="77 123 4567"
                          className="flex-1 px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44] placeholder:text-[#9a9ba5] placeholder:font-normal"
                          type="text"
                          inputMode="numeric"
                        />
                        {isVerified ? (
                          <div className="flex items-center gap-1 px-3 rounded-lg bg-[#e8f6ea] text-[#006e1c] font-bold text-[12px] whitespace-nowrap">
                            <span className="material-symbols-outlined text-[18px]">verified</span>
                            Verified
                          </div>
                        ) : (
                          <button
                            onClick={sendOtp}
                            disabled={otpCooldown > 0}
                            className={`px-4 rounded-lg font-bold text-[12px] whitespace-nowrap transition-colors ${
                              otpCooldown > 0
                                ? 'bg-[#e1e2e4] text-[#9a9ba5] cursor-not-allowed'
                                : 'bg-[#050a44] text-white hover:opacity-90'
                            }`}
                          >
                            {otpCooldown > 0 ? `Resend (${otpCooldown}s)` : otpSent ? 'Resend code' : 'Send code'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {otpSent && !isVerified && (
                    <div className="flex items-end gap-[8px]">
                      <div className="flex-1">
                        <label className="text-[11px] font-bold text-[#46464f] px-1">Enter 4-digit code</label>
                        <input
                          value={otpValue}
                          onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                          placeholder="0000"
                          className="w-full mt-1 px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm font-medium tracking-[6px] outline-none focus:ring-1 focus:ring-[#050a44] placeholder:text-[#c7c5d1] placeholder:tracking-[6px]"
                          type="text"
                          inputMode="numeric"
                        />
                      </div>
                      <button
                        onClick={confirmOtp}
                        className="h-[42px] px-4 rounded-lg font-bold text-[12px] bg-[#000000] text-white hover:opacity-90 transition-all"
                      >
                        Verify
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-bold text-[#46464f] px-1">Email address</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full mt-1 px-3 py-2.5 bg-[#f2f4f6] border-none rounded-lg text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44] placeholder:text-[#9a9ba5] placeholder:font-normal"
                      type="email"
                    />
                    <p className="mt-1 text-[11px] text-[#9a9ba5] px-1">Your e-ticket will be sent here.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#ffffff] rounded-xl p-[32px] shadow-lg border border-[#c7c5d1] sticky top-24">
              <h2 className="text-[20px] font-semibold mb-[24px]">Trip Summary</h2>

              <div className="space-y-[16px] mb-[24px] text-[14px]">
                <div className="flex justify-between">
                  <span className="text-[#46464f]">Operator</span>
                  <span className="font-bold">{trip.operator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#46464f]">Bus type</span>
                  <span className="font-bold">{trip.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#46464f]">Passengers</span>
                  <span className="font-bold">{passengers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#46464f]">Fare per seat</span>
                  <span className="font-bold">${trip.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="h-px bg-[#c7c5d1] w-full mb-[24px]"></div>

              <div className="space-y-[8px] mb-[24px]">
                {passengers.map((p, idx) => (
                  <div key={p.id} className="flex items-center justify-between text-[12px] px-1">
                    <span className="text-[#46464f]">
                      {idx + 1}. {p.name || <span className="italic text-[#c7c5d1]">Unnamed passenger</span>}
                    </span>
                    <span className={`font-bold ${p.gender === 'Female' ? 'text-[#c2185b]' : p.gender === 'Male' ? 'text-[#050a44]' : 'text-[#c7c5d1]'}`}>
                      {p.gender || '—'}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleContinue}
                disabled={!canContinue}
                className={`w-full h-14 bg-[#000000] text-[#ffffff] rounded-xl font-bold flex items-center justify-center space-x-[16px] transition-all ${
                  !canContinue ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[0.98]'
                }`}
              >
                <span>Continue to Seat Selection</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              {!canContinue && (
                <p className="text-center text-[11px] font-medium text-[#ba1a1a] mt-[12px]">
                  {!allPassengersFilled
                    ? 'Fill in name, age and gender for every passenger.'
                    : 'Verify your phone number to continue.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <ToastHost />
    </React.Fragment>
  );
}