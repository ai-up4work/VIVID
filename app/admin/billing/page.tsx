'use client';
import React, { useState } from 'react';
import { SuperAdminLayout } from '../../../components/SuperAdminLayout';

export default function BillingPage() {
  const [subscriptionPlans] = useState([
    {
      name: 'Basic',
      price: '$199',
      period: 'month',
      features: ['Up to 15 buses', 'Basic analytics', '5 staff accounts', 'Email support'],
      operators: 4,
      color: '#6b7280',
    },
    {
      name: 'Pro',
      price: '$499',
      period: 'month',
      features: ['Up to 50 buses', 'Advanced analytics', '15 staff accounts', 'Priority support'],
      operators: 12,
      color: '#3b82f6',
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact',
      features: ['Unlimited buses', 'Custom analytics', 'Unlimited staff', '24/7 phone support'],
      operators: 8,
      color: '#7c3aed',
    },
  ]);

  const [invoices] = useState([
    { id: 'INV-001', operator: 'Shyamoli Express', date: 'Mar 15, 2024', amount: '$145,200', status: 'paid' },
    { id: 'INV-002', operator: 'Green Line Paribahan', date: 'Mar 15, 2024', amount: '$98,450', status: 'paid' },
    { id: 'INV-003', operator: 'Sohag Paribahan', date: 'Mar 15, 2024', amount: '$64,800', status: 'paid' },
    { id: 'INV-004', operator: 'Road Runner', date: 'Mar 10, 2024', amount: '$48,200', status: 'pending' },
  ]);

  return (
    <SuperAdminLayout>
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-[#050a44]">Billing & Plans</h2>
          <p className="text-sm text-[#46464f]">Manage subscription plans and invoices</p>
        </header>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+15%</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Monthly Recurring Revenue</p>
            <h3 className="text-2xl font-black text-[#050a44]">$57,900</h3>
            <p className="text-xs text-[#46464f] mt-2">From 24 operators</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">98%</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Payment Collection Rate</p>
            <h3 className="text-2xl font-black text-[#050a44]">$482,350</h3>
            <p className="text-xs text-[#46464f] mt-2">Total collected this year</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#c7c5d1] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#e1e2e4] rounded-lg text-[#050a44]">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+8%</span>
            </div>
            <p className="text-sm text-[#46464f] font-medium mb-1">Average Order Value</p>
            <h3 className="text-2xl font-black text-[#050a44]">$2,411</h3>
            <p className="text-xs text-[#46464f] mt-2">Per operator</p>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-8 mb-8">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#050a44] mb-2">Subscription Plans</h3>
            <p className="text-sm text-[#46464f]">Current plans and active subscriptions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <div 
                key={plan.name}
                className={`p-6 rounded-xl border-2 transition-all ${
                  plan.recommended 
                    ? 'border-[#050a44] bg-[#f8f9fb]' 
                    : 'border-[#edeef0] hover:border-[#050a44]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-[#050a44]">{plan.name}</h4>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: plan.color }}></div>
                </div>
                <div className="mb-4">
                  <p className="text-3xl font-black text-[#050a44]">{plan.price}</p>
                  <p className="text-sm text-[#46464f]">/{plan.period}</p>
                </div>
                <div className="mb-6 p-3 bg-[#f2f4f6] rounded-lg">
                  <p className="text-sm font-bold text-[#050a44]">{plan.operators} active operators</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[#46464f]">
                      <span className="material-symbols-outlined text-sm text-green-600">check</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2 rounded-lg font-bold transition-all ${
                  plan.recommended
                    ? 'bg-[#050a44] text-white hover:opacity-90'
                    : 'bg-[#f2f4f6] text-[#050a44] hover:bg-[#edeef0]'
                }`}>
                  {plan.recommended ? 'Manage Plan' : 'View Details'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm overflow-x-auto">
          <div className="p-6 border-b border-[#edeef0]">
            <h3 className="text-lg font-bold text-[#050a44]">Recent Invoices & Payments</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#edeef0] bg-[#f8f9fb]">
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Invoice ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Operator</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#050a44]">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, idx) => (
                <tr key={idx} className="border-b border-[#edeef0] hover:bg-[#f8f9fb] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#050a44]">{invoice.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[#050a44]">{invoice.operator}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#46464f]">{invoice.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#050a44]">{invoice.amount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[#050a44] hover:text-[#feb700] font-bold transition-colors">
                      <span className="material-symbols-outlined text-sm">download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </SuperAdminLayout>
  );
}
