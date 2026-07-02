'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Dashboard() {
  const router = useRouter();

  return (
      <main className="max-w-[1440px] mx-auto px-4 md:px-16 py-8">
        {/* Header Section */}
        <section className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-primary mb-2">Welcome back, Alexander</h1>
            <p className="text-[16px] leading-[1.6] text-[#46464f]">Manage your journeys, tickets, and rewards in one place.</p>
          </div>
        </section>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Personal Details Card */}
          <div className="md:col-span-4 bg-white/80 backdrop-blur-md border border-slate-200/50 p-8 rounded-[24px] shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-[20px] font-semibold text-primary">Personal Details</h2>
              <span className="material-symbols-outlined text-[#777680] cursor-pointer hover:text-primary transition-colors">edit</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#dfe0ff] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <p className="text-[12px] text-[#777680] uppercase tracking-wider font-medium">Full Name</p>
                  <p className="text-[14px] font-semibold text-[#191c1e]">Alexander J. Hamilton</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#edeef0] flex items-center justify-center text-[#46464f]">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-[12px] text-[#777680] uppercase tracking-wider font-medium">Email Address</p>
                  <p className="text-[14px] font-semibold text-[#191c1e]">alex.ham@vivid.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#edeef0] flex items-center justify-center text-[#46464f]">
                  <span className="material-symbols-outlined">phone</span>
                </div>
                <div>
                  <p className="text-[12px] text-[#777680] uppercase tracking-wider font-medium">Phone Number</p>
                  <p className="text-[14px] font-semibold text-[#191c1e]">+1 (555) 0123-456</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#edeef0] flex items-center justify-center text-[#46464f]">
                  <span className="material-symbols-outlined">badge</span>
                </div>
                <div>
                  <p className="text-[12px] text-[#777680] uppercase tracking-wider font-medium">National ID</p>
                  <p className="text-[14px] font-semibold text-[#191c1e]">ID-8849-2024-X</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rewards & Wallet Card */}
          <div className="md:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wallet */}
              <div className="bg-[#0f144c] p-8 rounded-[24px] text-white relative overflow-hidden h-[200px] flex flex-col justify-between">
                <div className="z-10">
                  <p className="text-[14px] font-semibold text-[#bdc2ff] opacity-80">Available Credits</p>
                  <h3 className="text-[48px] font-bold text-white mt-2 leading-[1.2] tracking-[-0.02em]">$1,240.50</h3>
                </div>
                <div className="flex gap-4 z-10">
                  <button className="bg-white text-primary text-[14px] font-semibold px-6 py-2 rounded-full hover:bg-[#d9dadc] transition-colors">Add Funds</button>
                  <button className="bg-[#bdc2ff] text-primary text-[14px] font-semibold px-6 py-2 rounded-full">History</button>
                </div>
                {/* Abstract Background Decoration */}
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary opacity-20 rounded-full blur-3xl"></div>
                <div className="absolute -left-10 -top-10 w-48 h-48 bg-[#7a7fbb] opacity-20 rounded-full blur-3xl"></div>
              </div>

              {/* Rewards */}
              <div className="bg-[#feb700] p-8 rounded-[24px] text-[#6b4b00] h-[200px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[#7c5800]">workspace_premium</span>
                    <p className="text-[14px] font-bold">VIVID ELITE STATUS</p>
                  </div>
                  <h3 className="text-[32px] font-bold mt-2">12,450 pts</h3>
                </div>
                <div>
                  <div className="w-full bg-black/10 h-2 rounded-full mt-4">
                    <div className="bg-[#7c5800] w-3/4 h-full rounded-full"></div>
                  </div>
                  <p className="text-[12px] font-medium text-[#5e4200] mt-2">2,550 points until Platinum Tier</p>
                </div>
              </div>
            </div>

            {/* Upcoming Journeys Horizontal Scroll */}
            <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 p-8 rounded-[24px] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-semibold text-primary">Upcoming Journeys</h2>
                <Link className="text-primary text-[14px] font-semibold underline" href="/search">View All</Link>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                {/* Journey Card 1 */}
                <div className="min-w-[320px] bg-[#f2f4f6] p-4 rounded-xl border border-[#c7c5d1] flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-amber-100 text-[#B27B00] px-3 py-1 rounded-full text-[12px] font-bold">AC BUS</span>
                    <p className="text-[20px] font-bold text-primary">$45.00</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-4">
                    <div className="text-center">
                      <p className="text-[20px] font-semibold text-primary">NYC</p>
                      <p className="text-[12px] font-medium text-[#777680]">08:00 AM</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full border-t-2 border-dashed border-[#c7c5d1] relative">
                        <span className="material-symbols-outlined absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f2f4f6] px-1 text-primary text-[20px]">directions_bus</span>
                      </div>
                      <p className="text-[12px] font-medium text-[#777680] mt-2">4h 20m</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[20px] font-semibold text-primary">BOS</p>
                      <p className="text-[12px] font-medium text-[#777680]">12:20 PM</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[#46464f] text-[12px] font-medium">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                      Oct 24, 2024
                    </div>
                    <button className="text-primary font-bold">Details</button>
                  </div>
                </div>

                {/* Journey Card 2 */}
                <div className="min-w-[320px] bg-[#f2f4f6] p-4 rounded-xl border border-[#c7c5d1] flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-blue-100 text-[#2B6CB0] px-3 py-1 rounded-full text-[12px] font-bold">NON-AC</span>
                    <p className="text-[20px] font-bold text-primary">$32.00</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-4">
                    <div className="text-center">
                      <p className="text-[20px] font-semibold text-primary">PHI</p>
                      <p className="text-[12px] font-medium text-[#777680]">02:15 PM</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full border-t-2 border-dashed border-[#c7c5d1] relative">
                        <span className="material-symbols-outlined absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f2f4f6] px-1 text-primary text-[20px]">directions_bus</span>
                      </div>
                      <p className="text-[12px] font-medium text-[#777680] mt-2">1h 45m</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[20px] font-semibold text-primary">DC</p>
                      <p className="text-[12px] font-medium text-[#777680]">04:00 PM</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[#46464f] text-[12px] font-medium">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                      Oct 28, 2024
                    </div>
                    <button className="text-primary font-bold">Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking History & Listings Grid */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* My Resale Listings */}
            <div className="md:col-span-1 bg-white/80 backdrop-blur-md border border-slate-200/50 p-8 rounded-[24px] shadow-sm h-full">
              <h2 className="text-[20px] font-semibold text-primary mb-6">My Resale Listings</h2>
              <div className="flex flex-col gap-4">
                {/* Listing Item */}
                <div className="flex items-center justify-between p-4 bg-[#f8f9fb] rounded-xl border border-[#c7c5d1]">
                  <div>
                    <p className="text-[14px] font-semibold text-primary">NYC → PHI</p>
                    <p className="text-[12px] font-medium text-[#777680]">Listed for $28.00</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-[10px] font-bold">ACTIVE</span>
                </div>
                {/* Empty State Placeholder */}
                <div className="border-2 border-dashed border-[#c7c5d1] rounded-xl p-8 flex flex-col items-center justify-center text-center opacity-60">
                  <span className="material-symbols-outlined text-4xl mb-2">add_circle</span>
                  <p className="text-[12px] font-medium">Sell your unused ticket</p>
                  <button className="mt-2 text-primary font-bold underline">List Now</button>
                </div>
              </div>
            </div>

            {/* Full Booking History */}
            <div className="md:col-span-2 bg-white/80 backdrop-blur-md border border-slate-200/50 p-8 rounded-[24px] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-semibold text-primary">Booking History</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-1 rounded-full bg-[#edeef0] text-[#46464f] text-[12px] font-medium hover:bg-slate-200 transition-colors">Filter</button>
                  <button className="px-4 py-1 rounded-full bg-[#edeef0] text-[#46464f] text-[12px] font-medium hover:bg-slate-200 transition-colors">Export</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-[#c7c5d1]">
                    <tr className="text-[12px] text-[#777680] uppercase tracking-wider">
                      <th className="pb-4 font-medium">Route</th>
                      <th className="pb-4 font-medium">Date</th>
                      <th className="pb-4 font-medium">Status</th>
                      <th className="pb-4 font-medium">Amount</th>
                      <th className="pb-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px]">
                    <tr className="border-b border-[#edeef0]">
                      <td className="py-6 font-bold">BOS → NYC</td>
                      <td className="py-6 text-[#46464f]">Sept 12, 2024</td>
                      <td className="py-6"><span className="text-green-600 font-bold">Completed</span></td>
                      <td className="py-6">$45.00</td>
                      <td className="py-6"><button className="text-primary material-symbols-outlined hover:text-black">receipt_long</button></td>
                    </tr>
                    <tr className="border-b border-[#edeef0]">
                      <td className="py-6 font-bold">NYC → DC</td>
                      <td className="py-6 text-[#46464f]">Aug 28, 2024</td>
                      <td className="py-6"><span className="text-green-600 font-bold">Completed</span></td>
                      <td className="py-6">$55.00</td>
                      <td className="py-6"><button className="text-primary material-symbols-outlined hover:text-black">receipt_long</button></td>
                    </tr>
                    <tr>
                      <td className="py-6 font-bold">DC → NYC</td>
                      <td className="py-6 text-[#46464f]">Aug 15, 2024</td>
                      <td className="py-6"><span className="text-[#ba1a1a] font-bold">Cancelled</span></td>
                      <td className="py-6 text-[#777680] line-through">$40.00</td>
                      <td className="py-6">
                        <Link href="/cancellation" className="text-[#777680] material-symbols-outlined hover:text-primary">info</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Content */}
        <section className="mt-8 relative rounded-[32px] overflow-hidden h-64 group">
          <img alt="Travel Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex flex-col justify-center px-8 md:px-12">
            <h2 className="text-white text-[48px] font-bold max-w-lg mb-4 leading-tight tracking-tight">Travel more, earn more.</h2>
            <button className="bg-[#feb700] text-[#6b4b00] text-[16px] font-semibold px-8 py-4 rounded-full w-fit hover:scale-105 transition-transform">Explore Rewards</button>
          </div>
        </section>
      </main>
  );
}

