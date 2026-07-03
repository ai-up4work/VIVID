'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function LayoutEditor() {
  const [selectedType, setSelectedType] = useState('standard');
  const [seatCount] = useState(48);
  const rows = 12;

  return (
    <div className="bg-[#f8f9fb] font-sans text-[#191c1e] min-h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full flex flex-col p-4 gap-1 bg-[#edeef0] shadow-md w-64 z-50">
        <div className="px-2 py-4">
          <h1 className="text-[20px] leading-[1.4] font-bold text-[#000000]">VIVID</h1>
          <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] opacity-70">Operator Console</p>
        </div>
        <div className="mt-6 space-y-2 flex-1">
          <Link className="flex items-center gap-4 px-4 py-2 text-[#46464f] hover:bg-[#e1e2e4] rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-2 bg-[#feb700] text-[#6b4b00] rounded-xl font-bold transition-all" href="/operator/fleet">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>directions_bus</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Fleet Management</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-2 text-[#46464f] hover:bg-[#e1e2e4] rounded-xl transition-all" href="/operator/routes">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Schedules</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-2 text-[#46464f] hover:bg-[#e1e2e4] rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined">confirmation_number</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Bookings</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-2 text-[#46464f] hover:bg-[#e1e2e4] rounded-xl transition-all" href="/operator/staff">
            <span className="material-symbols-outlined">support_agent</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Agents</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-2 text-[#46464f] hover:bg-[#e1e2e4] rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined">assessment</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Reports</span>
          </Link>
        </div>
        <div className="mt-auto border-t border-[#c7c5d1] pt-4 space-y-2">
          <Link className="flex items-center gap-4 px-4 py-2 text-[#46464f] hover:bg-[#e1e2e4] rounded-xl transition-all" href="/operator/company">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Settings</span>
          </Link>
          <div className="flex items-center gap-4 px-4 py-4 mt-2 bg-[#e7e8ea] rounded-xl">
            <div className="w-10 h-10 rounded-full bg-[#0f144c] flex items-center justify-center text-[#7a7fbb] font-bold shrink-0">OC</div>
            <div className="overflow-hidden">
              <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold truncate">Operator Console</p>
              <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] truncate">Fleet Manager</p>
            </div>
          </div>
          <Link className="flex items-center gap-4 px-4 py-2 text-[#ba1a1a] font-bold hover:bg-[#ffdad6] rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-[32px] max-w-[1440px] mx-auto flex-1 pb-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-[32px]">
          <div>
            <nav className="flex items-center gap-1 text-[#46464f] mb-1">
              <span className="text-[12px] leading-[1.2] font-medium">Fleet Management</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-[12px] leading-[1.2] font-medium text-[#000000] font-bold">Layout Editor</span>
            </nav>
            <h2 className="text-[32px] leading-[1.3] font-bold text-[#000000]">Bus Configuration & Layout</h2>
            <p className="text-[14px] leading-[1.6] text-[#46464f]">Design custom seating arrangements for your transatlantic fleet.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button className="flex items-center gap-2 px-[24px] py-2 border border-[#777680] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000] hover:bg-[#edeef0] transition-all active:scale-95">
              <span className="material-symbols-outlined">visibility</span>
              Preview
            </button>
            <button className="flex items-center gap-2 px-[32px] py-2 bg-[#000000] text-[#ffffff] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:opacity-90 transition-all active:scale-95 shadow-sm">
              <span className="material-symbols-outlined">save</span>
              Save Configuration
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          {/* Editor Controls */}
          <div className="col-span-1 lg:col-span-4 space-y-[24px]">
            {/* Details Card */}
            <section className="bg-[#ffffff] p-[24px] rounded-xl shadow-sm border border-[#c7c5d1]">
              <h3 className="text-[20px] leading-[1.4] font-semibold mb-[16px]">Bus Details</h3>
              <div className="space-y-[16px]">
                <div>
                  <label className="text-[12px] leading-[1.2] font-medium block mb-1">Bus Name / ID</label>
                  <input className="w-full px-[16px] py-2 bg-[#edeef0] border border-[#c7c5d1] rounded-xl focus:ring-2 focus:ring-[#000000] outline-none transition-all text-[14px]" placeholder="e.g. Scania Horizon-X" type="text" />
                </div>
                <div>
                  <label className="text-[12px] leading-[1.2] font-medium block mb-1">Registration Number</label>
                  <input className="w-full px-[16px] py-2 bg-[#edeef0] border border-[#c7c5d1] rounded-xl focus:ring-2 focus:ring-[#000000] outline-none transition-all text-[14px]" placeholder="TX-904-B" type="text" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  <div>
                    <label className="text-[12px] leading-[1.2] font-medium block mb-1">Total Capacity</label>
                    <div className="px-[16px] py-2 bg-[#e7e8ea] rounded-xl font-bold text-[#000000] flex items-center justify-between text-[14px]">
                      <span>{seatCount}</span>
                      <span className="material-symbols-outlined text-[18px]">airline_seat_recline_normal</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] leading-[1.2] font-medium block mb-1">Configuration</label>
                    <select className="w-full px-[16px] py-2 bg-[#edeef0] border border-[#c7c5d1] rounded-xl outline-none text-[14px]">
                      <option>2+2 Standard</option>
                      <option>2+1 Executive</option>
                      <option>Sleeper</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Tools Card */}
            <section className="bg-[#ffffff] p-[24px] rounded-xl shadow-sm border border-[#c7c5d1]">
              <h3 className="text-[20px] leading-[1.4] font-semibold mb-[16px]">Layout Tools</h3>
              <div className="space-y-2">
                <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Select Seat Type</p>
                <div className="grid grid-cols-1 gap-2">
                  <button 
                    className={`flex items-center justify-between p-[16px] bg-[#edeef0] rounded-xl border-2 transition-all ${selectedType === 'standard' ? 'border-[#000000]' : 'border-transparent hover:bg-[#e7e8ea]'}`}
                    onClick={() => setSelectedType('standard')}
                  >
                    <div className="flex items-center gap-[16px]">
                      <div className="w-8 h-8 rounded-lg bg-[#f8f9fb] border border-[#777680] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#c7c5d1]">event_seat</span>
                      </div>
                      <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Standard Seat</span>
                    </div>
                    <span className="text-[12px] leading-[1.2] font-medium text-[#46464f]">$0.00</span>
                  </button>
                  
                  <button 
                    className={`flex items-center justify-between p-[16px] bg-[#edeef0] rounded-xl border-2 transition-all ${selectedType === 'premium' ? 'border-[#000000]' : 'border-transparent hover:bg-[#e7e8ea]'}`}
                    onClick={() => setSelectedType('premium')}
                  >
                    <div className="flex items-center gap-[16px]">
                      <div className="w-8 h-8 rounded-lg bg-[#000000] flex items-center justify-center text-[#ffffff] shadow-sm shrink-0">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Premium Seat</span>
                    </div>
                    <span className="text-[12px] leading-[1.2] font-medium text-[#46464f]">+$15.00</span>
                  </button>
                  
                  <button 
                    className={`flex items-center justify-between p-[16px] bg-[#edeef0] rounded-xl border-2 transition-all ${selectedType === 'ladies' ? 'border-[#000000]' : 'border-transparent hover:bg-[#e7e8ea]'}`}
                    onClick={() => setSelectedType('ladies')}
                  >
                    <div className="flex items-center gap-[16px]">
                      <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] shrink-0">
                        <span className="material-symbols-outlined">woman</span>
                      </div>
                      <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Ladies Only</span>
                    </div>
                    <span className="material-symbols-outlined text-[#ba1a1a]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </button>
                </div>
                
                <div className="pt-[16px] mt-[16px] border-t border-[#c7c5d1]">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider mb-2">Edit Dimensions</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-[#e7e8ea] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:bg-[#c7c5d1] transition-all">Add Row</button>
                    <button className="flex-1 py-2 bg-[#e7e8ea] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:bg-[#c7c5d1] transition-all">Remove Row</button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Editor Workspace */}
          <div className="col-span-1 lg:col-span-8">
            <div className="bg-[#f2f4f6] rounded-[48px] p-[32px] border-2 border-dashed border-[#c7c5d1] flex flex-col items-center min-h-[600px]">
              {/* Bus Body Visual */}
              <div className="relative bg-[#ffffff] p-[32px] rounded-[40px] shadow-xl border border-[#c7c5d1] w-full max-w-[480px]">
                {/* Front Driver Area */}
                <div className="flex items-center justify-between mb-[32px] border-b border-[#c7c5d1]/30 pb-[16px]">
                  <div className="w-12 h-12 bg-[#e1e2e4] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#777680]">toys</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-4 bg-[#c7c5d1] rounded-full mb-1"></div>
                    <span className="text-[10px] font-medium text-[#777680] tracking-widest uppercase">Front of Vehicle</span>
                  </div>
                  <div className="w-12 h-12 border-2 border-dashed border-[#c7c5d1] rounded-xl flex items-center justify-center text-[#c7c5d1]">
                    <span className="material-symbols-outlined">door_front</span>
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="grid grid-cols-5 gap-y-4 gap-x-3 mx-auto w-fit">
                  {Array.from({ length: rows }).map((_, r) => (
                    <React.Fragment key={r}>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <React.Fragment key={i}>
                          {i === 2 && <div className="w-12"></div>}
                          <button className="w-12 h-12 rounded-lg bg-[#f8f9fb] border border-[#c7c5d1] hover:border-[#000000] flex items-center justify-center transition-all active:scale-90">
                             <span className="material-symbols-outlined text-[18px] text-[#c7c5d1]">event_seat</span>
                          </button>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </div>

                {/* Tail Area */}
                <div className="mt-[32px] flex items-center justify-center border-t border-[#c7c5d1]/30 pt-[16px]">
                  <span className="text-[10px] font-medium text-[#777680] tracking-widest uppercase">Rear / Engine</span>
                </div>
              </div>

              {/* Layout Presets */}
              <div className="mt-[32px] w-full max-w-[480px] bg-[#edeef0] p-[16px] rounded-xl flex gap-[16px]">
                <div className="flex-1 text-center">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] mb-1">Aisle Layout</p>
                  <div className="flex justify-center gap-1">
                    <span className="w-6 h-6 rounded bg-[#000000] text-[#ffffff] text-[10px] flex items-center justify-center font-bold">2+2</span>
                    <span className="w-6 h-6 rounded bg-[#f8f9fb] border border-[#c7c5d1] text-[#46464f] text-[10px] flex items-center justify-center font-bold">2+1</span>
                    <span className="w-6 h-6 rounded bg-[#f8f9fb] border border-[#c7c5d1] text-[#46464f] text-[10px] flex items-center justify-center font-bold">1+1</span>
                  </div>
                </div>
                <div className="w-px bg-[#c7c5d1] self-stretch"></div>
                <div className="flex-1 text-center">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] mb-1">Deck Level</p>
                  <div className="flex justify-center gap-1">
                    <button className="px-[16px] py-1 bg-[#000000] text-[#ffffff] text-[12px] leading-[1.2] font-medium rounded-lg">Lower</button>
                    <button className="px-[16px] py-1 bg-[#f8f9fb] border border-[#c7c5d1] text-[#46464f] text-[12px] leading-[1.2] font-medium rounded-lg">Upper</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Helper Text */}
            <div className="mt-[16px] flex items-center gap-2 px-[16px] py-2 bg-[#f8f9fb] rounded-xl border border-[#0f144c]/10">
              <span className="material-symbols-outlined text-[#3280f9]">info</span>
              <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Click any seat to change its designation or drag to reorder rows. Right-click to remove a seat.</p>
            </div>
          </div>
        </div>

        {/* Recent Configurations */}
        <section className="mt-[48px]">
          <h3 className="text-[20px] leading-[1.4] font-semibold mb-[24px]">Existing Fleet Layouts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            <div className="col-span-1 bg-[#ffffff] p-[24px] rounded-xl shadow-sm border border-[#c7c5d1] group hover:border-[#000000] transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-[16px]">
                <div className="w-12 h-12 bg-[#feb700] rounded-xl flex items-center justify-center text-[#6b4b00]">
                  <span className="material-symbols-outlined">directions_bus</span>
                </div>
                <span className="px-[16px] py-1 bg-[#e7e8ea] rounded-full text-[12px] leading-[1.2] font-medium">Active</span>
              </div>
              <h4 className="text-[20px] leading-[1.4] font-semibold group-hover:text-[#000000] transition-colors">Executive Liner</h4>
              <p className="text-[#46464f] mb-[16px] text-[14px]">36 Seats • 2+1 Layout</p>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#0f144c] text-[#7a7fbb] text-[10px] flex items-center justify-center">L</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#feb700] text-[#6b4b00] text-[10px] flex items-center justify-center">P</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#c7c5d1] text-[#191c1e] text-[10px] flex items-center justify-center">S</div>
              </div>
            </div>

            <div className="col-span-1 bg-[#ffffff] p-[24px] rounded-xl shadow-sm border border-[#c7c5d1] group hover:border-[#000000] transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-[16px]">
                <div className="w-12 h-12 bg-[#e7e8ea] rounded-xl flex items-center justify-center text-[#777680]">
                  <span className="material-symbols-outlined">bed</span>
                </div>
                <span className="px-[16px] py-1 bg-[#c7c5d1]/20 text-[#46464f] rounded-full text-[12px] leading-[1.2] font-medium">Draft</span>
              </div>
              <h4 className="text-[20px] leading-[1.4] font-semibold">Night Sleeper X</h4>
              <p className="text-[#46464f] mb-[16px] text-[14px]">24 Berths • 1+1 Layout</p>
              <div className="w-full h-2 bg-[#edeef0] rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-[#000000]"></div>
              </div>
            </div>

            <div className="col-span-1 border-2 border-dashed border-[#c7c5d1] rounded-xl flex flex-col items-center justify-center p-[32px] hover:bg-[#edeef0] transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full border-2 border-[#c7c5d1] flex items-center justify-center text-[#c7c5d1] group-hover:text-[#000000] group-hover:border-[#000000] transition-all">
                <span className="material-symbols-outlined text-[32px]">add</span>
              </div>
              <span className="mt-[16px] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#c7c5d1] group-hover:text-[#000000] transition-all">Create New Template</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
