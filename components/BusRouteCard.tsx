'use client';
import { useState } from 'react';
import { Bus, MapPin, ArrowRight, Clock } from 'lucide-react';
import { RouteMapOverlay, MOCK_ROUTE, type RouteData } from './RouteMapOverlay';

interface BusRouteCardProps {
  route?: RouteData;
}

export function BusRouteCard({ route = MOCK_ROUTE }: BusRouteCardProps) {
  const [showRoute, setShowRoute] = useState(false);

  return (
    <>
      <div className="bg-white border border-[#edeef0] rounded-2xl p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 bg-[#f2f4f6] text-[#050a44] text-[11px] font-bold tracking-[0.04em] px-2.5 py-1 rounded-full">
            <Bus className="w-3 h-3" />
            {route.busNumber}
          </span>
          <span className="text-[11px] font-semibold text-[#46464f]">{route.duration}</span>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <p className="text-[16px] font-black text-[#050a44] tracking-tight">{route.origin}</p>
          <ArrowRight className="w-4 h-4 text-[#c7c5d1]" />
          <p className="text-[16px] font-black text-[#050a44] tracking-tight">{route.destination}</p>
        </div>

        <div className="flex items-center gap-4 mt-2 mb-4 text-[12px] text-[#46464f] font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {route.departureTime} – {route.arrivalTime}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {route.stops.length} stops
          </span>
        </div>

        <button
          onClick={() => setShowRoute(true)}
          className="w-full py-2.5 rounded-xl bg-[#f2f4f6] text-[#050a44] text-[14px] font-bold hover:bg-[#edeef0] transition-colors"
        >
          View Route
        </button>
      </div>

      <RouteMapOverlay isOpen={showRoute} onClose={() => setShowRoute(false)} route={route} />
    </>
  );
}