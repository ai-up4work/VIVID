'use client';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { useToast } from '@/contexts/ToastContext';
import { useState } from 'react';

export default function CancellationPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');

  const handleCancel = () => {
    if (!reason) {
      addToast('Please select a reason for cancellation.', 'error');
      return;
    }
    setShowModal(true);
  };

  return (
    <AppLayout>
      <main className="max-w-[1440px] mx-auto w-full px-4 md:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Summary & Policy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <button onClick={() => router.back()} className="flex items-center text-primary font-semibold text-[14px] gap-2 hover:gap-3 transition-all mb-4">
                <span className="text-xl">←</span> Back to My Bookings
              </button>
              <h1 className="text-[32px] font-bold text-primary">Cancel your trip</h1>
              <p className="text-[16px] text-[#46464f]">Review your refund details before confirming your cancellation. This action cannot be undone.</p>
            </div>

            {/* Booking Details Card */}
            <section className="bg-white border border-[#c7c5d1] rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-[#46464f]">Booking ID</span>
                  <p className="text-[20px] font-bold text-primary">VOY-8821942</p>
                </div>
                <div className="mt-4 md:mt-0 px-4 py-2 bg-[#e7e8ea] rounded-full">
                  <span className="text-[14px] font-bold text-primary">Confirmed</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#0f144c] flex items-center justify-center rounded-xl text-white">
                    🚌
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#46464f]">Green Line Paribahan</p>
                    <p className="text-[16px] font-bold">Scania Multi-Axle AC</p>
                    <p className="text-[14px] font-semibold text-[#46464f] mt-1">Seat: 12A (1 Passenger)</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="text-right flex-grow">
                    <p className="text-[12px] font-semibold text-[#46464f]">Departure</p>
                    <p className="text-[16px] font-bold">London</p>
                    <p className="text-[14px] font-semibold text-[#46464f]">24 Oct, 08:30 AM</p>
                  </div>
                  <span className="text-[#777680]">→</span>
                  <div className="text-left flex-grow">
                    <p className="text-[12px] font-semibold text-[#46464f]">Destination</p>
                    <p className="text-[16px] font-bold">Edinburgh</p>
                    <p className="text-[14px] font-semibold text-[#46464f]">24 Oct, 04:15 PM</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Policy Bento */}
            <section className="space-y-4">
              <h2 className="text-[20px] font-bold text-primary">Refund Policy</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-primary p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[48px] font-bold text-primary opacity-20 leading-none">100%</span>
                  </div>
                  <p className="text-[14px] font-bold text-primary">Before 24 Hours</p>
                  <p className="text-[12px] font-semibold text-[#46464f]">Full refund minus small processing fee.</p>
                </div>
                <div className="bg-[#f2f4f6] border border-[#c7c5d1] p-4 rounded-xl space-y-2 opacity-60">
                  <div className="flex justify-between items-start">
                    <span className="text-[48px] font-bold text-[#46464f] opacity-20 leading-none">50%</span>
                  </div>
                  <p className="text-[14px] font-bold text-[#46464f]">12-24 Hours</p>
                  <p className="text-[12px] font-semibold text-[#46464f]">Half refund of the base fare.</p>
                </div>
                <div className="bg-[#f2f4f6] border border-[#c7c5d1] p-4 rounded-xl space-y-2 opacity-60">
                  <div className="flex justify-between items-start">
                    <span className="text-[48px] font-bold text-[#46464f] opacity-20 leading-none">0%</span>
                  </div>
                  <p className="text-[14px] font-bold text-[#46464f]">Less than 12 Hours</p>
                  <p className="text-[12px] font-semibold text-[#46464f]">No refund applicable for late cancellations.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Calculation & Actions */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              {/* Refund Calculator */}
              <div className="bg-white border border-[#c7c5d1] rounded-xl p-6 shadow-lg relative overflow-hidden">
                <h3 className="text-[20px] font-bold text-primary mb-8">Refund Summary</h3>
                <div className="space-y-4 border-b border-[#c7c5d1] pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-[14px] text-[#46464f]">Ticket Price (1x)</span>
                    <span className="text-[14px] font-bold">£42.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[14px] text-[#46464f]">Convenience Fee</span>
                    <span className="text-[14px]">£2.00</span>
                  </div>
                  <div className="flex justify-between text-[#ba1a1a]">
                    <span className="text-[14px]">Cancellation Charge</span>
                    <span className="text-[14px]">- £0.00</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-[12px] font-semibold text-[#46464f]">Estimated Refund</p>
                    <p className="text-[48px] font-bold text-primary leading-none">£42.00</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-4 py-1 bg-[#feb700] text-[#6b4b00] rounded-full text-[12px] font-semibold">100% Refundable</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold text-[#46464f]">Reason for cancellation</label>
                    <select 
                      className="w-full bg-[#f2f4f6] border border-[#c7c5d1] rounded-xl p-4 text-[14px] outline-none"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    >
                      <option value="">Select a reason</option>
                      <option value="plans_changed">Change in travel plans</option>
                      <option value="health">Medical emergency</option>
                      <option value="mistake">Booking error</option>
                      <option value="delay">Provider schedule delay</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button onClick={handleCancel} className="w-full py-4 bg-primary text-white rounded-xl text-[14px] font-bold hover:bg-opacity-90 transition-all shadow-md">
                      Confirm Cancellation
                    </button>
                    <button onClick={() => router.back()} className="w-full py-4 border border-primary text-primary rounded-xl text-[14px] font-bold hover:bg-[#f2f4f6] transition-all">
                      Keep Booking
                    </button>
                  </div>
                </div>
                
                <p className="text-center text-[12px] font-semibold text-[#46464f] mt-8">
                  Refunds typically process within 3-5 business days to your original payment method.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#191c1e]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-12 max-w-md w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-[#0f144c] rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-white text-4xl">✓</span>
            </div>
            <h2 className="text-[32px] font-bold text-primary mb-4">Cancellation Requested</h2>
            <p className="text-[16px] text-[#46464f] mb-8">Your refund of £42.00 has been initiated. You will receive a confirmation email shortly.</p>
            <button 
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 bg-primary text-white rounded-xl text-[14px] font-bold hover:bg-opacity-90 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
