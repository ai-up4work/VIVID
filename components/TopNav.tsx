'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Bell,
  ChevronDown,
  LogOut,
  Ticket,
  User as UserIcon,
  LayoutDashboard,
  Store,
  Search,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/marketplace', label: 'Marketplace', icon: Store },
  { href: '/my-bookings', label: 'Bookings', icon: Ticket },
  { href: '/search', label: 'Search', icon: Search },
];

export function TopNav() {
  const pathname = usePathname();
  const { user, isLoggedIn, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <>
      {/* Top bar — desktop nav lives here, mobile just shows logo + avatar/bell */}
      <nav className="bg-white/80 backdrop-blur-md h-20 w-full px-4 md:px-[64px] flex justify-between items-center border-b border-[#edeef0]">
        <Link
          href="/"
          className="text-[28px] leading-[1.3] font-black text-[#050a44] tracking-tighter"
        >
          VIVID
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-[#f2f4f6] rounded-full p-1.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-2 rounded-full text-[14px] leading-[1.2] tracking-[0.02em] transition-colors duration-200 ${
                isActive(link.href)
                  ? 'bg-white text-[#050a44] font-bold shadow-sm'
                  : 'text-[#46464f] font-medium hover:text-[#050a44]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-[16px]">
          <button className="p-2 hover:bg-[#edeef0] rounded-full transition-colors relative">
            <Bell className="w-5 h-5 text-[#191c1e]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#feb700] rounded-full"></span>
          </button>

          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-[#edeef0] transition-colors"
              >
                <div className="cursor-pointer w-10 h-10 rounded-full bg-[#e1e2e4] overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#c7c5d1]/30">
                  <img
                    alt={user.user_metadata.full_name}
                    className="w-full h-full object-cover"
                    src={user.user_metadata.avatar_url || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop'}
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-[#46464f] hidden md:block" />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#edeef0] rounded-2xl shadow-lg py-2 z-20">
                    <div className="px-4 py-3 border-b border-[#edeef0]">
                      <p className="text-sm font-bold text-[#050a44] truncate">{user.user_metadata.full_name}</p>
                      <p className="text-xs text-[#46464f] truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/my-bookings"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#050a44] hover:bg-[#f2f4f6] transition-all"
                    >
                      <Ticket className="w-4 h-4" />
                      My Bookings
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#050a44] hover:bg-[#f2f4f6] transition-all"
                    >
                      <UserIcon className="w-4 h-4" />
                      Account
                    </Link>
                    {/* Mock auth reset — signs the mock user out in place, no
                        real login page needed. Swap for a real sign-out call
                        (and keep the redirect) once auth is wired for real. */}
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Mock auth reset — instantly restores the mock user instead of
            // sending you to a real /auth/login page (which doesn't do
            // anything yet). Swap for <Link href="/auth/login"> once a real
            // login flow exists.
            <button
              onClick={() => login()}
              className="px-5 py-2.5 bg-[#050a44] text-white rounded-xl text-[14px] font-bold hover:opacity-90 transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-[#edeef0] shadow-[0_-4px_24px_rgba(0,0,0,0.05)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-around px-2 pt-2 pb-2">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center justify-center gap-1 flex-1 py-1"
              >
                <div
                  className={`flex items-center justify-center w-11 h-8 rounded-full transition-all duration-200 ${
                    active ? 'bg-[#050a44]' : 'bg-transparent'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      active ? 'text-white' : 'text-[#46464f]'
                    }`}
                    strokeWidth={active ? 2.4 : 2}
                  />
                </div>
                <span
                  className={`text-[10px] leading-none tracking-[0.01em] transition-colors ${
                    active ? 'text-[#050a44] font-bold' : 'text-[#46464f] font-medium'
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}