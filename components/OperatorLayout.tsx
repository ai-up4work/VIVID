'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function OperatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: '/operator', icon: 'dashboard', label: 'Dashboard' },
    { href: '/operator/fleet', icon: 'directions_bus', label: 'Fleet Management' },
    { href: '/operator/routes', icon: 'calendar_today', label: 'Route Schedule' },
    { href: '#', icon: 'confirmation_number', label: 'Bookings' },
    { href: '#', icon: 'payments', label: 'Revenue' },
    { href: '/operator/company', icon: 'settings', label: 'Settings' },
  ];

  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] min-h-screen flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header (Visible only on small screens) */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#c7c5d1] sticky top-0 z-50">
        <div>
          <h1 className="text-[20px] font-extrabold text-primary">VIVID</h1>
          <p className="text-[10px] font-bold text-[#46464f] uppercase tracking-wider">Operator</p>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-[#f2f4f6] rounded-lg text-primary"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* SideNavBar Component */}
      <aside className={`
        fixed inset-y-0 left-0 bg-[#ffffff] border-r border-[#c7c5d1] flex flex-col p-4 z-40 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
        md:translate-x-0 md:sticky md:top-0 md:h-screen
      `}>
        {/* Brand Header */}
        <div className="hidden md:block px-2 py-4 mb-4">
          <h1 className="text-[20px] leading-[1.4] font-extrabold text-[#000000]">VIVID</h1>
          <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] opacity-70">Operator Console</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow space-y-1 overflow-y-auto custom-scrollbar mt-4 md:mt-0">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-4 p-4 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold rounded-xl transition-all ${
                  isActive 
                    ? 'bg-[#feb700] text-[#6b4b00] translate-x-1 duration-200' 
                    : 'text-[#46464f] hover:bg-[#f2f4f6]'
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <button className="w-full bg-[#0f144c] text-[#7a7fbb] py-4 px-6 rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity mb-6">
          <span className="material-symbols-outlined">add</span>
          <span>Add New Bus</span>
        </button>

        {/* Footer Tabs */}
        <div className="pt-4 border-t border-[#c7c5d1] space-y-1">
          <Link className="flex items-center space-x-4 p-4 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f] hover:bg-[#f2f4f6] rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined">help</span>
            <span>Support</span>
          </Link>
          <Link className="flex items-center space-x-4 p-4 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f] hover:bg-[#f2f4f6] rounded-xl transition-all" href="/">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
