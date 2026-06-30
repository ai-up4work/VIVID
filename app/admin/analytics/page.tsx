'use client';
import React from 'react';
import { SuperAdminLayout } from '../../../components/SuperAdminLayout';
import { LineChart, BarChart, PieChart } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <SuperAdminLayout>
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-[#050a44]">Platform Analytics</h2>
          <p className="text-sm text-[#46464f]">Track revenue, bookings, and operator performance</p>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+24%</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Total Revenue</p>
            <h3 className="text-2xl font-black text-[#050a44]">$482,350</h3>
            <p className="text-xs text-[#46464f] mt-2">Last 30 days</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">confirmation_number</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+18%</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Total Bookings</p>
            <h3 className="text-2xl font-black text-[#050a44]">18,450</h3>
            <p className="text-xs text-[#46464f] mt-2">Last 30 days</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Active Passengers</p>
            <h3 className="text-2xl font-black text-[#050a44]">45,230</h3>
            <p className="text-xs text-[#46464f] mt-2">Registered users</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">percent</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Stable</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Commission Rate</p>
            <h3 className="text-2xl font-black text-[#050a44]">12%</h3>
            <p className="text-xs text-[#46464f] mt-2">Platform average</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#050a44]">Revenue Trend</h3>
              <LineChart className="w-5 h-5 text-[#feb700]" />
            </div>
            <div className="h-48 bg-[#f8f9fb] rounded-lg flex items-center justify-center text-[#46464f]">
              <div className="text-center">
                <span className="material-symbols-outlined text-3xl mb-2 block">insert_chart</span>
                <p className="text-sm">Chart visualization</p>
              </div>
            </div>
          </div>

          {/* Bookings by Operator */}
          <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#050a44]">Top Operators</h3>
              <BarChart className="w-5 h-5 text-[#feb700]" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'Shyamoli Express', bookings: 2450, percentage: 45 },
                { name: 'Green Line Paribahan', bookings: 1850, percentage: 34 },
                { name: 'Sohag Paribahan', bookings: 950, percentage: 18 },
                { name: 'Other Operators', bookings: 200, percentage: 3 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-semibold text-[#050a44]">{item.name}</p>
                    <p className="text-sm font-bold text-[#050a44]">{item.bookings}</p>
                  </div>
                  <div className="w-full bg-[#edeef0] h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-[#050a44] rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Table */}
        <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm overflow-x-auto">
          <div className="p-6 border-b border-[#edeef0]">
            <h3 className="text-lg font-bold text-[#050a44]">Operator Performance</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#edeef0] bg-[#f8f9fb]">
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Operator</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Bookings</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Avg Rating</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Commission</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Shyamoli Express', revenue: '$145,200', bookings: 2450, rating: 4.8, commission: '$17,424' },
                { name: 'Green Line Paribahan', revenue: '$98,450', bookings: 1850, rating: 4.6, commission: '$11,814' },
                { name: 'Sohag Paribahan', revenue: '$64,800', bookings: 950, rating: 4.5, commission: '$7,776' },
                { name: 'Road Runner', revenue: '$48,200', bookings: 650, rating: 4.3, commission: '$5,784' },
              ].map((item, idx) => (
                <tr key={idx} className="border-b border-[#edeef0] hover:bg-[#f8f9fb] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#050a44]">{item.name}</td>
                  <td className="px-6 py-4 font-bold text-[#050a44]">{item.revenue}</td>
                  <td className="px-6 py-4 font-bold text-[#050a44]">{item.bookings}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-[#feb700]">star</span>
                      <span className="font-bold text-[#050a44]">{item.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-700">{item.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </SuperAdminLayout>
  );
}
