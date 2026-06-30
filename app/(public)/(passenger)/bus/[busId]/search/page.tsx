'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Clock, MapPin, Users, IndianRupee } from 'lucide-react';

interface Schedule {
  id: string;
  departure_time: string;
  arrival_time: string;
  base_fare: number;
  bus: {
    registration_number: string;
    bus_type: string;
    total_seats: number;
  };
  route: {
    from_city: string;
    to_city: string;
    distance_km: number;
  };
}

export default function SearchPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const brandId = params.brandId as string;

  const fromCity = searchParams.get('from') || '';
  const toCity = searchParams.get('to') || '';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [branding, setBranding] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch branding
        const { data: brandingData } = await supabase
          .from('tenant_branding')
          .select('*')
          .eq('tenant_id', brandId)
          .single();

        setBranding(brandingData);

        // Fetch schedules with related data
        const { data, error } = await supabase
          .from('schedules')
          .select(
            `
            id,
            departure_time,
            arrival_time,
            base_fare,
            bus:buses(registration_number, bus_type, total_seats),
            route:routes(from_city, to_city, distance_km)
          `
          )
          .eq('tenant_id', brandId)
          .match({
            'route.from_city': fromCity,
            'route.to_city': toCity,
          });

        if (error) throw error;
        setSchedules(data || []);
      } catch (err) {
        console.error('[v0] Error fetching schedules:', err);
      } finally {
        setLoading(false);
      }
    };

    if (brandId) {
      fetchData();
    }
  }, [brandId, fromCity, toCity, supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-slate-600 text-sm">From</p>
            <p className="text-2xl font-bold">{fromCity}</p>
          </div>
          <div className="text-slate-400">
            <MapPin className="w-6 h-6 mx-auto mb-2" />
            <p className="text-xs">to</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">To</p>
            <p className="text-2xl font-bold">{toCity}</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">Date</p>
            <p className="text-2xl font-bold">{date}</p>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition"
          >
            Modify Search
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {schedules.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-slate-200">
            <p className="text-slate-600 text-lg">No buses found for this route</p>
          </div>
        ) : (
          schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-start mb-4">
                {/* Time */}
                <div>
                  <p className="text-slate-600 text-sm">Departure</p>
                  <p className="text-2xl font-bold">
                    {new Date(schedule.departure_time).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>

                {/* Duration */}
                <div>
                  <p className="text-slate-600 text-sm">Duration</p>
                  <p className="text-lg font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {Math.round(
                      (new Date(schedule.arrival_time).getTime() -
                        new Date(schedule.departure_time).getTime()) /
                        (1000 * 60 * 60)
                    )}{' '}
                    hrs
                  </p>
                </div>

                {/* Bus Type */}
                <div>
                  <p className="text-slate-600 text-sm">Bus Type</p>
                  <p className="text-lg font-semibold">{schedule.bus.bus_type}</p>
                </div>

                {/* Availability */}
                <div>
                  <p className="text-slate-600 text-sm">Available</p>
                  <p className="text-lg font-semibold text-green-600">
                    {schedule.bus.total_seats}+ seats
                  </p>
                </div>

                {/* Fare */}
                <div>
                  <p className="text-slate-600 text-sm">Fare</p>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    <p className="text-2xl font-bold">{schedule.base_fare}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/${brandId}/seats/${schedule.id}`}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                >
                  Select Seats
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
