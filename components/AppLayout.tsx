// components/AppLayout.tsx
import { TopNav } from './TopNav';
import { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex-1">
        {children}
      </div>
      {/* Footer — same tone/sizing as the rest of the app's fine print */}
      <footer className="mt-[48px] pt-[24px] border-t border-[#c7c5d1] flex flex-col md:flex-row justify-between items-center gap-[16px]">
        <div className="text-center md:text-left">
          <span className="text-[16px] font-bold text-[#050a44]">VIVID</span>
          <p className="text-[12px] text-[#46464f]">© 2026 VIVID SaaS. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-[24px]">
          <a className="text-[12px] font-medium text-[#46464f] hover:text-[#050a44] underline" href="#">
            Privacy Policy
          </a>
          <a className="text-[12px] font-medium text-[#46464f] hover:text-[#050a44] underline" href="#">
            Terms of Service
          </a>
          <a className="text-[12px] font-medium text-[#46464f] hover:text-[#050a44] underline" href="#">
            Partner Program
          </a>
          <a className="text-[12px] font-medium text-[#46464f] hover:text-[#050a44] underline" href="#">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}