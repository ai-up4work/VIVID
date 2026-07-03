'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

/**
 * OPERATOR DASHBOARD
 * 
 * Shows an overview of an operator's operations:
 * - Total buses
 * - Active schedules
 * - Pending bookings
 * - Revenue today
 * - Recent bookings & schedules
 */

export default function OperatorDashboard() {
  const params = useParams();
  const busId = params.busId as string;

  const operatorStats = [
    { label: 'Total Buses', value: '20', icon: '🚌', color: 'bg-blue-100' },
    { label: 'Active Schedules Today', value: '5', icon: '📅', color: 'bg-green-100' },
    { label: 'Pending Bookings', value: '12', icon: '⏳', color: 'bg-yellow-100' },
    { label: 'Today\'s Revenue', value: '$2,340', icon: '💰', color: 'bg-purple-100' },
  ];

  const pendingBookings = [
    { id: 'bk-1', passenger: 'John Doe', route: 'Colombo → Kandy', seats: '5A, 5B', time: '14:30', status: 'pending' },
    { id: 'bk-2', passenger: 'Jane Smith', route: 'Colombo → Kandy', seats: '12C', time: '14:30', status: 'pending' },
    { id: 'bk-3', passenger: 'Mike Johnson', route: 'Kandy → Nuwara Eliya', seats: '8A, 8B, 8C', time: '16:45', status: 'pending' },
  ];

  const todaySchedules = [
    { id: 'sch-1', route: 'Colombo → Kandy', departure: '08:00', bus: 'Bus 01', bookedSeats: 28, totalSeats: 32 },
    { id: 'sch-2', route: 'Colombo → Kandy', departure: '14:30', bus: 'Bus 02', bookedSeats: 31, totalSeats: 32 },
    { id: 'sch-3', route: 'Kandy → Nuwara Eliya', departure: '16:45', bus: 'Bus 05', bookedSeats: 24, totalSeats: 32 },
  ];

  return (
    <main className="p-8">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-[#050a44] mb-2">Operator Dashboard</h2>
        <p className="text-sm text-[#46464f]">Manage buses, schedules, bookings, and payments</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {operatorStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-2xl`}>{stat.icon}</div>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-2">{stat.label}</p>
            <h3 className="text-2xl font-bold text-[#050a44]">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Pending Bookings & Schedules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Bookings */}
        <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#050a44]">Pending Bookings</h3>
            <Link href={`/operator/${operatorId}/bookings`} className="text-sm font-bold text-[#050a44] hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {pendingBookings.map((bk) => (
              <div key={bk.id} className="p-4 border border-[#edeef0] rounded-xl hover:bg-[#f8f9fb] transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-[#050a44]">{bk.passenger}</p>
                  <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-800">
                    PENDING
                  </span>
                </div>
                <p className="text-xs text-[#46464f] mb-1">{bk.route} • {bk.time}</p>
                <p className="text-xs text-[#46464f]">Seats: {bk.seats}</p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition-colors">
                    Approve
                  </button>
                  <button className="flex-1 px-3 py-2 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedules */}
        <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#050a44]">Today's Schedules</h3>
            <Link href={`/operator/${operatorId}/schedules`} className="text-sm font-bold text-[#050a44] hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {todaySchedules.map((sch) => (
              <div key={sch.id} className="p-4 border border-[#edeef0] rounded-xl hover:bg-[#f8f9fb] transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-[#050a44]">{sch.route}</p>
                  <p className="text-sm font-bold text-[#050a44]">{sch.departure}</p>
                </div>
                <p className="text-xs text-[#46464f] mb-2">{sch.bus}</p>
                <div className="w-full bg-[#edeef0] rounded-full h-2">
                  <div 
                    className="bg-[#050a44] h-2 rounded-full" 
                    style={{ width: `${(sch.bookedSeats / sch.totalSeats) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[#46464f] mt-2">{sch.bookedSeats}/{sch.totalSeats} seats booked</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
