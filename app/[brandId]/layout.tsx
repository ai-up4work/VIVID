'use client';

import React, { useEffect, useState, useMemo } from 'react';
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
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        setError(null);
        console.log('[BrandLayout] brandId from URL:', brandId);

        // brandId in the URL is the tenant UUID directly —
        // query tenant_branding by tenant_id without an extra lookup.
        // Use .limit(1) + .order() instead of .single() so duplicate rows
        // (e.g. from running the seed twice) never throw PGRST116.
        const { data: brandingRows, error: brandingError } = await supabase
          .from('tenant_branding')
          .select('*')
          .eq('tenant_id', brandId)
          .order('created_at', { ascending: false })
          .limit(1);

        if (brandingError) {
          console.error('[BrandLayout] Branding lookup failed:', {
            message: brandingError.message,
            code: brandingError.code,
            details: brandingError.details,
          });
          throw new Error(brandingError.message);
        }

        const brandingData = brandingRows?.[0] ?? null;
        console.log('[BrandLayout] Branding data:', brandingData);

        if (!brandingData) {
          throw new Error(`No branding found for tenant: ${brandId}`);
        }

        setBranding(brandingData);
        applyBranding(brandingData);
      } catch (err: any) {
        const message = err?.message || err?.code || JSON.stringify(err);
        console.error('[BrandLayout] Fatal error:', message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (brandId) {
      fetchBranding();
    }
  }, [brandId]);

  const applyBranding = (branding: TenantBranding) => {
    if (branding.favicon_url) {
      const link =
        (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
        document.createElement('link');
      link.setAttribute('rel', 'icon');
      link.setAttribute('href', branding.favicon_url);
      document.head.appendChild(link);
    }

    if (branding.background_url) {
      document.body.style.backgroundImage = `url(${branding.background_url})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-800 font-semibold mb-2">Brand not found</p>
          <p className="text-slate-500 text-sm font-mono break-all">{error}</p>
          <p className="text-slate-400 text-xs mt-4">
            Tenant ID:{' '}
            <code className="bg-slate-100 px-1 rounded">{brandId}</code>
          </p>
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
        '--font-family': branding?.font_family || 'inherit',
        fontFamily: branding?.font_family || 'inherit',
      } as React.CSSProperties}
    >
      {/* Brand Header */}
      <header
        className="border-b shadow-sm"
        style={{ backgroundColor: branding?.primary_color || '#050a44' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          {branding?.logo_url && (
            <img
              src={branding.logo_url}
              alt={branding.brand_name || 'Brand logo'}
              className="h-10 w-auto object-contain"
            />
          )}
          <h1 className="text-white text-2xl font-bold">
            {branding?.brand_name || 'Bus Booking'}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}