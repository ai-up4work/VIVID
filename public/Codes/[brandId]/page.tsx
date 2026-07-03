'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Calendar, MapPin, Users } from 'lucide-react';

interface Branding {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  logo_url: string;
  operator_name: string;
}

interface City {
  name: string;
}

export default function BrandHomePage() {
  const params = useParams();
  const router = useRouter();
  const brandId = params.brandId as string;

  const [branding, setBranding] = useState<Branding | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    passengers: '1',
  });

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch branding
        const { data: brandingData } = await supabase
          .from('tenant_branding')
          .select('*')
          .eq('tenant_id', brandId)
          .single();

        if (brandingData) {
          setBranding(brandingData);
        }

        // Fetch unique cities
        const { data: routesData } = await supabase
          .from('routes')
          .select('from_city, to_city')
          .eq('tenant_id', brandId);

        if (routesData) {
          const uniqueCities = Array.from(
            new Set([
              ...routesData.map((r) => r.from_city),
              ...routesData.map((r) => r.to_city),
            ])
          ).map((name) => ({ name }));
          setCities(uniqueCities);
        }
      } catch (err) {
        console.error('[v0] Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (brandId) {
      fetchData();
    }
  }, [brandId, supabase]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from || !formData.to) {
      alert('Please select both from and to cities');
      return;
    }

    const searchParams = new URLSearchParams({
      from: formData.from,
      to: formData.to,
      date: formData.date,
      passengers: formData.passengers,
    });

    router.push(`/${brandId}/search?${searchParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div
        className="rounded-lg p-12 text-white shadow-lg"
        style={{ backgroundColor: branding?.primary_color }}
      >
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">{branding?.operator_name || 'Book Your Bus'}</h1>
          <p className="text-lg opacity-90">Fast, easy, and secure bus ticket booking</p>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg p-8 shadow-md border border-slate-200 max-w-4xl mx-auto -mt-8 relative z-10">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* From City */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                From
              </label>
              <select
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  focusRingColor: branding?.primary_color,
                }}
              >
                <option value="">Select departure city</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* To City */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                To
              </label>
              <select
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2"
              >
                <option value="">Select destination city</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Travel Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2"
              />
            </div>

            {/* Passengers */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Passengers
              </label>
              <select
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    {i + 1} passenger{i > 0 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-bold rounded-lg transition hover:opacity-90"
            style={{ backgroundColor: branding?.primary_color }}
          >
            Search Buses
          </button>
        </form>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center p-6 bg-white rounded-lg border border-slate-200">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white"
            style={{ backgroundColor: branding?.secondary_color }}
          >
            ✓
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Best Prices</h3>
          <p className="text-slate-600 text-sm">Get the best fares and exclusive deals</p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg border border-slate-200">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white"
            style={{ backgroundColor: branding?.secondary_color }}
          >
            ✓
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Instant Booking</h3>
          <p className="text-slate-600 text-sm">Book your seat in seconds</p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg border border-slate-200">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white"
            style={{ backgroundColor: branding?.secondary_color }}
          >
            ✓
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Safe & Secure</h3>
          <p className="text-slate-600 text-sm">100% secure payment gateway</p>
        </div>
      </div>
    </div>
  );
}
