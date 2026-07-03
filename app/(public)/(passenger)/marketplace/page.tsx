// app/(public)/(passenger)/marketplace/page.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FLEET_PARTNERS, RESALE_TICKETS } from '@/data/resale-tickets';

// ---------------------------------------------------------------------------
// Restyled to match the rest of the passenger app (search, my-bookings,
// dashboard, seats/payment): navy #050a44 as the primary color, rounded-xl
// cards with border-[#c7c5d1] + shadow-sm, the same badge and button
// treatments used everywhere else, and the same OperatorBadge pattern as
// my-bookings/dashboard instead of one-off colored circles.
//
// Ticket data now lives in @/data/resale-tickets so this list and the
// marketplace/buy/[ticketId] checkout flow can't drift out of sync.
// ---------------------------------------------------------------------------

function OperatorBadge({ initials }: { initials: string }) {
  return (
    <div className="w-11 h-11 rounded-lg bg-[#050a44] text-white flex items-center justify-center text-[13px] font-bold flex-shrink-0">
      {initials}
    </div>
  );
}

export default function TicketResaleMarketplace() {
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');
  const [operatorFilter, setOperatorFilter] = useState<string[]>([]);

  const toggleOperator = (id: string) => {
    setOperatorFilter((prev) => (prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]));
  };

  const filteredTickets = useMemo(() => {
    if (operatorFilter.length === 0) return RESALE_TICKETS;
    const names = FLEET_PARTNERS.filter((f) => operatorFilter.includes(f.id)).map((f) => f.name.toLowerCase());
    return RESALE_TICKETS.filter((t) => names.some((n) => t.operator.toLowerCase().includes(n)));
  }, [operatorFilter]);

  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-[64px] py-[32px]">
      {/* Hero / Sell CTA — same gradient-navy hero treatment as my-bookings */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#050a44] to-[#0a146b] p-[32px] md:p-[40px] text-white shadow-lg mb-[32px]">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)',
            backgroundSize: '18px 18px',
          }}
        />
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-[24px]">
          <div className="space-y-[12px] max-w-lg text-center md:text-left">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffd54a]">
              VIVID Marketplace
            </span>
            <h1 className="text-[28px] md:text-[32px] font-extrabold tracking-tight leading-tight">
              Turn Your Unused Tickets Into Cash
            </h1>
            <p className="text-white/70 text-[14px] md:text-[15px]">
              Change of plans? List your seat on the VIVID Marketplace and reach thousands of travelers instantly.
            </p>
            <button className="mt-[8px] inline-flex items-center gap-[8px] bg-[#feb700] text-[#6b4b00] px-6 py-3 rounded-xl font-bold text-[13px] hover:opacity-90 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[18px]">sell</span>
              Sell Your Ticket
            </button>
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

      {/* Search & Filter Bar — same input treatment as seats/payment pages */}
      <div className="bg-white rounded-xl p-[24px] shadow-sm border border-[#c7c5d1] mb-[32px]">
        <div className="flex flex-col md:flex-row gap-[16px] md:items-end">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-[16px] w-full">
            <div>
              <label className="text-[11px] font-bold text-[#46464f] px-1">From</label>
              <div className="flex items-center gap-[8px] mt-1 bg-[#f2f4f6] rounded-lg px-3 py-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#9a9ba5]">location_on</span>
                <input
                  value={fromQuery}
                  onChange={(e) => setFromQuery(e.target.value)}
                  placeholder="Departure city"
                  className="w-full bg-transparent border-none outline-none text-sm font-medium placeholder:text-[#9a9ba5] placeholder:font-normal"
                  type="text"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#46464f] px-1">To</label>
              <div className="flex items-center gap-[8px] mt-1 bg-[#f2f4f6] rounded-lg px-3 py-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#9a9ba5]">directions_bus</span>
                <input
                  value={toQuery}
                  onChange={(e) => setToQuery(e.target.value)}
                  placeholder="Arrival city"
                  className="w-full bg-transparent border-none outline-none text-sm font-medium placeholder:text-[#9a9ba5] placeholder:font-normal"
                  type="text"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#46464f] px-1">Travel date</label>
              <div className="flex items-center gap-[8px] mt-1 bg-[#f2f4f6] rounded-lg px-3 py-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#9a9ba5]">calendar_today</span>
                <input
                  value={dateQuery}
                  onChange={(e) => setDateQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-sm font-medium"
                  type="date"
                />
              </div>
            </div>
          </div>
          <button className="h-[46px] px-8 bg-[#050a44] text-white rounded-xl font-bold text-[13px] hover:opacity-90 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-[18px]">search</span>
            Search Resale
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px] items-start">
        {/* Sidebar filters */}
        <aside className="hidden md:flex md:col-span-1 flex-col gap-[24px]">
          <div className="bg-white rounded-xl p-[20px] shadow-sm border border-[#c7c5d1]">
            <h3 className="text-[13px] font-bold text-[#050a44] mb-[12px]">Operators</h3>
            <div className="space-y-[10px]">
              {FLEET_PARTNERS.map((partner) => (
                <label key={partner.id} className="flex items-center gap-[12px] cursor-pointer group">
                  <input
                    checked={operatorFilter.includes(partner.id)}
                    onChange={() => toggleOperator(partner.id)}
                    className="rounded border-[#c7c5d1] text-[#050a44] focus:ring-[#050a44] w-4 h-4"
                    type="checkbox"
                  />
                  <span className="text-[13px] font-medium text-[#46464f] group-hover:text-[#050a44]">
                    {partner.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-[20px] shadow-sm border border-[#c7c5d1]">
            <h3 className="text-[13px] font-bold text-[#050a44] mb-[12px]">Price Range</h3>
            <input className="w-full accent-[#050a44] h-1 bg-[#e1e2e4] rounded-lg appearance-none cursor-pointer" type="range" />
            <div className="flex justify-between mt-[8px] text-[11px] font-bold text-[#9a9ba5]">
              <span>$10</span>
              <span>$500</span>
            </div>
          </div>

          <div className="bg-[#f2f4f6] rounded-xl p-[16px] border border-[#e1e2e4]">
            <h4 className="text-[13px] font-bold text-[#050a44] mb-[4px] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">shield</span>
              Safety Tip
            </h4>
            <p className="text-[12px] text-[#46464f] leading-relaxed">
              All resale tickets are verified by VIVID and transferred instantly to your account after payment.
            </p>
          </div>
        </aside>

        {/* Results list */}
        <div className="md:col-span-3 space-y-[16px]">
          {filteredTickets.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#c7c5d1] shadow-sm p-[32px] text-center">
              <p className="text-[13px] text-[#46464f]">No resale tickets match your filters.</p>
              <button
                onClick={() => setOperatorFilter([])}
                className="mt-[12px] text-[#050a44] font-bold text-[13px] hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredTickets.map((ticket) =>
              ticket.featured ? (
                <div
                  key={ticket.id}
                  className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#050a44] to-[#0a146b] text-white p-[24px] flex flex-col md:flex-row items-center gap-[24px] shadow-sm"
                >
                  <img
                    className="absolute inset-0 w-full h-full object-cover opacity-10"
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"
                    alt="Coach interior"
                  />
                  <div className="relative z-10 flex-1">
                    {ticket.tag && (
                      <span className="inline-block bg-[#feb700] text-[#6b4b00] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide mb-[12px]">
                        {ticket.tag}
                      </span>
                    )}
                    <h3 className="text-[22px] font-bold mb-[4px]">Exclusive {ticket.busType}</h3>
                    <p className="text-[13px] text-white/70 max-w-md">
                      Single seat available on {ticket.operator}&apos;s {ticket.from} → {ticket.to} route. Priced well
                      below counter rate.
                    </p>
                  </div>
                  <div className="relative z-10 text-center md:text-right">
                    <p className="text-[32px] font-extrabold mb-[12px]">${ticket.listedPrice.toFixed(2)}</p>
                    <Link
                      href={`/marketplace/buy/${ticket.id}`}
                      className="inline-block bg-white text-[#050a44] rounded-xl px-6 py-3 text-[13px] font-bold hover:opacity-90 transition-all"
                    >
                      Grab Now
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  key={ticket.id}
                  className="bg-white rounded-xl border border-[#c7c5d1] shadow-sm p-[24px] hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-[24px]">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-[16px]">
                        <div className="flex items-center gap-[12px]">
                          <OperatorBadge initials={ticket.operatorInitials} />
                          <div>
                            <h4 className="text-[15px] font-bold text-[#050a44]">{ticket.operator}</h4>
                            <span className="inline-block mt-[2px] bg-[#feb700]/15 text-[#7c5800] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                              {ticket.busType}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] font-bold text-[#46464f] uppercase tracking-wide mb-0.5">Seat</p>
                          <p className="text-[14px] font-bold text-[#050a44]">{ticket.seats}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-[#f2f4f6] rounded-xl p-[16px]">
                        <div>
                          <p className="text-[11px] font-bold text-[#46464f] uppercase tracking-wide mb-1">{ticket.from}</p>
                          <p className="text-[14px] font-bold text-[#050a44]">{ticket.departureTime}</p>
                        </div>
                        <div className="flex flex-col items-center px-[16px]">
                          <span className="material-symbols-outlined text-[#050a44] mb-1">directions_bus</span>
                          <span className="flex items-center gap-1 bg-[#006e1c]/10 text-[#006e1c] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                            <span className="material-symbols-outlined text-[13px]">verified</span>
                            Verified
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] font-bold text-[#46464f] uppercase tracking-wide mb-1">{ticket.to}</p>
                          <p className="text-[14px] font-bold text-[#050a44]">{ticket.arrivalTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-56 flex flex-row md:flex-col justify-between items-center md:items-end md:pl-[24px] md:border-l border-[#e1e2e4] gap-[12px]">
                      <div className="text-center md:text-right">
                        <p className="text-[11px] font-medium text-[#9a9ba5] line-through mb-0.5">
                          ${ticket.originalPrice.toFixed(2)}
                        </p>
                        <div className="flex items-baseline gap-[6px] justify-center md:justify-end">
                          <span className="text-[24px] font-extrabold text-[#050a44]">${ticket.listedPrice.toFixed(2)}</span>
                          {ticket.tag && (
                            <span className="bg-[#006e1c]/10 text-[#006e1c] text-[10px] px-2 py-0.5 rounded-full font-bold">
                              {ticket.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-medium text-[#46464f] mt-1">Listed by {ticket.sellerHandle}</p>
                      </div>
                      <Link
                        href={`/marketplace/buy/${ticket.id}`}
                        className="w-full md:w-auto text-center bg-[#050a44] text-white rounded-xl px-6 py-2.5 text-[13px] font-bold hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </main>
  );
}