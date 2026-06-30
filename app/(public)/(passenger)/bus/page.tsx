'use client';

import Link from 'next/link';

const buses = [
  {
    id: 'slt-travels',
    name: 'SLT Travels',
    color: 'from-blue-600 to-blue-800',
    description: 'Premium bus service across Sri Lanka',
    routes: 'Colombo • Kandy • Galle',
  },
  {
    id: 'express-srilanka',
    name: 'Express Sri Lanka',
    color: 'from-red-600 to-red-800',
    description: 'Fast and reliable express services',
    routes: 'Colombo • Nuwara Eliya • Jaffna',
  },
  {
    id: 'royal-bus',
    name: 'Royal Bus Service',
    color: 'from-purple-600 to-purple-800',
    description: 'Comfort and luxury combined',
    routes: 'Colombo • Matara • Kandy',
  },
  {
    id: 'colombo-intercity',
    name: 'Colombo Intercity',
    color: 'from-green-600 to-green-800',
    description: 'Connecting Sri Lanka efficiently',
    routes: 'All major cities',
  },
];

export default function BusesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fb] to-white p-8">
      <div className="max-w-[1440px] mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#050a44] mb-4">Browse Bus Brands</h1>
          <p className="text-lg text-[#46464f]">Choose your preferred bus company and book your tickets</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {buses.map((bus) => (
            <Link
              key={bus.id}
              href={`/bus/${bus.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Brand Header */}
                <div className={`bg-gradient-to-r ${bus.color} h-32 p-6 text-white`}>
                  <h2 className="text-2xl font-bold">{bus.name}</h2>
                </div>

                {/* Brand Info */}
                <div className="p-6">
                  <p className="text-[#46464f] text-sm mb-4">{bus.description}</p>
                  <p className="text-xs text-[#46464f] font-semibold mb-4">Routes: {bus.routes}</p>

                  <button className="w-full py-3 bg-[#050a44] text-white rounded-lg font-semibold group-hover:bg-[#feb700] group-hover:text-[#050a44] transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-[#050a44] to-[#1a1f5e] rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Can't decide?</h2>
          <p className="text-lg mb-6 text-gray-200">Compare features and prices across all bus brands</p>
          <Link href="/" className="inline-block px-8 py-3 bg-[#feb700] text-[#050a44] rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
}
