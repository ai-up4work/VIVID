'use client';
import React, { useState } from 'react';
import { SuperAdminLayout } from '../../../components/SuperAdminLayout';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function OperatorsPage() {
  const [operators, setOperators] = useState([
    { id: '1', name: 'Green Line Paribahan', email: 'admin@greenline.bd', phone: '+880 1234 567890', buses: 45, routes: 12, revenue: '$54,230', status: 'active', subscription: 'pro', joined: 'Feb 15, 2024' },
    { id: '2', name: 'Sohag Paribahan', email: 'contact@sohag.bd', phone: '+880 9876 543210', buses: 32, routes: 8, revenue: '$38,450', status: 'active', subscription: 'basic', joined: 'Mar 10, 2024' },
    { id: '3', name: 'Shyamoli Express', email: 'hello@shyamoli.bd', phone: '+880 5555 555555', buses: 58, routes: 15, revenue: '$72,100', status: 'active', subscription: 'enterprise', joined: 'Mar 25, 2024' },
    { id: '4', name: 'Road Runner', email: 'info@roadrunner.bd', phone: '+880 4444 444444', buses: 28, routes: 6, revenue: '$22,380', status: 'pending', subscription: 'basic', joined: 'Apr 5, 2024' },
    { id: '5', name: 'Eagle Transport', email: 'support@eagletransport.bd', phone: '+880 3333 333333', buses: 15, routes: 4, revenue: '$12,500', status: 'suspended', subscription: 'basic', joined: 'Feb 1, 2024' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    subscription: 'basic',
  });

  const filteredOperators = operators.filter(op => {
    const matchesSearch = op.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         op.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || op.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddOperator = (e: React.FormEvent) => {
    e.preventDefault();
    const newOperator = {
      id: Date.now().toString(),
      ...formData,
      buses: 0,
      routes: 0,
      revenue: '$0',
      status: 'pending' as const,
      joined: new Date().toLocaleDateString(),
    };
    setOperators([...operators, newOperator]);
    setFormData({ name: '', email: '', phone: '', licenseNumber: '', subscription: 'basic' });
    setShowModal(false);
  };

  const handleUpdateStatus = (id: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setOperators(operators.map(op => op.id === id ? { ...op, status: newStatus } : op));
  };

  const handleDeleteOperator = (id: string) => {
    setOperators(operators.filter(op => op.id !== id));
  };

  return (
    <SuperAdminLayout>
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#050a44]">Manage Operators</h2>
            <p className="text-sm text-[#46464f]">Add, edit, and manage bus franchise operators</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-[#050a44] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Add Operator
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 border border-[#c7c5d1] mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input 
              type="text"
              placeholder="Search operators by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none transition-all"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none transition-all"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Operators Table */}
        <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#edeef0] bg-[#f8f9fb]">
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Operator Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Fleet</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOperators.map((operator) => (
                <tr key={operator.id} className="border-b border-[#edeef0] hover:bg-[#f8f9fb] transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-[#050a44]">{operator.name}</p>
                      <p className="text-xs text-[#46464f]">ID: {operator.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-[#050a44]">{operator.email}</p>
                      <p className="text-xs text-[#46464f]">{operator.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-[#050a44]">{operator.buses}</p>
                      <p className="text-xs text-[#46464f]">{operator.routes} routes</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#050a44]">{operator.revenue}</p>
                    <p className="text-xs text-[#46464f]">Monthly</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      operator.subscription === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                      operator.subscription === 'pro' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {operator.subscription.charAt(0).toUpperCase() + operator.subscription.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={operator.status}
                      onChange={(e) => handleUpdateStatus(operator.id, e.target.value as 'active' | 'inactive' | 'suspended')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border-none cursor-pointer ${
                        operator.status === 'active' ? 'bg-green-100 text-green-800' :
                        operator.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/operators/${operator.id}/branding`} className="p-2 bg-[#feb700] text-[#050a44] rounded-lg hover:opacity-90 transition-opacity" title="Customize Branding">
                        <span className="material-symbols-outlined text-sm">palette</span>
                      </Link>
                      <button 
                        onClick={() => handleDeleteOperator(operator.id)}
                        className="p-2 bg-red-100 text-red-800 rounded-lg hover:opacity-90 transition-opacity"
                        title="Delete Operator"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOperators.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#c7c5d1]">
            <span className="material-symbols-outlined text-4xl text-[#46464f] mb-4 block">info</span>
            <p className="text-[#46464f] font-medium">No operators found matching your criteria</p>
          </div>
        )}

        {/* Add Operator Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-md w-full">
              <div className="flex justify-between items-center p-6 border-b border-[#edeef0]">
                <h3 className="text-lg font-bold text-[#050a44]">Add New Operator</h3>
                <button onClick={() => setShowModal(false)} className="text-[#46464f] hover:text-[#050a44]">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddOperator} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#050a44] mb-2">Operator Name</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Green Line Paribahan"
                    className="w-full px-4 py-2 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#050a44] mb-2">Email</label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="admin@example.com"
                    className="w-full px-4 py-2 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#050a44] mb-2">Phone</label>
                  <input 
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+880 1234 567890"
                    className="w-full px-4 py-2 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#050a44] mb-2">License Number</label>
                  <input 
                    type="text"
                    required
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                    placeholder="LIC-2024-001"
                    className="w-full px-4 py-2 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#050a44] mb-2">Subscription Plan</label>
                  <select 
                    value={formData.subscription}
                    onChange={(e) => setFormData({...formData, subscription: e.target.value})}
                    className="w-full px-4 py-2 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none"
                  >
                    <option value="basic">Basic - $199/month</option>
                    <option value="pro">Pro - $499/month</option>
                    <option value="enterprise">Enterprise - Custom</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-[#c7c5d1] rounded-lg font-semibold text-[#050a44] hover:bg-[#f2f4f6] transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#050a44] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Add Operator
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </SuperAdminLayout>
  );
}
