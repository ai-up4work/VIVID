'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Bell, ChevronDown, LogOut, Ticket, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/my-bookings', label: 'My Bookings' },
  { href: '/search', label: 'Search' },
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
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
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                      router.push('/auth/login');
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
          <Link
            href="/auth/login"
            className="px-5 py-2.5 bg-[#050a44] text-white rounded-xl text-[14px] font-bold hover:opacity-90 transition-all"
          >
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile nav */}
      <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#edeef0] flex items-center gap-1 px-4 py-2.5 overflow-x-auto">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              isActive(link.href) ? 'bg-[#f2f4f6] text-[#050a44]' : 'text-[#46464f]'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}