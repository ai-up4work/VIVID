'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RequestsQueue() {
  const [timers, setTimers] = useState<{ [key: string]: number }>({
    'req-2': 245,
    'req-3': 412,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const newTimers = { ...prev };
        for (const key in newTimers) {
          if (newTimers[key] > 0) {
            newTimers[key] -= 1;
          }
        }
        return newTimers;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] font-sans min-h-screen flex">
      {/* Sidebar Navigation Shell */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#0f144c] flex flex-col py-[24px] shadow-md z-50">
        <div className="px-6 mb-[48px]">
          <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=200&auto=format&fit=crop" alt="VIVID Platform Logo" className="h-12 w-auto mb-2 rounded filter invert brightness-0 opacity-80" />
          <p className="text-[#7a7fbb] text-[12px] leading-[1.2] font-medium opacity-70">Operator ID: 8821</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          <Link className="flex items-center gap-3 text-[#7a7fbb] hover:bg-[#3c4279]/20 rounded-xl px-4 py-3 mx-2 transition-all" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[14px] leading-[1.6]">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-3 text-[#7a7fbb] hover:bg-[#3c4279]/20 rounded-xl px-4 py-3 mx-2 transition-all" href="/operator/fleet">
            <span className="material-symbols-outlined">directions_bus</span>
            <span className="text-[14px] leading-[1.6]">Fleet Mgmt</span>
          </Link>
          <Link className="flex items-center gap-3 bg-[#feb700] text-[#6b4b00] rounded-xl px-4 py-3 mx-2 transition-all shadow-sm" href="#">
            <span className="material-symbols-outlined">confirmation_number</span>
            <span className="text-[14px] leading-[1.6] font-bold">Bookings</span>
          </Link>
          <Link className="flex items-center gap-3 text-[#7a7fbb] hover:bg-[#3c4279]/20 rounded-xl px-4 py-3 mx-2 transition-all" href="#">
            <span className="material-symbols-outlined">payments</span>
            <span className="text-[14px] leading-[1.6]">Finance</span>
          </Link>
          <Link className="flex items-center gap-3 text-[#7a7fbb] hover:bg-[#3c4279]/20 rounded-xl px-4 py-3 mx-2 transition-all" href="#">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-[14px] leading-[1.6]">Inventory</span>
          </Link>
          <Link className="flex items-center gap-3 text-[#7a7fbb] hover:bg-[#3c4279]/20 rounded-xl px-4 py-3 mx-2 transition-all" href="/operator/company">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[14px] leading-[1.6]">Settings</span>
          </Link>
        </nav>
        <div className="px-4 mb-[32px]">
          <button className="w-full bg-[#feb700] text-[#6b4b00] py-3 rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center justify-center gap-2 hover:brightness-95 active:scale-95 transition-all">
            <span className="material-symbols-outlined">add</span>
            New Dispatch
          </button>
        </div>
        <div className="mt-auto border-t border-[#7a7fbb]/10 pt-4">
          <Link className="flex items-center gap-3 text-[#7a7fbb] hover:bg-[#3c4279]/20 rounded-xl px-4 py-3 mx-2 transition-all" href="#">
            <span className="material-symbols-outlined">help</span>
            <span className="text-[14px] leading-[1.6]">Help Center</span>
          </Link>
          <Link className="flex items-center gap-3 text-[#7a7fbb] hover:bg-[#3c4279]/20 rounded-xl px-4 py-3 mx-2 transition-all" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-[14px] leading-[1.6]">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 min-h-screen p-[64px] flex-1">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[48px] gap-4">
          <div>
            <h2 className="text-[32px] leading-[1.3] font-bold text-[#000000] tracking-tight">Incoming Requests Queue</h2>
            <p className="text-[#46464f] text-[16px] leading-[1.6]">Action required on soft-locked seats pending final confirmation.</p>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="flex flex-col items-end">
              <span className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Queue Status</span>
              <span className="flex items-center gap-2 text-[#000000] font-bold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#feb700] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#feb700]"></span>
                </span>
                8 Active Requests
              </span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-[24px] mb-[48px]">
          <div className="bg-[#ffffff]/80 backdrop-blur-[8px] border border-[#c7c5d1] p-[32px] rounded-xl flex flex-col gap-2">
            <span className="material-symbols-outlined text-[#7c5800]">timer</span>
            <span className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase">Avg. Response Time</span>
            <span className="text-[20px] leading-[1.4] font-semibold">1m 42s</span>
          </div>
          <div className="bg-[#ffffff]/80 backdrop-blur-[8px] border border-[#c7c5d1] p-[32px] rounded-xl flex flex-col gap-2">
            <span className="material-symbols-outlined text-[#3280f9]">done_all</span>
            <span className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase">Conversion Rate</span>
            <span className="text-[20px] leading-[1.4] font-semibold">84.2%</span>
          </div>
          <div className="bg-[#ffffff]/80 backdrop-blur-[8px] border border-[#c7c5d1] p-[32px] rounded-xl flex flex-col gap-2 border-l-4 border-l-[#ba1a1a]">
            <span className="material-symbols-outlined text-[#ba1a1a]">alarm</span>
            <span className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase">Expiring Soon</span>
            <span className="text-[20px] leading-[1.4] font-semibold text-[#ba1a1a]">3 Requests</span>
          </div>
          <div className="bg-[#ffffff]/80 backdrop-blur-[8px] border border-[#c7c5d1] p-[32px] rounded-xl flex flex-col gap-2">
            <span className="material-symbols-outlined text-[#000000]">payments</span>
            <span className="text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase">Pending Value</span>
            <span className="text-[20px] leading-[1.4] font-semibold">$1,240.00</span>
          </div>
        </section>

        {/* Queue Table */}
        <div className="bg-[#ffffff]/80 backdrop-blur-[8px] border border-[#c7c5d1] rounded-xl overflow-hidden shadow-sm xl:mr-[300px]">
          <div className="bg-[#e7e8ea] px-[32px] py-[16px] grid grid-cols-1 md:grid-cols-12 gap-[24px] border-b border-[#c7c5d1] hidden md:grid">
            <div className="col-span-3 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f]">Customer Details</div>
            <div className="col-span-3 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f]">Route & Seat</div>
            <div className="col-span-2 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f]">Time Remaining</div>
            <div className="col-span-4 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f] text-right">Actions</div>
          </div>

          <div className="divide-y divide-[#c7c5d1]">
            {/* Row 1 (Critical) */}
            <div className="px-[16px] md:px-[32px] py-[24px] grid grid-cols-1 md:grid-cols-12 gap-[24px] items-center hover:bg-[#f2f4f6] transition-colors group">
              <div className="col-span-1 md:col-span-3 flex items-center gap-[16px]">
                <div className="h-10 w-10 rounded-full bg-[#0f144c] flex items-center justify-center text-[#ffffff] font-bold shrink-0">JD</div>
                <div>
                  <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">Julianne Deville</p>
                  <p className="text-[14px] leading-[1.6] text-[#46464f]">+1 555-0192</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-3">
                <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">San Francisco → Los Angeles</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-[#feb700]/20 text-[#6b4b00] text-[12px] leading-[1.2] font-bold rounded uppercase">Seat 12A</span>
                  <span className="px-2 py-0.5 bg-[#e1e2e4] text-[#46464f] text-[12px] leading-[1.2] font-bold rounded uppercase">VIP AC</span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 font-bold animate-pulse text-[#ba1a1a]">
                  <span className="material-symbols-outlined">hourglass_top</span>
                  <span className="text-[20px] leading-[1] font-bold">EXPIRED</span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex justify-start md:justify-end gap-[16px]">
                <button className="px-[16px] py-2 border border-[#000000] rounded-xl text-[#000000] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-2 hover:bg-[#000000] hover:text-white transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call
                </button>
                <Link href="/operator/payment" className="px-[16px] py-2 bg-[#000000] text-[#ffffff] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-2 hover:shadow-md active:scale-95 transition-all">
                  Confirm
                </Link>
              </div>
            </div>

            {/* Row 2 */}
            <div className="px-[16px] md:px-[32px] py-[24px] grid grid-cols-1 md:grid-cols-12 gap-[24px] items-center hover:bg-[#f2f4f6] transition-colors group">
              <div className="col-span-1 md:col-span-3 flex items-center gap-[16px]">
                <div className="h-10 w-10 rounded-full bg-[#3280f9] flex items-center justify-center text-[#ffffff] font-bold shrink-0">MK</div>
                <div>
                  <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">Marcus Kenter</p>
                  <p className="text-[14px] leading-[1.6] text-[#46464f]">+1 555-0482</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-3">
                <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">Chicago → Nashville</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-[#feb700]/20 text-[#6b4b00] text-[12px] leading-[1.2] font-bold rounded uppercase">Seat 04B</span>
                  <span className="px-2 py-0.5 bg-[#e1e2e4] text-[#46464f] text-[12px] leading-[1.2] font-bold rounded uppercase">Express</span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 text-[#46464f] font-bold">
                  <span className="material-symbols-outlined">hourglass_empty</span>
                  <span className="text-[20px] leading-[1] font-bold countdown">
                    {formatTime(timers['req-2'])}
                  </span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex justify-start md:justify-end gap-[16px]">
                <button className="px-[16px] py-2 border border-[#000000] rounded-xl text-[#000000] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-2 hover:bg-[#000000] hover:text-[#ffffff] transition-all">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call
                </button>
                <button className="px-[16px] py-2 bg-[#000000] text-[#ffffff] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-2 hover:shadow-md active:scale-95 transition-all">
                  Confirm
                </button>
              </div>
            </div>

            {/* Row 3 */}
            <div className="px-[16px] md:px-[32px] py-[24px] grid grid-cols-1 md:grid-cols-12 gap-[24px] items-center hover:bg-[#f2f4f6] transition-colors group">
              <div className="col-span-1 md:col-span-3 flex items-center gap-[16px]">
                <div className="h-10 w-10 rounded-full bg-[#feb700] flex items-center justify-center text-[#6b4b00] font-bold shrink-0">SL</div>
                <div>
                  <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">Sarah Linn</p>
                  <p className="text-[14px] leading-[1.6] text-[#46464f]">+1 555-0881</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-3">
                <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">Seattle → Portland</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-[#feb700]/20 text-[#6b4b00] text-[12px] leading-[1.2] font-bold rounded uppercase">Seat 08C</span>
                  <span className="px-2 py-0.5 bg-[#e1e2e4] text-[#46464f] text-[12px] leading-[1.2] font-bold rounded uppercase">Premium</span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 text-[#46464f] font-bold">
                  <span className="material-symbols-outlined">hourglass_empty</span>
                  <span className="text-[20px] leading-[1] font-bold countdown">
                    {formatTime(timers['req-3'])}
                  </span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex justify-start md:justify-end gap-[16px]">
                <button className="px-[16px] py-2 border border-[#000000] rounded-xl text-[#000000] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-2 hover:bg-[#000000] hover:text-[#ffffff] transition-all">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call
                </button>
                <button className="px-[16px] py-2 bg-[#000000] text-[#ffffff] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-2 hover:shadow-md active:scale-95 transition-all">
                  Confirm
                </button>
              </div>
            </div>

            {/* Row 4 (Critical) */}
            <div className="px-[16px] md:px-[32px] py-[24px] grid grid-cols-1 md:grid-cols-12 gap-[24px] items-center hover:bg-[#f2f4f6] transition-colors group">
              <div className="col-span-1 md:col-span-3 flex items-center gap-[16px]">
                <div className="h-10 w-10 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#93000a] font-bold shrink-0">RT</div>
                <div>
                  <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">Robert Tilsen</p>
                  <p className="text-[14px] leading-[1.6] text-[#46464f]">+1 555-0122</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-3">
                <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">Miami → Orlando</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-[#feb700]/20 text-[#6b4b00] text-[12px] leading-[1.2] font-bold rounded uppercase">Seat 01A</span>
                  <span className="px-2 py-0.5 bg-[#e1e2e4] text-[#46464f] text-[12px] leading-[1.2] font-bold rounded uppercase">Luxury Sleeper</span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 animate-pulse font-bold text-[#ba1a1a]">
                  <span className="material-symbols-outlined">hourglass_top</span>
                  <span className="text-[20px] leading-[1] font-bold">EXPIRED</span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 flex justify-start md:justify-end gap-[16px]">
                <button className="px-[16px] py-2 border border-[#000000] rounded-xl text-[#000000] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-2 hover:bg-[#000000] hover:text-[#ffffff] transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call
                </button>
                <button className="px-[16px] py-2 bg-[#000000] text-[#ffffff] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-2 hover:shadow-md active:scale-95 transition-all">
                  Confirm
                </button>
              </div>
            </div>
          </div>

          <div className="p-[32px] bg-[#edeef0] border-t border-[#c7c5d1] flex justify-center">
            <button className="text-[#000000] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center gap-2 hover:underline">
              View 4 More Requests
              <span className="material-symbols-outlined">expand_more</span>
            </button>
          </div>
        </div>

        {/* Floating Activity Log */}
        <aside className="fixed right-[64px] top-[30%] w-72 bg-[#ffffff]/80 backdrop-blur-[8px] border border-[#c7c5d1] rounded-xl p-[32px] shadow-lg hidden xl:block">
          <h3 className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000] mb-[16px] border-b pb-[8px] border-[#c7c5d1]">Queue Insights</h3>
          <div className="space-y-[16px]">
            <div className="flex gap-[16px]">
              <div className="min-w-[4px] bg-[#feb700] rounded-full"></div>
              <div>
                <p className="text-[12px] leading-[1.2] font-medium font-bold">Rush Period</p>
                <p className="text-[14px] leading-[1.6] text-[#46464f]">40% increase in requests for Nashville routes.</p>
              </div>
            </div>
            <div className="flex gap-[16px]">
              <div className="min-w-[4px] bg-[#3280f9] rounded-full"></div>
              <div>
                <p className="text-[12px] leading-[1.2] font-medium font-bold">Staff Alert</p>
                <p className="text-[14px] leading-[1.6] text-[#46464f]">Agent 12 is offline. Re-routing incoming calls.</p>
              </div>
            </div>
            <div className="pt-[16px]">
              <img className="w-full rounded-lg h-32 object-cover bg-[#e7e8ea]" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop" alt="Activity Chart" />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
