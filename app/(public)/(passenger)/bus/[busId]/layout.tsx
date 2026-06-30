'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { TenantBranding } from '@/types';

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const brandId = params.brandId as string;
  const [branding, setBranding] = useState<TenantBranding | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const { data, error } = await supabase
          .from('tenant_branding')
          .select('*')
          .eq('tenant_id', brandId)
          .single();

        if (error) throw error;
        setBranding(data);

        // Apply branding to page
        if (data) {
          applyBranding(data);
        }
      } catch (err) {
        console.error('[v0] Error fetching branding:', err);
      } finally {
        setLoading(false);
      }
    };

    if (brandId) {
      fetchBranding();
    }
  }, [brandId, supabase]);

  const applyBranding = (branding: TenantBranding) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', branding.primary_color);
    root.style.setProperty('--color-secondary', branding.secondary_color);
    root.style.setProperty('--color-accent', branding.accent_color);
    root.style.setProperty('--border-radius', branding.border_radius);
    root.style.setProperty('--font-family', branding.font_family);

    if (branding.favicon_url) {
      const link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement('link');
      link.setAttribute('rel', 'icon');
      link.setAttribute('href', branding.favicon_url);
      document.head.appendChild(link);
    }

    if (branding.background_url) {
      document.body.style.backgroundImage = `url(${branding.background_url})`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-300 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        '--color-primary': branding?.primary_color || '#050a44',
        '--color-secondary': branding?.secondary_color || '#feb700',
        '--color-accent': branding?.accent_color || '#7a7fbb',
        '--border-radius': branding?.border_radius || '8px',
      } as React.CSSProperties}
    >
      {/* Brand Header */}
      <header
        className="border-b"
        style={{ backgroundColor: branding?.primary_color }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          {branding?.logo_url && (
            <img
              src={branding.logo_url}
              alt={branding.primary_color}
              className="h-10 w-auto"
            />
          )}
          <h1 className="text-white text-2xl font-bold">
            {branding?.primary_color || 'Bus Booking'}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
