'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  BarChart3,
  Users,
  Bus,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface OperatorInfo {
  id: string;
  operator_name: string;
  primary_color: string;
}

export default function OperatorAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const operatorId = params.operatorId as string;
  const [operator, setOperator] = useState<OperatorInfo | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchOperator = async () => {
      try {
        const { data, error } = await supabase
          .from('tenant_branding')
          .select('tenant_id, primary_color')
          .eq('tenant_id', operatorId)
          .single();

        if (error) throw error;

        const { data: tenantData, error: tenantError } = await supabase
          .from('tenants')
          .select('id, operator_name')
          .eq('id', operatorId)
          .single();

        if (tenantError) throw tenantError;

        setOperator({
          id: tenantData.id,
          operator_name: tenantData.operator_name,
          primary_color: data.primary_color,
        });
      } catch (err) {
        console.error('[v0] Error fetching operator:', err);
      }
    };

    if (operatorId) {
      fetchOperator();
    }
  }, [operatorId, supabase]);

  const navItems = [
    { href: `/operator-admin/${operatorId}`, label: 'Dashboard', icon: BarChart3 },
    { href: `/operator-admin/${operatorId}/buses`, label: 'Buses', icon: Bus },
    { href: `/operator-admin/${operatorId}/schedules`, label: 'Schedules', icon: Calendar },
    { href: `/operator-admin/${operatorId}/bookings`, label: 'Bookings', icon: Users },
    { href: `/operator-admin/${operatorId}/settings`, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header
        className="text-white shadow-md sticky top-0 z-50"
        style={{ backgroundColor: operator?.primary_color || '#050a44' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bus className="w-8 h-8" />
            <h1 className="text-2xl font-bold">{operator?.operator_name}</h1>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            md:w-64 bg-white border-r border-slate-200 p-6 space-y-2
            ${mobileMenuOpen ? 'block w-full' : 'hidden md:block'}
            fixed md:relative top-16 md:top-0 left-0 right-0 z-40
          `}
        >
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <hr className="my-4 border-slate-200" />

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition font-medium">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0">
          <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
