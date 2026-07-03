'use client';
import React, { useState } from 'react';
import { SuperAdminLayout } from '../../../components/SuperAdminLayout';
import { X } from 'lucide-react';

export default function SupportPage() {
  const [tickets, setTickets] = useState([
    { id: 'TKT-001', operator: 'Green Line Paribahan', subject: 'Payment integration issue', priority: 'high', status: 'open', created: 'Mar 18, 2024' },
    { id: 'TKT-002', operator: 'Sohag Paribahan', subject: 'Route schedule sync delay', priority: 'medium', status: 'in_progress', created: 'Mar 17, 2024' },
    { id: 'TKT-003', operator: 'Shyamoli Express', subject: 'Custom branding request', priority: 'low', status: 'open', created: 'Mar 16, 2024' },
    { id: 'TKT-004', operator: 'Road Runner', subject: 'Staff account creation', priority: 'medium', status: 'resolved', created: 'Mar 15, 2024' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null);

  return (
    <SuperAdminLayout>
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-[#050a44]">Customer Support</h2>
          <p className="text-sm text-[#46464f]">Manage operator support tickets and inquiries</p>
        </header>

        {/* Support Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">assignment</span>
              </div>
              <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">8 Open</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Total Tickets</p>
            <h3 className="text-2xl font-black text-[#050a44]">24</h3>
            <p className="text-xs text-[#46464f] mt-2">This month</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">timer</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Good</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Avg Response Time</p>
            <h3 className="text-2xl font-black text-[#050a44]">2.4h</h3>
            <p className="text-xs text-[#46464f] mt-2">From ticket creation</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">thumbs_up</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+2%</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Satisfaction Rate</p>
            <h3 className="text-2xl font-black text-[#050a44]">92%</h3>
            <p className="text-xs text-[#46464f] mt-2">Customer satisfaction</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">97%</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Resolution Rate</p>
            <h3 className="text-2xl font-black text-[#050a44]">97%</h3>
            <p className="text-xs text-[#46464f] mt-2">First contact resolution</p>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm overflow-x-auto">
          <div className="p-6 border-b border-[#edeef0]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#050a44]">Support Tickets</h3>
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-[#c7c5d1] rounded-lg text-sm font-bold focus:ring-2 focus:ring-[#050a44] outline-none">
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#edeef0] bg-[#f8f9fb]">
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Ticket ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Operator</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Created</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-[#edeef0] hover:bg-[#f8f9fb] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#050a44]">{ticket.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[#050a44]">{ticket.operator}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#46464f]">{ticket.subject}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      ticket.status === 'open' ? 'bg-red-100 text-red-800' :
                      ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status === 'in_progress' ? 'In Progress' : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#46464f]">{ticket.created}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setShowModal(true);
                      }}
                      className="text-[#050a44] hover:text-[#feb700] font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ticket Detail Modal */}
        {showModal && selectedTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-[#edeef0] sticky top-0 bg-white">
                <h3 className="text-lg font-bold text-[#050a44]">{selectedTicket.id}</h3>
                <button onClick={() => setShowModal(false)} className="text-[#46464f] hover:text-[#050a44]">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#46464f] mb-1">OPERATOR</p>
                  <p className="text-lg font-bold text-[#050a44]">{selectedTicket.operator}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#46464f] mb-1">SUBJECT</p>
                  <p className="text-lg font-bold text-[#050a44]">{selectedTicket.subject}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-bold text-[#46464f] mb-1">PRIORITY</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      selectedTicket.priority === 'high' ? 'bg-red-100 text-red-800' :
                      selectedTicket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#46464f] mb-1">STATUS</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      selectedTicket.status === 'open' ? 'bg-red-100 text-red-800' :
                      selectedTicket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedTicket.status === 'in_progress' ? 'In Progress' : selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#46464f] mb-1">CREATED</p>
                    <p className="text-sm font-bold text-[#050a44]">{selectedTicket.created}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#46464f] mb-3">DETAILS</p>
                  <div className="bg-[#f8f9fb] p-4 rounded-lg">
                    <p className="text-sm text-[#46464f] leading-relaxed">
                      This is a detailed support ticket regarding {selectedTicket.subject.toLowerCase()}. The operator has reported an issue that requires immediate attention. Our support team is actively working on resolving this matter.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-4 py-3 border border-[#c7c5d1] rounded-lg font-bold text-[#050a44] hover:bg-[#f2f4f6] transition-colors">
                    Add Note
                  </button>
                  <button className="flex-1 px-4 py-3 bg-[#050a44] text-white rounded-lg font-bold hover:opacity-90 transition-opacity">
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </SuperAdminLayout>
  );
}
