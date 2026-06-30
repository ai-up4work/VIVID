'use client';
import React, { useState } from 'react';
import { OperatorLayout } from '../../../components/OperatorLayout';

export default function RouteScheduling() {
  const [currentWeek, setCurrentWeek] = useState('Oct 24 - Oct 30, 2026');
  
  // Mock Data for the Calendar Grid
  const days = ['Mon 24', 'Tue 25', 'Wed 26', 'Thu 27', 'Fri 28', 'Sat 29', 'Sun 30'];
  const routes = ['London → Manchester', 'Edinburgh → Glasgow', 'Birmingham → Liverpool'];

  // This structure maps routes to specific days to simulate assignments
  const assignments: Record<string, Record<number, any[]>> = {
    'London → Manchester': {
      0: [{ id: 'GL-102', time: '08:00 AM', price: '£35', type: 'Scania AC' }],
      1: [{ id: 'GL-104', time: '09:30 AM', price: '£35', type: 'Volvo Non-AC' }],
      4: [{ id: 'GL-102', time: '08:00 AM', price: '£45', type: 'Scania AC', surge: true }, { id: 'GL-105', time: '02:00 PM', price: '£40', type: 'Volvo AC' }],
    },
    'Edinburgh → Glasgow': {
      0: [{ id: 'GL-201', time: '07:00 AM', price: '£15', type: 'Sprinter' }],
      2: [{ id: 'GL-201', time: '07:00 AM', price: '£15', type: 'Sprinter' }],
      3: [{ id: 'GL-202', time: '08:00 AM', price: '£15', type: 'Sprinter' }],
      5: [{ id: 'GL-205', time: '10:00 AM', price: '£20', type: 'Sprinter', surge: true }],
    },
    'Birmingham → Liverpool': {
      1: [{ id: 'GL-305', time: '11:00 AM', price: '£25', type: 'Scania AC' }],
      4: [{ id: 'GL-305', time: '11:00 AM', price: '£35', type: 'Scania AC', surge: true }],
      6: [{ id: 'GL-308', time: '04:00 PM', price: '£28', type: 'Volvo AC' }],
    }
  };

  return (
    <OperatorLayout>
      <main className="flex-1 p-8 min-h-screen flex flex-col">
        {/* Header Area */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-[32px] leading-[1.3] font-bold text-[#000000] tracking-tight">Route Scheduling</h2>
            <p className="text-[14px] leading-[1.6] text-[#46464f]">Assign buses, manage dynamic pricing, and oversee your weekly deployments.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border border-[#c7c5d1] rounded-lg overflow-hidden">
              <button className="px-3 py-2 text-[#46464f] hover:bg-[#f2f4f6] transition-colors border-r border-[#c7c5d1]">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <span className="px-4 py-2 text-sm font-bold text-[#191c1e] min-w-[180px] text-center">
                {currentWeek}
              </span>
              <button className="px-3 py-2 text-[#46464f] hover:bg-[#f2f4f6] transition-colors border-l border-[#c7c5d1]">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
              <span className="material-symbols-outlined text-sm">add</span>
              New Assignment
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-t-xl border border-[#c7c5d1] border-b-0 flex items-center justify-between">
          <div className="flex gap-2">
            <select className="bg-[#f2f4f6] border border-[#c7c5d1] text-sm font-medium rounded-lg px-4 py-2 outline-none">
              <option>All Routes</option>
              <option>London → Manchester</option>
              <option>Edinburgh → Glasgow</option>
            </select>
            <select className="bg-[#f2f4f6] border border-[#c7c5d1] text-sm font-medium rounded-lg px-4 py-2 outline-none">
              <option>All Buses</option>
              <option>Scania AC</option>
              <option>Sprinter</option>
            </select>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-[#46464f]">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-primary"></div> Standard Pricing</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-[#feb700]"></div> Surge Pricing</div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white border border-[#c7c5d1] rounded-b-xl overflow-x-auto flex-1 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#f8f9fb]">
                <th className="p-4 border-b border-r border-[#c7c5d1] w-48 text-sm font-bold text-[#191c1e]">Routes</th>
                {days.map((day, idx) => (
                  <th key={idx} className="p-4 border-b border-r border-[#c7c5d1] last:border-r-0 min-w-[160px]">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#46464f] mb-1">{day.split(' ')[0]}</div>
                    <div className="text-lg font-bold text-[#191c1e]">{day.split(' ')[1]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {routes.map((route, routeIdx) => (
                <tr key={routeIdx} className="border-b border-[#c7c5d1] last:border-b-0">
                  <td className="p-4 border-r border-[#c7c5d1] align-top bg-[#f8f9fb]/50">
                    <p className="text-sm font-bold text-primary mb-2">{route}</p>
                    <p className="text-xs text-[#777680]">Route ID: RT-{100 + routeIdx}</p>
                  </td>
                  {days.map((_, dayIdx) => {
                    const cellAssignments = assignments[route]?.[dayIdx] || [];
                    return (
                      <td key={dayIdx} className="p-2 border-r border-[#c7c5d1] last:border-r-0 align-top relative group min-h-[120px]">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#f2f4f6]/50 transition-opacity pointer-events-none"></div>
                        <div className="space-y-2 relative z-10">
                          {cellAssignments.map((assignment, aIdx) => (
                            <div key={aIdx} className={`p-3 rounded-lg border shadow-sm text-left cursor-pointer hover:shadow-md transition-shadow ${assignment.surge ? 'bg-[#fff8e6] border-[#feb700]/30' : 'bg-white border-[#c7c5d1]'}`}>
                              <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${assignment.surge ? 'bg-[#feb700] text-[#6b4b00]' : 'bg-primary text-white'}`}>
                                  {assignment.id}
                                </span>
                                <span className="text-xs font-bold text-[#191c1e]">{assignment.price}</span>
                              </div>
                              <p className="text-xs font-bold text-[#191c1e] mb-1">{assignment.time}</p>
                              <p className="text-[10px] font-medium text-[#46464f]">{assignment.type}</p>
                            </div>
                          ))}
                          <button className="w-full py-2 border-2 border-dashed border-[#c7c5d1] rounded-lg text-xs font-bold text-[#777680] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f2f4f6] hover:text-primary">
                            + Assign Bus
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </OperatorLayout>
  );
}
