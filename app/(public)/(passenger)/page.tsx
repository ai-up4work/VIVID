// app/(public)/(passenger)/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-12');
            }
        });
    }, observerOptions);

    document.querySelectorAll('main > section:not(:first-child) > div, .glass-card, .premium-shadow').forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-12');
        revealObserver.observe(el);
    });

    return () => revealObserver.disconnect();
  }, []);

  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] selection:bg-[#dfe0ff] selection:text-[#0f144c]">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md h-20 w-full px-4 md:px-[64px] flex justify-between items-center max-w-[1440px] mx-auto border-b border-[#edeef0] bg-transparent">
        <div className="text-[32px] leading-[1.3] font-black text-[#050a44] tracking-tighter">VIVID - Bus Bookings</div>
        <div className="hidden md:flex items-center space-x-[32px] h-full">
          <a className="text-[#050a44] font-bold border-b-2 border-[#050a44] h-full flex items-center text-[14px] leading-[1.2] tracking-[0.03em]" href="#">Browse Buses</a>
          <a className="text-[#46464f] font-medium hover:text-[#050a44] transition-colors duration-200 text-[14px] leading-[1.2] tracking-[0.03em]" href="#">My Bookings</a>
          <a className="text-[#46464f] font-medium hover:text-[#050a44] transition-colors duration-200 text-[14px] leading-[1.2] tracking-[0.03em]" href="#">About</a>
          <a className="text-[#46464f] font-medium hover:text-[#050a44] transition-colors duration-200 text-[14px] leading-[1.2] tracking-[0.03em]" href="#">Contact</a>
        </div>
        <div className="flex items-center space-x-[16px]">
          <button className="p-2 hover:bg-[#edeef0] rounded-full transition-colors relative">
            <span className="material-symbols-outlined text-[#191c1e]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#feb700] rounded-full"></span>
          </button>
          <div onClick={() => router.push('/dashboard')} className="cursor-pointer w-10 h-10 rounded-full bg-[#e1e2e4] overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#c7c5d1]/30">
            <img alt="User profile" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" />
          </div>
        </div>
      </nav>
      
      <div className="w-full bg-[#050a44] py-2.5">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[64px] flex items-center justify-center gap-3">
          <span className="material-symbols-outlined text-[18px] text-[#feb700]">verified</span>
          <span className="text-[12px] leading-[1.2] tracking-[0.15em] font-semibold text-white uppercase">Official Premium Fleet Partner Marketplace</span>
        </div>
      </div>
      
      <main>
        {/* Hero Section */}
        <section className="relative flex items-center overflow-hidden w-full h-screen" style={{ aspectRatio: '16 / 9', width: '100%', height: 'auto', minHeight: 'auto' }}>
          {/* Full Bleed Background Image */}
          <div className="absolute inset-0 z-0">
            <img alt="Luxury Travel Background" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" />
            <div className="absolute inset-0 bg-[#050a44]/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-[#191c1e]/60 backdrop-blur-[1px]"></div>
          </div>
          
          <div className="px-4 md:px-[64px] max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-[48px] items-center relative z-10 py-24">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full mb-8">
                <span className="material-symbols-outlined text-[18px] text-[#feb700] mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                <span className="text-[12px] leading-[1.2] tracking-[0.05em] font-semibold">10,000+ PREMIUM BOOKINGS TODAY</span>
              </div>
              <h1 className="text-[48px] lg:text-[72px] font-bold mb-8 leading-[1.05] tracking-tight text-white text-shadow-premium">
                Experience Transport as <span className="text-[#feb700]">Hospitality</span>
              </h1>
              <p className="text-[16px] leading-[1.7] max-w-xl mx-auto lg:mx-0 mb-[32px] text-white/90 text-shadow-premium">
                VIVID redefines the journey. Book premium travel across an elite multi-operator network with concierge-level reliability.
              </p>
            </div>
            
            <div className="relative w-full">
              {/* Glass Search Widget */}
              <div className="hero-glass-widget p-[32px] rounded-[2.5rem] relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[16px]">
                  <div className="space-y-[8px]">
                    <label className="text-[12px] leading-[1.2] tracking-[0.05em] font-semibold text-white/70 uppercase ml-1">Boarding Point</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-white/60">location_on</span>
                      <input className="w-full pl-[48px] pr-[16px] py-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-white/40 focus:bg-white focus:ring-2 focus:ring-[#feb700] focus:border-transparent transition-all outline-none text-white focus:text-[#191c1e] shadow-sm" placeholder="Enter Origin" type="text" />
                    </div>
                  </div>
                  <div className="space-y-[8px]">
                    <label className="text-[12px] leading-[1.2] tracking-[0.05em] font-semibold text-white/70 uppercase ml-1">Drop-off Point</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-white/60">navigation</span>
                      <input className="w-full pl-[48px] pr-[16px] py-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-white/40 focus:bg-white focus:ring-2 focus:ring-[#feb700] focus:border-transparent transition-all outline-none text-white focus:text-[#191c1e] shadow-sm" placeholder="Enter Destination" type="text" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[32px]">
                  <div className="space-y-[8px]">
                    <label className="text-[12px] leading-[1.2] tracking-[0.05em] font-semibold text-white/70 uppercase ml-1">Travel Date</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-white/60">calendar_today</span>
                      <input className="w-full pl-[48px] pr-[16px] py-4 rounded-2xl bg-white/10 border border-white/20 focus:bg-white focus:ring-2 focus:ring-[#feb700] focus:border-transparent transition-all outline-none text-white focus:text-[#191c1e] shadow-sm" type="date" />
                    </div>
                  </div>
                  <div className="space-y-[8px]">
                    <label className="text-[12px] leading-[1.2] tracking-[0.05em] font-semibold text-white/70 uppercase ml-1">Passengers</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-[16px] top-1/2 -translate-y-1/2 text-white/60">person</span>
                      <select className="w-full pl-[48px] pr-[16px] py-4 rounded-2xl bg-white/10 border border-white/20 focus:bg-white focus:ring-2 focus:ring-[#feb700] focus:border-transparent transition-all appearance-none outline-none text-white focus:text-[#191c1e] shadow-sm">
                        <option className="text-black">1 Passenger</option>
                        <option className="text-black">2 Passengers</option>
                        <option className="text-black">3 Passengers</option>
                        <option className="text-black">4+ Passengers</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">expand_more</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => router.push('/search')} className="w-full py-[32px] bg-[#feb700] text-[#050a44] rounded-2xl text-[20px] leading-[1.4] font-semibold hover:bg-white hover:text-[#050a44] hover:shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" style={{ transform: 'translateY(0px)' }}>
                  <span>Search Journeys</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Operators */}
        <section className="py-[32px] bg-white border-y border-[#edeef0]">
          <div className="px-4 md:px-[64px] max-w-[1440px] mx-auto opacity-0 translate-y-12">
            <p className="text-center text-[12px] leading-[1.2] tracking-[0.2em] font-semibold text-[#777680] mb-10 uppercase">Trusted by Premium Fleet Partners</p>
            <div className="flex flex-wrap justify-center items-center gap-x-[48px] gap-y-[32px]">
              <div className="h-10 w-auto opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer font-bold text-xl">Green Line</div>
              <div className="h-10 w-auto opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer font-bold text-xl">Sakura</div>
              <div className="h-10 w-auto opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer font-bold text-xl">Hanif</div>
              <div className="h-10 w-auto opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer font-bold text-xl">Shohagh</div>
              <div className="h-10 w-auto opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer font-bold text-xl">Euro Coach</div>
            </div>
          </div>
        </section>

        {/* Why VIVID Bento Grid */}
        <section className="py-[48px] bg-[#fcfcfd]">
          <div className="px-4 md:px-[64px] max-w-[1440px] mx-auto opacity-0 translate-y-12">
            <div className="text-center max-w-3xl mx-auto mb-[48px]">
              <h2 className="text-[32px] md:text-[40px] font-bold mb-6 text-[#050a44] leading-[1.3]">Redefining the standard of road travel</h2>
              <p className="text-[16px] leading-[1.7] text-[#46464f] max-w-2xl mx-auto">We harmonize precision technology with dedicated hospitality to ensure every mile of your journey is remarkable.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px] h-auto lg:h-[650px]">
              {/* Bento Item 1: Real-time locking */}
              <div className="md:col-span-12 lg:col-span-4 bg-white border border-[#edeef0] rounded-[2.5rem] p-[32px] flex flex-col justify-between premium-shadow hover:shadow-2xl transition-all duration-500 group relative overflow-hidden opacity-0 translate-y-12">
                <div className="bento-glow top-0 right-0 bg-[#050a44]"></div>
                <div className="w-16 h-16 rounded-2xl bg-[#edeef0] flex items-center justify-center text-[#050a44] mb-[32px] group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                </div>
                <div>
                  <h3 className="text-[20px] leading-[1.4] font-semibold mb-4 text-[#050a44]">Real-time Seat Locking</h3>
                  <p className="text-[14px] leading-[1.6] text-[#46464f] leading-relaxed">Eliminate booking conflicts with our elite sub-millisecond inventory synchronization engine.</p>
                </div>
              </div>
              
              {/* Bento Item 2: Ticket Resale */}
              <div className="md:col-span-12 lg:col-span-8 bg-[#050a44] rounded-[2.5rem] p-[32px] relative overflow-hidden flex flex-col justify-between premium-shadow hover:shadow-2xl transition-all duration-500 opacity-0 translate-y-12">
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                  <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#feb700] opacity-10 blur-3xl rounded-full"></div>
                </div>
                <div className="z-10 max-w-lg">
                  <div className="inline-block px-3 py-1 bg-[#feb700] text-[#050a44] rounded-full text-[12px] font-semibold uppercase mb-4 tracking-wider">World First</div>
                  <h3 className="text-[36px] font-bold text-white mb-6 leading-[1.15] tracking-[-0.03em]">Exclusive Ticket Resale Marketplace</h3>
                  <p className="text-[16px] leading-[1.7] text-[#bdc2ff] opacity-80">Plans changed? List your ticket on our secure marketplace. The first audited p2p exchange for premium transport.</p>
                </div>
                <div className="mt-[32px] z-10">
                  <button onClick={() => router.push('/search')} className="px-8 py-3 bg-white text-[#050a44] rounded-xl text-[14px] leading-[1.2] tracking-[0.03em] font-semibold hover:bg-[#feb700] hover:text-[#050a44] transition-all flex items-center gap-2">
                    <span>Explore Marketplace</span>
                    <span className="material-symbols-outlined">launch</span>
                  </button>
                </div>
              </div>

              {/* Bento Item 3: Multi-operator */}
              <div className="md:col-span-12 lg:col-span-7 bg-[#f2f4f6] rounded-[2.5rem] p-[32px] flex flex-col lg:flex-row gap-[32px] items-center premium-shadow border border-white hover:border-[#edeef0] transition-all opacity-0 translate-y-12">
                <div className="flex-1 order-2 lg:order-1">
                  <h3 className="text-[20px] leading-[1.4] font-semibold mb-4 text-[#050a44]">Multi-operator Comparison</h3>
                  <p className="text-[14px] leading-[1.6] text-[#46464f] mb-8">Analyze 50+ luxury fleets side-by-side. Curate your experience based on AC, Sleeper options, and VIP ratings.</p>
                  <div className="flex items-center -space-x-3">
                    <div className="w-12 h-12 rounded-full border-4 border-white bg-[#e1e2e4] shadow-sm overflow-hidden flex items-center justify-center font-bold text-xs">GL</div>
                    <div className="w-12 h-12 rounded-full border-4 border-white bg-[#e1e2e4] shadow-sm overflow-hidden flex items-center justify-center font-bold text-xs">SK</div>
                    <div className="w-12 h-12 rounded-full border-4 border-white bg-[#e1e2e4] shadow-sm overflow-hidden flex items-center justify-center font-bold text-xs">HF</div>
                    <div className="w-12 h-12 rounded-full bg-[#050a44] border-4 border-white flex items-center justify-center text-white text-[10px] font-bold">+47</div>
                  </div>
                </div>
                <div className="flex-1 w-full lg:w-auto h-56 rounded-3xl bg-white border border-[#edeef0] p-6 shadow-inner relative overflow-hidden order-1 lg:order-2">
                  <div className="flex flex-col space-y-4">
                    <div className="h-12 bg-[#f2f4f6] rounded-xl w-full flex items-center px-4 gap-3">
                      <div className="w-4 h-4 bg-[#feb700] rounded-full shadow-[0_0_8px_rgba(254,183,0,0.6)]"></div>
                      <div className="h-2.5 bg-[#c7c5d1] w-1/2 rounded-full"></div>
                      <div className="ml-auto h-2.5 bg-[#c7c5d1] w-1/4 rounded-full opacity-30"></div>
                    </div>
                    <div className="h-12 bg-[#f2f4f6] rounded-xl w-full flex items-center px-4 gap-3">
                      <div className="w-4 h-4 bg-[#050a44] rounded-full"></div>
                      <div className="h-2.5 bg-[#c7c5d1] w-1/3 rounded-full"></div>
                      <div className="ml-auto h-2.5 bg-[#c7c5d1] w-1/4 rounded-full opacity-30"></div>
                    </div>
                    <div className="h-12 bg-[#f2f4f6] rounded-xl w-full flex items-center px-4 gap-3">
                      <div className="w-4 h-4 bg-[#3280f9] rounded-full"></div>
                      <div className="h-2.5 bg-[#c7c5d1] w-2/3 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Item 4: Hospitality */}
              <div className="md:col-span-12 lg:col-span-5 bg-[#feb700] rounded-[2.5rem] p-[32px] flex flex-col justify-end premium-shadow hover:shadow-2xl transition-all duration-500 relative overflow-hidden group opacity-0 translate-y-12">
                <span className="material-symbols-outlined text-[140px] absolute -top-8 -right-8 opacity-10 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">auto_awesome</span>
                <div className="relative z-10">
                  <h3 className="text-[20px] leading-[1.4] font-semibold mb-4 text-[#050a44]">Certified Hospitality</h3>
                  <p className="text-[14px] leading-[1.6] text-[#050a44]/80">Every VIVID-partner fleet adheres to stringent hygiene protocols and white-glove service standards for absolute comfort.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Stats */}
        <section className="py-24 overflow-hidden bg-[#050a44] text-white relative">
          <div className="absolute inset-0 opacity-5 opacity-0 translate-y-12">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="border-r border-white/20"></div>
              ))}
              <div></div>
            </div>
          </div>
          <div className="px-4 md:px-[64px] max-w-[1440px] mx-auto flex flex-col md:flex-row justify-around items-center text-center gap-[32px] relative z-10 opacity-0 translate-y-12">
            <div className="space-y-2">
              <div className="text-[64px] font-black tracking-tighter leading-none mb-2">10k<span className="text-[#feb700]">+</span></div>
              <div className="text-[14px] leading-[1.2] tracking-[0.2em] font-bold text-[#bdc2ff] uppercase">Bookings Daily</div>
            </div>
            <div className="w-px h-24 bg-white/10 hidden md:block"></div>
            <div className="space-y-2">
              <div className="text-[64px] font-black tracking-tighter leading-none mb-2">4.9<span className="text-[#feb700]">/5</span></div>
              <div className="text-[14px] leading-[1.2] tracking-[0.2em] font-bold text-[#bdc2ff] uppercase">Guest Rating</div>
            </div>
            <div className="w-px h-24 bg-white/10 hidden md:block"></div>
            <div className="space-y-2">
              <div className="text-[64px] font-black tracking-tighter leading-none mb-2">500<span className="text-[#feb700]">+</span></div>
              <div className="text-[14px] leading-[1.2] tracking-[0.2em] font-bold text-[#bdc2ff] uppercase">Luxury Fleets</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-[48px] relative overflow-hidden bg-white">
          <div className="px-4 md:px-[64px] max-w-[1440px] mx-auto opacity-0 translate-y-12">
            <div className="bg-[#ffffff] rounded-[4rem] p-[32px] md:p-[100px] flex flex-col lg:flex-row items-center justify-between gap-[48px] border border-[#edeef0] premium-shadow relative opacity-0 translate-y-12">
              <div className="max-w-xl text-center lg:text-left z-10">
                <h2 className="text-[32px] md:text-[48px] leading-[1.15] tracking-[-0.03em] font-bold mb-8 text-[#050a44]">Ready for your next grand journey?</h2>
                <p className="text-[16px] leading-[1.7] text-[#46464f] mb-12">Join a global community of travelers who prioritize comfort, security, and the luxury of time with VIVID's premium transport network.</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <button onClick={() => router.push('/search')} className="px-12 py-5 bg-[#050a44] text-[#ffffff] rounded-2xl text-[20px] leading-[1.4] font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">Reserve a Seat</button>
                  <button onClick={() => router.push('/search')} className="px-12 py-5 bg-white border border-[#c7c5d1] text-[#050a44] rounded-2xl text-[20px] leading-[1.4] font-semibold hover:bg-[#edeef0] transition-all">View All Routes</button>
                </div>
              </div>
              <div className="relative w-full lg:w-2/5 aspect-[4/5] max-w-[500px]">
                {/* Layered Image Card */}
                <div className="absolute inset-0 bg-[#050a44] rounded-[3.5rem] rotate-3 shadow-xl"></div>
                <div className="absolute inset-0 bg-white rounded-[3.5rem] -rotate-3 overflow-hidden border border-[#edeef0] shadow-2xl flex items-center justify-center group">
                  <img alt="Premium Bus Interior" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" />
                  <div className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                    <div className="text-white text-[14px] leading-[1.2] tracking-[0.03em] font-semibold mb-1">VIVID Gold Class</div>
                    <div className="text-white/70 text-[12px] leading-[1.2] tracking-[0.05em] font-semibold">Reimagining road travel since 2023</div>
                  </div>
                </div>
              </div>
              {/* Background Decoration */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#feb700]/5 blur-[120px] rounded-full"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f8f9fb] border-t border-[#edeef0] w-full py-20">
        <div className="px-4 md:px-[64px] max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
            <div className="space-y-8 max-w-sm">
              <div className="text-[32px] leading-[1.3] font-black text-[#050a44] tracking-tighter">VIVID</div>
              <p className="text-[14px] leading-[1.6] text-[#46464f]">The premier SaaS hospitality platform for the modern traveler. We are pioneering the digital transformation of luxury road transport.</p>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full bg-[#edeef0] flex items-center justify-center text-[#050a44] hover:bg-[#050a44] hover:text-white transition-colors" href="#">
                  <span className="material-symbols-outlined text-lg">public</span>
                </a>
                <a className="w-10 h-10 rounded-full bg-[#edeef0] flex items-center justify-center text-[#050a44] hover:bg-[#050a44] hover:text-white transition-colors" href="#">
                  <span className="material-symbols-outlined text-lg">share</span>
                </a>
                <a className="w-10 h-10 rounded-full bg-[#edeef0] flex items-center justify-center text-[#050a44] hover:bg-[#050a44] hover:text-white transition-colors" href="#">
                  <span className="material-symbols-outlined text-lg">chat</span>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div className="space-y-6">
                <h4 className="text-[14px] leading-[1.2] tracking-[0.03em] text-[#050a44] font-bold uppercase">Portal</h4>
                <ul className="space-y-4 text-[14px] leading-[1.6]">
                  <li><a className="text-[#46464f] hover:text-[#050a44] transition-all flex items-center gap-2 group" href="#">Operator Portal <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">east</span></a></li>
                  <li><a className="text-[#46464f] hover:text-[#050a44] transition-all flex items-center gap-2 group" href="#">Agent Login <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">east</span></a></li>
                  <li><a className="text-[#46464f] hover:text-[#050a44] transition-all flex items-center gap-2 group" href="#">Partner Program <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">east</span></a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-[14px] leading-[1.2] tracking-[0.03em] text-[#050a44] font-bold uppercase">Support</h4>
                <ul className="space-y-4 text-[14px] leading-[1.6]">
                  <li><a className="text-[#46464f] hover:text-[#050a44] transition-all" href="#">Privacy Policy</a></li>
                  <li><a className="text-[#46464f] hover:text-[#050a44] transition-all" href="#">Terms of Service</a></li>
                  <li><a className="text-[#46464f] hover:text-[#050a44] transition-all" href="#">Help Center</a></li>
                </ul>
              </div>
              <div className="space-y-6 hidden sm:block">
                <h4 className="text-[14px] leading-[1.2] tracking-[0.03em] text-[#050a44] font-bold uppercase">Contact</h4>
                <ul className="space-y-4 text-[14px] leading-[1.6] text-[#46464f]">
                  <li>support@vivid.travel</li>
                  <li>+1 (888) VIVID-01</li>
                  <li>New York, NY 10001</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-[#edeef0] flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[12px] leading-[1.2] tracking-[0.05em] font-semibold text-[#777680]">© 2026 VIVID SaaS Platform. All rights reserved.</p>
            <div className="flex gap-8 text-[12px] leading-[1.2] tracking-[0.05em] font-semibold text-[#777680]">
              <a className="hover:text-[#050a44]" href="#">Status</a>
              <a className="hover:text-[#050a44]" href="#">Security</a>
              <a className="hover:text-[#050a44]" href="#">GDPR</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
