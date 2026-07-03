'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

/**
 * BRAND ADMIN DASHBOARD
 * 
 * Shows an overview of a specific brand's operations:
 * - Number of operators
 * - Fleet size
 * - Revenue
 * - Active schedules
 * - Recent bookings
 */

export default function BrandAdminDashboard() {
  const params = useParams();
  const brandId = params.brandId as string;

  const brandStats = [
    { label: 'Total Operators', value: '2', icon: '👥', color: 'bg-blue-100' },
    { label: 'Total Buses', value: '40', icon: '🚌', color: 'bg-green-100' },
    { label: 'Active Schedules', value: '70', icon: '📅', color: 'bg-purple-100' },
    { label: 'Monthly Revenue', value: '$45,230', icon: '💰', color: 'bg-yellow-100' },
  ];

  const operators = [
    { id: 'op-1', name: 'Operator 1 - Route A-B', buses: 20, revenue: '$22,500', bookings: 345 },
    { id: 'op-2', name: 'Operator 2 - Route C-D', buses: 20, revenue: '$22,730', bookings: 412 },
  ];

  const recentBookings = [
    { id: 'bk-1', passenger: 'John Doe', route: 'Colombo → Kandy', seats: '5A, 5B', status: 'confirmed' },
    { id: 'bk-2', passenger: 'Jane Smith', route: 'Colombo → Galle', seats: '12C', status: 'pending' },
    { id: 'bk-3', passenger: 'Mike Johnson', route: 'Kandy → Nuwara Eliya', seats: '8A, 8B, 8C', status: 'confirmed' },
  ];

  return (
    <main className="p-8">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-[#050a44] mb-2">Brand Admin Dashboard</h2>
        <p className="text-sm text-[#46464f]">Manage operators, buses, routes, and track brand performance</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {brandStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-2xl`}>{stat.icon}</div>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-2">{stat.label}</p>
            <h3 className="text-2xl font-bold text-[#050a44]">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Operators & Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operators */}
        <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#050a44]">Operators Under This Brand</h3>
            <Link href={`/brand/${brandId}/operators`} className="text-sm font-bold text-[#050a44] hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {operators.map((op) => (
              <div key={op.id} className="p-4 border border-[#edeef0] rounded-xl flex items-center justify-between gap-4 hover:bg-[#f8f9fb] transition-colors">
                <div>
                  <p className="font-bold text-[#050a44]">{op.name}</p>
                  <p className="text-xs text-[#46464f]">{op.buses} buses • {op.bookings} bookings</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">{op.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#050a44]">Recent Bookings</h3>
            <Link href={`/brand/${brandId}/bookings`} className="text-sm font-bold text-[#050a44] hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentBookings.map((bk) => (
              <div key={bk.id} className="p-4 border border-[#edeef0] rounded-xl hover:bg-[#f8f9fb] transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-[#050a44]">{bk.passenger}</p>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    bk.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bk.status}
                  </span>
                </div>
                <p className="text-xs text-[#46464f] mb-1">{bk.route}</p>
                <p className="text-xs text-[#46464f]">Seats: {bk.seats}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
