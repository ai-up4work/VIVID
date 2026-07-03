'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';

export default function OperatorAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const busId = params.busId as string;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock operator data - replace with actual data from Supabase
  const busName = busId ? busId.replace(/-/g, ' ').toUpperCase() : 'Bus';
  const operatorName = `${busName} Operator`;

  const menuItems = [
    { label: 'Dashboard', path: `/bus/${busId}`, icon: '📊' },
    { label: 'Schedules', path: `/bus/${busId}/schedules`, icon: '📅' },
    { label: 'Fleet', path: `/bus/${busId}/fleet`, icon: '🚌' },
    { label: 'Bookings', path: `/bus/${busId}/bookings`, icon: '📋' },
    { label: 'Payments', path: `/bus/${busId}/payments`, icon: '💳' },
    { label: 'Staff', path: `/bus/${busId}/staff`, icon: '👥' },
  ];

  return (
    <div className="flex h-screen bg-[#f2f4f6]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-[#c7c5d1] transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#c7c5d1]">
          <div className="flex items-center gap-3 justify-between">
            <div className={`${!sidebarOpen && 'hidden'} flex-1`}>
              <h1 className="text-lg font-bold text-[#050a44]">{operatorName}</h1>
              <p className="text-xs text-[#46464f]">Operator Portal</p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[#f2f4f6] rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f2f4f6] text-[#050a44] font-medium text-sm transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#c7c5d1] p-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-100 text-red-600 font-medium text-sm transition-colors">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#c7c5d1] px-8 py-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-[#46464f]">Operator Portal</p>
            <h1 className="text-xl font-bold text-[#050a44]">{operatorName}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#f2f4f6] rounded-lg transition-colors">
              🔔
            </button>
            <div className="w-10 h-10 rounded-full bg-[#050a44] text-white flex items-center justify-center font-bold">
              OP
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
