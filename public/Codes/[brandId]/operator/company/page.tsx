'use client';
import React from 'react';
import Link from 'next/link';

export default function CompanyProfile() {
  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] min-h-screen flex font-sans">
      {/* Side Navigation Shell */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#ffffff] border-r border-[#c7c5d1] flex flex-col p-4 space-y-2 z-50">
        <div className="mb-8 px-2 mt-4">
          <h1 className="text-[20px] leading-[1.4] font-extrabold text-[#000000]">VIVID</h1>
          <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Operator Console</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link className="flex items-center space-x-4 p-4 text-[#46464f] hover:bg-[#f2f4f6] rounded-xl transition-all text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link className="flex items-center space-x-4 p-4 text-[#46464f] hover:bg-[#f2f4f6] rounded-xl transition-all text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" href="/operator/fleet">
            <span className="material-symbols-outlined">directions_bus</span>
            <span>Fleet Management</span>
          </Link>
          <Link className="flex items-center space-x-4 p-4 text-[#46464f] hover:bg-[#f2f4f6] rounded-xl transition-all text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" href="/operator/routes">
            <span className="material-symbols-outlined">calendar_today</span>
            <span>Route Schedule</span>
          </Link>
          <Link className="flex items-center space-x-4 p-4 text-[#46464f] hover:bg-[#f2f4f6] rounded-xl transition-all text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" href="#">
            <span className="material-symbols-outlined">confirmation_number</span>
            <span>Bookings</span>
          </Link>
          <Link className="flex items-center space-x-4 p-4 text-[#46464f] hover:bg-[#f2f4f6] rounded-xl transition-all text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" href="#">
            <span className="material-symbols-outlined">payments</span>
            <span>Revenue</span>
          </Link>
          <Link className="flex items-center space-x-4 p-4 bg-[#feb700] text-[#6b4b00] rounded-xl transition-all text-[14px] leading-[1.2] tracking-[0.01em] font-semibold translate-x-1" href="/operator/company">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            <span>Settings</span>
          </Link>
        </nav>
        <div className="pt-8 border-t border-[#c7c5d1] mt-auto space-y-1">
          <div className="flex items-center space-x-4 p-4 mb-4">
            <img alt="Operator Profile" className="w-10 h-10 rounded-full object-cover border-2 border-[#dfe0ff]" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" />
            <div className="overflow-hidden">
              <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold truncate">Marcus Chen</p>
              <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] truncate">Fleet Director</p>
            </div>
          </div>
          <Link className="flex items-center space-x-4 p-4 text-[#46464f] hover:bg-[#f2f4f6] rounded-xl transition-all text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" href="#">
            <span className="material-symbols-outlined">help</span>
            <span>Support</span>
          </Link>
          <Link className="flex items-center space-x-4 p-4 text-[#ba1a1a] hover:bg-[#ffdad6]/10 rounded-xl transition-all text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 min-h-screen p-[32px] flex-1">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <header className="mb-[48px] flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <nav className="flex items-center space-x-2 mb-2 text-[12px] leading-[1.2] font-medium text-[#46464f]">
                <span>Settings</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-[#000000] font-bold">Company Profile</span>
              </nav>
              <h2 className="text-[32px] leading-[1.3] font-bold text-[#000000]">Company Profile</h2>
              <p className="text-[14px] leading-[1.6] text-[#46464f] mt-1">Manage your brand identity and public appearance.</p>
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-2 border border-[#777680] text-[#191c1e] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold rounded-full hover:bg-[#f2f4f6] transition-all">
                Discard Changes
              </button>
              <button className="px-6 py-2 bg-[#000000] text-[#ffffff] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold rounded-full hover:opacity-90 transition-all shadow-sm">
                Save Changes
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px]">
            {/* Forms Column */}
            <div className="col-span-1 lg:col-span-7 space-y-[32px]">
              {/* Company Identity */}
              <section className="bg-[#ffffff] p-[32px] rounded-xl border border-[#c7c5d1] shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center space-x-2 mb-6">
                  <span className="material-symbols-outlined text-[#000000]">business</span>
                  <h3 className="text-[20px] leading-[1.4] font-semibold">Company Identity</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start gap-8">
                    <div className="relative group shrink-0">
                      <div className="w-24 h-24 rounded-2xl bg-[#edeef0] flex items-center justify-center border-2 border-dashed border-[#c7c5d1] overflow-hidden">
                        <img alt="Greenline Logo" className="w-full h-full object-contain p-4" src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=200&auto=format&fit=crop" />
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-1 bg-[#000000] text-[#ffffff] rounded-full shadow-lg">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <div>
                        <label className="block text-[12px] leading-[1.2] font-medium text-[#46464f] mb-1">Company Legal Name</label>
                        <input className="w-full px-4 py-2 bg-[#f8f9fb] border border-[#c7c5d1] rounded-xl focus:ring-2 focus:ring-[#000000] focus:border-transparent outline-none transition-all text-[14px]" type="text" defaultValue="Greenline Intercity Express" />
                      </div>
                      <div>
                        <label className="block text-[12px] leading-[1.2] font-medium text-[#46464f] mb-1">Display Name (Public)</label>
                        <input className="w-full px-4 py-2 bg-[#f8f9fb] border border-[#c7c5d1] rounded-xl focus:ring-2 focus:ring-[#000000] focus:border-transparent outline-none transition-all text-[14px]" type="text" defaultValue="Greenline" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Branding & Style */}
              <section className="bg-[#ffffff] p-[32px] rounded-xl border border-[#c7c5d1] shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center space-x-2 mb-6">
                  <span className="material-symbols-outlined text-[#000000]">palette</span>
                  <h3 className="text-[20px] leading-[1.4] font-semibold">Branding & Styles</h3>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[12px] leading-[1.2] font-medium text-[#46464f] mb-2">Primary Brand Color</label>
                      <div className="flex items-center space-x-4 p-2 border border-[#c7c5d1] rounded-xl bg-[#f8f9fb]">
                        <div className="w-10 h-10 rounded-lg bg-[#054432] cursor-pointer shadow-inner shrink-0"></div>
                        <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex-1">#054432</span>
                        <span className="material-symbols-outlined ml-auto text-[#46464f] cursor-pointer">colorize</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] leading-[1.2] font-medium text-[#46464f] mb-2">Secondary Color</label>
                      <div className="flex items-center space-x-4 p-2 border border-[#c7c5d1] rounded-xl bg-[#f8f9fb]">
                        <div className="w-10 h-10 rounded-lg bg-[#F9BC15] cursor-pointer shadow-inner shrink-0"></div>
                        <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex-1">#F9BC15</span>
                        <span className="material-symbols-outlined ml-auto text-[#46464f] cursor-pointer">colorize</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] leading-[1.2] font-medium text-[#46464f] mb-2">White-label Domain</label>
                    <div className="flex">
                      <div className="flex-1 relative flex">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#46464f] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">https://</span>
                        <input className="w-full pl-[68px] pr-4 py-2 bg-[#f8f9fb] border border-[#c7c5d1] rounded-l-xl focus:ring-2 focus:ring-[#000000] focus:border-transparent outline-none transition-all text-[14px]" type="text" defaultValue="booking.greenline.com" />
                      </div>
                      <button className="px-6 bg-[#e7e8ea] border border-l-0 border-[#c7c5d1] rounded-r-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f] hover:bg-[#edeef0] transition-all shrink-0">Verify</button>
                    </div>
                    <p className="mt-1 text-[12px] leading-[1.2] font-medium text-[#3280f9]">CNAME record detected and verified.</p>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-[#ffffff] p-[32px] rounded-xl border border-[#c7c5d1] shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center space-x-2 mb-6">
                  <span className="material-symbols-outlined text-[#000000]">contact_support</span>
                  <h3 className="text-[20px] leading-[1.4] font-semibold">Customer Support Contact</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] leading-[1.2] font-medium text-[#46464f] mb-1">Support Email</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#46464f] text-[18px]">mail</span>
                      <input className="w-full pl-[44px] pr-4 py-2 bg-[#f8f9fb] border border-[#c7c5d1] rounded-xl focus:ring-2 focus:ring-[#000000] focus:border-transparent outline-none transition-all text-[14px]" type="email" defaultValue="support@greenline.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] leading-[1.2] font-medium text-[#46464f] mb-1">Hotline Number</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#46464f] text-[18px]">phone</span>
                      <input className="w-full pl-[44px] pr-4 py-2 bg-[#f8f9fb] border border-[#c7c5d1] rounded-xl focus:ring-2 focus:ring-[#000000] focus:border-transparent outline-none transition-all text-[14px]" type="text" defaultValue="+1 (800) 555-0199" />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Preview Column */}
            <div className="col-span-1 lg:col-span-5 relative mt-[32px] lg:mt-0">
              <div className="sticky top-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f] uppercase tracking-wider">Live Preview</h3>
                  <div className="flex space-x-2">
                    <button className="p-1 bg-[#edeef0] rounded-lg"><span className="material-symbols-outlined text-[20px]">smartphone</span></button>
                    <button className="p-1 text-[#46464f]"><span className="material-symbols-outlined text-[20px]">tablet</span></button>
                    <button className="p-1 text-[#46464f]"><span className="material-symbols-outlined text-[20px]">desktop_windows</span></button>
                  </div>
                </div>
                
                {/* Preview Card (Mobile Wrapper) */}
                <div className="border-[12px] border-[#191c1e] rounded-[40px] overflow-hidden shadow-2xl aspect-[9/19] bg-[#ffffff] mx-auto max-w-[320px] flex flex-col">
                  <div className="h-6 bg-black w-full shrink-0"></div> {/* Notch area */}
                  
                  {/* App Header */}
                  <div className="px-4 py-4 flex items-center justify-between shrink-0" style={{ backgroundColor: '#054432' }}>
                    <div className="h-6 text-white font-bold tracking-widest text-sm">GREENLINE</div>
                    <span className="material-symbols-outlined text-white">menu</span>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                    <div className="h-32 w-full rounded-xl relative overflow-hidden shrink-0">
                      <img alt="Bus Interior" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                        <p className="text-white text-[12px] leading-[1.2] font-medium">Travel in Style</p>
                        <p className="text-white text-[20px] leading-[1.4] font-semibold">New Luxury Fleet</p>
                      </div>
                    </div>
                    
                    {/* Search Mockup */}
                    <div className="space-y-2 shrink-0">
                      <div className="h-10 w-full border border-[#c7c5d1] rounded-lg flex items-center px-2 text-[#46464f] text-[12px] leading-[1.2] font-medium">
                        <span className="material-symbols-outlined text-[16px] mr-1">near_me</span> From: Seattle, WA
                      </div>
                      <div className="h-10 w-full border border-[#c7c5d1] rounded-lg flex items-center px-2 text-[#46464f] text-[12px] leading-[1.2] font-medium">
                        <span className="material-symbols-outlined text-[16px] mr-1">location_on</span> To: Portland, OR
                      </div>
                      <button className="w-full py-3 rounded-lg text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-white" style={{ backgroundColor: '#054432' }}>
                        Search Bus
                      </button>
                    </div>
                    
                    {/* Search Result Card Mockup */}
                    <div className="border border-[#c7c5d1] rounded-xl p-4 space-y-4 shrink-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-1">
                          <span className="material-symbols-outlined text-[16px]" style={{ color: '#054432' }}>verified</span>
                          <span className="text-[12px] leading-[1.2] font-bold">Greenline Express</span>
                        </div>
                        <span className="px-1 py-[2px] bg-[#FFF4E0] text-[#B27B00] rounded text-[12px] leading-[1.2] font-medium text-[10px]">AC LUXURY</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div className="text-center">
                          <p className="font-bold text-[20px] leading-[1.4] font-semibold">08:00</p>
                          <p className="text-[10px] text-[#46464f]">SEA</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center space-x-1 px-4">
                          <div className="h-[2px] flex-1 bg-[#c7c5d1]"></div>
                          <span className="material-symbols-outlined text-[#c7c5d1] text-[16px]">directions_bus</span>
                          <div className="h-[2px] flex-1 bg-[#c7c5d1]"></div>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-[20px] leading-[1.4] font-semibold">11:30</p>
                          <p className="text-[10px] text-[#46464f]">PDX</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-end border-t border-dashed border-[#c7c5d1] pt-4">
                        <div>
                          <p className="text-[10px] text-[#46464f]">Starting from</p>
                          <p className="text-[20px] leading-[1] font-bold" style={{ color: '#054432' }}>$42.00</p>
                        </div>
                        <button className="px-4 py-1 rounded-full text-[12px] leading-[1.2] font-medium text-white" style={{ backgroundColor: '#054432' }}>Book</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-[24px] p-[24px] bg-[#f2f4f6] rounded-xl border border-[#c7c5d1]">
                  <div className="flex items-start space-x-4">
                    <span className="material-symbols-outlined text-[#3280f9] shrink-0">info</span>
                    <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] leading-relaxed">
                      Changes made here will propagate to your white-label booking engine and the VIVID marketplace results within 5 minutes.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="ml-64 bg-[#e1e2e4] border-t border-[#c7c5d1] py-[48px] mt-[48px] absolute bottom-0 w-[calc(100%-16rem)] hidden">
          {/* We will let main flex-1 push the footer down if needed, but the layout is complex. */}
      </footer>
    </div>
  );
}
