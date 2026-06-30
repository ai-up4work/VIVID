'use client';
import React, { useState } from 'react';
import { OperatorLayout } from '../../../components/OperatorLayout';

export default function FleetManagement() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'maintenance' | 'fueling'>('inventory');

  return (
    <OperatorLayout>
      <main className="flex-1 p-8 min-h-screen flex flex-col font-sans">
        {/* Header Area */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-[32px] leading-[1.3] font-bold text-[#000000] tracking-tight">Fleet Management</h2>
            <p className="text-[14px] leading-[1.6] text-[#46464f]">Manage inventory, track maintenance schedules, and monitor fuel consumption.</p>
          </div>
          <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
            <span className="material-symbols-outlined text-sm">add</span>
            Add New Bus
          </button>
        </header>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">directions_bus</span>
              </div>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Total Fleet</p>
            <h3 className="text-2xl font-black text-primary">24 <span className="text-sm font-medium text-[#777680]">Buses</span></h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 rounded-lg text-green-700">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Active on Routes</p>
            <h3 className="text-2xl font-black text-primary">18 <span className="text-sm font-medium text-[#777680]">Deployed</span></h3>
          </div>
          <div className="bg-[#fff8e6] p-6 rounded-2xl border border-[#feb700]/30 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-[#feb700]/20 rounded-lg text-[#6b4b00]">
                <span className="material-symbols-outlined">build</span>
              </div>
            </div>
            <p className="text-sm text-[#6b4b00] font-medium mb-1 relative z-10">In Maintenance</p>
            <h3 className="text-2xl font-black text-[#6b4b00] relative z-10">2 <span className="text-sm font-medium opacity-80">Buses</span></h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-700">
                <span className="material-symbols-outlined">local_gas_station</span>
              </div>
              <span className="text-xs font-bold text-[#ba1a1a] bg-[#ffdad6] px-2 py-1 rounded-full">+4%</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Weekly Fuel Cost</p>
            <h3 className="text-2xl font-black text-primary">$3,240</h3>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-[#c7c5d1] mb-6">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'inventory' ? 'border-primary text-primary' : 'border-transparent text-[#46464f] hover:text-primary hover:bg-[#f8f9fb]'}`}
          >
            Inventory & Layouts
          </button>
          <button 
            onClick={() => setActiveTab('maintenance')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'maintenance' ? 'border-primary text-primary' : 'border-transparent text-[#46464f] hover:text-primary hover:bg-[#f8f9fb]'}`}
          >
            Maintenance Schedule
          </button>
          <button 
            onClick={() => setActiveTab('fueling')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'fueling' ? 'border-primary text-primary' : 'border-transparent text-[#46464f] hover:text-primary hover:bg-[#f8f9fb]'}`}
          >
            <span className="material-symbols-outlined text-[16px]">local_gas_station</span> Fuel Logs
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl border border-[#c7c5d1] shadow-sm flex-1">
          {activeTab === 'inventory' && (
            <div className="p-0">
              <table className="w-full text-left">
                <thead className="bg-[#f8f9fb] border-b border-[#c7c5d1]">
                  <tr>
                    <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider">Bus ID / Reg</th>
                    <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider">Model / Type</th>
                    <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider">Layout</th>
                    <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c7c5d1]/50">
                  <tr className="hover:bg-[#f8f9fb]">
                    <td className="p-4">
                      <p className="font-bold text-primary">GL-102</p>
                      <p className="text-xs text-[#777680]">XYZ-8821</p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-[#191c1e]">Scania Multi-Axle</p>
                      <p className="text-xs text-[#777680]">AC Seater</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-surface-variant text-on-surface-variant rounded-md text-xs font-bold border border-outline/30">2x2 (40 Seats)</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center w-fit gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-600"></div> Active</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 hover:bg-surface-variant rounded-lg text-[#46464f]"><span className="material-symbols-outlined text-sm">visibility</span></button>
                      <button className="p-2 hover:bg-surface-variant rounded-lg text-[#46464f]"><span className="material-symbols-outlined text-sm">edit</span></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#f8f9fb]">
                    <td className="p-4">
                      <p className="font-bold text-primary">GL-205</p>
                      <p className="text-xs text-[#777680]">ABC-4492</p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-[#191c1e]">Volvo B11R</p>
                      <p className="text-xs text-[#777680]">AC Sleeper</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-surface-variant text-on-surface-variant rounded-md text-xs font-bold border border-outline/30">2x1 (30 Berths)</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-[#fff8e6] text-[#6b4b00] rounded-full text-xs font-bold flex items-center w-fit gap-1 border border-[#feb700]/30"><div className="w-1.5 h-1.5 rounded-full bg-[#feb700]"></div> In Shop</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 hover:bg-surface-variant rounded-lg text-[#46464f]"><span className="material-symbols-outlined text-sm">visibility</span></button>
                      <button className="p-2 hover:bg-surface-variant rounded-lg text-[#46464f]"><span className="material-symbols-outlined text-sm">edit</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-primary">Upcoming Services</h3>
                <button className="text-primary text-sm font-bold border border-primary px-4 py-2 rounded-lg hover:bg-[#f2f4f6]">Log Maintenance</button>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-[#feb700] bg-[#fff8e6] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#feb700]/20 text-[#6b4b00] flex items-center justify-center">
                      <span className="material-symbols-outlined">oil_barrel</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#191c1e]">GL-205 • Oil Change & Filters</p>
                      <p className="text-xs text-[#6b4b00] mt-1">Due in 500 km (Est. 2 days)</p>
                    </div>
                  </div>
                  <button className="bg-[#feb700] text-[#6b4b00] px-4 py-2 rounded-lg text-xs font-bold">Mark Started</button>
                </div>
                
                <div className="p-4 border border-[#c7c5d1] bg-white rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f2f4f6] text-[#46464f] flex items-center justify-center">
                      <span className="material-symbols-outlined">tire_repair</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#191c1e]">GL-102 • Tire Rotation</p>
                      <p className="text-xs text-[#777680] mt-1">Due in 4,500 km</p>
                    </div>
                  </div>
                  <button className="border border-[#c7c5d1] text-[#46464f] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#f2f4f6]">View Details</button>
                </div>
              </div>

              <h3 className="font-bold text-lg text-primary mt-8 mb-4">Service History</h3>
              <table className="w-full text-left">
                <thead className="border-b border-[#c7c5d1]">
                  <tr>
                    <th className="pb-3 text-xs font-bold text-[#46464f] uppercase">Date</th>
                    <th className="pb-3 text-xs font-bold text-[#46464f] uppercase">Bus ID</th>
                    <th className="pb-3 text-xs font-bold text-[#46464f] uppercase">Service Type</th>
                    <th className="pb-3 text-xs font-bold text-[#46464f] uppercase">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c7c5d1]/30">
                  <tr>
                    <td className="py-3 text-sm font-medium">Oct 15, 2026</td>
                    <td className="py-3 text-sm font-bold text-primary">GL-104</td>
                    <td className="py-3 text-sm">Brake Pad Replacement</td>
                    <td className="py-3 text-sm font-bold">$450.00</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-medium">Oct 10, 2026</td>
                    <td className="py-3 text-sm font-bold text-primary">GL-308</td>
                    <td className="py-3 text-sm">Full AC Servicing</td>
                    <td className="py-3 text-sm font-bold">$210.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'fueling' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-primary">Fuel Consumption Logs</h3>
                <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">add</span> Log Refuel
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#f8f9fb] border-b border-[#c7c5d1]">
                    <tr>
                      <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider">Date & Time</th>
                      <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider">Bus ID</th>
                      <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider">Driver</th>
                      <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider">Odometer</th>
                      <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider">Volume (L)</th>
                      <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider">Total Cost</th>
                      <th className="p-4 text-xs font-bold text-[#46464f] uppercase tracking-wider text-right">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c7c5d1]/50">
                    <tr className="hover:bg-[#f8f9fb]">
                      <td className="p-4">
                        <p className="text-sm font-medium">Oct 24, 08:15 AM</p>
                      </td>
                      <td className="p-4 font-bold text-primary">GL-102</td>
                      <td className="p-4 text-sm">Rafiq A.</td>
                      <td className="p-4 text-sm font-medium">142,500 km</td>
                      <td className="p-4 text-sm font-bold">120 L</td>
                      <td className="p-4 text-sm font-bold text-[#ba1a1a]">$185.00</td>
                      <td className="p-4 text-right">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-bold">3.8 km/L</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f8f9fb]">
                      <td className="p-4">
                        <p className="text-sm font-medium">Oct 23, 09:30 PM</p>
                      </td>
                      <td className="p-4 font-bold text-primary">GL-205</td>
                      <td className="p-4 text-sm">Hasan K.</td>
                      <td className="p-4 text-sm font-medium">89,210 km</td>
                      <td className="p-4 text-sm font-bold">180 L</td>
                      <td className="p-4 text-sm font-bold text-[#ba1a1a]">$270.00</td>
                      <td className="p-4 text-right">
                        <span className="px-2 py-1 bg-[#ffdad6] text-[#93000a] rounded-md text-xs font-bold">2.9 km/L</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </OperatorLayout>
  );
}
