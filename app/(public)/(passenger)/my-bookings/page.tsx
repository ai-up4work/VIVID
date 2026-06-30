'use client';

import Link from 'next/link';

const mockBookings = [
  {
    id: 'BK-001',
    bus: 'SLT Travels',
    route: 'Colombo → Kandy',
    date: '2024-02-15',
    time: '14:30',
    seats: ['5A', '5B'],
    status: 'confirmed',
  },
  {
    id: 'BK-002',
    bus: 'Express Sri Lanka',
    route: 'Kandy → Nuwara Eliya',
    date: '2024-02-20',
    time: '09:00',
    seats: ['12C'],
    status: 'pending',
  },
];

export default function MyBookingsPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-[1440px] mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-[#050a44] mb-2">My Bookings</h1>
          <p className="text-[#46464f]">View and manage your bus reservations</p>
        </header>

        {mockBookings.length > 0 ? (
          <div className="space-y-6">
            {mockBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl border border-[#c7c5d1] overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Left - Bus Info */}
                  <div className="flex-1 p-6 border-r border-[#edeef0]">
                    <h3 className="text-lg font-bold text-[#050a44] mb-2">{booking.bus}</h3>
                    <p className="text-sm text-[#46464f] mb-4">{booking.route}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-[#46464f] mb-1">Date</p>
                        <p className="font-semibold text-[#050a44]">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#46464f] mb-1">Time</p>
                        <p className="font-semibold text-[#050a44]">{booking.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right - Seats & Status */}
                  <div className="flex-1 p-6 border-r border-[#edeef0]">
                    <p className="text-xs text-[#46464f] mb-2">Seats</p>
                    <div className="flex gap-2 mb-4">
                      {booking.seats.map((seat) => (
                        <span key={seat} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {seat}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[#46464f]">Booking ID: {booking.id}</p>
                  </div>

                  {/* Right - Actions */}
                  <div className="p-6 flex flex-col justify-center gap-3">
                    <span
                      className={`px-4 py-2 rounded-lg text-center text-sm font-semibold ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                    {booking.status === 'confirmed' && (
                      <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition-colors">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#c7c5d1] p-12 text-center">
            <p className="text-[#46464f] mb-4">You have no bookings yet</p>
            <Link href="/bus" className="inline-block px-6 py-3 bg-[#050a44] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Browse Buses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
