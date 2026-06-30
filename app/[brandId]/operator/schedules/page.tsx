'use client';
import React from 'react';
import Link from 'next/link';

export default function ScheduleManagement() {
  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] min-h-screen flex font-sans">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#ffffff] border-r border-[#c7c5d1] flex flex-col p-[16px] space-y-[8px] z-50">
        <div className="mb-[32px] px-[8px]">
          <h1 className="text-[20px] leading-[1.4] font-extrabold text-[#000000]">VIVID</h1>
          <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Fleet Management</p>
        </div>
        <div className="flex-1 space-y-[4px] overflow-y-auto">
          <Link className="flex items-center gap-[16px] p-[16px] rounded-xl text-[#46464f] hover:bg-[#f2f4f6] transition-all duration-200" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-[16px] p-[16px] rounded-xl text-[#46464f] hover:bg-[#f2f4f6] transition-all duration-200" href="/operator/fleet">
            <span className="material-symbols-outlined">directions_bus</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Fleet Management</span>
          </Link>
          <Link className="flex items-center gap-[16px] p-[16px] rounded-xl bg-[#feb700] text-[#6b4b00] font-bold translate-x-1 duration-200" href="/operator/schedules">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Route Schedule</span>
          </Link>
          <Link className="flex items-center gap-[16px] p-[16px] rounded-xl text-[#46464f] hover:bg-[#f2f4f6] transition-all duration-200" href="#">
            <span className="material-symbols-outlined">confirmation_number</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Bookings</span>
          </Link>
          <Link className="flex items-center gap-[16px] p-[16px] rounded-xl text-[#46464f] hover:bg-[#f2f4f6] transition-all duration-200" href="#">
            <span className="material-symbols-outlined">payments</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Revenue</span>
          </Link>
          <Link className="flex items-center gap-[16px] p-[16px] rounded-xl text-[#46464f] hover:bg-[#f2f4f6] transition-all duration-200" href="/operator/company">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Settings</span>
          </Link>
        </div>
        <button className="mt-[16px] w-full bg-[#000000] text-[#ffffff] py-[16px] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold shadow-sm hover:opacity-90 transition-opacity">
          Add New Bus
        </button>
        <div className="pt-[16px] border-t border-[#c7c5d1] space-y-[4px]">
          <Link className="flex items-center gap-[16px] p-[16px] rounded-xl text-[#46464f] hover:bg-[#f2f4f6] transition-all" href="#">
            <span className="material-symbols-outlined">help</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Support</span>
          </Link>
          <Link className="flex items-center gap-[16px] p-[16px] rounded-xl text-[#46464f] hover:bg-[#f2f4f6] transition-all" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 flex-1 p-[32px] pb-[80px]">
        <header className="max-w-[1440px] mx-auto mb-[32px]">
          <div className="flex justify-between items-end gap-[32px]">
            <div>
              <nav className="flex items-center gap-[8px] text-[#46464f] mb-[8px]">
                <span className="text-[12px] leading-[1.2] font-medium">Operations</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-[12px] leading-[1.2] font-medium font-bold text-[#000000]">Schedules</span>
              </nav>
              <h2 className="text-[32px] leading-[1.3] font-bold text-[#191c1e]">Trip Schedules</h2>
            </div>
            <button className="flex items-center gap-[8px] bg-[#000000] text-[#ffffff] px-[32px] py-[16px] rounded-full hover:opacity-90 transition-all shadow-md active:scale-95">
              <span className="material-symbols-outlined">bolt</span>
              <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Generate Recurring Schedule</span>
            </button>
          </div>
        </header>

        {/* Filters Section */}
        <section className="max-w-[1440px] mx-auto mb-[24px]">
          <div className="bg-[#ffffff] p-[24px] rounded-xl shadow-sm border border-[#c7c5d1] flex flex-wrap gap-[24px] items-center">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[12px] leading-[1.2] font-medium text-[#46464f] mb-[4px]">Date Range</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-[#777680]">calendar_month</span>
                <input className="w-full pl-[32px] pr-[16px] py-[16px] bg-[#f2f4f6] border-none rounded-xl text-[14px] leading-[1.6] focus:ring-2 focus:ring-[#7c5800] outline-none" placeholder="Nov 1, 2026 - Nov 30, 2026" type="text" />
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[12px] leading-[1.2] font-medium text-[#46464f] mb-[4px]">Route</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-[#777680]">route</span>
                <select className="w-full pl-[32px] pr-[16px] py-[16px] bg-[#f2f4f6] border-none rounded-xl text-[14px] leading-[1.6] appearance-none focus:ring-2 focus:ring-[#7c5800] outline-none">
                  <option>All Routes</option>
                  <option>NYC -&gt; PHI</option>
                  <option>BOS -&gt; NYC</option>
                  <option>DC -&gt; NYC</option>
                </select>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[12px] leading-[1.2] font-medium text-[#46464f] mb-[4px]">Bus Type</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-[#777680]">directions_bus</span>
                <select className="w-full pl-[32px] pr-[16px] py-[16px] bg-[#f2f4f6] border-none rounded-xl text-[14px] leading-[1.6] appearance-none focus:ring-2 focus:ring-[#7c5800] outline-none">
                  <option>All Types</option>
                  <option>Sleeper AC</option>
                  <option>Semi-Sleeper</option>
                  <option>Luxury Coach</option>
                </select>
              </div>
            </div>
            <div className="flex items-end self-end pb-[8px]">
              <button className="px-[24px] py-[16px] border border-[#c7c5d1] rounded-full text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:bg-[#f2f4f6] transition-colors">
                Reset Filters
              </button>
            </div>
          </div>
        </section>

        {/* Schedules Grid/List */}
        <section className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 gap-[16px]">
            {/* Schedule Card 1 */}
            <div className="bg-[#ffffff] border border-[#c7c5d1] p-[24px] rounded-xl hover:shadow-md transition-shadow group flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-[32px] flex-1">
                {/* Bus Identity */}
                <div className="w-16 h-16 bg-[#e7e8ea] rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#000000] text-3xl">airport_shuttle</span>
                </div>
                <div>
                  <div className="flex items-center gap-[8px] mb-[4px]">
                    <h3 className="text-[20px] leading-[1.4] font-semibold">Green Line AC-12</h3>
                    <span className="px-[8px] py-[4px] bg-[#FFF4E0] text-[#B27B00] rounded-full text-[12px] leading-[1.2] font-medium">AC Bus</span>
                  </div>
                  <div className="flex items-center gap-[16px] text-[#46464f]">
                    <div className="flex items-center gap-[4px]">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span className="text-[14px] leading-[1.6]">New York, NY</span>
                    </div>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    <div className="flex items-center gap-[4px]">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span className="text-[14px] leading-[1.6]">Philadelphia, PA</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timing */}
              <div className="flex flex-col items-center px-[32px] md:border-x border-[#c7c5d1] w-full md:w-auto my-4 md:my-0">
                <div className="text-center">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Departure</p>
                  <p className="text-[20px] leading-[1.4] font-semibold">08:30 AM</p>
                  <p className="text-[12px] leading-[1.2] font-medium text-[#777680]">Today, Nov 15</p>
                </div>
                <div className="my-[4px]">
                  <span className="material-symbols-outlined text-[#c7c5d1] rotate-90">more_vert</span>
                </div>
                <div className="text-center">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Arrival</p>
                  <p className="text-[20px] leading-[1.4] font-semibold">11:15 AM</p>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-[16px] md:pl-[32px] w-full md:w-auto md:min-w-[180px]">
                <div className="px-[16px] py-[4px] bg-[#feb700]/20 text-[#6b4b00] border border-[#feb700] rounded-full flex items-center gap-[4px]">
                  <span className="w-2 h-2 rounded-full bg-[#7c5800]"></span>
                  <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Scheduled</span>
                </div>
                <button className="text-[#000000] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-[4px] hover:underline decoration-[#7c5800] transition-all">
                  Manage Passengers
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Schedule Card 2 */}
            <div className="bg-[#ffffff] border border-[#c7c5d1] p-[24px] rounded-xl hover:shadow-md transition-shadow group flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-[32px] flex-1">
                <div className="w-16 h-16 bg-[#e7e8ea] rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#000000] text-3xl">bus_alert</span>
                </div>
                <div>
                  <div className="flex items-center gap-[8px] mb-[4px]">
                    <h3 className="text-[20px] leading-[1.4] font-semibold">VIVID Express V-02</h3>
                    <span className="px-[8px] py-[4px] bg-[#E8F1FF] text-[#2B6CB0] rounded-full text-[12px] leading-[1.2] font-medium">Non-AC Bus</span>
                  </div>
                  <div className="flex items-center gap-[16px] text-[#46464f]">
                    <div className="flex items-center gap-[4px]">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span className="text-[14px] leading-[1.6]">Washington, DC</span>
                    </div>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    <div className="flex items-center gap-[4px]">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span className="text-[14px] leading-[1.6]">New York, NY</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center px-[32px] md:border-x border-[#c7c5d1] w-full md:w-auto my-4 md:my-0">
                <div className="text-center">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Departure</p>
                  <p className="text-[20px] leading-[1.4] font-semibold">06:00 AM</p>
                  <p className="text-[12px] leading-[1.2] font-medium text-[#777680]">Today, Nov 15</p>
                </div>
                <div className="my-[4px]">
                  <span className="material-symbols-outlined text-[#c7c5d1] rotate-90">more_vert</span>
                </div>
                <div className="text-center">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Arrival</p>
                  <p className="text-[20px] leading-[1.4] font-semibold">10:30 AM</p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-[16px] md:pl-[32px] w-full md:w-auto md:min-w-[180px]">
                <div className="px-[16px] py-[4px] bg-[#001a41]/10 text-[#3280f9] border border-[#001a41] rounded-full flex items-center gap-[4px]">
                  <span className="w-2 h-2 rounded-full bg-[#3280f9] animate-pulse"></span>
                  <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">In Transit</span>
                </div>
                <button className="text-[#000000] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-[4px] hover:underline decoration-[#7c5800] transition-all">
                  Track Real-time
                  <span className="material-symbols-outlined">map</span>
                </button>
              </div>
            </div>

            {/* Schedule Card 3 */}
            <div className="bg-[#ffffff] border border-[#c7c5d1] p-[24px] rounded-xl hover:shadow-md transition-shadow group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 opacity-80">
              <div className="flex items-center gap-[32px] flex-1">
                <div className="w-16 h-16 bg-[#e7e8ea] rounded-lg flex items-center justify-center grayscale shrink-0">
                  <span className="material-symbols-outlined text-[#000000] text-3xl">check_circle</span>
                </div>
                <div>
                  <div className="flex items-center gap-[8px] mb-[4px]">
                    <h3 className="text-[20px] leading-[1.4] font-semibold text-[#777680]">Blue Streak S-101</h3>
                    <span className="px-[8px] py-[4px] bg-[#c7c5d1]/30 text-[#777680] rounded-full text-[12px] leading-[1.2] font-medium">AC Bus</span>
                  </div>
                  <div className="flex items-center gap-[16px] text-[#777680]">
                    <div className="flex items-center gap-[4px]">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span className="text-[14px] leading-[1.6]">Boston, MA</span>
                    </div>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    <div className="flex items-center gap-[4px]">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span className="text-[14px] leading-[1.6]">New York, NY</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center px-[32px] md:border-x border-[#c7c5d1] w-full md:w-auto my-4 md:my-0">
                <div className="text-center opacity-60">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Departure</p>
                  <p className="text-[20px] leading-[1.4] font-semibold">11:00 PM</p>
                  <p className="text-[12px] leading-[1.2] font-medium text-[#777680]">Yesterday, Nov 14</p>
                </div>
                <div className="my-[4px]">
                  <span className="material-symbols-outlined text-[#c7c5d1] rotate-90">more_vert</span>
                </div>
                <div className="text-center opacity-60">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Arrival</p>
                  <p className="text-[20px] leading-[1.4] font-semibold">04:45 AM</p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-[16px] md:pl-[32px] w-full md:w-auto md:min-w-[180px]">
                <div className="px-[16px] py-[4px] bg-[#e7e8ea] text-[#46464f] border border-[#c7c5d1] rounded-full flex items-center gap-[4px]">
                  <span className="material-symbols-outlined text-sm">done_all</span>
                  <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Completed</span>
                </div>
                <button className="text-[#46464f] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-[4px] hover:text-[#000000] transition-all">
                  View Report
                  <span className="material-symbols-outlined">assessment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-[32px] flex justify-between items-center bg-[#ffffff] p-[16px] border border-[#c7c5d1] rounded-xl">
            <p className="text-[14px] leading-[1.6] text-[#46464f]">Showing 3 of 48 upcoming trips</p>
            <div className="flex gap-[8px]">
              <button className="w-10 h-10 border border-[#c7c5d1] rounded-lg flex items-center justify-center hover:bg-[#f2f4f6]">
                <span className="material-symbols-outlined">navigate_before</span>
              </button>
              <button className="w-10 h-10 bg-[#000000] text-[#ffffff] rounded-lg flex items-center justify-center font-bold">1</button>
              <button className="w-10 h-10 border border-[#c7c5d1] rounded-lg flex items-center justify-center hover:bg-[#f2f4f6]">2</button>
              <button className="w-10 h-10 border border-[#c7c5d1] rounded-lg flex items-center justify-center hover:bg-[#f2f4f6]">3</button>
              <button className="w-10 h-10 border border-[#c7c5d1] rounded-lg flex items-center justify-center hover:bg-[#f2f4f6]">
                <span className="material-symbols-outlined">navigate_next</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <footer className="fixed bottom-0 left-64 right-0 bg-[#e1e2e4] border-t border-[#c7c5d1] py-[16px] z-40 hidden md:block">
        <div className="flex justify-between items-center px-[64px] w-full max-w-[1440px] mx-auto">
          <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">© 2026 VIVID SaaS. All rights reserved.</p>
          <div className="flex gap-[24px]">
            <a className="text-[12px] leading-[1.2] font-medium text-[#46464f] hover:underline decoration-[#000000]" href="#">Privacy Policy</a>
            <a className="text-[12px] leading-[1.2] font-medium text-[#46464f] hover:underline decoration-[#000000]" href="#">Terms of Service</a>
            <a className="text-[12px] leading-[1.2] font-medium text-[#46464f] hover:underline decoration-[#000000]" href="#">Carrier Partners</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
