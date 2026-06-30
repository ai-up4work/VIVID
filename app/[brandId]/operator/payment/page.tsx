'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PaymentSelection() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleIssue = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowModal(true);
    }, 1500);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] font-sans overflow-x-hidden min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-[#f8f9fb] w-full top-0 sticky z-50 border-b border-[#c7c5d1] shadow-sm">
        <div className="flex justify-between items-center px-[16px] md:px-[64px] py-4 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-[32px] leading-[1.3] font-bold text-[#000000] tracking-tight">VoyageSaaS</span>
            <nav className="hidden md:flex items-center gap-6">
              <Link className="text-[#46464f] font-medium hover:text-[#000000] transition-colors duration-200 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" href="#">Find Trips</Link>
              <Link className="text-[#46464f] font-medium hover:text-[#000000] transition-colors duration-200 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" href="#">Schedules</Link>
              <Link className="text-[#000000] font-bold border-b-2 border-[#000000] pb-1 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" href="#">My Bookings</Link>
              <Link className="text-[#46464f] font-medium hover:text-[#000000] transition-colors duration-200 text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" href="#">Support</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#46464f] hover:text-[#000000]">Partner Portal</button>
            <div className="h-8 w-8 rounded-full bg-[#0f144c] flex items-center justify-center text-[#ffffff] text-xs font-bold">JD</div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-[16px] md:px-[64px] py-[48px] grid grid-cols-1 lg:grid-cols-12 gap-[24px] flex-1">
        {/* Left Column: Order Summary */}
        <div className="lg:col-span-4 space-y-[24px]">
          <div className="bg-[#ffffff] border border-[#c7c5d1] rounded-xl p-[16px] shadow-sm">
            <div className="flex items-center gap-2 mb-[16px]">
              <span className="material-symbols-outlined text-[#000000]">confirmation_number</span>
              <h2 className="text-[20px] leading-[1.4] font-semibold">Booking Summary</h2>
            </div>
            <div className="space-y-4">
              <div className="p-[16px] rounded-lg bg-[#f2f4f6]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Route</p>
                    <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000]">London — Manchester</p>
                  </div>
                  <span className="bg-[#feb700] text-[#6b4b00] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">AC Bus</span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex flex-col items-center">
                    <span className="w-2 h-2 rounded-full bg-[#000000]"></span>
                    <div className="w-[1px] h-6 bg-[#777680]"></div>
                    <span className="w-2 h-2 rounded-full border border-[#000000]"></span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Departure • Oct 24, 09:00 AM</p>
                      <p className="text-[14px] leading-[1.6]">Victoria Coach Station</p>
                    </div>
                    <div>
                      <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Arrival • Oct 24, 01:30 PM</p>
                      <p className="text-[14px] leading-[1.6]">Manchester Central</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[8px]">
                <div className="p-[16px] rounded-lg border border-[#c7c5d1]">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Seat(s)</p>
                  <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">14A, 14B</p>
                </div>
                <div className="p-[16px] rounded-lg border border-[#c7c5d1]">
                  <p className="text-[12px] leading-[1.2] font-medium text-[#46464f]">Passenger</p>
                  <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold">Alex Carter</p>
                </div>
              </div>
              <div className="pt-[16px] border-t border-[#c7c5d1]">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[14px] leading-[1.6] text-[#46464f]">Base Fare</p>
                  <p className="text-[14px] leading-[1.6]">£42.00</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[14px] leading-[1.6] text-[#46464f]">Service Fee</p>
                  <p className="text-[14px] leading-[1.6]">£3.50</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[20px] leading-[1.4] font-semibold">Total Amount</p>
                  <p className="text-[20px] leading-[1] font-bold text-[#000000]">£45.50</p>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Notice Card */}
          <div className="bg-[#0f144c] text-[#ffffff] rounded-xl p-[16px] shadow-md">
            <div className="flex gap-3">
              <span className="material-symbols-outlined">info</span>
              <div>
                <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold mb-1">Agent Instructions</p>
                <p className="text-[14px] leading-[1.6] text-[#7a7fbb] leading-relaxed">Ensure the customer's mobile number is correct. The ticket will be dispatched immediately via SMS and WhatsApp after confirmation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Selection */}
        <div className="lg:col-span-8">
          <div className="bg-[#ffffff] border border-[#c7c5d1] rounded-xl p-[24px] shadow-sm">
            <h1 className="text-[32px] leading-[1.3] font-bold mb-[32px]">Payment Selection</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-[48px]">
              {/* Cash on Arrival */}
              <label className="relative cursor-pointer group">
                <input defaultChecked className="peer hidden" name="payment_method" type="radio" value="cash" />
                <div className="h-full border-2 border-[#c7c5d1] rounded-xl p-[24px] transition-all duration-300 peer-checked:border-[#feb700] peer-checked:bg-[#feb700]/5 hover:border-[#000000]/30 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#edeef0] flex items-center justify-center mb-[16px] peer-checked:bg-[#feb700] transition-colors">
                    <span className="material-symbols-outlined text-[#191c1e]">payments</span>
                  </div>
                  <h3 className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold mb-2">Cash on Arrival</h3>
                  <p className="text-[14px] leading-[1.6] text-[#46464f]">Collect cash directly from the customer at the counter or bus.</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[#7c5800] font-bold">check_circle</span>
                </div>
              </label>

              {/* Credit/Debit Card */}
              <label className="relative cursor-pointer group">
                <input className="peer hidden" name="payment_method" type="radio" value="card" />
                <div className="h-full border-2 border-[#c7c5d1] rounded-xl p-[24px] transition-all duration-300 peer-checked:border-[#feb700] peer-checked:bg-[#feb700]/5 hover:border-[#000000]/30 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#edeef0] flex items-center justify-center mb-[16px] peer-checked:bg-[#feb700] transition-colors">
                    <span className="material-symbols-outlined text-[#191c1e]">credit_card</span>
                  </div>
                  <h3 className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold mb-2">Credit/Debit Card</h3>
                  <p className="text-[14px] leading-[1.6] text-[#46464f]">Process payment via the integrated terminal or online gateway.</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[#7c5800] font-bold">check_circle</span>
                </div>
              </label>

              {/* Bank Transfer */}
              <label className="relative cursor-pointer group">
                <input className="peer hidden" name="payment_method" type="radio" value="bank" />
                <div className="h-full border-2 border-[#c7c5d1] rounded-xl p-[24px] transition-all duration-300 peer-checked:border-[#feb700] peer-checked:bg-[#feb700]/5 hover:border-[#000000]/30 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#edeef0] flex items-center justify-center mb-[16px] peer-checked:bg-[#feb700] transition-colors">
                    <span className="material-symbols-outlined text-[#191c1e]">account_balance</span>
                  </div>
                  <h3 className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold mb-2">Bank Transfer</h3>
                  <p className="text-[14px] leading-[1.6] text-[#46464f]">Provide the bank details to the customer for direct transfer.</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[#7c5800] font-bold">check_circle</span>
                </div>
              </label>
            </div>

            <div className="space-y-[24px] border-t border-[#c7c5d1] pt-[32px]">
              <div className="max-w-md">
                <label className="text-[12px] leading-[1.2] font-medium text-[#46464f] mb-1 block">Confirm WhatsApp/Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#777680]">call</span>
                  <input defaultValue="+44 7700 900077" className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#c7c5d1] focus:border-[#000000] focus:ring-1 focus:ring-[#000000] outline-none transition-all text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" type="text" />
                </div>
              </div>
              <div className="flex items-start gap-3 p-[16px] bg-[#edeef0] rounded-xl">
                <div className="flex items-center gap-2 mt-1">
                  <input defaultChecked className="rounded-sm border-[#777680] text-[#000000] focus:ring-[#000000] h-4 w-4" id="terms" type="checkbox" />
                </div>
                <label className="text-[14px] leading-[1.6] text-[#46464f]" htmlFor="terms">
                  I confirm that I have verified the passenger details and collected the payment amount of <span className="font-bold text-[#191c1e]">£45.50</span>.
                </label>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-[16px]">
                <button 
                  onClick={handleIssue}
                  disabled={isProcessing}
                  className="flex-1 bg-[#000000] text-[#ffffff] py-4 rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:bg-opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">send_to_mobile</span>
                      Confirm & Issue Ticket
                    </>
                  )}
                </button>
                <Link href="/operator/agent-booking" className="px-[32px] py-4 rounded-xl border border-[#c7c5d1] text-[14px] leading-[1.2] tracking-[0.01em] font-semibold hover:bg-[#edeef0] transition-all text-center flex items-center justify-center">
                  Back to Details
                </Link>
              </div>
            </div>
          </div>

          {/* Visual Decorative Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mt-[24px]">
            <div className="bg-[#e1e2e4] rounded-xl p-[24px] relative overflow-hidden h-40">
              <img alt="Bus Fleet" className="absolute inset-0 w-full h-full object-cover opacity-20" src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop" />
              <div className="relative z-10">
                <h4 className="text-[20px] leading-[1.4] font-semibold text-[#191c1e]">Premium Fleet</h4>
                <p className="text-[14px] leading-[1.6] text-[#46464f]">Operating the latest Comfort-Series coaches.</p>
              </div>
            </div>
            <div className="bg-[#feb700]/10 rounded-xl p-[24px] border border-[#feb700]/20 flex items-center justify-center text-center h-40">
              <div>
                <div className="flex justify-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#7c5800]" style={{ fontVariationSettings: "'FILL' 1" }}>sms</span>
                  <span className="material-symbols-outlined text-[#7c5800]" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                </div>
                <p className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#6b4b00]">Instant Confirmation</p>
                <p className="text-[14px] leading-[1.6] text-[#6b4b00]/80">99.9% Success rate on automated dispatches.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#000000]/40 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-[#f8f9fb] rounded-[48px] p-[32px] max-w-md w-full relative z-10 shadow-2xl text-center transform scale-100 transition-transform duration-300">
            <div className="w-20 h-20 bg-[#feb700] rounded-full flex items-center justify-center mx-auto mb-[24px]">
              <span className="material-symbols-outlined text-[#6b4b00] text-4xl font-bold">check</span>
            </div>
            <h2 className="text-[32px] leading-[1.3] font-bold mb-[16px]">Ticket Issued!</h2>
            <p className="text-[16px] leading-[1.6] text-[#46464f] mb-[32px]">The booking has been successfully confirmed. SMS and WhatsApp notifications have been sent to +44 7700 900077.</p>
            <div className="flex flex-col gap-3">
              <button className="w-full bg-[#000000] text-[#ffffff] py-4 rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" onClick={closeModal}>Print Paper Ticket</button>
              <button className="w-full border border-[#c7c5d1] py-4 rounded-xl text-[14px] leading-[1.2] tracking-[0.01em] font-semibold" onClick={closeModal}>Go to Dashboard</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full mt-[48px] bg-[#e1e2e4] border-t border-[#c7c5d1]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px] px-[16px] md:px-[64px] py-[48px] w-full max-w-[1440px] mx-auto">
          <div className="md:col-span-1">
            <span className="text-[20px] leading-[1.4] font-semibold text-[#000000]">VoyageSaaS</span>
            <p className="text-[14px] leading-[1.6] text-[#46464f] mt-4">Empowering agents with reliable transport booking solutions worldwide.</p>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000] mb-2">Platform</h5>
            <Link className="text-[14px] leading-[1.6] text-[#46464f] hover:underline text-[#000000]" href="#">Privacy Policy</Link>
            <Link className="text-[14px] leading-[1.6] text-[#46464f] hover:underline text-[#000000]" href="#">Terms of Service</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-[14px] leading-[1.2] tracking-[0.01em] font-semibold text-[#000000] mb-2">Support</h5>
            <Link className="text-[14px] leading-[1.6] text-[#46464f] hover:underline text-[#000000]" href="#">Operator Agreement</Link>
            <Link className="text-[14px] leading-[1.6] text-[#46464f] hover:underline text-[#000000]" href="#">Agent Login</Link>
          </div>
          <div className="md:col-span-1">
            <p className="text-[14px] leading-[1.6] text-[#46464f]">© 2026 VoyageSaaS Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
