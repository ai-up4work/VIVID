'use client';
import React from 'react';
import Link from 'next/link';
import { OperatorLayout } from '@/components/OperatorLayout';

export default function OperatorDashboard() {
  return (
    <OperatorLayout>
      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#050a44]">Overview</h2>
            <p className="text-sm text-[#46464f]">Today's snapshot for Green Line Paribahan</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-white rounded-lg text-sm font-semibold border border-[#c7c5d1]">Oct 24, 2026</span>
            <div className="w-10 h-10 rounded-full bg-[#050a44] text-white flex items-center justify-center font-bold">GL</div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Today's Revenue</p>
            <h3 className="text-2xl font-black text-[#050a44]">$4,250</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">confirmation_number</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+5%</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Tickets Sold</p>
            <h3 className="text-2xl font-black text-[#050a44]">342</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">directions_bus</span>
              </div>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Active Trips</p>
            <h3 className="text-2xl font-black text-[#050a44]">18 <span className="text-sm font-medium text-[#777680]">/ 24</span></h3>
          </div>
          <div className="bg-[#050a44] p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-white/20 rounded-lg text-white">
                <span className="material-symbols-outlined">star</span>
              </div>
            </div>
            <p className="text-sm text-[#bdc2ff] font-medium mb-1 relative z-10">Average Rating</p>
            <h3 className="text-2xl font-black text-white relative z-10">4.8 <span className="text-sm font-medium text-white/70">/ 5.0</span></h3>
          </div>
        </div>

        {/* Lower Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Routes */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#050a44]">Live Routes</h3>
              <Link href="/operator/routes" className="text-sm font-bold text-[#050a44] hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {[
                { route: 'Dhaka → Barishal', time: '08:00 AM - 02:30 PM', status: 'On Time', pax: '38/40', progress: '60%' },
                { route: 'Dhaka → Sylhet', time: '09:00 AM - 04:00 PM', status: 'Delayed', pax: '40/40', progress: '30%' },
                { route: 'Chittagong → Dhaka', time: '07:30 AM - 01:30 PM', status: 'On Time', pax: '25/40', progress: '85%' },
              ].map((trip, idx) => (
                <div key={idx} className="p-4 border border-[#edeef0] rounded-xl flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-[#050a44]">{trip.route}</p>
                    <p className="text-xs text-[#46464f]">{trip.time}</p>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="flex justify-between text-xs font-semibold text-[#46464f] mb-1">
                      <span>Progress</span>
                      <span>{trip.progress}</span>
                    </div>
                    <div className="w-full bg-[#edeef0] h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${trip.status === 'Delayed' ? 'bg-[#ba1a1a]' : 'bg-[#006e1c]'}`} style={{ width: trip.progress }}></div>
                    </div>
                  </div>
                  <div className="text-right flex-1">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${trip.status === 'Delayed' ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-green-100 text-green-800'}`}>{trip.status}</span>
                    <p className="text-xs font-medium text-[#46464f] mt-2">Pax: <span className="font-bold">{trip.pax}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6">
            <h3 className="text-lg font-bold text-[#050a44] mb-6">Recent Bookings</h3>
            <div className="space-y-4">
              {[
                { name: 'Rafiq Ahmed', route: 'DAC → BAR', amount: '$42.00', time: '5m ago' },
                { name: 'Sarah Khan', route: 'DAC → SYL', amount: '$45.00', time: '12m ago' },
                { name: 'John Doe', route: 'CTG → DAC', amount: '$38.00', time: '28m ago' },
                { name: 'Ayesha Ali', route: 'DAC → BAR', amount: '$84.00', time: '1h ago' },
              ].map((booking, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-[#edeef0] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f2f4f6] text-[#050a44] flex items-center justify-center font-bold text-xs">
                      {booking.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#191c1e]">{booking.name}</p>
                      <p className="text-xs text-[#777680]">{booking.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#006e1c]">{booking.amount}</p>
                    <p className="text-xs text-[#777680]">{booking.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-[#c7c5d1] rounded-lg text-sm font-bold text-[#050a44] hover:bg-[#f2f4f6] transition-colors">
              View All Bookings
            </button>
          </div>
        </div>
      </main>
    </OperatorLayout>
  );
}
