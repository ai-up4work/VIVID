import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'VIVID - Bus Bookings Platform',
  description: 'Book your bus tickets online. Browse multiple bus brands and book your seats in real-time.',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Public Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md h-20 w-full px-4 md:px-[64px] flex justify-between items-center border-b border-[#edeef0] bg-white/80">
        <a href="/" className="text-[28px] font-black text-[#050a44] tracking-tighter">
          VIVID
        </a>
        <div className="hidden md:flex items-center space-x-[32px]">
          <a href="/bus" className="text-[#050a44] font-bold hover:text-[#feb700] transition-colors text-[14px]">
            Browse Buses
          </a>
          <a href="/my-bookings" className="text-[#46464f] font-medium hover:text-[#050a44] transition-colors text-[14px]">
            My Bookings
          </a>
          <a href="#about" className="text-[#46464f] font-medium hover:text-[#050a44] transition-colors text-[14px]">
            About
          </a>
        </div>
        <a href="/auth/login" className="px-6 py-2 bg-[#050a44] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Sign In
        </a>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Public Footer */}
      <footer className="bg-[#050a44] text-white mt-16 py-12 px-4 md:px-[64px]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-[20px] font-black mb-4">VIVID</h3>
              <p className="text-[14px] text-gray-300">The easiest way to book bus tickets online.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[14px]">Browse</h4>
              <ul className="space-y-2 text-[14px] text-gray-300">
                <li><a href="/bus" className="hover:text-white transition">All Buses</a></li>
                <li><a href="/my-bookings" className="hover:text-white transition">My Bookings</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[14px]">Support</h4>
              <ul className="space-y-2 text-[14px] text-gray-300">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[14px]">Legal</h4>
              <ul className="space-y-2 text-[14px] text-gray-300">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-[14px] text-gray-300">
            <p>&copy; 2024 VIVID Bus Bookings. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
