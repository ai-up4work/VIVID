'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const staffData = [
    {
      id: 1,
      name: 'Tanveer Ahmed',
      staffId: 'GLP-4092',
      role: 'Branch Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
      phone: '+880 1711-223344',
      email: 'tanveer.glp@vivid.com',
      status: 'ACTIVE',
      writeAccess: true
    },
    {
      id: 2,
      name: 'Meherun Nisa',
      staffId: 'GLP-5021',
      role: 'Ticketing Agent',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
      phone: '+880 1812-334455',
      email: 'nisa.m@vivid.com',
      status: 'ACTIVE',
      writeAccess: false
    },
    {
      id: 3,
      name: 'Sajid Hasan',
      staffId: 'GLP-3022',
      role: 'Fleet Supervisor',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
      phone: '+880 1915-112233',
      email: 'sajid.h@vivid.com',
      status: 'INACTIVE',
      writeAccess: true
    }
  ];

  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] min-h-screen flex font-sans overflow-hidden">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full flex flex-col p-4 gap-1 bg-[#edeef0] shadow-md w-64 z-50">
        <div className="mb-8 px-2 mt-4">
          <h1 className="text-[20px] leading-[1.4] font-bold text-[#000000]">VIVID</h1>
          <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Operator Console</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
          <Link className="flex items-center gap-4 p-4 rounded-xl text-[#46464f] hover:bg-[#e1e2e4] transition-all duration-150" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-4 p-4 rounded-xl text-[#46464f] hover:bg-[#e1e2e4] transition-all duration-150" href="/operator/fleet">
            <span className="material-symbols-outlined">directions_bus</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Fleet Management</span>
          </Link>
          <Link className="flex items-center gap-4 p-4 rounded-xl text-[#46464f] hover:bg-[#e1e2e4] transition-all duration-150" href="/operator/routes">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Schedules</span>
          </Link>
          <Link className="flex items-center gap-4 p-4 rounded-xl text-[#46464f] hover:bg-[#e1e2e4] transition-all duration-150" href="#">
            <span className="material-symbols-outlined">confirmation_number</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Bookings</span>
          </Link>
          <Link className="flex items-center gap-4 p-4 rounded-xl bg-[#feb700] text-[#6b4b00] font-bold transition-all duration-150" href="/operator/staff">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Staff</span>
          </Link>
          <Link className="flex items-center gap-4 p-4 rounded-xl text-[#46464f] hover:bg-[#e1e2e4] transition-all duration-150" href="#">
            <span className="material-symbols-outlined">assessment</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Reports</span>
          </Link>
        </nav>
        <div className="mt-auto border-t border-[#c7c5d1] pt-4 space-y-1">
          <Link className="flex items-center gap-4 p-4 rounded-xl text-[#46464f] hover:bg-[#e1e2e4] transition-all duration-150" href="/operator/company">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Settings</span>
          </Link>
          <Link className="flex items-center gap-4 p-4 rounded-xl text-[#ba1a1a] hover:bg-[#ffdad6]/20 transition-all duration-150" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Logout</span>
          </Link>
          <div className="flex items-center gap-2 p-2 mt-4 bg-[#e7e8ea] rounded-xl">
            <img alt="Operator Profile" className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" />
            <div className="overflow-hidden">
              <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold truncate">Marcus Chen</p>
              <p className="text-[10px] text-[#46464f] uppercase tracking-wider font-bold">Admin Manager</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        {/* TopAppBar (Simulated) */}
        <header className="h-20 bg-[#f8f9fb] flex items-center justify-between px-[32px] flex-shrink-0 border-b border-[#c7c5d1]">
          <div className="flex items-center gap-4">
            <h2 className="text-[20px] leading-[1.4] font-semibold text-[#000000]">Staff Management</h2>
            <div className="h-6 w-px bg-[#c7c5d1]"></div>
            <div className="flex items-center text-[#46464f] text-[12px] leading-[1.2] font-medium">
              <span className="material-symbols-outlined text-[18px] mr-1">verified_user</span>
              Role-Based Access Control Active
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <span className="material-symbols-outlined text-[#46464f] cursor-pointer p-2 rounded-full hover:bg-[#e7e8ea] transition-colors">notifications</span>
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="flex-1 overflow-y-auto p-[32px] custom-scrollbar bg-[#f8f9fb]">
          {/* Dashboard Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px] mb-[32px]">
            <div className="bg-[#ffffff] p-[24px] rounded-xl border border-[#c7c5d1] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#000000] bg-[#0f144c]/10 p-2 rounded-lg">group</span>
                <span className="text-[#3280f9] bg-[#001a41]/10 px-2 py-1 rounded text-[12px] leading-[1.2] font-medium">+4 this month</span>
              </div>
              <div>
                <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] mb-1 uppercase tracking-wider">Total Staff</p>
                <p className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-[#000000]">124</p>
              </div>
            </div>
            
            <div className="bg-[#ffffff] p-[24px] rounded-xl border border-[#c7c5d1] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#7c5800] bg-[#ffdea8] p-2 rounded-lg">badge</span>
                <span className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Active Licenses</span>
              </div>
              <div>
                <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] mb-1 uppercase tracking-wider">Field Agents</p>
                <p className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-[#000000]">82</p>
              </div>
            </div>
            
            <div className="bg-[#ffffff] p-[24px] rounded-xl border border-[#c7c5d1] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#004494] bg-[#d8e2ff] p-2 rounded-lg">support_agent</span>
                <span className="text-[12px] leading-[1.2] font-medium text-[#46464f]">24/7 Ops</span>
              </div>
              <div>
                <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] mb-1 uppercase tracking-wider">Support Desk</p>
                <p className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-[#000000]">18</p>
              </div>
            </div>
            
            <div className="bg-[#ffffff] p-[24px] rounded-xl border border-[#c7c5d1] shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#000000] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#000000] p-2 rounded-lg">manage_accounts</span>
              </div>
              <div>
                <p className="text-[12px] leading-[1.2] font-medium text-[#46464f] mb-1 uppercase tracking-wider">Admins</p>
                <p className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-[#000000]">24</p>
              </div>
            </div>
          </div>

          {/* Staff Management Header & Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-[24px] mb-[24px]">
            <div className="w-full md:w-1/2 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#46464f]">search</span>
              <input 
                className="w-full pl-12 pr-4 py-3 bg-[#ffffff] border border-[#c7c5d1] rounded-xl focus:ring-2 focus:ring-[#000000] focus:border-transparent outline-none transition-all placeholder:text-[#46464f] text-[14px] leading-[1.6]" 
                placeholder="Search staff by name, role, or ID..." 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-6 py-3 border border-[#c7c5d1] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000] flex items-center justify-center gap-2 hover:bg-[#f2f4f6] transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
                Filters
              </button>
              <button className="flex-1 md:flex-none px-6 py-3 bg-[#000000] text-[#ffffff] rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[#000000]/10">
                <span className="material-symbols-outlined">person_add</span>
                Add New Staff
              </button>
            </div>
          </div>

          {/* Main Table Section */}
          <div className="bg-[#ffffff] rounded-xl border border-[#c7c5d1] shadow-sm overflow-hidden mb-[32px]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f2f4f6] border-b border-[#c7c5d1]">
                    <th className="px-6 py-4 text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Staff Member</th>
                    <th className="px-6 py-4 text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Permissions</th>
                    <th className="px-6 py-4 text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider">Contact Info</th>
                    <th className="px-6 py-4 text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider text-center">Status</th>
                    <th className="px-6 py-4 text-[12px] leading-[1.2] font-medium text-[#46464f] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c7c5d1]">
                  {staffData.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.role.toLowerCase().includes(searchTerm.toLowerCase()) || s.staffId.toLowerCase().includes(searchTerm.toLowerCase())).map((staff) => (
                    <tr key={staff.id} className="hover:bg-[#f8f9fb] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img alt="Staff" className="w-10 h-10 rounded-lg object-cover" src={staff.image} />
                          <div>
                            <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">{staff.name}</p>
                            <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">ID: {staff.staffId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#0f144c]/10 text-[#0f144c] text-[12px] leading-[1.2] font-medium">
                          {staff.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="relative flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={staff.writeAccess} />
                            <div className="w-10 h-5 bg-[#c7c5d1] peer-checked:bg-[#000000] rounded-full transition-colors duration-200"></div>
                            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                          </div>
                          <span className="text-[12px] leading-[1.2] font-medium text-[#46464f]">{staff.writeAccess ? 'Write Access' : 'Read Only'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[14px] leading-[1.6] text-[#000000]">{staff.phone}</p>
                        <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">{staff.email}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-[12px] leading-[1.2] font-bold ${staff.status === 'ACTIVE' ? 'bg-[#feb700] text-[#6b4b00]' : 'bg-[#e7e8ea] text-[#46464f] opacity-50'}`}>
                          {staff.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-[#46464f] hover:text-[#000000] hover:bg-[#e7e8ea] rounded-lg transition-all">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="p-2 text-[#46464f] hover:text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-all ml-1">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Table Footer / Pagination */}
            <div className="px-6 py-4 bg-[#f2f4f6] flex flex-col md:flex-row items-center justify-between border-t border-[#c7c5d1] gap-4">
              <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Showing 1-3 of 124 staff members</p>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-[#c7c5d1] hover:bg-[#e1e2e4] transition-colors disabled:opacity-30" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-10 h-10 rounded-lg bg-[#000000] text-[#ffffff] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">1</button>
                  <button className="w-10 h-10 rounded-lg hover:bg-[#e1e2e4] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">2</button>
                  <button className="w-10 h-10 rounded-lg hover:bg-[#e1e2e4] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">3</button>
                  <span className="mx-2 text-[#46464f]">...</span>
                  <button className="w-10 h-10 rounded-lg hover:bg-[#e1e2e4] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">13</button>
                </div>
                <button className="p-2 rounded-lg border border-[#c7c5d1] hover:bg-[#e1e2e4] transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#e7e8ea] border-t border-[#c7c5d1] px-8 py-6 flex flex-col md:flex-row justify-between items-center w-full flex-shrink-0">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-[20px] leading-[1.4] font-semibold text-[#000000]">VIVID</span>
            <p className="text-[#46464f] text-[12px] leading-[1.2] font-medium">© 2026 VIVID SaaS Platform. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a className="text-[12px] leading-[1.2] font-medium text-[#46464f] hover:text-[#000000] hover:underline transition-all" href="#">Privacy Policy</a>
            <a className="text-[12px] leading-[1.2] font-medium text-[#46464f] hover:text-[#000000] hover:underline transition-all" href="#">Terms of Service</a>
            <a className="text-[12px] leading-[1.2] font-medium text-[#46464f] hover:text-[#000000] hover:underline transition-all" href="#">Operator Portal</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
