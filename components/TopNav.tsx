'use client';
import { Bell, ChevronRight, Bus, Plane, Hotel, Ship, Car, Train, CalendarDays, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
export function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-outline/50 sticky top-0 z-50 h-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 h-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[28px] font-extrabold text-primary tracking-tight">VIVID</Link>
          <div className="hidden lg:flex items-center gap-2 ml-4">
            <ChevronRight className="text-outline-variant w-4 h-4" />
            <Link href="/marketplace" className="px-3 py-1 bg-surface-variant text-on-surface-variant text-xs font-bold rounded-full border border-outline/30 uppercase tracking-wider hover:bg-outline-variant transition-colors">
              Marketplace
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-2">
          <NavItem icon={Plane} label="Flight" href="#" />
          <NavItem icon={Hotel} label="Hotel" href="#" />
          <NavItem icon={Bus} label="Bus" href="/search" active />
          <NavItem icon={Ship} label="Cruise" href="#" />
          <NavItem icon={Car} label="Car" href="#" />
          <NavItem icon={Train} label="Train" href="#" />
          <NavItem icon={CalendarDays} label="Event" href="#" />
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-white border border-outline/50 hover:bg-surface-variant transition-colors">
            <Bell className="text-on-surface-variant w-5 h-5" />
          </button>
          <Link href="/auth/login" className="hidden md:block text-sm font-bold text-primary hover:bg-surface-variant px-4 py-2 rounded-lg transition-colors">
            Log in
          </Link>
          <Link href="/dashboard" className="w-10 h-10 rounded-full overflow-hidden border border-outline/50 block">
            <img src="https://ui-avatars.com/api/?name=Alexander&background=050a44&color=fff" alt="User" className="w-full h-full object-cover" />
          </Link>
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="text-primary w-6 h-6" /> : <Menu className="text-primary w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-outline/50 shadow-lg z-40">
          <nav className="flex flex-col p-4 space-y-2">
            <NavItem icon={Plane} label="Flight" href="#" />
            <NavItem icon={Hotel} label="Hotel" href="#" />
            <NavItem icon={Bus} label="Bus" href="/search" active />
            <NavItem icon={Ship} label="Cruise" href="#" />
            <div className="h-px bg-outline/20 w-full my-2"></div>
            <Link href="/marketplace" className="flex items-center gap-2 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant font-semibold">
              <span className="material-symbols-outlined w-5 h-5">storefront</span>
              <span className="text-sm">Marketplace</span>
            </Link>
            <Link href="/auth/login" className="flex items-center gap-2 px-4 py-3 rounded-lg text-primary hover:bg-surface-variant font-bold">
              <span className="material-symbols-outlined w-5 h-5">login</span>
              <span className="text-sm">Log in</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({ icon: Icon, label, href, active }: { icon: any; label: string; href: string; active?: boolean }) {
  return (
    <Link href={href} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${active ? 'bg-surface-variant text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-variant font-semibold'}`}>
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
