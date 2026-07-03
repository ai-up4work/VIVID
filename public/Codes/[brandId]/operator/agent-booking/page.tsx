'use client';
import React from 'react';
import Link from 'next/link';

export default function AgentBookingCenter() {
  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] min-h-screen flex font-sans">
      {/* Shared SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col p-4 gap-1 bg-[#edeef0] shadow-md w-64 z-50">
        <div className="px-2 py-4">
          <h1 className="text-[20px] leading-[1.4] font-bold text-[#000000]">VIVID</h1>
        </div>
        <div className="flex flex-col gap-1 mt-8">
          {/* Active Tab: New Booking */}
          <Link className="flex items-center gap-4 p-4 bg-[#feb700] text-[#6b4b00] rounded-xl font-bold transition-transform duration-150 active:scale-98" href="#">
            <span className="material-symbols-outlined">confirmation_number</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Bookings</span>
          </Link>
          <Link className="flex items-center gap-4 p-4 text-[#46464f] hover:bg-[#e1e2e4] rounded-xl transition-transform duration-150 active:scale-98" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-4 p-4 text-[#46464f] hover:bg-[#e1e2e4] rounded-xl transition-transform duration-150 active:scale-98" href="/operator/staff">
            <span className="material-symbols-outlined">support_agent</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Agents</span>
          </Link>
          <Link className="flex items-center gap-4 p-4 text-[#46464f] hover:bg-[#e1e2e4] rounded-xl transition-transform duration-150 active:scale-98" href="#">
            <span className="material-symbols-outlined">assessment</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Reports</span>
          </Link>
        </div>
        <div className="mt-auto flex flex-col gap-1 pb-4">
          <div className="flex items-center gap-4 p-4">
            <img alt="Operator Profile" className="w-10 h-10 rounded-full border-2 border-[#000000] object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" />
            <div>
              <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-bold">Operator Console</p>
              <p className="text-xs text-[#46464f]">Fleet Manager</p>
            </div>
          </div>
          <Link className="flex items-center gap-4 p-4 text-[#46464f] hover:bg-[#e1e2e4] rounded-xl" href="/operator/company">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Settings</span>
          </Link>
          <Link className="flex items-center gap-4 p-4 text-[#46464f] hover:bg-[#e1e2e4] rounded-xl" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 min-h-screen p-[32px] flex flex-col gap-[32px] max-w-[1440px] mx-auto w-full pb-[80px]">
        {/* Header & Breadcrumbs */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-widest mb-1">Agent Portal - Back Office</p>
            <h2 className="text-[32px] leading-[1.3] font-bold text-[#000000]">New Ticket Reservation</h2>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <button className="bg-[#e7e8ea] px-[32px] py-[16px] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f] hover:bg-[#e1e2e4] transition-all">
              Reset Form
            </button>
            <button className="bg-[#000000] text-[#ffffff] px-[32px] py-[16px] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-2 shadow-md hover:opacity-90 transition-all active:scale-95">
              <span className="material-symbols-outlined">print</span>
              Print Last Ticket
            </button>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-[32px]">
          {/* Left Column: Booking Details */}
          <section className="col-span-12 lg:col-span-4 flex flex-col gap-[24px]">
            {/* Customer Information Card */}
            <div className="bg-[#ffffff] p-[32px] rounded-xl border border-[#c7c5d1] shadow-sm">
              <h3 className="text-[20px] leading-[1.4] font-semibold mb-[32px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#000000]">person</span>
                Customer Details
              </h3>
              <div className="flex flex-col gap-[24px]">
                <div>
                  <label className="text-[12px] leading-[1.2] font-medium text-[#46464f] block mb-2">Full Name</label>
                  <input className="w-full bg-[#f2f4f6] border-none rounded-xl p-[16px] focus:ring-2 focus:ring-[#000000] text-[14px] leading-[1.6] outline-none" placeholder="e.g. Johnathan Miller" type="text" />
                </div>
                <div>
                  <label className="text-[12px] leading-[1.2] font-medium text-[#46464f] block mb-2">Phone Number</label>
                  <input className="w-full bg-[#f2f4f6] border-none rounded-xl p-[16px] focus:ring-2 focus:ring-[#000000] text-[14px] leading-[1.6] outline-none" placeholder="+1 (555) 000-0000" type="tel" />
                </div>
              </div>
            </div>

            {/* Route & Schedule Card */}
            <div className="bg-[#ffffff] p-[32px] rounded-xl border border-[#c7c5d1] shadow-sm">
              <h3 className="text-[20px] leading-[1.4] font-semibold mb-[32px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#000000]">route</span>
                Trip Information
              </h3>
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col sm:flex-row gap-[16px] items-center">
                  <div className="flex-1 w-full">
                    <label className="text-[12px] leading-[1.2] font-medium text-[#46464f] block mb-2">Source</label>
                    <select className="w-full bg-[#f2f4f6] border-none rounded-xl p-[16px] focus:ring-2 focus:ring-[#000000] text-[14px] leading-[1.6] outline-none">
                      <option>New York (NYC)</option>
                      <option>Philadelphia (PHL)</option>
                      <option>Boston (BOS)</option>
                    </select>
                  </div>
                  <span className="material-symbols-outlined text-[#46464f] sm:mt-6">sync_alt</span>
                  <div className="flex-1 w-full">
                    <label className="text-[12px] leading-[1.2] font-medium text-[#46464f] block mb-2">Destination</label>
                    <select className="w-full bg-[#f2f4f6] border-none rounded-xl p-[16px] focus:ring-2 focus:ring-[#000000] text-[14px] leading-[1.6] outline-none">
                      <option>Washington D.C. (IAD)</option>
                      <option>New York (NYC)</option>
                      <option>Chicago (ORD)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[12px] leading-[1.2] font-medium text-[#46464f] block mb-2">Departure Date & Time</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                    <input className="bg-[#f2f4f6] border-none rounded-xl p-[16px] focus:ring-2 focus:ring-[#000000] text-[14px] leading-[1.6] outline-none w-full" type="date" />
                    <select className="bg-[#f2f4f6] border-none rounded-xl p-[16px] focus:ring-2 focus:ring-[#000000] text-[14px] leading-[1.6] outline-none w-full">
                      <option>08:30 AM</option>
                      <option>11:00 AM</option>
                      <option>02:15 PM</option>
                      <option>06:45 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-[#000000] text-[#ffffff] p-[32px] rounded-xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-[20px] leading-[1.4] font-semibold mb-[32px]">Payment Summary</h3>
                <div className="flex flex-col gap-[16px]">
                  <div className="flex justify-between text-[14px] leading-[1.6]">
                    <span>Base Fare</span>
                    <span>$145.00</span>
                  </div>
                  <div className="flex justify-between text-[14px] leading-[1.6] opacity-80">
                    <span>Service Fee</span>
                    <span>$5.50</span>
                  </div>
                  <div className="h-px bg-white/20 my-1"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[20px] leading-[1.4] font-semibold">Total Amount</span>
                    <span className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-[32px]">$150.50</span>
                  </div>
                </div>
                <div className="mt-[32px] flex flex-col gap-[16px]">
                  <button className="w-full bg-[#feb700] text-[#6b4b00] py-[16px] rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined">payments</span>
                    Process Cash Payment
                  </button>
                  <button className="w-full bg-white/10 hover:bg-white/20 py-[16px] rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined">credit_card</span>
                    Card Transaction
                  </button>
                </div>
              </div>
              {/* Decorative background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
            </div>
          </section>

          {/* Right Column: Visual Seat Map */}
          <section className="col-span-12 lg:col-span-8 flex flex-col gap-[24px]">
            <div className="bg-[#ffffff] p-[32px] rounded-xl border border-[#c7c5d1] shadow-sm flex flex-col min-h-[700px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-[32px] gap-4">
                <div>
                  <h3 className="text-[20px] leading-[1.4] font-semibold">Visual Seat Map</h3>
                  <p className="text-[#46464f] text-[14px] leading-[1.6]">Grand Express Luxury Coach (2-2 Layout)</p>
                </div>
                <div className="flex flex-wrap items-center gap-[32px]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#e7e8ea] rounded border border-[#c7c5d1]"></div>
                    <span className="text-[12px] leading-[1.2] font-medium">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#000000] rounded"></div>
                    <span className="text-[12px] leading-[1.2] font-medium">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#d9dadc] rounded"></div>
                    <span className="text-[12px] leading-[1.2] font-medium text-[#777680]">Booked</span>
                  </div>
                </div>
              </div>
              
              {/* Bus Layout Simulation */}
              <div className="flex-1 flex justify-center items-center bg-[#f2f4f6] rounded-xl p-[48px] relative overflow-hidden">
                {/* The Bus Frame */}
                <div className="bg-white border-2 border-[#c7c5d1] rounded-[48px] w-full max-w-[400px] h-full min-h-[600px] relative p-[32px] shadow-md overflow-hidden flex flex-col">
                  {/* Front Section: Driver */}
                  <div className="flex justify-between items-center mb-[32px] pb-[32px] border-b border-[#c7c5d1]/30 shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[#edeef0] flex items-center justify-center text-[#777680]">
                      <span className="material-symbols-outlined">airline_seat_recline_extra</span>
                    </div>
                    <div className="w-24 h-8 bg-[#e7e8ea] rounded-full flex items-center justify-center text-[10px] font-bold tracking-tighter text-[#c7c5d1]">FRONT WINDSHIELD</div>
                  </div>
                  
                  {/* Seats Grid */}
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar mx-auto">
                    <div className="grid grid-cols-5 gap-y-[16px] gap-x-2">
                      {/* Row 1 */}
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">1A</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">1B</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      <div className="w-12"></div> {/* Aisle */}
                      <button className="w-12 h-12 rounded-xl bg-[#d9dadc] cursor-not-allowed flex flex-col items-center justify-center" disabled>
                        <span className="text-[10px] font-bold text-[#777680]">1C</span>
                        <span className="material-symbols-outlined text-sm text-[#777680]">event_seat</span>
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">1D</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      {/* Row 2 */}
                      <button className="w-12 h-12 rounded-xl bg-[#d9dadc] cursor-not-allowed flex flex-col items-center justify-center" disabled>
                        <span className="text-[10px] font-bold text-[#777680]">2A</span>
                        <span className="material-symbols-outlined text-sm text-[#777680]">event_seat</span>
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">2B</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      <div className="w-12"></div>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">2C</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">2D</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      {/* Row 3 */}
                      <button className="w-12 h-12 rounded-xl bg-[#000000] text-[#ffffff] flex flex-col items-center justify-center shadow-md">
                        <span className="text-[10px] font-bold">3A</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>event_seat</span>
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">3B</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      <div className="w-12"></div>
                      <button className="w-12 h-12 rounded-xl bg-[#d9dadc] cursor-not-allowed flex flex-col items-center justify-center" disabled>
                        <span className="text-[10px] font-bold text-[#777680]">3C</span>
                        <span className="material-symbols-outlined text-sm text-[#777680]">event_seat</span>
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">3D</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      {/* Additional Rows to fill space */}
                       <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">4A</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">4B</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      <div className="w-12"></div>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">4C</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">4D</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      
                       <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">5A</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">5B</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      <div className="w-12"></div>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">5C</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-[#e7e8ea] hover:bg-[#000000]/20 flex flex-col items-center justify-center transition-all group">
                        <span className="text-[10px] font-bold">5D</span>
                        <span className="material-symbols-outlined text-sm">event_seat</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Back Section: Amenities */}
                  <div className="mt-[32px] pt-[32px] border-t border-[#c7c5d1]/30 flex justify-around shrink-0">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-[#c7c5d1] block">wc</span>
                      <span className="text-[8px] font-bold uppercase text-[#c7c5d1]">Restroom</span>
                    </div>
                    <div className="text-center">
                      <span className="material-symbols-outlined text-[#c7c5d1] block">coffee</span>
                      <span className="text-[8px] font-bold uppercase text-[#c7c5d1]">Cafeteria</span>
                    </div>
                  </div>
                </div>
                
                {/* Info Overlay */}
                <div className="absolute top-[16px] right-[16px] bg-white p-[16px] rounded-xl shadow-sm border border-[#c7c5d1] max-w-[150px] hidden sm:block">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Selected Seat</p>
                  <p className="text-[20px] leading-[1.4] font-semibold text-[#000000]">3A</p>
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] mt-[8px]">Status</p>
                  <span className="bg-[#ffdea8] text-[#271900] px-2 py-1 rounded text-[10px] font-bold uppercase block w-fit mt-1">Reserved</span>
                </div>
              </div>
              
              <div className="mt-[32px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#f2f4f6] p-[16px] rounded-xl border border-dashed border-[#c7c5d1]">
                <div className="flex gap-[32px]">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#46464f]">Bus Code</p>
                    <p className="text-[14px] leading-[1.6] text-[#000000] font-bold">V-EX-992</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#46464f]">Bus Type</p>
                    <span className="bg-[#0f144c] text-[#7a7fbb] px-2 py-1 rounded-full text-[10px] font-bold uppercase mt-1 block w-fit">Executive Class AC</span>
                  </div>
                </div>
                <div className="flex gap-[16px]">
                  <span className="material-symbols-outlined text-[#46464f]">wifi</span>
                  <span className="material-symbols-outlined text-[#46464f]">electrical_services</span>
                  <span className="material-symbols-outlined text-[#46464f]">movie</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Recent Logs (Bento Grid Style) */}
        <section className="flex flex-col gap-[24px] mt-[32px]">
          <h3 className="text-[20px] leading-[1.4] font-semibold">Daily Booking Activity</h3>
          <div className="grid grid-cols-12 gap-[24px]">
            <div className="col-span-12 md:col-span-8 bg-[#ffffff] p-[32px] rounded-xl border border-[#c7c5d1] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#c7c5d1]">
                      <th className="pb-[16px] text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Time</th>
                      <th className="pb-[16px] text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Customer</th>
                      <th className="pb-[16px] text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Route</th>
                      <th className="pb-[16px] text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Seat</th>
                      <th className="pb-[16px] text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c7c5d1]/30">
                    <tr>
                      <td className="py-[16px] text-[14px] leading-[1.6]">11:42 AM</td>
                      <td className="py-[16px] text-[14px] leading-[1.6] font-bold">Marcus Thorne</td>
                      <td className="py-[16px] text-[14px] leading-[1.6]">NYC → PHL</td>
                      <td className="py-[16px] text-[14px] leading-[1.6]">12A</td>
                      <td className="py-[16px]"><span className="bg-[#edeef0] text-[#46464f] px-2 py-1 rounded text-[10px] font-bold">CASH</span></td>
                    </tr>
                    <tr>
                      <td className="py-[16px] text-[14px] leading-[1.6]">10:15 AM</td>
                      <td className="py-[16px] text-[14px] leading-[1.6] font-bold">Elena Rodriguez</td>
                      <td className="py-[16px] text-[14px] leading-[1.6]">NYC → IAD</td>
                      <td className="py-[16px] text-[14px] leading-[1.6]">04B</td>
                      <td className="py-[16px]"><span className="bg-[#feb700] text-[#6b4b00] px-2 py-1 rounded text-[10px] font-bold">CARD</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 bg-[#000000] text-[#ffffff] p-[32px] rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold opacity-80 uppercase mb-1">Daily Commission</h4>
                <p className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-[40px]">$1,240.00</p>
              </div>
              <div className="flex items-center gap-[8px] mt-4">
                <span className="material-symbols-outlined text-[#feb700]">trending_up</span>
                <span className="text-[14px] leading-[1.6]">+12% from yesterday</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <footer className="fixed bottom-0 left-64 right-0 w-[calc(100%-16rem)] py-[32px] px-[64px] flex flex-col md:flex-row justify-between items-center max-w-[1440px] mx-auto border-t border-[#c7c5d1] bg-[#f8f9fb] z-40 hidden">
        <p className="text-[14px] leading-[1.6] text-[#46464f]">© 2026 VIVID SaaS. All rights reserved.</p>
        <div className="flex gap-[32px] mt-[16px] md:mt-0">
          <a className="text-[#46464f] hover:text-[#000000] underline text-[14px] leading-[1.6]" href="#">Privacy Policy</a>
          <a className="text-[#46464f] hover:text-[#000000] underline text-[14px] leading-[1.6]" href="#">Terms of Service</a>
          <a className="text-[#46464f] hover:text-[#000000] underline text-[14px] leading-[1.6]" href="#">Partner Program</a>
          <a className="text-[#46464f] hover:text-[#000000] underline text-[14px] leading-[1.6]" href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}
