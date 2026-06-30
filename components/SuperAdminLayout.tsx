'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: '/admin', icon: 'dashboard', label: 'Dashboard' },
    { href: '/admin/operators', icon: 'groups', label: 'Operators' },
    { href: '/admin/branding', icon: 'palette', label: 'Branding' },
    { href: '/admin/analytics', icon: 'analytics', label: 'Analytics' },
    { href: '/admin/billing', icon: 'credit_card', label: 'Billing' },
    { href: '/admin/support', icon: 'support_agent', label: 'Support' },
  ];

  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] min-h-screen flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#c7c5d1] sticky top-0 z-50">
        <div>
          <h1 className="text-[20px] font-extrabold text-[#050a44]">VIVID</h1>
          <p className="text-[10px] font-bold text-[#46464f] uppercase tracking-wider">Super Admin</p>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-[#f2f4f6] rounded-lg text-[#050a44]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 bg-[#ffffff] border-r border-[#c7c5d1] flex flex-col p-4 z-40 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
        md:translate-x-0 md:sticky md:top-0 md:h-screen
      `}>
        {/* Brand Header */}
        <div className="hidden md:block px-2 py-4 mb-4">
          <h1 className="text-[20px] leading-[1.4] font-extrabold text-[#000000]">VIVID</h1>
          <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] opacity-70">Super Admin Portal</p>
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
                    ? 'bg-[#050a44] text-white translate-x-1 duration-200' 
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
