'use client';

import { useParams } from 'next/navigation';

export default function RoutesPage() {
  const params = useParams();
  const busId = params.busId as string;

  return (
    <div className="p-8">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-[#050a44] mb-2">Routes Management</h2>
        <p className="text-sm text-[#46464f]">Manage and configure routes</p>
      </header>

      <div className="bg-white rounded-2xl border border-[#c7c5d1] p-8 text-center">
        <p className="text-[#46464f]">Routes management page for {busId}</p>
        <p className="text-sm text-gray-400 mt-2">Coming soon...</p>
      </div>
    </div>
  );
}
