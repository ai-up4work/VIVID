'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  TrendingUp,
  Calendar,
  Users,
  Bus,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface DashboardStats {
  totalBuses: number;
  activeSchedules: number;
  totalBookings: number;
  totalRevenue: number;
  recentBookings: any[];
}

export default function OperatorDashboard() {
  const params = useParams();
  const operatorId = params.operatorId as string;
  const [stats, setStats] = useState<DashboardStats>({
    totalBuses: 0,
    activeSchedules: 0,
    totalBookings: 0,
    totalRevenue: 0,
    recentBookings: [],
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total buses
        const { data: buses } = await supabase
          .from('buses')
          .select('id')
          .eq('tenant_id', operatorId);

        // Get active schedules
        const { data: schedules } = await supabase
          .from('schedules')
          .select('id, base_fare')
          .eq('tenant_id', operatorId)
          .eq('is_active', true);

        // Get total bookings
        const { data: bookings } = await supabase
          .from('bookings')
          .select('id, total_price')
          .eq('tenant_id', operatorId);

        // Get recent bookings
        const { data: recentBookings } = await supabase
          .from('bookings')
          .select('id, booking_ref, total_price, status, created_at')
          .eq('tenant_id', operatorId)
          .order('created_at', { ascending: false })
          .limit(5);

        const totalRevenue = (bookings || []).reduce(
          (sum, b) => sum + (b.total_price || 0),
          0
        );

        setStats({
          totalBuses: buses?.length || 0,
          activeSchedules: schedules?.length || 0,
          totalBookings: bookings?.length || 0,
          totalRevenue,
          recentBookings: recentBookings || [],
        });
      } catch (err) {
        console.error('[v0] Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    if (operatorId) {
      fetchStats();
    }
  }, [operatorId, supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Buses',
      value: stats.totalBuses,
      icon: Bus,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Active Schedules',
      value: stats.activeSchedules,
      icon: Calendar,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Bookings',
      value: stats.totalBookings,
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-700">{card.label}</h3>
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          href={`/operator-admin/${operatorId}/buses`}
          className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition cursor-pointer"
        >
          <Bus className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-1">Manage Buses</h3>
          <p className="text-sm text-slate-600">
            Add, edit, or view your bus fleet
          </p>
        </Link>

        <Link
          href={`/operator-admin/${operatorId}/schedules`}
          className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition cursor-pointer"
        >
          <Calendar className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-1">Create Schedules</h3>
          <p className="text-sm text-slate-600">
            Plan trips and manage departure times
          </p>
        </Link>

        <Link
          href={`/operator-admin/${operatorId}/bookings`}
          className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition cursor-pointer"
        >
          <Users className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-1">View Bookings</h3>
          <p className="text-sm text-slate-600">
            Check and manage all passenger bookings
          </p>
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-900">Recent Bookings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-600">
                    <AlertCircle className="w-5 h-5 inline mr-2" />
                    No bookings yet
                  </td>
                </tr>
              ) : (
                stats.recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-mono text-sm">
                      {booking.booking_ref}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      ₹{booking.total_price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'pending'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
