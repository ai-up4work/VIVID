// components/AppLayout.tsx
import { TopNav } from './TopNav';
import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <TopNav />
        <div className="flex-1">
          {children}
        </div>
        <footer className="bg-white border-t border-outline/30 mt-12 py-8">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-black text-primary">VIVID</div>
            <p className="text-sm font-medium text-on-surface-variant">© 2026 VIVID SaaS Platform. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-all">Privacy Policy</a>
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-all">Terms of Service</a>
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-all">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}