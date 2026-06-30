'use client';
import Link from 'next/link';

export default function TicketResaleMarketplace() {
  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] min-h-screen font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 md:px-[64px] w-full max-w-[1440px] mx-auto h-20 bg-[#f8f9fb] shadow-sm">
        <div className="flex items-center gap-[32px]">
          <Link href="/" className="text-[20px] leading-[1.4] font-bold text-[#000000]">VIVID</Link>
          <nav className="hidden md:flex items-center gap-[24px]">
            <Link className="text-[14px] leading-[1.6] text-[#46464f] hover:text-[#bdc2ff] transition-colors" href="/search">Marketplace</Link>
            <Link className="text-[14px] leading-[1.6] text-[#000000] border-b-2 border-[#000000] font-bold pb-1" href="/search">Ticket Resale</Link>
            <Link className="text-[14px] leading-[1.6] text-[#46464f] hover:text-[#bdc2ff] transition-colors" href="#">Offers</Link>
            <Link className="text-[14px] leading-[1.6] text-[#46464f] hover:text-[#bdc2ff] transition-colors" href="#">Support</Link>
          </nav>
        </div>
        <div className="flex items-center gap-[16px]">
          <button className="text-[14px] leading-[1.6] text-[#46464f] hover:text-[#000000] px-4 py-2 transition-all duration-200 active:scale-95">Sign In</button>
          <button className="bg-[#050A44] text-[#ffffff] px-6 py-2.5 rounded-lg text-[14px] leading-[1.2] tracking-[0.01em] font-semibold transition-all duration-200 active:scale-95 shadow-sm">Register</button>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 md:px-[64px] py-[32px]">
        {/* Hero Section / Sell CTA */}
        <section className="mb-[48px] rounded-[32px] overflow-hidden relative min-h-[320px] flex items-center bg-[#0f144c] p-[32px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#050A44] via-[#050A44]/80 to-transparent z-0"></div>
          <img className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" alt="Resale Banner" />
          <div className="relative z-10 max-w-2xl px-[24px]">
            <h1 className="text-[32px] leading-[1.3] font-bold text-[#ffffff] mb-[16px] tracking-tight">Turn Your Unused Tickets Into Cash</h1>
            <p className="text-[16px] leading-[1.6] text-blue-100/80 mb-[32px]">Change of plans? Don't let your seat go empty. List your ticket on the VIVID Marketplace and reach thousands of travelers instantly.</p>
            <button className="bg-[#feb700] text-[#271900] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold py-4 px-10 rounded-full flex items-center gap-[8px] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-black/20">
              <span className="material-symbols-outlined">sell</span>Sell Your Ticket
            </button>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-[24px] items-end mb-[32px]">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-[16px] w-full">
            <div className="flex flex-col gap-[4px]">
              <label className="text-[12px] leading-[1.2] font-medium text-[#46464f]">From</label>
              <div className="flex items-center gap-[8px] bg-[#ffffff] border border-[#c7c5d1] rounded-xl p-3 px-4 focus-within:border-[#000000] transition-colors">
                <span className="material-symbols-outlined text-[#777680]">location_on</span>
                <input className="w-full bg-transparent border-none focus:ring-0 p-0 text-[14px] leading-[1.6] outline-none" placeholder="Departure City" type="text" />
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <label className="text-[12px] leading-[1.2] font-medium text-[#46464f]">To</label>
              <div className="flex items-center gap-[8px] bg-[#ffffff] border border-[#c7c5d1] rounded-xl p-3 px-4 focus-within:border-[#000000] transition-colors">
                <span className="material-symbols-outlined text-[#777680]">directions_bus</span>
                <input className="w-full bg-transparent border-none focus:ring-0 p-0 text-[14px] leading-[1.6] outline-none" placeholder="Arrival City" type="text" />
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <label className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Travel Date</label>
              <div className="flex items-center gap-[8px] bg-[#ffffff] border border-[#c7c5d1] rounded-xl p-3 px-4 focus-within:border-[#000000] transition-colors">
                <span className="material-symbols-outlined text-[#777680]">calendar_today</span>
                <input className="w-full bg-transparent border-none focus:ring-0 p-0 text-[14px] leading-[1.6] outline-none" type="date" />
              </div>
            </div>
          </div>
          <button className="text-[#ffffff] rounded-xl px-8 py-3.5 h-[50px] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-[8px] hover:opacity-90 transition-opacity bg-[#050A44]">
            <span className="material-symbols-outlined">search</span>
            Search Resale
          </button>
        </div>

        {/* Marketplace Results */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px]">
          {/* Sidebar Filters */}
          <aside className="hidden md:block col-span-1 space-y-[32px]">
            <div>
              <h3 className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold mb-[16px] text-[#000000]">Operators</h3>
              <div className="space-y-[8px]">
                <label className="flex items-center gap-[16px] cursor-pointer group">
                  <input className="rounded border-[#c7c5d1] text-[#000000] focus:ring-[#000000] w-5 h-5" type="checkbox" />
                  <span className="text-[14px] leading-[1.6] text-[#46464f] group-hover:text-[#191c1e]">Green Line</span>
                </label>
                <label className="flex items-center gap-[16px] cursor-pointer group">
                  <input className="rounded border-[#c7c5d1] text-[#000000] focus:ring-[#000000] w-5 h-5" type="checkbox" />
                  <span className="text-[14px] leading-[1.6] text-[#46464f] group-hover:text-[#191c1e]">Sakura Paribahan</span>
                </label>
                <label className="flex items-center gap-[16px] cursor-pointer group">
                  <input className="rounded border-[#c7c5d1] text-[#000000] focus:ring-[#000000] w-5 h-5" type="checkbox" />
                  <span className="text-[14px] leading-[1.6] text-[#46464f] group-hover:text-[#191c1e]">Hanif Enterprise</span>
                </label>
                <label className="flex items-center gap-[16px] cursor-pointer group">
                  <input className="rounded border-[#c7c5d1] text-[#000000] focus:ring-[#000000] w-5 h-5" type="checkbox" />
                  <span className="text-[14px] leading-[1.6] text-[#46464f] group-hover:text-[#191c1e]">Desh Travels</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold mb-[16px] text-[#000000]">Price Range</h3>
              <input className="w-full accent-[#000000] h-1 bg-[#edeef0] rounded-lg appearance-none cursor-pointer" type="range" />
              <div className="flex justify-between mt-[8px] text-[12px] leading-[1.2] font-medium text-[#777680]">
                <span>$10</span>
                <span>$500</span>
              </div>
            </div>
            <div className="bg-[#ffffff] p-[16px] rounded-xl border border-[#c7c5d1] shadow-sm">
              <h4 className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold mb-[4px]">Safety Tip</h4>
              <p className="text-[14px] leading-[1.6] text-[#46464f]">All resale tickets are verified by VIVID and transferred instantly to your account after payment.</p>
            </div>
          </aside>

          {/* Main Results List */}
          <div className="md:col-span-3 space-y-[16px]">
            {/* Ticket Card 1 */}
            <div className="bg-[#ffffff] border border-[#c7c5d1] rounded-xl p-[16px] md:p-[24px] hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between gap-[32px]">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-[24px]">
                    <div className="flex items-center gap-[16px]">
                      <div className="w-12 h-12 rounded-lg bg-[#edeef0] flex items-center justify-center text-[#050A44] font-bold">GL</div>
                      <div>
                        <h4 className="text-[20px] leading-[1.4] font-semibold">Green Line</h4>
                        <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">AC Sleeper</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] mb-[4px]">Seat Number</p>
                      <p className="text-[20px] leading-[1.4] font-semibold text-[#050A44]">A1, A2</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#f2f4f6] rounded-xl p-[24px]">
                    <div className="flex-1">
                      <p className="text-[12px] leading-[1.2] font-medium text-[#777680] uppercase tracking-widest mb-1">Origin</p>
                      <p className="text-[32px] leading-[1.3] font-bold text-[#050A44]">Dhaka</p>
                      <p className="text-[14px] leading-[1.6] font-bold mt-1 text-[#46464f]">08:00 AM</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center border-x border-dashed border-[#c7c5d1] px-[16px]">
                      <span className="material-symbols-outlined text-[#050A44] text-3xl mb-1">directions_bus</span>
                      <div className="flex items-center gap-1 bg-[#ffffff] px-3 py-1 rounded-full border border-[#c7c5d1]">
                        <span className="material-symbols-outlined text-green-600 text-[16px]">verified</span>
                        <span className="text-[10px] font-bold uppercase text-green-600">Verified</span>
                      </div>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-[12px] leading-[1.2] font-medium text-[#777680] uppercase tracking-widest mb-1">Destination</p>
                      <p className="text-[32px] leading-[1.3] font-bold text-[#050A44]">Cox's Bazar</p>
                      <p className="text-[14px] leading-[1.6] font-bold mt-1 text-[#46464f]">05:30 PM</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-64 flex flex-col justify-center items-center md:items-end md:pl-[32px] pt-[24px] md:pt-0">
                  <div className="text-center md:text-right mb-[16px]">
                    <p className="text-[12px] leading-[1.2] font-medium text-[#777680] line-through mb-1">Original: $120.00</p>
                    <div className="flex items-baseline justify-center md:justify-end gap-1">
                      <span className="text-[32px] leading-[1] font-bold text-[#050A44]">$95.00</span>
                      <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-full font-bold">20% OFF</span>
                    </div>
                    <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] mt-2">Listed by @jason_t</p>
                  </div>
                  <Link href="/seat-selection" className="w-full text-center bg-[#050A44] text-[#ffffff] rounded-lg py-4 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:shadow-lg transition-all active:scale-95">Buy Now</Link>
                </div>
              </div>
            </div>

            {/* Ticket Card 2 */}
            <div className="bg-[#ffffff] border border-[#c7c5d1] rounded-[24px] p-[32px] hover:shadow-lg transition-shadow duration-300 relative group overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between gap-[32px]">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-[32px]">
                    <div className="flex items-center gap-[16px]">
                      <div className="w-12 h-12 rounded-full bg-[#edeef0] flex items-center justify-center text-[#000000] font-bold">SK</div>
                      <div>
                        <h4 className="text-[20px] leading-[1.4] font-semibold">Sakura Paribahan</h4>
                        <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Non-AC Coach</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] mb-[4px]">Seat Number</p>
                      <p className="text-[20px] leading-[1.4] font-semibold text-[#000000]">C3</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between relative px-4">
                    <div className="text-center z-10">
                      <p className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold text-[#000000]">DAC</p>
                      <p className="text-[12px] leading-[1.2] font-medium text-[#777680]">Dhaka</p>
                      <p className="text-[14px] leading-[1.6] font-bold mt-[4px]">11:30 PM</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-[24px]">
                      <div className="w-full border-t-2 border-dashed border-[#c7c5d1] relative">
                        <span className="material-symbols-outlined absolute left-1/2 -top-3 -translate-x-1/2 bg-[#ffffff] px-2 text-[#000000]">directions_bus</span>
                      </div>
                      <span className="text-[12px] leading-[1.2] font-medium text-[#777680] mt-[16px]">Verified Listing</span>
                    </div>
                    <div className="text-center z-10">
                      <p className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold text-[#000000]">BAR</p>
                      <p className="text-[12px] leading-[1.2] font-medium text-[#777680]">Barisal</p>
                      <p className="text-[14px] leading-[1.6] font-bold mt-[4px]">06:00 AM</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-64 border-t md:border-t-0 md:border-l border-[#c7c5d1] md:pl-[32px] pt-[32px] md:pt-0 flex flex-col justify-between">
                  <div>
                    <p className="text-[12px] leading-[1.2] font-medium text-[#777680] line-through mb-[4px]">Original: $45.00</p>
                    <div className="flex items-baseline gap-[4px]">
                      <span className="text-[28px] leading-[1] font-bold text-[#000000]">$40.00</span>
                      <span className="text-[12px] leading-[1.2] font-medium text-[#7c5800] font-bold">LAST MINUTE</span>
                    </div>
                    <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] mt-[8px]">Listed by: @sarah_q</p>
                  </div>
                  <Link href="/seat-selection" className="w-full text-center bg-[#050A44] text-[#ffffff] rounded-xl py-3.5 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold mt-[32px] hover:bg-black transition-colors active:scale-95 duration-150">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Ticket Card 3 (Featured/Bento Style) */}
            <div className="bg-[#050A44] text-[#ffffff] rounded-xl p-[32px] flex flex-col md:flex-row gap-[32px] items-center relative overflow-hidden">
              <img className="absolute inset-0 w-full h-full object-cover opacity-10" src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" alt="Coach interior" />
              <div className="z-10 flex-1">
                <span className="bg-[#feb700] text-[#271900] px-3 py-1 rounded-full text-[12px] leading-[1.2] font-medium mb-[16px] inline-block">Flash Deal</span>
                <h3 className="text-[32px] leading-[1.3] font-bold mb-[4px]">Exclusive Executive Class</h3>
                <p className="text-[14px] leading-[1.6] opacity-80 max-w-md">Single seat available for the highly-coveted Midnight Express. 50% lower than counter price.</p>
              </div>
              <div className="z-10 text-center md:text-right">
                <p className="text-[40px] leading-[1] font-bold mb-[16px]">$55.00</p>
                <Link href="/seat-selection" className="inline-block bg-[#ffffff] text-[#000000] rounded-full px-8 py-3 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:bg-[#e1e2e4] transition-colors">Grab Now</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#ffffff] border-t border-[#c7c5d1] mt-[48px]">
        <div className="w-full py-[32px] px-4 md:px-[64px] flex flex-col md:flex-row justify-between items-center max-w-[1440px] mx-auto gap-[24px]">
          <div className="flex flex-col gap-[4px]">
            <span className="text-[20px] leading-[1.4] font-bold text-[#000000]">VIVID</span>
            <p className="text-[14px] leading-[1.6] text-[#46464f]">© 2026 VIVID SaaS. All rights reserved.</p>
          </div>
          <div className="flex gap-[32px]">
            <a className="text-[14px] leading-[1.6] text-[#46464f] hover:text-[#000000] underline" href="#">Privacy Policy</a>
            <a className="text-[14px] leading-[1.6] text-[#46464f] hover:text-[#000000] underline" href="#">Terms of Service</a>
            <a className="text-[14px] leading-[1.6] text-[#46464f] hover:text-[#000000] underline" href="#">Partner Program</a>
            <a className="text-[14px] leading-[1.6] text-[#46464f] hover:text-[#000000] underline" href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
