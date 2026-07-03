'use client';

/**
 * SUPER ADMIN DASHBOARD
 * 
 * This is the platform-wide dashboard where the Super Admin can:
 * - View all brands/tenants
 * - Manage billing
 * - View platform analytics
 * - Access support tickets
 */
import React from 'react';
import { SuperAdminLayout } from '../../components/SuperAdminLayout';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Brands', value: '4', icon: 'store', trend: 'All Active' },
    { label: 'Total Operators', value: '24', icon: 'groups', trend: '+3 this month' },
    { label: 'Monthly Revenue', value: '$342,800', icon: 'trending_up', trend: '+24% vs last month' },
    { label: 'Active Users', value: '45,230', icon: 'person', trend: '+8% this month' },
  ];

  const brands = [
    { name: 'SLT Travels', email: 'admin@slttravels.lk', operators: 2, buses: 40, status: 'active', joined: '2 months ago', revenue: '$85,600' },
    { name: 'Express Sri Lanka', email: 'contact@express.lk', operators: 2, buses: 40, status: 'active', joined: '1 month ago', revenue: '$78,900' },
    { name: 'Royal Bus Service', email: 'hello@royal.lk', operators: 2, buses: 40, status: 'active', joined: '3 weeks ago', revenue: '$92,300' },
    { name: 'Colombo Intercity', email: 'info@colombointercity.lk', operators: 2, buses: 40, status: 'active', joined: '5 days ago', revenue: '$86,000' },
  ];

  const platformMetrics = [
    { metric: 'Avg. Revenue per Operator', value: '$5,350', icon: 'monetization_on' },
    { metric: 'Platform Commission', value: '12%', icon: 'percent' },
    { metric: 'Customer Satisfaction', value: '4.7/5', icon: 'star' },
    { metric: 'System Uptime', value: '99.8%', icon: 'check_circle' },
  ];

  return (
    <SuperAdminLayout>
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#050a44]">Super Admin Dashboard</h2>
            <p className="text-sm text-[#46464f]">Manage all brands, operators, and platform performance</p>
          </div>
          <Link href="/admin/brands" className="px-6 py-3 bg-[#050a44] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
            + New Brand
          </Link>
        </header>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{stat.trend}</span>
              </div>
              <p className="text-sm text-[#46464f] font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-[#050a44]">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {platformMetrics.map((metric, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#050a44] to-[#0f144c] p-6 rounded-2xl text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-3xl opacity-80">{metric.icon}</span>
              </div>
              <p className="text-sm opacity-80 mb-2">{metric.metric}</p>
              <h3 className="text-2xl font-bold">{metric.value}</h3>
            </div>
          ))}
        </div>

        {/* Recent Operators & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Brands */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#050a44]">Active Brands</h3>
              <Link href="/admin/brands" className="text-sm font-bold text-[#050a44] hover:underline">Manage Brands</Link>
            </div>
            <div className="space-y-4">
              {brands.map((brand, idx) => (
                <Link key={idx} href={`/brand/${brand.name.toLowerCase().replace(/\s+/g, '-')}`} className="p-4 border border-[#edeef0] rounded-xl flex items-center justify-between gap-4 hover:bg-[#f8f9fb] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#050a44] text-white flex items-center justify-center font-bold text-sm">
                      {brand.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#050a44]">{brand.name}</p>
                      <p className="text-xs text-[#46464f]">{brand.operators} operators • {brand.buses} buses</p>
                    </div>
                  </div>
                  <div className="text-right flex-1">
                    <p className="text-sm font-bold text-[#050a44]">{brand.revenue}</p>
                    <p className="text-xs text-[#46464f]">{brand.joined}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    brand.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {brand.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6">
            <h3 className="text-lg font-bold text-[#050a44] mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/admin/brands" className="w-full p-4 bg-[#050a44] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-between group">
                <span>Manage Brands</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link href="/admin/analytics" className="w-full p-4 bg-[#feb700] text-[#050a44] rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-between group">
                <span>Platform Analytics</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link href="/admin/billing" className="w-full p-4 bg-[#f2f4f6] text-[#050a44] rounded-xl font-semibold hover:bg-[#edeef0] transition-colors flex items-center justify-between group">
                <span>Manage Billing</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link href="/admin/support" className="w-full p-4 bg-[#f2f4f6] text-[#050a44] rounded-xl font-semibold hover:bg-[#edeef0] transition-colors flex items-center justify-between group">
                <span>Support Tickets</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </SuperAdminLayout>
  );
}
