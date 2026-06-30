'use client';
import React from 'react';
import Link from 'next/link';

export default function NotificationTemplates() {
  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] min-h-screen flex font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="bg-[#ffffff] flex flex-col h-full w-64 rounded-r-xl border-r border-[#c7c5d1] shadow-sm flex-shrink-0 z-50">
        <div className="flex flex-col h-full p-4 space-y-1">
          {/* Header Section */}
          <div className="px-4 py-6 border-b border-[#c7c5d1] mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#0f144c] flex items-center justify-center text-[#7a7fbb]">
                <span className="material-symbols-outlined">corporate_fare</span>
              </div>
              <div>
                <h1 className="text-[20px] leading-[1.4] font-bold text-[#000000] leading-tight">Operator Console</h1>
                <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Green Line Paribahan</p>
              </div>
            </div>
          </div>
          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            <Link className="flex items-center px-4 py-3 text-[#46464f] hover:bg-[#e7e8ea] rounded-xl hover:translate-x-1 transition-transform duration-200" href="#">
              <span className="material-symbols-outlined mr-3">dashboard</span>
              <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Dashboard</span>
            </Link>
            <Link className="flex items-center px-4 py-3 text-[#46464f] hover:bg-[#e7e8ea] rounded-xl hover:translate-x-1 transition-transform duration-200" href="/operator/routes">
              <span className="material-symbols-outlined mr-3">route</span>
              <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Routes</span>
            </Link>
            <Link className="flex items-center px-4 py-3 text-[#46464f] hover:bg-[#e7e8ea] rounded-xl hover:translate-x-1 transition-transform duration-200" href="/operator/fleet">
              <span className="material-symbols-outlined mr-3">directions_bus</span>
              <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Buses</span>
            </Link>
            <Link className="flex items-center px-4 py-3 text-[#46464f] hover:bg-[#e7e8ea] rounded-xl hover:translate-x-1 transition-transform duration-200" href="/operator/staff">
              <span className="material-symbols-outlined mr-3">group</span>
              <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Staff</span>
            </Link>
            <Link className="flex items-center px-4 py-3 text-[#46464f] hover:bg-[#e7e8ea] rounded-xl hover:translate-x-1 transition-transform duration-200" href="#">
              <span className="material-symbols-outlined mr-3">confirmation_number</span>
              <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Bookings</span>
            </Link>
            <Link className="flex items-center px-4 py-3 text-[#46464f] hover:bg-[#e7e8ea] rounded-xl hover:translate-x-1 transition-transform duration-200" href="#">
              <span className="material-symbols-outlined mr-3">payments</span>
              <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Settlements</span>
            </Link>
            <div className="pt-4 pb-2 px-6">
              <p className="text-[12px] leading-[1.2] font-medium text-[#777680] uppercase tracking-wider">Management</p>
            </div>
            <Link className="flex items-center gap-3 py-3 px-4 bg-[#0f144c] text-[#7a7fbb] rounded-xl mx-2 cursor-pointer shadow-sm font-bold scale-98 transition-all" href="/operator/notifications">
              <span className="material-symbols-outlined">notifications</span>
              <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Notifications</span>
            </Link>
          </nav>
          {/* CTA Section */}
          <div className="px-2 py-4">
            <button className="w-full bg-[#000000] text-[#ffffff] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Add New Route</span>
            </button>
          </div>
          {/* Footer Section */}
          <div className="pt-4 mt-auto border-t border-[#c7c5d1] space-y-1">
            <Link className="flex items-center px-4 py-3 text-[#46464f] hover:bg-[#e7e8ea] rounded-xl hover:translate-x-1 transition-transform duration-200" href="/operator/company">
              <span className="material-symbols-outlined mr-3">settings</span>
              <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Settings</span>
            </Link>
            <Link className="flex items-center px-4 py-3 text-[#46464f] hover:bg-[#e7e8ea] rounded-xl hover:translate-x-1 transition-transform duration-200" href="#">
              <span className="material-symbols-outlined mr-3">help</span>
              <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Support</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8f9fb]">
        {/* Content Canvas */}
        <div className="flex-1 overflow-y-auto p-[64px] custom-scrollbar">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-4">
            <div>
              <h2 className="text-[32px] leading-[1.3] font-bold text-[#191c1e]">Notification Templates</h2>
              <p className="text-[#46464f] text-[16px] leading-[1.6]">Manage and customize your communication workflows.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2 border-2 border-[#000000] text-[#000000] rounded-full text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:bg-[#000000] hover:text-[#ffffff] transition-all">
                System Defaults
              </button>
              <button className="px-6 py-2 bg-[#000000] text-[#ffffff] rounded-full text-[14px] leading-[1.2] tracking-[0.01em] font-semibold shadow-md hover:shadow-xl active:scale-95 transition-all">
                New Template
              </button>
            </div>
          </header>

          {/* Tabs Interface */}
          <div className="flex gap-8 border-b border-[#c7c5d1] mb-[32px]">
            <button className="pb-4 px-2 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold border-b-2 border-[#000000] text-[#000000]">Email</button>
            <button className="pb-4 px-2 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f] hover:text-[#000000] transition-colors">SMS</button>
            <button className="pb-4 px-2 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f] hover:text-[#000000] transition-colors">WhatsApp</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
            {/* Templates List (Left Column) */}
            <div className="col-span-1 lg:col-span-7 space-y-[16px]">
              {/* Booking Confirmation */}
              <div className="bg-[#ffffff] p-[24px] rounded-xl border border-[#c7c5d1] shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group relative overflow-hidden">
                <div className="flex items-center gap-[16px]">
                  <div className="w-12 h-12 rounded-full bg-[#ffdea8] flex items-center justify-center text-[#271900] shrink-0">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] leading-[1.4] font-semibold">Booking Confirmation</h3>
                    <div className="flex items-center gap-[8px] mt-1">
                      <span className="px-3 py-1 bg-[#edeef0] text-[#46464f] rounded-full text-[12px] leading-[1.2] font-medium">Email</span>
                      <span className="text-[#c7c5d1]">•</span>
                      <span className="text-[#777680] text-[12px] leading-[1.2] font-medium">Last updated: 2h ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[8px] self-end sm:self-auto">
                  <button className="p-2 text-[#46464f] hover:bg-[#edeef0] rounded-full transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button className="px-4 py-2 bg-[#000000] text-[#ffffff] rounded-lg text-[14px] leading-[1.2] tracking-[0.01em] font-semibold shadow-sm hover:opacity-90">Manage</button>
                </div>
              </div>

              {/* Payment Success */}
              <div className="bg-[#ffffff] p-[24px] rounded-xl border border-[#c7c5d1] shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                <div className="flex items-center gap-[16px]">
                  <div className="w-12 h-12 rounded-full bg-[#d8e2ff] flex items-center justify-center text-[#001a41] shrink-0">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] leading-[1.4] font-semibold">Payment Success</h3>
                    <div className="flex items-center gap-[8px] mt-1">
                      <span className="px-3 py-1 bg-[#edeef0] text-[#46464f] rounded-full text-[12px] leading-[1.2] font-medium">Email</span>
                      <span className="text-[#c7c5d1]">•</span>
                      <span className="text-[#777680] text-[12px] leading-[1.2] font-medium">Last updated: yesterday</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[8px] self-end sm:self-auto">
                  <button className="p-2 text-[#46464f] hover:bg-[#edeef0] rounded-full transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button className="px-4 py-2 border border-[#c7c5d1] text-[#46464f] rounded-lg text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:bg-[#f2f4f6]">Edit</button>
                </div>
              </div>

              {/* Ticket Cancellation */}
              <div className="bg-[#ffffff] p-[24px] rounded-xl border border-[#c7c5d1] shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                <div className="flex items-center gap-[16px]">
                  <div className="w-12 h-12 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#93000a] shrink-0">
                    <span className="material-symbols-outlined">cancel</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] leading-[1.4] font-semibold">Ticket Cancellation</h3>
                    <div className="flex items-center gap-[8px] mt-1">
                      <span className="px-3 py-1 bg-[#edeef0] text-[#46464f] rounded-full text-[12px] leading-[1.2] font-medium">Email</span>
                      <span className="text-[#c7c5d1]">•</span>
                      <span className="text-[#777680] text-[12px] leading-[1.2] font-medium">Last updated: 3 days ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[8px] self-end sm:self-auto">
                  <button className="p-2 text-[#46464f] hover:bg-[#edeef0] rounded-full transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button className="px-4 py-2 border border-[#c7c5d1] text-[#46464f] rounded-lg text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:bg-[#f2f4f6]">Edit</button>
                </div>
              </div>

              {/* Schedule Change */}
              <div className="bg-[#ffffff] p-[24px] rounded-xl border border-[#c7c5d1] shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                <div className="flex items-center gap-[16px]">
                  <div className="w-12 h-12 rounded-full bg-[#dfe0ff] flex items-center justify-center text-[#0f144c] shrink-0">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] leading-[1.4] font-semibold">Schedule Change</h3>
                    <div className="flex items-center gap-[8px] mt-1">
                      <span className="px-3 py-1 bg-[#edeef0] text-[#46464f] rounded-full text-[12px] leading-[1.2] font-medium">Email</span>
                      <span className="text-[#c7c5d1]">•</span>
                      <span className="text-[#777680] text-[12px] leading-[1.2] font-medium">Last updated: Oct 12, 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[8px] self-end sm:self-auto">
                  <button className="p-2 text-[#46464f] hover:bg-[#edeef0] rounded-full transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button className="px-4 py-2 border border-[#c7c5d1] text-[#46464f] rounded-lg text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:bg-[#f2f4f6]">Edit</button>
                </div>
              </div>

              {/* Resale Completed */}
              <div className="bg-[#ffffff] p-[24px] rounded-xl border border-[#c7c5d1] shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                <div className="flex items-center gap-[16px]">
                  <div className="w-12 h-12 rounded-full bg-[#e1e2e4] flex items-center justify-center text-[#191c1e] shrink-0">
                    <span className="material-symbols-outlined">swap_horiz</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] leading-[1.4] font-semibold">Resale Completed</h3>
                    <div className="flex items-center gap-[8px] mt-1">
                      <span className="px-3 py-1 bg-[#edeef0] text-[#46464f] rounded-full text-[12px] leading-[1.2] font-medium">Email</span>
                      <span className="text-[#c7c5d1]">•</span>
                      <span className="text-[#777680] text-[12px] leading-[1.2] font-medium">Last updated: Aug 24, 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[8px] self-end sm:self-auto">
                  <button className="p-2 text-[#46464f] hover:bg-[#edeef0] rounded-full transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button className="px-4 py-2 border border-[#c7c5d1] text-[#46464f] rounded-lg text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:bg-[#f2f4f6]">Edit</button>
                </div>
              </div>
            </div>

            {/* Preview Pane (Right Column) */}
            <div className="col-span-1 lg:col-span-5">
              <div className="sticky top-[24px] bg-[#f2f4f6] rounded-3xl p-[24px] border border-[#c7c5d1]">
                <div className="flex items-center justify-between mb-[24px]">
                  <h4 className="text-[20px] leading-[1.4] font-semibold">Template Preview</h4>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>

                {/* Branded Email Preview */}
                <div className="bg-[#ffffff] rounded-2xl overflow-hidden shadow-2xl border border-[#c7c5d1]">
                  {/* Email Header */}
                  <div className="bg-[#0f144c] p-[32px] text-center">
                    <img alt="Preview Logo" className="h-10 mx-auto filter brightness-0 invert opacity-90 mb-4" src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=200&auto=format&fit=crop" />
                    <h1 className="text-[#ffffff] text-[20px] leading-[1.4] font-semibold">Booking Confirmed!</h1>
                  </div>
                  
                  {/* Email Content */}
                  <div className="p-[32px] space-y-[16px]">
                    <p className="text-[16px] leading-[1.6] text-[#191c1e]">Hello <strong>Alex Johnson</strong>,</p>
                    <p className="text-[#46464f]">Your journey with VIVID Premium Express is all set. We're excited to have you on board for your trip to New York City.</p>
                    
                    {/* Journey Details Card */}
                    <div className="bg-[#f2f4f6] p-[16px] rounded-xl space-y-[8px]">
                      <div className="flex justify-between items-center border-b border-[#c7c5d1] pb-[8px]">
                        <span className="text-[12px] leading-[1.2] font-medium text-[#777680]">Ticket ID</span>
                        <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">#VV-90123-BK</span>
                      </div>
                      <div className="flex justify-between items-start pt-[8px]">
                        <div>
                          <p className="text-[12px] leading-[1.2] font-medium text-[#777680]">Departure</p>
                          <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Washington DC</p>
                          <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">08:30 AM</p>
                        </div>
                        <span className="material-symbols-outlined text-[#c7c5d1] pt-2">arrow_forward</span>
                        <div className="text-right">
                          <p className="text-[12px] leading-[1.2] font-medium text-[#777680]">Arrival</p>
                          <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">New York City</p>
                          <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">12:45 PM</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-[16px] text-center">
                      <button className="w-full bg-[#000000] text-[#ffffff] py-4 rounded-xl text-[20px] leading-[1.4] font-semibold">View Ticket PDF</button>
                      <p className="text-[12px] leading-[1.2] font-medium text-[#777680] mt-[16px]">You can also manage your booking through our mobile app.</p>
                    </div>
                  </div>
                  
                  {/* Email Footer */}
                  <div className="bg-[#e1e2e4] p-[24px] text-center space-y-[8px]">
                    <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">© 2026 VIVID SaaS Platform. All rights reserved.</p>
                    <div className="flex justify-center gap-[16px]">
                      <span className="material-symbols-outlined text-[#777680] cursor-pointer hover:text-[#000000] transition-colors">social_leaderboard</span>
                      <span className="material-symbols-outlined text-[#777680] cursor-pointer hover:text-[#000000] transition-colors">share</span>
                      <span className="material-symbols-outlined text-[#777680] cursor-pointer hover:text-[#000000] transition-colors">mail</span>
                    </div>
                  </div>
                </div>

                {/* Config Quick Actions */}
                <div className="mt-[32px] grid grid-cols-2 gap-[8px]">
                  <div className="p-[16px] bg-[#e1e2e4] rounded-xl cursor-pointer hover:bg-[#e7e8ea] transition-all flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-[#000000]">palette</span>
                    <span className="text-[12px] leading-[1.2] font-medium">Colors</span>
                  </div>
                  <div className="p-[16px] bg-[#e1e2e4] rounded-xl cursor-pointer hover:bg-[#e7e8ea] transition-all flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-[#000000]">cloud_upload</span>
                    <span className="text-[12px] leading-[1.2] font-medium">Replace Logo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Overlay */}
        <footer className="bg-[#f8f9fb] border-t border-[#c7c5d1] py-[16px] px-[64px] flex flex-col md:flex-row justify-between items-center text-[#46464f] text-[12px] leading-[1.2] font-medium shrink-0">
          <div className="flex items-center gap-[16px] mb-2 md:mb-0">
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-bold text-[#000000]">VIVID</span>
            <span>© 2026 VIVID SaaS Platform. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap gap-[32px] justify-center">
            <a className="hover:text-[#000000] underline transition-all" href="#">Privacy Policy</a>
            <a className="hover:text-[#000000] underline transition-all" href="#">Terms of Service</a>
            <a className="hover:text-[#000000] underline transition-all" href="#">Help Center</a>
            <a className="hover:text-[#000000] underline transition-all" href="#">API Documentation</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
